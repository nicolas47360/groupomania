<template>
  <div id="homepage">
    <NavBar />
    <navHome />
    <PostsView />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import PostsView from "../components/PostsView.vue";
import navHome from "../components/navHome.vue";
export default {
  name: "HomeView",
  components: {
    NavBar,
    navHome,
    PostsView,
  },
};
</script>

<style lang="scss" scoped></style>
