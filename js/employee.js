requireAuth();
setUserInfo();

function submitLeave() {
  const start_date = document.getElementById("start_date").value;
  const end_date = document.getElementById("end_date").value;
  const reason = document.getElementById("reason").value;

  if (!start_date || !end_date || !reason) {
    alert("Please fill in all fields");
    return;
  }

  apiSubmitLeave({ start_date, end_date, reason })
    .then(() => {
      document.getElementById("start_date").value = "";
      document.getElementById("end_date").value = "";
      document.getElementById("reason").value = "";
      loadLeaves();
    })
    .catch(err => {
      alert(err.message);
    });
}

function loadLeaves() {
  apiGetMyLeaves()
    .then(data => {
      renderLeaveTable(data);
    })
    .catch(err => {
      alert(err.message);
    });
}

function renderLeaveTable(data) {
  const table = document.getElementById("leaveTable");
  table.innerHTML = "";

  if (data.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="5">
          <div class="empty-state">
            <div class="empty-state-icon">📭</div>
            <div class="empty-state-text">No leave requests yet</div>
          </div>
        </td>
      </tr>`;
    return;
  }

  data.forEach(l => {
    table.innerHTML += `
      <tr>
        <td><strong>#${l.id}</strong></td>
        <td>${l.start_date}</td>
        <td>${l.end_date}</td>
        <td>${l.total_days} day${l.total_days > 1 ? 's' : ''}</td>
        <td>${getStatusBadge(l.status)}</td>
      </tr>`;
  });
}

loadLeaves();
