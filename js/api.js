const API_URL = "http://localhost/leave-managements/public/api";

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  return {
    "Authorization": "Bearer " + getToken()
  };
}

function authJsonHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + getToken()
  };
}

function handleResponse(res) {
  return res.json().then(data => {
    console.log("Response Status:", res.status);
    console.log("Response Data:", data);
    if (!res.ok) {
      const message = data.message || data.error || "Something went wrong";
      const error = new Error(message);
      error.data = data;
      throw error;
    }
    return data;
  }).catch(err => {
    console.log("Error:", err);
    if (err instanceof SyntaxError) {
      throw new Error("Invalid server response");
    }
    throw err;
  });
}

function apiLogin(employee_number, password) {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employee_number, password })
  })
  .then(handleResponse);
}

function apiLogout() {
  return fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: authHeaders()
  })
  .then(handleResponse);
}

// Employee
function apiSubmitLeave(data) {
  return fetch(`${API_URL}/leave-requests`, {
    method: "POST",
    headers: authJsonHeaders(),
    body: JSON.stringify(data)
  })
  .then(handleResponse);
}

function apiGetMyLeaves() {
  return fetch(`${API_URL}/leave-requests/me`, {
    headers: authHeaders()
  })
  .then(handleResponse);
}

// Admin
function apiGetAllLeaves() {
  return fetch(`${API_URL}/leave-requests`, {
    headers: authHeaders()
  })
  .then(handleResponse);
}

function apiApproveLeave(id) {
  return fetch(`${API_URL}/leave-requests/${id}/approve`, {
    method: "PUT",
    headers: authHeaders()
  })
  .then(handleResponse);
}

function apiRejectLeave(id) {
  return fetch(`${API_URL}/leave-requests/${id}/reject`, {
    method: "PUT",
    headers: authHeaders()
  })
  .then(handleResponse);
}

// Get leaves by employee ID
function apiGetEmployeeLeaves(userId) {
  return fetch(`${API_URL}/leave-requests/employee/${userId}`, {
    headers: authHeaders()
  })
  .then(handleResponse);
}
