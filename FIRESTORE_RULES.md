# Firestore Rules

Use these rules in Firebase Console -> Firestore Database -> Rules.

```txt
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, create, update: if request.auth != null && request.auth.uid == userId;

      match /builds/{buildId} {
        allow read, create, update, delete: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

Saved builds are stored at:

```txt
users/{userId}/builds/{buildId}
```
