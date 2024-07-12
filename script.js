const linkItems = document.querySelectorAll('.link-item');

// Header Scroller Feature
let currentScroll = 0;
let isScrollingDown = true;

let arrows = document.querySelectorAll(".arrow");

let tween = gsap.to(".marquee_part",{
    xPercent : -100,
    repeat : -1,
    duration: 10,
    ease: 'linear'
}).totalProgress(0.5);


// NavBar ELements Feature
linkItems.forEach((linkItem, index) => {
    linkItem.addEventListener("click", () => {
        // Remove active class from all link items
        document.querySelectorAll(".link-item.active").forEach(item => item.classList.remove('active'));

        // Add active class to the clicked link item
        linkItem.classList.add("active");

        // Update indicator position
        const indicator = document.querySelector(".indicator");
        indicator.style.left = `${linkItem.offsetLeft}px`;
        indicator.style.width = `${linkItem.offsetWidth}px`;
    });
});
