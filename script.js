const linkItems = document.querySelectorAll('.link-item');

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
