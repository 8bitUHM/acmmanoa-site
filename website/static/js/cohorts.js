const membersAll = document.querySelectorAll("button[aria-expanded]");

membersAll.forEach((value) => {
  value.addEventListener("click", () => {
    const expanded = value.getAttribute('aria-expanded');
    const child = value.firstElementChild;
    if (expanded === 'false') {
      value.setAttribute('aria-expanded', 'true');
      child.classList.remove(
        'group-hover:translate-y-[60%]', 
        'translate-y-[80%]',
      );
    } else {
      value.setAttribute('aria-expanded', 'false');
      child.classList.add(
        'group-hover:translate-y-[60%]',
        'translate-y-[80%]',
      );
    }
  });
})