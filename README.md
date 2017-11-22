# dogLog: Dog care tracker

## Basic Functionality / Pseudocode

- User creates dog-related **actions** they want to track (action name, short description)
  - Action displays name, short description, "Last completed" date, and a link to view log for that action
  - Can delete actions
- When an action is clicked, store the timestamp and add the completed action to the log
- User can view their *dog log* - complete history of actions, separated by day, reverse chronological order
  - Can also view a log by action (e.g. log of all the times the dog was fed)
- Persistent data stored, loaded, and updated with Firebase

## Stretch Goals

- User 'creates' dog(s) (name, breed, age)
- Allow edit/deletion of logs
- Allow 'archiving' and 'unarchiving' of actions (don't delete your actions, just hide from view until you want to continue tracking it)
- User logs in with Google account
- Private user data (each logged in user manages their own dogs)
- Share + collaborate on a dog with another user (Invite process & shared data access)
- Allow upload for photo of your dog
- Recognize dog breed from photo using [Google Cloud Vision API](https://cloud.google.com/vision/)