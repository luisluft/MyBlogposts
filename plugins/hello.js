export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject("hello", (msg, txt) => {
    console.log(`This is the first parameter: ${msg}`);
    console.log("This is the second parameter: " + txt);
  });
};
