<template>
  <NavBar />
  <section id="container">
    <section>
      <div class="switch">
        <div class="title-post">
          <h1 v-if="mode == 'create'">Rédiger votre post</h1>
          <h1 v-if="mode == 'modify'">Modifier votre post</h1>
          <h1 v-if="mode == 'delete'">Supprimer votre post</h1>
        </div>
        <div class="post-switch" v-if="mode == 'create'">
          Modifier ou supprimer votre post
        </div>
        <button
          class="switch-button"
          v-if="mode == 'create'"
          @click="switchtoModifyPost()"
        >
          Modifier votre post
        </button>
        <button
          class="switch-button"
          v-if="mode == 'create'"
          @click="switchtoDeletePost()"
        >
          Supprimer votre post
        </button>
      </div>
    </section>
    <section>
      <div v-if="mode == 'create'">
        <CreatePost />
      </div>
      <div v-if="mode == 'modify'">
        <ModifyPost />
      </div>
      <div v-if="mode == 'delete'">
        <DeletePost />
      </div>
    </section>
  </section>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import DeletePost from "../components/DeletePost.vue";
import CreatePost from "../components/CreatePost.vue";
import ModifyPost from "../components/ModifyPost.vue";
export default {
  name: "postsView",
  components: {
    NavBar,
    DeletePost,
    CreatePost,
    ModifyPost,
  },

  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      id: localStorage.getItem("id"),
      mode: "create",
    };
  },
  methods: {
    switchtoModifyPost() {
      this.mode = "modify";
    },

    switchtoCreatePost() {
      this.mode = "create";
    },

    switchtoDeletePost() {
      this.mode = "delete";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#container {
  @include flcecol;
  @include border(2px, 15px, 0);
  align-items: center;
  .switch {
    @include flcecol;
    align-items: center;
    .switch-button {
      margin: 20px 0 0 0;
      @include border(2px, 15px, 5px 15px 5px 15px);
      font-size: 18px;
      background-color: $primary-color;
      color: $text-color;
      @include box-shadow;
      cursor: pointer;
    }
  }
}
</style>
