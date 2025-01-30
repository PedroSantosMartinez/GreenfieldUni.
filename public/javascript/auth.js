const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const loginTitle = document.getElementById('loginTitle');

if (signUpButton && signInButton && container) {
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

loginTitle.addEventListener('click', () => {
    setTimeout(() => {
        // Your code to execute after 3 seconds (3000 milliseconds)
        console.log("3 seconds have passed!");
    }, 3000); // 3000 milliseconds = 3 seconds
});

// Listen for the form submission event
document.getElementById('signUpForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values using getElementById
    const firstName = document.getElementById('signup_first_name').value;
    const lastName = document.getElementById('signup_last_name').value;
    const email = document.getElementById('signup_email').value;
    const password = document.getElementById('signup_password').value;

    // For debugging
    console.log("Form values extracted:");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);

    // Structure the data body to send to the server
    const signupData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
    };

    console.log("Structured signup data", signupData);

    try {
        // Send a POST request to the backend
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        });

        // Handle the response
        if (response.ok) {
            const data = await response.json();
            console.log('Signup successful:', data.message);
            alert('Signup successful!');
        } else {
            const errorData = await response.json();
            console.error('Signup failed:', errorData.message);
            alert(`Signup failed: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred during signup. Please try again.');
    }
});
