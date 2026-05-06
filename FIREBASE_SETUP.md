# Firebase Setup Guide - RC Center Website

## Step 1: Create Firebase Project

1. Go to **https://console.firebase.google.com/**
2. Click **"Create a project"**
3. Enter project name: **RC-Center**
4. Accept the terms and click **"Continue"**
5. Choose your region and click **"Create project"**
6. Wait for the project to be created (1-2 minutes)

---

## Step 2: Get Firebase Config

1. Click **"</>  Add an app"** (Web icon)
2. Enter app name: **RC-Center-Web**
3. ✅ Check **"Also set up Firebase Hosting for this app"** (optional)
4. Click **"Register app"**
5. Copy the Firebase config object that appears

---

## Step 3: Update Firebase Config

1. Open `js/firebase-config.js` in your editor
2. Replace the placeholder values with your config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_FROM_CONSOLE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

3. Save the file

---

## Step 4: Enable Authentication

1. In Firebase Console, click **"Authentication"**
2. Click **"Get started"**
3. Click **"Email/Password"** sign-in method
4. Toggle **"Enable"** and click **"Save"**
5. Go to **"Users"** tab
6. Click **"Add user"**
   - Email: `admin@rccenter.com` (or your admin email)
   - Password: Create a strong password
   - Click **"Add user"**

---

## Step 5: Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"**
2. Click **"Create Database"**
3. Choose region and click **"Next"**
4. Select **"Start in test mode"** (for development)
5. Click **"Create"**
6. Wait for database to be created

**Important:** Before deploying to production, update security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write only for authenticated admin users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## Step 6: Enable Cloud Storage

1. In Firebase Console, click **"Storage"**
2. Click **"Get started"**
3. Accept the default location
4. Click **"Done"**
5. Update Storage Rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.resource.size < 10 * 1024 * 1024; // 10MB max
    }
  }
}
```

---

## Step 7: Test the Setup

### Test Login:
1. Open `login.html` in browser
2. Enter admin email and password
3. Click **"Login to Admin"**
4. Should redirect to `admin.html`

### Test Admin Panel:
1. Try adding a Festival or Reel
2. Check Firestore Console to verify data is saved
3. Check Storage console to verify any uploaded files

---

## Project Structure

```
js/
├── firebase-config.js       ← Your Firebase config (UPDATE WITH YOUR KEYS)
├── firebase-auth.js         ← Authentication functions
├── firebase-db.js           ← Firestore database functions
├── firebase-storage.js      ← Cloud Storage functions
├── login.js                 ← Login page logic
├── admin.js                 ← Admin panel logic
└── ui.js                    ← Shared UI functions
```

---

## Available Firebase Functions

### Authentication
```javascript
await loginAdmin(email, password)        // Login admin
await logoutAdmin()                      // Logout admin
await createAdminAccount(email, pass)    // Create new admin
await checkAdminAuth()                   // Check if logged in
await resetPassword(email)               // Send password reset email
```

### Database (Firestore)
```javascript
await addEvent(eventData)                // Add event/festival
await getEvents()                        // Fetch all events
await updateEvent(eventId, data)         // Update event
await deleteEvent(eventId)               // Delete event

await addGalleryImage(imageData)         // Add gallery image
await getGalleryImages()                 // Fetch gallery images
await deleteGalleryImage(imageId)        // Delete gallery image

await addAchievement(data)               // Add achievement
await getAchievements()                  // Get achievements

await addMember(memberData)              // Add member
await getMembers()                       // Get all members
```

### Storage
```javascript
await uploadGalleryImage(file, name)     // Upload to gallery folder
await uploadProfileImage(file, name)     // Upload to profiles folder
await deleteStorageFile(path)            // Delete file from storage
await uploadDocument(file, name)         // Upload documents
```

---

## Common Issues & Solutions

### Issue: "Firebase is not defined"
- ✅ Make sure Firebase SDK is loaded BEFORE your config script
- ✅ Check script order in HTML (firebase-app.js → firebase-auth.js → firebase-firestore.js → firestore-storage.js)

### Issue: "Cannot read property 'signInWithEmailAndPassword'"
- ✅ Make sure `firebase-auth-compat.js` is included
- ✅ Verify `firebase-config.js` runs after the SDK loads

### Issue: "PERMISSION_DENIED" errors
- ✅ Update Firestore Security Rules (see Step 5)
- ✅ Update Storage Security Rules (see Step 6)
- ✅ Make sure you're logged in

### Issue: Images not uploading
- ✅ Check Cloud Storage is enabled
- ✅ Verify file size is under 10MB
- ✅ Check security rules allow authenticated users

---

## Security Best Practices

✅ **DO:**
- Keep API keys in code (they're public-facing keys)
- Use Firestore Security Rules to protect data
- Enable 2FA on your Firebase account
- Regularly review user permissions
- Back up important data

❌ **DON'T:**
- Don't commit sensitive data to version control
- Don't use production credentials in development
- Don't leave database in "test mode" after launch
- Don't expose admin credentials

---

## Next Steps

1. ✅ Follow all steps above
2. ✅ Update `firebase-config.js` with your credentials
3. ✅ Test login at `login.html`
4. ✅ Test admin panel features
5. ✅ Before going live, update security rules in Firebase Console
6. ✅ Create multiple admin accounts as needed

---

## Support Resources

- Firebase Docs: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com
- Authentication Guide: https://firebase.google.com/docs/auth/web
- Firestore Guide: https://firebase.google.com/docs/firestore
- Storage Guide: https://firebase.google.com/docs/storage/web

---

**Last Updated:** May 2026
