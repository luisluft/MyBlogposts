export default function({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.authenticated) {
    console.log("This middleware executes before loading the main page");
  }
}
