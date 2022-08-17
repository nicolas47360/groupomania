<template>
  <div id="homepage">
    <NavBar />
    <navHome />
    <div id="post">
      <div id="gopost" @click="goToPost()">
        <span>Rédiger un nouveau Post</span>
        <fa icon="plus" id="plus" />
      </div>
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
#post {
  @include flce;
  #gopost {
    @include border(2px, 15px, 15px);
    @include box-shadow;
    @include flce;
    width: 20%;
    display: flex;
    flex-wrap: wrap;
    background-color: $primary-color;
    color: $secondary-color;
    align-items: center;
    cursor: pointer;
    height: 12px;
    @media (max-width: 1100px) {
      width: 30%;
      @media (max-width: 750px) {
        width: 40%;
      }
      @media (max-width: 1000px) {
        width: 50%;
      }
    }
    span {
      padding-right: 15px;
      text-align: center;
    }
    #plus {
      color: $primary-color;
      background-color: white;
      border-radius: 9px;
      font-size: 20px;
    }
  }
}
</style>
