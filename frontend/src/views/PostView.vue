<template>
  <NavBar />
  <section id="container">
    <h1>Rédiger votre post</h1>
    <div id="gestion-mode">
      <CreatePost />
    </div>
  </section>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import CreatePost from "../components/CreatePost.vue";
export default {
  name: "postsView",
  components: {
    NavBar,
    CreatePost,
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#container {
  @include flcecol;
  align-items: center;
  h1 {
    color: $primary-color;
    font-size: 26px;
  }
}
</style>
