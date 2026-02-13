
function login() {
  const employee_number = document.getElementById("employee_number").value;
  const password = document.getElementById("password").value;

  if (!employee_number || !password) {
    alert("Please fill in all fields");
    return;
  }

  const btn = document.getElementById("loginBtn");
  btn.textContent = "Signing in...";
  btn.disabled = true;

  apiLogin(employee_number, password)
    .then(data => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("user_name", data.name || "User");
      if (data.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "employee.html";
      }
    })
    .catch(err => {
      let errorMessage = err.message || "Failed to connect to server";
      alert(errorMessage);
      btn.textContent = "Sign In";
      btn.disabled = false;
    });
}
