# doggo: Dog care tracker

## Basic Functionality / Pseudocode

- **Done**: User creates dog-related **actions** they want to track (action name, short description)
  - **Done**: Action displays name, short description, "Last completed" date
  - **Done**: Can delete actions
- **Done**: When an action is clicked, store the timestamp and add the completed action to the log
- **Done**: User can view their *dog log* - complete history of actions, separated by day, reverse chronological order
  - **Done**: Can also view a log by action (e.g. log of all the times the dog was fed)
- **Done**: Persistent data stored, loaded, and updated with Firebase

## Parked Issues

- Delete control icon is off-centre in history view only
- Inconsistent prop naming when passing to child components

## Enhancements

- Transitions
  - Subtle fade effects when mounting/unmounting components
- User/password sign up and login
  - Should link up with federated identities (Google Sign-In)
  - Should allow password reset
- User 'creates' dog(s) (name, breed, age)
  - Allow upload for photo of dog
  - Recognize dog breed from photo using [Google Cloud Vision API](https://cloud.google.com/vision/)
- Share + collaborate on a dog with another user (Invite process & shared data access)
- Allow 'archiving' and 'unarchiving' of actions (don't delete your actions, just hide from view until you want to continue tracking it)
- **Done**: Allow deletion of logs
- **Done**: User logs in with Google account
- **Done**: Private user data (each logged in user manages their own dogs)
- **Done** Instructions
  - **Done** When no actions exist, should guide the user on how to create
  - **Done** When no history exists (no action have been completed), should guide the user on how to add to the history
- **Done** Asynchronous events
  - **Done** Show loader while retrieving auth information
  - **Done (simplified)** Add loading animations for all API requests