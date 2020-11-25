<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
import axios from "axios";
export default {
  layout: "admin",
  components: {
    AdminPostForm
  },

  methods: {
    async onSubmitted(editedPost) {
      await this.$store.dispatch("editPost", editedPost);
      this.$router.push("/admin");
    }
  },
  middleware: ["check-auth", "auth"],
  async asyncData(context) {
    return axios
      .get(process.env.baseUrl + "/posts/" + context.params.postId + ".json")
      .then(response => {
        return {
          loadedPost: { ...response.data, id: context.params.postId }
        };
      })
      .catch(e => context.error(e));
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
