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
    onSubmitted(editedPost) {
      console.log("here");
      axios
        .put(
          "https://myblog-25439.firebaseio.com/posts/" +
            this.$route.params.id +
            ".json",
          editedPost
        )
        .then(response => {
          console.log(response);
        })
        .catch(e => console.log(e));
    }
  },
  async asyncData(context) {
    let data = await axios
      .get(
        "https://myblog-25439.firebaseio.com/posts/" +
          context.params.postId +
          ".json"
      )
      .then(response => {
        return {
          loadedPost: response.data
        };
      })
      .catch(e => context.error(e));
    console.log(data);
    return data;
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
