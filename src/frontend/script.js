
// frontend/script.js
document.addEventListener("DOMContentLoaded", () => {
    const userDataContainer = document.getElementById("user-data");
    const userForm = document.getElementById("user-form");
    const createUserButton = document.getElementById("create-user-button");


    // Function to fetch and display user data
    function fetchUserData() {
        fetch("/users")
            .then((response) => response.json())
            .then((data) => {
                userDataContainer.innerHTML = ""; // Clear existing data
                data.forEach((user) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `<td>${user.ID}</td><td>${user.Username}</td><td>${user.Email}</td><td>${user.Password}</td><td>${user.Age}</td><td>${user.Weight}</td><td>${user.Height}</td>`;
                    userDataContainer.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

  // Handle form submission
    userForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        const formData = new FormData(userForm);
        const userData = {
            Username: formData.get("Username"),
            Email: formData.get("Email"),
            Password: formData.get("Password"),
            Age: parseInt(formData.get("Age")),
            Weight: parseInt(formData.get("Weight")),
            Height: parseInt(formData.get("Height")),
        };

        // Make a POST request to create a new user
        fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then(() => {
                window.location.href="/login.html";
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    });

    // Fetch and display user data when the page loads
    fetchUserData();

});
