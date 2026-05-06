// ═══════════════════════════════════════════
// FIREBASE FIRESTORE DATABASE MODULE
// ═══════════════════════════════════════════

// ──── EVENTS ────
async function addEvent(eventData) {
  try {
    const docRef = await db.collection('events').add({
      ...eventData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log('✓ Event added:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('✗ Event creation failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function getEvents() {
  try {
    const snapshot = await db.collection('events').orderBy('createdAt', 'desc').get();
    const events = [];
    snapshot.forEach(doc => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, events: events };
  } catch (error) {
    console.error('✗ Fetching events failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function saveYear(yearData) {
  try {
    const yearId = String(yearData.year);
    await db.collection('years').doc(yearId).set({
      ...yearData,
      year: yearData.year,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    console.log('✓ Year saved:', yearId);
    return { success: true, id: yearId };
  } catch (error) {
    console.error('✗ Saving year failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function getYearsSummary() {
  try {
    const snapshot = await db.collection('years').orderBy('year', 'desc').get();
    const years = [];
    snapshot.forEach(doc => {
      years.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, years: years };
  } catch (error) {
    console.error('✗ Fetching years failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function addYearPost(year, postData) {
  try {
    const yearId = String(year);
    const yearDoc = db.collection('years').doc(yearId);

    // Ensure year document exists so the gallery page can show the year card
    await yearDoc.set({
      year: yearId,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    const docRef = await yearDoc.collection('posts').add({
      ...postData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log('✓ Year post added:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('✗ Adding year post failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function updateEvent(eventId, eventData) {
  try {
    await db.collection('events').doc(eventId).update({
      ...eventData,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log('✓ Event updated:', eventId);
    return { success: true };
  } catch (error) {
    console.error('✗ Event update failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function deleteEvent(eventId) {
  try {
    await db.collection('events').doc(eventId).delete();
    console.log('✓ Event deleted:', eventId);
    return { success: true };
  } catch (error) {
    console.error('✗ Event deletion failed:', error.message);
    return { success: false, error: error.message };
  }
}

// ──── GALLERY ────
async function addGalleryImage(imageData) {
  try {
    const docRef = await db.collection('gallery').add({
      ...imageData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log('✓ Gallery image added:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('✗ Gallery image creation failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function getGalleryImages() {
  try {
    const snapshot = await db.collection('gallery').orderBy('createdAt', 'desc').get();
    const images = [];
    snapshot.forEach(doc => {
      images.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, images: images };
  } catch (error) {
    console.error('✗ Fetching gallery images failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function deleteGalleryImage(imageId) {
  try {
    await db.collection('gallery').doc(imageId).delete();
    console.log('✓ Gallery image deleted:', imageId);
    return { success: true };
  } catch (error) {
    console.error('✗ Gallery image deletion failed:', error.message);
    return { success: false, error: error.message };
  }
}

// ──── ACHIEVEMENTS ────
async function addAchievement(achievementData) {
  try {
    const docRef = await db.collection('achievements').add({
      ...achievementData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log('✓ Achievement added:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('✗ Achievement creation failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function getAchievements() {
  try {
    const snapshot = await db.collection('achievements').orderBy('createdAt', 'desc').get();
    const achievements = [];
    snapshot.forEach(doc => {
      achievements.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, achievements: achievements };
  } catch (error) {
    console.error('✗ Fetching achievements failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function deleteAchievement(achievementId) {
  try {
    await db.collection('achievements').doc(achievementId).delete();
    console.log('✓ Achievement deleted:', achievementId);
    return { success: true };
  } catch (error) {
    console.error('✗ Achievement deletion failed:', error.message);
    return { success: false, error: error.message };
  }
}

// ──── MEMBERS ────
async function addMember(memberData) {
  try {
    const docRef = await db.collection('members').add({
      ...memberData,
      joinedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log('✓ Member added:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('✗ Member creation failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function getMembers() {
  try {
    const snapshot = await db.collection('members').orderBy('joinedAt', 'desc').get();
    const members = [];
    snapshot.forEach(doc => {
      members.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, members: members };
  } catch (error) {
    console.error('✗ Fetching members failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function deleteMember(memberId) {
  try {
    await db.collection('members').doc(memberId).delete();
    console.log('✓ Member deleted:', memberId);
    return { success: true };
  } catch (error) {
    console.error('✗ Member deletion failed:', error.message);
    return { success: false, error: error.message };
  }
}
