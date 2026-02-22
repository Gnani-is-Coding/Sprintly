### Optimistic Updates:

- Optimistic updates in React are a pattern where the UI is updated immediately after a user action, before receiving confirmation from the server, to create a sense of instant responsiveness. The application "optimistically" assumes the server operation will succeed, and if it later fails, the UI rolls back to its previous state.
  - The traditional approach (user action -> loading state -> wait for server -> update UI),
  - the optimistic approach updates the UI instantly, in parallel with sending the server request in the background. - - For Eg: low-risk actions like "liking" a post or checking a task as complete.
