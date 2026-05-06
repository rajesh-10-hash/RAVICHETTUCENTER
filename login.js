// ═══════════════════════════════════════════
// LOGIN PAGE - FIREBASE AUTHENTICATION
// ═══════════════════════════════════════════

async function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const messageEl = document.getElementById('message');

  if (!email || !password) {
    messageEl.textContent = '❌ Please fill in all fields';
    messageEl.className = 'form-msg error';
    return;
  }

  messageEl.textContent = '⏳ Logging in...';
  messageEl.className = 'form-msg info';

  const result = await loginAdmin(email, password);

  if (result.success) {
    messageEl.textContent = '✓ Login successful! Redirecting...';
    messageEl.className = 'form-msg success';
    setTimeout(() => {
      window.location.href = 'admin.html';
    }, 1500);
  } else {
    messageEl.textContent = '❌ ' + result.error;
    messageEl.className = 'form-msg error';
  }
}

// Auto-redirect if already logged in
window.addEventListener('load', async () => {
  const auth = await checkAdminAuth();
  if (auth.isAuthenticated) {
    window.location.href = 'admin.html';
  }
});
