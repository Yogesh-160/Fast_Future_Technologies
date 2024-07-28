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
document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=free';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.items);
        })
        .catch(error => {
            console.error('Error fetching the books:', error);
        });

    function displayBooks(books) {
        const booksContainer = document.getElementById('books-container');
        booksContainer.innerHTML = '';

        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');

            const title = book.volumeInfo.title ? book.volumeInfo.title : 'No Title Available';
            const description = book.volumeInfo.description ? truncateDescription(book.volumeInfo.description) : 'No Description Available';
            const price = book.saleInfo && book.saleInfo.listPrice ? `$${book.saleInfo.listPrice.amount}` : 'Price Not Available';
            const imageUrl = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
            const link = book.volumeInfo.infoLink ? book.volumeInfo.infoLink : '#';

            bookElement.innerHTML = `
                <div class="book-image">
                    <img src="${imageUrl}" alt="${title}">
                </div>
                <div class="book-details">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <a href="${link}" class="learn-more" target="_blank">Learn More - ${price}</a>
                </div>
            `;

            booksContainer.appendChild(bookElement);
        });
    }

    function truncateDescription(description) {
        const maxLength = 100; // Maximum number of characters before truncation
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
        return description;
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const coursesContainer = document.getElementById('courses-container');

    // Fetch courses data from the API
    fetch('https://api.sampleapis.com/codingresources/codingResources')
        .then(response => response.json())
        .then(data => {
            displayCourses(data);
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
            coursesContainer.innerHTML = '<p>Failed to load courses. Please try again later.</p>';
        });

    // Function to display courses
    function displayCourses(courses) {
        courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course';
            courseElement.innerHTML = `
                <p>${course.description ? truncateDescription(course.description) : 'No Description Available'}</p>
                <p>${course.levels ? truncateDescription(course.levels) : 'No Description Available'}</p>
                <a href="${course.url ? course.url : '#'}" target="_blank">View Course</a>

            `;
            coursesContainer.appendChild(courseElement);
        });
        console.log(courses);
    }

    // Function to truncate description
    function truncateDescription(description) {
        const maxLength = 100; // Maximum number of characters before truncation
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
        return description;
    }
});

