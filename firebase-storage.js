// ═══════════════════════════════════════════
// FIREBASE STORAGE MODULE
// ═══════════════════════════════════════════

async function uploadGalleryImage(file, fileName, onProgress) {
  return new Promise((resolve) => {
    try {
      const storageRef = storage.ref(`gallery/${Date.now()}_${fileName}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on('state_changed',
        (snapshot) => {
          if (onProgress) {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            onProgress(progress);
          }
        },
        (error) => {
          console.error('✗ Upload failed:', error.message);
          resolve({ success: false, error: error.message });
        },
        async () => {
          try {
            const url = await uploadTask.snapshot.ref.getDownloadURL();
            console.log('✓ Image uploaded:', url);
            resolve({ success: true, url: url });
          } catch (error) {
            console.error('✗ Failed to get URL:', error.message);
            resolve({ success: false, error: error.message });
          }
        }
      );
    } catch (error) {
      console.error('✗ Upload failed:', error.message);
      resolve({ success: false, error: error.message });
    }
  });
}

async function uploadProfileImage(file, fileName) {
  try {
    const storageRef = storage.ref(`profiles/${Date.now()}_${fileName}`);
    await storageRef.put(file);
    const url = await storageRef.getDownloadURL();
    console.log('✓ Profile image uploaded:', url);
    return { success: true, url: url };
  } catch (error) {
    console.error('✗ Profile upload failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function deleteStorageFile(filePath) {
  try {
    const fileRef = storage.ref(filePath);
    await fileRef.delete();
    console.log('✓ File deleted:', filePath);
    return { success: true };
  } catch (error) {
    console.error('✗ File deletion failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function uploadDocument(file, fileName) {
  try {
    const storageRef = storage.ref(`documents/${Date.now()}_${fileName}`);
    await storageRef.put(file);
    const url = await storageRef.getDownloadURL();
    console.log('✓ Document uploaded:', url);
    return { success: true, url: url };
  } catch (error) {
    console.error('✗ Document upload failed:', error.message);
    return { success: false, error: error.message };
  }
}
