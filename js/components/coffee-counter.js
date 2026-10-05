// Une caisse et une horloge active communes, des paies et statistiques individuelles.
import { STUDENT_PROFILE, BARISTA_PROFILE, EMPLOYEE_PROFILES, SALARY_PERIOD_MS,
  getEmployeeLevel, getEmployeeSalePrice, hireStaff, createTeamState,
  hireTeamMember, promoteTeamMember, payTeamMember, advanceTeam } from "./coffee-staff.js?v=2";

export const COFFEE_PRICE_CENTS = 300;
export const EMPLOYEE_HIRE_COST_CENTS = STUDENT_PROFILE.hireCostCents;
export const EMPLOYEE_INTERVAL_MS = STUDENT_PROFILE.levels[0].intervalMs;
export const hireEmployee = hireStaff;

export function serveCoffee(state, priceCents = COFFEE_PRICE_CENTS) {
  if (!Number.isSafeInteger(priceCents) || priceCents <= 0) throw new Error("Prix de vente invalide");
  return { ...state, coffees: state.coffees + 1, moneyCents: state.moneyCents + priceCents };
}

export function initCoffeeCounter() {
  const root = document.querySelector(".coffee-counter");
  if (!root || root.dataset.initialized === "true") return;
  const find = (scope, name) => scope.querySelector("[data-" + name + "]");
  const money = find(root, "coffee-money"), coffees = find(root, "coffee-count"), feedback = find(root, "coffee-feedback");
  const note = root.querySelector("#coffee-counter-action-note");
  const price = find(root, "coffee-price"), gain = find(root, "coffee-gain");
  const lab = document.querySelector("#ia");
  const dock = root.querySelector(".coffee-dock");
  const dockMoney = find(root, "dock-money");
  const buttons = root.querySelectorAll("[data-brew-coffee]");
  function card(scope, profile, portrait) {
    if (!scope) return null;
    const controls = root.querySelector('[data-employee-controls="' + profile.id + '"]');
    const fields = Object.fromEntries(["employee-state", "employee-rate", "employee-note", "employee-level",
      "employee-rhythm", "employee-salary", "employee-quality", "employee-payday", "employee-description",
      "employee-preview", "hire-employee", "promote-employee", "pay-employee"].map((key) => [key, find(scope, key) || (controls && find(controls, key))]));
    return Object.values(fields).some((el) => !el) ? null : { profile, portrait, fields, controls };
  }
  const studentCard = card(root.querySelector("[data-employee-card='student']") || root,
    STUDENT_PROFILE, find(root, "coffee-barista"));
  const baristaCard = card(root.querySelector("[data-employee-card='barista']"),
    BARISTA_PROFILE, root.querySelector('[data-coffee-worker="barista"]'));
  const cards = [studentCard, baristaCard].filter(Boolean);
  if ([money, coffees, feedback, note, price, gain, lab, studentCard].some((el) => !el) || buttons.length !== 2) return;

  let state = createTeamState();
  let priceCents = COFFEE_PRICE_CENTS, timer = null;
  const number = new Intl.NumberFormat("fr-CA");
  const currency = new Intl.NumberFormat("fr-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatMoney = (cents) => currency.format(cents / 100) + " $";
  const active = () => !lab.hidden && document.visibilityState !== "hidden";
  const workingIds = () => Object.keys(EMPLOYEE_PROFILES).filter((id) => {
    const employee = state.employees[id];
    return employee.employeeHired && !(employee.salaryDueCents > 0);
  });
  let wasActive = active(), lastUpdate = performance.now();

  const renderCard = ({ profile, portrait, fields: f, controls }) => {
    const employee = state.employees[profile.id];
    const level = getEmployeeLevel(employee, profile);
    const nextLevel = profile.levels[(employee.employeeLevel ?? 0) + 1];
    const suspended = employee.salaryDueCents > 0;
    f["employee-state"].textContent = suspended ? "Suspendu" : employee.employeeHired ? "1 / 1" : "0 / 1";
    f["employee-state"].setAttribute("data-hired", String(employee.employeeHired));
    f["employee-state"].setAttribute("data-suspended", String(suspended));
    f["employee-level"].textContent = profile.name + " · " + level.name
      + (profile.levels.length > 1 ? " · " + ((employee.employeeLevel ?? 0) + 1) + " / " + profile.levels.length : "");
    f["employee-description"].textContent = level.description;
    f["employee-rhythm"].textContent = "1 café / " + number.format(level.intervalMs / 1000) + " s";
    f["employee-salary"].textContent = formatMoney(level.salaryCents) + " / min active";
    f["employee-quality"].textContent = "+" + level.qualityPct + " %";
    f["employee-payday"].textContent = !employee.employeeHired ? "Après embauche" : suspended
      ? formatMoney(employee.salaryDueCents) + " à régler"
      : Math.ceil((SALARY_PERIOD_MS - employee.employeePayMs) / 1000) + " s" + (active() ? "" : " · pause");
    f["employee-rate"].textContent = formatMoney(employee.employeeHired ? getEmployeeSalePrice(priceCents, level) : 0) + " / service";
    if (portrait) {
      portrait.hidden = !employee.employeeHired;
      if (portrait.dataset.level !== String(employee.employeeLevel ?? 0)) {
        portrait.setAttribute("src", level.portrait);
        portrait.setAttribute("alt", profile.name + " : " + level.outfit + ".");
        portrait.dataset.level = String(employee.employeeLevel ?? 0);
      }
    }
    const hire = f["hire-employee"], promote = f["promote-employee"], pay = f["pay-employee"];
    hire.disabled = employee.employeeHired || state.moneyCents < profile.hireCostCents;
    hire.hidden = employee.employeeHired;
    hire.textContent = employee.employeeHired ? "Employé engagé" : "Embaucher · " + formatMoney(profile.hireCostCents);
    promote.disabled = !employee.employeeHired || suspended || !nextLevel || state.moneyCents < nextLevel.salaryCents;
    promote.hidden = !employee.employeeHired || suspended;
    promote.textContent = nextLevel ? "Évoluer · " + formatMoney(nextLevel.salaryCents)
      : profile.evolutionPending ? "Évolution à venir" : "Évolution maximale";
    pay.hidden = !suspended;
    pay.disabled = !suspended || state.moneyCents < employee.salaryDueCents;
    pay.textContent = "Régler le salaire · " + formatMoney(employee.salaryDueCents || level.salaryCents);
    if (controls) {
      controls.dataset.suspended = String(suspended);
      find(controls, "dock-state").textContent = !employee.employeeHired ? "À recruter" : suspended
        ? "Travail suspendu" : level.name + " · Paie : " + f["employee-payday"].textContent;
    }
    f["employee-preview"].textContent = nextLevel
      ? "Prochain palier : " + nextLevel.name + " · " + nextLevel.outfit + " · 1 café / " + number.format(nextLevel.intervalMs / 1000)
        + " s · Bonus +" + nextLevel.qualityPct + " %. Nouvelle paie de " + formatMoney(nextLevel.salaryCents)
        + " versée immédiatement, puis toutes les 60 secondes actives."
      : profile.evolutionPending ? "Tenue de départ validée. Les prochaines tenues et les paliers d’évolution restent à définir."
        : "Dernier palier atteint. La paie continue toutes les 60 secondes actives.";
    const message = !employee.employeeHired
      ? (hire.disabled ? "Il manque " + formatMoney(profile.hireCostCents - state.moneyCents) + " pour embaucher."
        : "La caisse est suffisante : tu peux embaucher " + profile.name.toLowerCase() + ".")
      : suspended ? "Travail suspendu : salaire impayé de " + formatMoney(employee.salaryDueCents)
        + ". Prépare des cafés à la main, puis règle le salaire pour reprendre. Aucune dette supplémentaire."
        : active() ? "Au travail. Le salaire est prélevé toutes les 60 secondes actives."
          : "Jeu en pause : production et paie suspendues.";
    if (f["employee-note"].textContent !== message) f["employee-note"].textContent = message;
  };

  const render = () => {
    money.textContent = formatMoney(state.moneyCents);
    if (dockMoney) dockMoney.textContent = money.textContent;
    coffees.textContent = number.format(state.coffees);
    price.textContent = formatMoney(priceCents);
    gain.textContent = "1 clic = 1 café · +" + formatMoney(priceCents);
    root.dataset.teamSize = String(Object.values(state.employees).filter((employee) => employee.employeeHired).length);
    cards.forEach(renderCard);
  };

  function settle() {
    const now = performance.now();
    if (wasActive) state = advanceTeam(state, Math.max(0, now - lastUpdate), priceCents);
    lastUpdate = now;
  }

  function schedule() {
    clearTimeout(timer);
    timer = null;
    const ids = workingIds();
    if (!active() || ids.length === 0) return;
    const deadlines = ids.flatMap((id) => {
      const employee = state.employees[id], level = getEmployeeLevel(employee, EMPLOYEE_PROFILES[id]);
      return [level.intervalMs - employee.employeeServiceMs, SALARY_PERIOD_MS - employee.employeePayMs];
    });
    timer = setTimeout(tick, Math.max(1, Math.min(1000, ...deadlines)));
  }

  function tick() {
    timer = null;
    if (!active()) {
      wasActive = false;
      lastUpdate = performance.now();
      render();
      return;
    }
    settle();
    render();
    schedule();
  }

  function syncVisibility() {
    settle();
    wasActive = active();
    lastUpdate = performance.now();
    render();
    schedule();
  }

  const brew = () => {
    settle();
    state = serveCoffee(state, priceCents);
    render();
    feedback.textContent = "Café nº " + number.format(state.coffees) + " servi à la main · +" + formatMoney(priceCents);
    schedule();
  };

  function transact(button, id, operation, message) {
    settle();
    const next = operation(state, id);
    const restoreFocus = document.activeElement === button;
    if (next !== state) { state = next; feedback.textContent = message; }
    render();
    if (restoreFocus && (button.disabled || button.hidden)) buttons[1].focus({ preventScroll: true });
    schedule();
  }

  buttons.forEach((button) => {
    button.addEventListener("click", brew);
    button.disabled = false;
  });
  note.textContent = "Clique sur la tasse ou le bouton. Au clavier : Entrée ou Espace.";
  root.dataset.initialized = "true";
  if (dock) {
    // Réserver exactement sa hauteur, y compris au zoom ou après un changement de texte.
    const resizeDock = () => document.documentElement.style.setProperty("--coffee-dock-height", dock.getBoundingClientRect().height + "px");
    dock.hidden = false;
    const dockObserver = new ResizeObserver(resizeDock);
    dockObserver.observe(dock);
  }
  cards.forEach(({ profile, fields: f }) => {
    const id = profile.id;
    f["hire-employee"].addEventListener("click", () => transact(f["hire-employee"], id, hireTeamMember, profile.name + " rejoint l’équipe !"));
    f["promote-employee"].addEventListener("click", () => transact(f["promote-employee"], id, promoteTeamMember, "Salaire augmenté : nouvelle tenue et meilleures statistiques !"));
    f["pay-employee"].addEventListener("click", () => transact(f["pay-employee"], id, payTeamMember, "Salaire réglé. " + profile.name + " reprend le travail."));
  });
  document.addEventListener("visibilitychange", syncVisibility);
  new MutationObserver(syncVisibility).observe(lab, { attributes: true, attributeFilter: ["hidden"] });
  const setPrice = (nextPriceCents) => {
    if (!Number.isSafeInteger(nextPriceCents) || nextPriceCents <= 0) return;
    settle();
    priceCents = nextPriceCents;
    render();
    schedule();
  };
  setPrice(priceCents);
  return { setPrice };
}
