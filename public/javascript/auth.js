// The slider effect for the login and signup forms
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
    console.log("Signup form submitted");

    // Get form values using getElementById
    const firstName = document.getElementById('signup_first_name').value;
    const lastName = document.getElementById('signup_last_name').value;
    const email = document.getElementById('signup_email').value;
    const password = document.getElementById('signup_password').value;

    // For debugging
    console.log("Form values extracted:");
    console.log("First Name:", firstName); // Must be remove to ensure security and privacy of user info. After everything works
    console.log("Last Name:", lastName); // Must be remove to ensure security and privacy of user info. After everything works
    console.log("Email:", email); // Must be remove to ensure security and privacy of user info. After everything works
    console.log("Password:", password); // Must be remove to ensure security and privacy of user info. After everything works

    // Structure the form data to send to the server
    const signupData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
    };

    const passwords = encodeURIComponent(signupData.password);

    console.log("Structured signup data", signupData); // Must be remove to ensure security and privacy of user info. After everything works

    try {
        // Send a POST request to the '/register' backend
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(signupData), // Convert JS/Data object to JSON string
        });

        console.log("Reponse received:", response); // Must be remove to ensure security and privacy of user info. After everything works

        // Log the raw response text and status code
        const responseText = await response.text();
        console.log("Raw response text:", responseText); // Must be remove to ensure security and privacy of user info. After everything works
        console.log("Status code:", response.status);  
        
        //Check if the response is valid JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Server did not return JSON');
        }
    
        // Parse the response is JSON
        const data = JSON.parse(responseText);

        // Handle the response
        if (response.ok) {
            console.log('Signup successful:', data.student); // Must be remove to ensure security and privacy of user info. After everything works
            alert('Signup successful!');
        } else {
            console.error('Signup failed:', data.student);
            alert(`Signup failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error parsing response:', error);
        alert('An error occurred while parsing the response.');
    }
});


// Listen for the login form submission event
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    console.log("Login form submitted");

    // Get form values using getElementById
    const credential = document.getElementById('login_credential').value;
    const password = document.getElementById('login_password').value;

    // For debugging
    console.log("Form values extracted:");
    console.log("Credential:", credential);
    console.log("Password:", password);

    // Structure the form data to send to the server
    const loginData = {
        email: credential,
        password: password,
    };

    console.log("Structured login data", loginData);

    try {
        // Send a POST request to the '/login' backend
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(loginData), // Convert JS/Data object to JSON string
        });

        console.log("Response received:", response);

        // Log the raw response text and status code
        const responseText = await response.text();
        console.log("Raw response text:", responseText);
        console.log("Status code:", response.status);  
        
        // Check if the response is valid JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Server did not return JSON');
        }
    
        // Parse the response as JSON
        const data = JSON.parse(responseText);

        // Handle the response
        if (response.ok) {
            console.log('Login successful:', data);
            alert('Login successful!');
            window.location.href = '/classes';
        } else {
            console.error('Login failed:', data);
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error parsing response:', error);
        alert('An error occurred while parsing the response.');
    }
});