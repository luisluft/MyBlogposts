<template>
  <div class="admin-post-page">
    <section class="update-form"><AdminPostForm :post="loadedPost" /></section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadedPost: {
        author: "Luis",
        title: "My awesome post",
        content: "super amazing",
        thumbnailLink: "https://picsum.photos/1920/1080"
      }
    };
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
