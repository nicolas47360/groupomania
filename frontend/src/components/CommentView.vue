<template>
  <NavBar />
  <section id="container">
    <section id="container-comment">
      <div class="switch">
        <div class="title-post">
          <h1 v-if="mode == 'create'">Rédiger votre commentaire</h1>
          <h1 v-if="mode == 'modify'">Modifier votre commentaire</h1>
          <h1 v-if="mode == 'delete'">Supprimer votre commentaire</h1>
        </div>
        <div class="comment-switch" v-if="mode == 'create'">
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
      <section id="mode">
        <div id="create-comment" v-if="mode == 'create'">
          <CreateComment />
        </div>
        <div v-if="mode == 'modify'">
          <ModifyComment />
        </div>
        <div v-if="mode == 'delete'">
          <DeleteComment />
        </div>
      </section>
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
  @include flce;
  flex-wrap: wrap; 
  #container-comment {
    @include flcecol;
    @include border(2px, 15px, 0);
    align-items: center;
    width: 50%;
    margin: 45px 0 0 0;
    // @media (max-width: 800px) {
    //   width: 70vw;
    // }
    .switch {
      @include flcecol;
      align-items: center;
      h1 {
        color: $tertiary-color;
        font-size: 24px;
      }
      .comment-switch {
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
      #create-comment {
        display: flex;
        justify-content: center;
      }
    }
  }
}</style>
