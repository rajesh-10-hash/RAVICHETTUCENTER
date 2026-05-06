// ═══════════════════════════════════════════
// FIREBASE AUTHENTICATION MODULE
// ═══════════════════════════════════════════

async function loginAdmin(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    console.log('✓ Admin logged in:', userCredential.user.email);
    localStorage.setItem('adminUser', JSON.stringify(userCredential.user));
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('✗ Login failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function logoutAdmin() {
  try {
    await auth.signOut();
    localStorage.removeItem('adminUser');
    console.log('✓ Admin logged out');
    return { success: true };
  } catch (error) {
    console.error('✗ Logout failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function createAdminAccount(email, password) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    console.log('✓ Admin account created:', email);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('✗ Account creation failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function checkAdminAuth() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('adminUser', JSON.stringify(user));
        resolve({ isAuthenticated: true, user: user });
      } else {
        localStorage.removeItem('adminUser');
        resolve({ isAuthenticated: false, user: null });
      }
    });
  });
}

async function resetPassword(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    console.log('✓ Password reset email sent');
    return { success: true };
  } catch (error) {
    console.error('✗ Password reset failed:', error.message);
    return { success: false, error: error.message };
  }
}
