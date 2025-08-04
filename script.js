const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
  if (hoveredElement && hoveredElement.closest('a')) {
    cursor.classList.add('hover');
  } else {
    cursor.classList.remove('hover');
  }
});
