<template>
  <div id="homepage">
    <NavBar />
    <navHome />
    <div id="gopost" @click="goToPost()">
      <span>Rédiger un nouveau Post</span>
      <fa icon="plus" />
    </div>
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
  methods: {
    goToPost() {
      this.$router.push("/post");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#gopost {
  margin-left: 80px;
  @include border(2px, 15px, 15px);
  @include box-shadow;
  width: 18%;
  display: flex;
  flex-wrap: wrap;
  background-color: $primary-color;
  color: $secondary-color;
  cursor: pointer;
  span {
    padding-right: 15px;
  }
}
</style>
