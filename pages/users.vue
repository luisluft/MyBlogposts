<template>
  <div class="container">
    <div>
      <nuxt-link to="/users">Normal Users Page</nuxt-link>
      <input type="text" v-model="userId" />
      <button @click="loadUser">Load User</button>
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: ""
    };
  },
  methods: {
    loadUser() {
      this.$router.push("/users/" + this.userId);
    }
  },
  layout: "users"
};
</script>
