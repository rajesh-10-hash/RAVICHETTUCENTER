// ═══════════════════════════════════════════
// ADMIN PANEL - FIREBASE DATABASE MANAGEMENT
// ═══════════════════════════════════════════

let currentUser = null;

// Check authentication on page load
window.addEventListener('load', async () => {
  const auth = await checkAdminAuth();
  if (!auth.isAuthenticated) {
    window.location.href = 'login.html';
  } else {
    currentUser = auth.user;
    console.log('✓ Admin authenticated:', currentUser.email);
  }
});

// Switch tabs
function switchTab(tab, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tab + 'Tab').classList.add('active');
  btn.classList.add('active');
}

function updateGalleryFileAccept(type) {
  // No longer needed for URL-based uploads
}

// Save Festival (Store in Firestore)
async function saveFestival() {
  const year = document.getElementById('year').value.trim();
  const title = document.getElementById('title').value.trim();
  const instagram = document.getElementById('instagram').value.trim();
  const description = document.getElementById('description').value.trim();
  const messageEl = document.getElementById('message');

  if (!year || !title) {
    messageEl.textContent = '❌ Year and Title are required';
    messageEl.className = 'form-msg error';
    return;
  }

  messageEl.textContent = '⏳ Saving festival...';
  messageEl.className = 'form-msg info';

  const result = await saveYear({
    type: 'festival',
    year: Number(year) || year,
    title: title,
    instagram: instagram,
    description: description
  });

  if (result.success) {
    messageEl.textContent = '✓ Festival saved successfully!';
    messageEl.className = 'form-msg success';
    document.getElementById('year').value = '';
    document.getElementById('title').value = '';
    document.getElementById('instagram').value = '';
    document.getElementById('description').value = '';
  } else {
    messageEl.textContent = '❌ ' + result.error;
    messageEl.className = 'form-msg error';
  }
}

// Add Instagram Reel
async function addReel() {
  const year = document.getElementById('reelYear').value.trim();
  const caption = document.getElementById('caption').value.trim();
  const link = document.getElementById('reelLink').value.trim();
  const messageEl = document.getElementById('message');

  if (!year || !link) {
    messageEl.textContent = '❌ Year and Reel Link are required';
    messageEl.className = 'form-msg error';
    return;
  }

  messageEl.textContent = '⏳ Adding reel...';
  messageEl.className = 'form-msg info';

  const result = await addYearPost(year, {
    type: 'reel',
    caption: caption,
    instagram: link
  });

  if (result.success) {
    messageEl.textContent = '✓ Reel added successfully!';
    messageEl.className = 'form-msg success';
    document.getElementById('reelYear').value = '';
    document.getElementById('caption').value = '';
    document.getElementById('reelLink').value = '';
  } else {
    messageEl.textContent = '❌ ' + result.error;
    messageEl.className = 'form-msg error';
  }
}

async function addGalleryUrl() {
  const year = document.getElementById('galleryYear').value.trim();
  const caption = document.getElementById('galleryCaption').value.trim();
  const url = document.getElementById('galleryUrl').value.trim();
  const messageEl = document.getElementById('message');

  if (!year || !url) {
    messageEl.textContent = '❌ Year and URL are required';
    messageEl.className = 'form-msg error';
    return;
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    messageEl.textContent = '❌ Please enter a valid URL';
    messageEl.className = 'form-msg error';
    return;
  }

  messageEl.textContent = '⏳ Adding to gallery...';
  messageEl.className = 'form-msg info';

  const selectedType = document.querySelector('input[name="galleryType"]:checked')?.value || 'photo';

  const result = await addYearPost(year, {
    type: selectedType,
    image: url,
    caption: caption || '',
    instagram: ''
  });

  if (result.success) {
    messageEl.textContent = '✓ Gallery item added successfully!';
    messageEl.className = 'form-msg success';
    document.getElementById('galleryYear').value = '';
    document.getElementById('galleryCaption').value = '';
    document.getElementById('galleryUrl').value = '';
  } else {
    messageEl.textContent = '❌ ' + result.error;
    messageEl.className = 'form-msg error';
  }
}

// Logout Admin
async function logout() {
  const result = await logoutAdmin();
  if (result.success) {
    window.location.href = 'login.html';
  }
}
