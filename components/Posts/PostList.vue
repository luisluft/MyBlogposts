<template>
  <section class="post-list">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      thumbnail="https://picsum.photos/1920/1080"
      title="Post Title"
      previewText="preview text"
    />
    <PostPreview
      id="2"
      :is-admin="isAdmin"
      thumbnail="https://picsum.photos/1920/1080"
      title="Post Title"
      previewText="preview text"
    />
    <PostPreview
      id="3"
      :is-admin="isAdmin"
      thumbnail="https://picsum.photos/1920/1080"
      title="Post Title"
      previewText="preview text"
    />
  </section>
</template>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

<script>
export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
};
</script>
