function requireAuth() {
  if (!getToken()) {
    window.location.href = "index.html";
  }
}

function setUserInfo() {
  const name = localStorage.getItem("user_name") || "User";
  const nameEl = document.querySelector(".navbar-user-name");
  const avatarEl = document.querySelector(".navbar-avatar");
  if (nameEl) nameEl.textContent = name;
  if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("sidebarOverlay").classList.toggle("active");
}

function logout() {
  apiLogout()
    .finally(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user_name");
      window.location.href = "index.html";
    });
}

function getStatusBadge(status) {
  const s = status.toUpperCase();
  if (s === "PENDING") return `<span class="badge bg-warning text-dark">Pending</span>`;
  if (s === "APPROVED") return `<span class="badge bg-success">Approved</span>`;
  if (s === "REJECTED") return `<span class="badge bg-danger">Rejected</span>`;
  return `<span class="badge bg-secondary">${status}</span>`;
}
