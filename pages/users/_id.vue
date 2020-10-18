<template>
  <div>
    <h1>This is the page for the user with ID: {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  validate(data) {
    // only creates dynamic pages for id being a number
    return /^\d+$/.test(data.params.id);
  }
};
</script>
