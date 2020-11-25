export default function(context) {
  console.log("auth middleware");
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/admin/auth");
  }
}
