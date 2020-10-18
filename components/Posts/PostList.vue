<template>
  <section class="post-list">
    <PostPreview
      id="1"
      thumbnail="https://picsum.photos/1920/1080"
      title="Post Title"
      previewText="preview text"
    />
    <PostPreview
      id="2"
      thumbnail="https://picsum.photos/1920/1080"
      title="Post Title"
      previewText="preview text"
    />
    <PostPreview
      id="3"
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
