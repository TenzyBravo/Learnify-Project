// Sample course data (in real case, you’d fetch this from an API or database)
const allCourses = [
    {
        title: "JavaScript for Beginners",
        category: "programming",
        level: "beginner",
        popularity: 90,
        price: 0,
        image: "img/js-course.jpg"
    },
    {
        title: "Advanced Business Strategy",
        category: "business",
        level: "advanced",
        popularity: 75,
        price: 49,
        image: "img/business-course.jpg"
    },
    {
        title: "Intro to Graphic Design",
        category: "design",
        level: "beginner",
        popularity: 85,
        price: 30,
        image: "img/design-course.jpg"
    },
    {
        title: "Spanish Language Basics",
        category: "languages",
        level: "beginner",
        popularity: 60,
        price: 20,
        image: "img/spanish-course.jpg"
    }
    // Add more as needed
];

const searchInput = document.getElementById("courseSearch");
const categoryFilter = document.getElementById("categoryFilter");
const levelFilter = document.getElementById("levelFilter");
const sortBy = document.getElementById("sortBy");
const coursesGrid = document.getElementById("coursesGrid");
const coursesCount = document.getElementById("coursesCount");

// Remove loader after DOM is ready
window.addEventListener("DOMContentLoaded", () => {
    renderCourses();
    document.querySelector(".course-loader").style.display = "none";
});

// Listen for changes
searchInput.addEventListener("input", renderCourses);
categoryFilter.addEventListener("change", renderCourses);
levelFilter.addEventListener("change", renderCourses);
sortBy.addEventListener("change", renderCourses);

function renderCourses() {
    let filtered = [...allCourses];

    // Search
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(course =>
            course.title.toLowerCase().includes(searchTerm)
        );
    }

    // Filter by category
    const category = categoryFilter.value;
    if (category !== "all") {
        filtered = filtered.filter(course => course.category === category);
    }

    // Filter by level
    const level = levelFilter.value;
    if (level !== "all") {
        filtered = filtered.filter(course => course.level === level);
    }

    // Sort
    const sortOption = sortBy.value;
    switch (sortOption) {
        case "popular":
            filtered.sort((a, b) => b.popularity - a.popularity);
            break;
        case "newest":
            // Add a date field in course objects to use this
            break;
        case "price-low":
            filtered.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            filtered.sort((a, b) => b.price - a.price);
            break;
    }

    // Update course count
    coursesCount.textContent = filtered.length;

    // Render HTML
    coursesGrid.innerHTML = filtered.map(course => `
        <div class="course-card">
            <img src="${course.image}" alt="${course.title}">
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>Category: ${capitalize(course.category)}</p>
                <p>Level: ${capitalize(course.level)}</p>
                <p class="price">${course.price === 0 ? "Free" : `$${course.price}`}</p>
                <a href="#" class="btn btn-outline">View Course</a>
            </div>
        </div>
    `).join("");

    if (filtered.length === 0) {
        coursesGrid.innerHTML = `<p>No courses found matching your criteria.</p>`;
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}