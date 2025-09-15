function showToast(message, type) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white bg-${type} border-0 show`;
  toast.role = "alert";
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="ml-2 mb-1 close text-white" data-dismiss="toast">&times;</button>
    </div>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}