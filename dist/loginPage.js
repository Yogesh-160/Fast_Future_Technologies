// Custom Cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');
    
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
    
    cursorBlur.style.top = `${e.clientY}px`;
    cursorBlur.style.left = `${e.clientX}px`;
});