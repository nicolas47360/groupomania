<template>
  <div>
    <NavBar />
    <PostsView />
    <p>bonjour</p>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import PostsView from "../components/PostsView.vue";
export default {
  name: "HomeView",
  components: {
    NavBar,
    PostsView,
  },
};
</script>

<style lang="scss" scoped></style>
