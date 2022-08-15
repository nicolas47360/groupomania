<template>
  <NavBar />
  <section id="container">
    <section id="container-post">
      <div class="switch" v-if="this.userId != null">
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
      <section id="mode">
        <div id="gestion-mode" v-if="mode == 'create'">
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
      this.$router.push("post/modify");
    },

    switchtoCreatePost() {
      this.mode = "create";
    },

    switchtoDeletePost() {
      this.mode = "delete";
      this.$router.push("post/delete");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#container {
  @include flce;
  flex-wrap: wrap;
  #container-post {
    @include flcecol;
    @include border(2px, 15px, 0);
    align-items: center;
    width: 50%;
    margin: 45px 0 0 0;
    @media (max-width: 800px) {
      width: 80vw;
    }
    .switch {
      @include flcecol;
      align-items: center;
      h1 {
        color: $tertiary-color;
        font-size: 24px;
      }
      .post-switch {
        color: $tertiary-color;
        font-weight: bold;
      }
      .switch-button {
        margin: 20px 0 0 0;
        @include border(2px, 15px, 5px 15px 5px 15px);
        font-size: 18px;
        background-color: $primary-color;
        color: $secondary-color;
        @include box-shadow;
        cursor: pointer;
      }
    }
    #mode {
      display: flex;
      #gestion-mode {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
