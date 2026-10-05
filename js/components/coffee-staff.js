// Profils distincts ; la barista dispose pour le moment de sa tenue de départ.
export const SALARY_PERIOD_MS = 60000;
export const STUDENT_PROFILE = Object.freeze({
  id: "student", name: "L’étudiant",
  hireCostCents: 3000,
  levels: Object.freeze([
    Object.freeze({ name: "Débutant", intervalMs: 3000, salaryCents: 300, qualityPct: 0,
      portrait: "./assets/images/coffee-student-v1.png", outfit: "Chemise crème et pull brun",
      description: "Peu motivé, mais il faut bien financer ses études." }),
    Object.freeze({ name: "Impliqué", intervalMs: 2500, salaryCents: 600, qualityPct: 5,
      portrait: "./assets/images/coffee-student-level-2-v1.png", outfit: "Pull vert sombre et cravate",
      description: "Un peu mieux payé, un peu plus investi. Il trouve son rythme." }),
    Object.freeze({ name: "Expérimenté", intervalMs: 2000, salaryCents: 1200, qualityPct: 10,
      portrait: "./assets/images/coffee-student-level-3-v1.png", outfit: "Chemise et veste élégante",
      description: "Toujours son air blasé, mais ses cafés parlent pour lui." }),
  ]),
});

export const BARISTA_PROFILE = Object.freeze({
  id: "barista", name: "La barista", hireCostCents: 6000, evolutionPending: true,
  levels: Object.freeze([
    Object.freeze({ name: "Passionnée", intervalMs: 4000, salaryCents: 600, qualityPct: 25,
      portrait: "./assets/images/coffee-warm-barista-v1.png", outfit: "Chemise crème et lunettes",
      description: "Un sourire contagieux et le souci du café bien fait. Elle mise sur la qualité." }),
  ]),
});
export const EMPLOYEE_PROFILES = Object.freeze({ student: STUDENT_PROFILE, barista: BARISTA_PROFILE });

export function getEmployeeLevel(state, profile = STUDENT_PROFILE) {
  return profile.levels[state.employeeLevel ?? 0];
}

export function getEmployeeSalePrice(priceCents, level) {
  if (!Number.isSafeInteger(priceCents) || priceCents <= 0) throw new Error("Prix de vente invalide");
  return Math.round(priceCents * (100 + level.qualityPct) / 100);
}

export function hireStaff(state, profile = STUDENT_PROFILE) {
  if (state.employeeHired || state.moneyCents < profile.hireCostCents) return state;
  return { ...state, moneyCents: state.moneyCents - profile.hireCostCents,
    employeeHired: true, employeeLevel: 0, employeeServiceMs: 0, employeePayMs: 0, salaryDueCents: 0 };
}

export function promoteEmployee(state, profile = STUDENT_PROFILE) {
  const next = profile.levels[(state.employeeLevel ?? 0) + 1];
  if (!state.employeeHired || state.salaryDueCents > 0 || !next || state.moneyCents < next.salaryCents) return state;
  // Nouvelle paie versée immédiatement ; prochaine échéance dans 60 secondes actives.
  return { ...state, moneyCents: state.moneyCents - next.salaryCents,
    employeeLevel: state.employeeLevel + 1, employeeServiceMs: 0, employeePayMs: 0 };
}

export function payEmployee(state) {
  if (!state.employeeHired || !(state.salaryDueCents > 0) || state.moneyCents < state.salaryDueCents) return state;
  return { ...state, moneyCents: state.moneyCents - state.salaryDueCents,
    salaryDueCents: 0, employeeServiceMs: 0, employeePayMs: 0 };
}

export function createTeamState() {
  return { coffees: 0, moneyCents: 0,
    employees: Object.fromEntries(Object.keys(EMPLOYEE_PROFILES).map((id) => [id, { employeeHired: false }])) };
}

function changeTeamMember(state, id, operation) {
  const profile = EMPLOYEE_PROFILES[id];
  if (!profile || !state.employees[id]) throw new Error("Employé inconnu");
  const individual = { ...state.employees[id], moneyCents: state.moneyCents, coffees: state.coffees };
  const result = operation(individual, profile);
  if (result === individual) return state;
  const { moneyCents, coffees, ...employee } = result;
  return { ...state, moneyCents, coffees, employees: { ...state.employees, [id]: employee } };
}

export const hireTeamMember = (state, id) => changeTeamMember(state, id, hireStaff);
export const promoteTeamMember = (state, id) => changeTeamMember(state, id, promoteEmployee);
export const payTeamMember = (state, id) => changeTeamMember(state, id, payEmployee);

// Horloge commune : aucun employé ne finance une échéance passée avec ses ventes futures.
function advanceWorkers(state, elapsedMs, priceCents, profiles) {
  if (!Number.isFinite(elapsedMs) || elapsedMs < 0) throw new Error("Durée active invalide");
  const working = (employee) => employee.employeeHired && !(employee.salaryDueCents > 0);
  const ids = Object.keys(profiles);
  if (elapsedMs === 0 || !ids.some((id) => working(state.employees[id]))) return state;
  const next = { ...state, employees: Object.fromEntries(
    Object.entries(state.employees).map(([id, employee]) => [id, { ...employee }])) };
  let remaining = elapsedMs;
  while (remaining > 0) {
    const activeIds = ids.filter((id) => working(next.employees[id]));
    if (activeIds.length === 0) break;
    const step = Math.min(remaining, ...activeIds.flatMap((id) => {
      const employee = next.employees[id], level = getEmployeeLevel(employee, profiles[id]);
      return [level.intervalMs - employee.employeeServiceMs, SALARY_PERIOD_MS - employee.employeePayMs];
    }));
    for (const id of activeIds) {
      next.employees[id].employeeServiceMs += step;
      next.employees[id].employeePayMs += step;
    }
    remaining -= step;
    // Paies avant tous les services simultanés ; priorité stable dans l’ordre des profils.
    for (const id of activeIds) {
      const employee = next.employees[id], level = getEmployeeLevel(employee, profiles[id]);
      if (employee.employeePayMs < SALARY_PERIOD_MS) continue;
      if (next.moneyCents < level.salaryCents) employee.salaryDueCents = level.salaryCents;
      else { next.moneyCents -= level.salaryCents; employee.employeePayMs = 0; }
    }
    for (const id of activeIds) {
      const employee = next.employees[id], level = getEmployeeLevel(employee, profiles[id]);
      if (employee.salaryDueCents > 0 || employee.employeeServiceMs < level.intervalMs) continue;
      next.coffees += 1;
      next.moneyCents += getEmployeeSalePrice(priceCents, level);
      employee.employeeServiceMs = 0;
    }
  }
  return next;
}

export function advanceTeam(state, elapsedMs, priceCents) {
  return advanceWorkers(state, elapsedMs, priceCents, EMPLOYEE_PROFILES);
}

// Compatibilité des tests de l’étape précédente, avec la même logique d’échéances.
export function advanceEmployee(state, elapsedMs, priceCents, profile = STUDENT_PROFILE) {
  const { moneyCents, coffees, ...employee } = state;
  const single = { moneyCents, coffees, employees: { single: employee } };
  const next = advanceWorkers(single, elapsedMs, priceCents, { single: profile });
  if (next === single) return state;
  return { ...next.employees.single, moneyCents: next.moneyCents, coffees: next.coffees };
}
