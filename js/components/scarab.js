// Translation douce au curseur et rotation strictement limitée à l’axe X.
export function initScarab() {
  const button = document.querySelector("[data-scarab]");
  if (!button || button.dataset.initialized) return;
  button.dataset.initialized = "true";
  const section = button.closest(".portfolio-transition");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let angle = 0, targetAngle = 0, x = 0, y = 0, targetX = 0, targetY = 0;
  let velocity = 0, pointerId = null, lastX = 0, lastTime = 0, distance = 0;
  let frame = null, frameTime = null, visible = true, suppressClick = false, settling = false;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function paint() {
    button.style.setProperty("--scarab-angle", `${angle}deg`);
    button.style.setProperty("--scarab-x", `${x}px`);
    button.style.setProperty("--scarab-y", `${y}px`);
  }

  function tick(time) {
    frame = null;
    const dt = frameTime === null ? 16 : clamp(time - frameTime, 1, 32);
    frameTime = time;
    if (pointerId === null && Math.abs(velocity) > 0.005) {
      targetAngle += velocity * dt;
      velocity *= Math.exp(-dt / 170);
    } else if (pointerId === null && settling) {
      velocity = 0;
      targetAngle = Math.round(targetAngle / 360) * 360;
      settling = false;
    }
    const ease = 1 - Math.exp(-dt / 75);
    angle += (targetAngle - angle) * ease;
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    const moving = Math.abs(targetAngle - angle) > 0.05
      || Math.abs(targetX - x) > 0.05 || Math.abs(targetY - y) > 0.05
      || Math.abs(velocity) > 0.005 || settling;
    if (!moving) { angle = targetAngle; x = targetX; y = targetY; frameTime = null; }
    paint();
    if (moving) schedule();
  }

  function schedule() {
    if (!visible || document.hidden) return;
    if (reduced.matches) {
      angle = targetAngle; x = 0; y = 0; velocity = 0; settling = false;
      paint();
      return;
    }
    if (frame === null) frame = requestAnimationFrame(tick);
  }

  function endDrag(event) {
    if (pointerId === null || (event && event.pointerId !== pointerId)) return;
    const id = pointerId;
    pointerId = null;
    button.classList.remove("is-dragging");
    suppressClick = distance > 4;
    if (!event || event.type !== "pointerup" || event.timeStamp - lastTime > 100) velocity = 0;
    if (button.hasPointerCapture(id)) button.releasePointerCapture(id);
    targetX = 0; targetY = 0; settling = true;
    schedule();
  }

  function reset() {
    endDrag();
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null; frameTime = null;
    angle = targetAngle = x = y = targetX = targetY = velocity = 0;
    settling = false; suppressClick = false;
    paint();
  }

  section.addEventListener("pointermove", (event) => {
    if (pointerId !== null || event.pointerType === "touch" || reduced.matches) return;
    const rect = section.getBoundingClientRect();
    targetX = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1) * 14;
    targetY = clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1) * 10;
    schedule();
  });
  section.addEventListener("pointerleave", () => {
    targetX = targetY = 0;
    schedule();
  });
  button.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0 || pointerId !== null) return;
    pointerId = event.pointerId;
    lastX = event.clientX; lastTime = event.timeStamp;
    velocity = distance = 0; settling = suppressClick = false;
    button.classList.add("is-dragging");
    button.setPointerCapture(pointerId);
  });
  button.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pointerId) return;
    const dx = event.clientX - lastX;
    distance += Math.abs(dx);
    targetAngle += dx * 1.2;
    velocity = clamp(dx * 1.2 / Math.max(8, event.timeStamp - lastTime), -0.65, 0.65);
    lastX = event.clientX; lastTime = event.timeStamp;
    schedule();
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach(type => button.addEventListener(type, endDrag));
  button.addEventListener("click", (event) => {
    if (suppressClick && event.detail !== 0) { suppressClick = false; return; }
    velocity = 0; settling = false; targetAngle += 180;
    schedule();
  });
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "Escape"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home" || event.key === "Escape") { reset(); return; }
    velocity = 0; settling = false;
    targetAngle += event.key === "ArrowRight" ? 45 : -45;
    schedule();
  });
  window.addEventListener("blur", reset);
  document.addEventListener("visibilitychange", () => { if (document.hidden) reset(); });
  reduced.addEventListener("change", reset);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) reset();
    });
    observer.observe(section);
  }
}
