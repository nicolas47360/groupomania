<template>
  <NavBar />
  <section id="container">
    <section>
      <div class="switch">
        <div class="title-post">
          <h1 v-if="mode == 'create'">Rédiger votre commentaire</h1>
          <h1 v-if="mode == 'modify'">Modifier votre commentaire</h1>
          <h1 v-if="mode == 'delete'">Supprimer votre commentaire</h1>
        </div>
        <div class="post-switch" v-if="mode == 'create'">
          Modifier ou supprimer votre commentaire
        </div>
        <button
          class="switch-button"
          v-if="mode == 'create'"
          @click="switchtoModifyComment()"
        >
          Modifier votre commentaire
        </button>
        <button
          class="switch-button"
          v-if="mode == 'create'"
          @click="switchtoDeleteComment()"
        >
          Supprimer votre commentaire
        </button>
      </div>
    </section>
    <section>
      <div class="create-post" v-if="mode == 'create'">
        <CreateComment />
      </div>
      <div class="modify-post" v-if="mode == 'modify'">
        <ModifyComment />
      </div>
      <div class="delte-profil" v-if="mode == 'delete'">
        <DeleteComment />
      </div>
    </section>
  </section>
</template>

<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import CreateComment from "./CreateComment.vue";
import ModifyComment from "./ModifyComment.vue";
import DeleteComment from "./DeleteComment.vue";

export default {
  name: "commentView",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      mode: "create",
      message: "",
      likes: 0,
    };
  },

  components: {
    NavBar,
    CreateComment,
    ModifyComment,
    DeleteComment,
  },

  methods: {
    switchtoModifyComment() {
      this.mode = "modify";
    },

    switchtoCreateComment() {
      this.mode = "create";
    },

    switchtoDeleteComment() {
      this.mode = "delete";
    },
    deleteComment() {
      axios
        .delete("http://localhost:5000/api/comment/" + this.userId, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
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

  .post-form {
    @include flcecol;
    margin: 20px;
    .input-post {
      margin: 15px 0 15px 0;
      @include border(2px, 15px, 0 0 0 15px);
      font-size: 18px;
    }
    #post-button {
      @include border(2px, 15px, 0 0 0 15px);
      background-color: $primary-color;
      color: $text-color;
      font-size: 18px;
      @include box-shadow;
      margin-top: 20px;
      padding: 8px 0 8px 0;
      cursor: pointer;
    }
  }
}</style>
