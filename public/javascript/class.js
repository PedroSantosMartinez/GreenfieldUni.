document.addEventListener('DOMContentLoaded', () => {
    const courseSelect = document.getElementById('courseSelect');
    const courseCards = document.querySelectorAll('.course-card');

    courseSelect.addEventListener('change', function () {
        const selectedCourse = this.value;

        courseCards.forEach(card => {
            if (selectedCourse === "all" || card.getAttribute('data-course') === selectedCourse) {
                card.style.display = "block"; // Show matching course
            } else {
                card.style.display = "none"; // Hide non-matching courses
            }
        });
    });
});
