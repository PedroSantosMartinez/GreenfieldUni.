document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/classes');
        if (!response.ok) throw new Error('Failed to fetch classes');
        
        const courses = await response.json();
        const classesList = document.getElementById('classesList');
        
        courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'class-card';
            courseDiv.innerHTML = `
                <h3>${course.Course.course_name}</h3>
                <div class="class-info">
                    <p>Professor: ${course.Course.professor}</p>
                    <p>Status: ${course.status}</p>
                    <p>Enrolled: ${new Date(course.enrollment_date).toLocaleDateString()}</p>
                </div>
                <p>${course.Course.description}</p>
            `;
            classesList.appendChild(courseDiv);
        });
    } catch (error) {
        console.error('Error loading classes:', error);
        alert('Failed to load classes. Please try again later.');
    }
});