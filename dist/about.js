// Custom Cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor');

    
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
});