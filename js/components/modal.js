// Ce module s'occupe seulement d'ouvrir et de fermer la modale.
export function initModal() {
  const dialog = document.querySelector("#project-dialog");
  const closeButton = document.querySelector("[data-close-dialog]");
  let lastTrigger = null;

  function open(trigger) {
    if (!dialog) return;
    lastTrigger = trigger;
    dialog.showModal();
  }

  function close() {
    if (dialog?.open) dialog.close();
  }

  closeButton?.addEventListener("click", close);
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  dialog?.addEventListener("close", () => lastTrigger?.focus());

  return { open, close };
}
