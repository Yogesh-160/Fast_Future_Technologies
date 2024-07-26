const linkItems = document.querySelectorAll('.link-item');

// Header Scroller Feature
let tween = gsap.to(".marquee_part", {
    xPercent: -100,
    repeat: -1,
    duration: 10,
    ease: 'linear'
}).totalProgress(0.5);

// NavBar Elements Feature
linkItems.forEach((linkItem, index) => {
    linkItem.addEventListener("click", () => {
        // Remove active class from all link items
        document.querySelectorAll(".link-item.active").forEach(item => item.classList.remove('active'));

        // Add active class to the clicked link item
        linkItem.classList.add("active");

        // Update indicator position
        updateIndicator();
    });
});

const updateIndicator = () => {
    const activeItem = document.querySelector(".link-item.active");
    const indicator = document.querySelector(".indicator");
    if (activeItem) {
        indicator.style.left = `${activeItem.offsetLeft}px`;
        indicator.style.width = `${activeItem.offsetWidth}px`;
    }
};

// Initial indicator position on page load
document.addEventListener("DOMContentLoaded", function () {
    updateIndicator();
    
    const navbar = document.querySelector("nav");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 60) { // Change the value to control when the effect starts
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    window.addEventListener("resize", updateIndicator);
});

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');
    
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
    
    cursorBlur.style.top = `${e.clientY}px`;
    cursorBlur.style.left = `${e.clientX}px`;
});
