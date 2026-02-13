requireAuth();
setUserInfo();

function loadAllLeaves() {
  apiGetAllLeaves()
    .then(data => {
      renderStats(data);
      renderTable(data);
    })
    .catch(err => {
      alert(err.message);
    });
}

function renderStats(data) {
  const total = data.length;
  const pending = data.filter(l => l.status.toUpperCase() === "PENDING").length;
  const approved = data.filter(l => l.status.toUpperCase() === "APPROVED").length;
  const rejected = data.filter(l => l.status.toUpperCase() === "REJECTED").length;

  document.getElementById("totalRequests").textContent = total;
  document.getElementById("pendingCount").textContent = pending;
  document.getElementById("approvedCount").textContent = approved;
  document.getElementById("rejectedCount").textContent = rejected;
}

function renderTable(data) {
  const table = document.getElementById("adminTable");
  table.innerHTML = "";

  if (data.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state">
            <div class="empty-state-icon">📭</div>
            <div class="empty-state-text">No leave requests found</div>
          </div>
        </td>
      </tr>`;
    return;
  }

  data.forEach(l => {
    const isPending = l.status.toUpperCase() === "PENDING";
    table.innerHTML += `
      <tr>
        <td><strong>#${l.id}</strong></td>
        <td>${l.user ? l.user.name : 'N/A'}</td>
        <td>${l.start_date} → ${l.end_date}</td>
        <td>${l.total_days} day${l.total_days > 1 ? 's' : ''}</td>
        <td>${getStatusBadge(l.status)}</td>
        <td>
          ${
            isPending
            ? `<button class="btn btn-success btn-sm me-1" onclick="approve(${l.id})">
                <i class="bi bi-check-lg"></i> Approve
              </button>
              <button class="btn btn-danger btn-sm" onclick="reject(${l.id})">
                <i class="bi bi-x-lg"></i> Reject
              </button>`
            : '<span class="text-muted">—</span>'
          }
        </td>
      </tr>`;
  });
}

function approve(id) {
  apiApproveLeave(id)
    .then(() => loadAllLeaves())
    .catch(err => alert(err.message));
}

function reject(id) {
  apiRejectLeave(id)
    .then(() => loadAllLeaves())
    .catch(err => alert(err.message));
}

loadAllLeaves();
