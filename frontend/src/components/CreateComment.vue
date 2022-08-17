<template>
  <section id="create-container">
    <div class="create-comment" v-if="mode == 'create'">
      <form class="comment-form" action="">
        <label for="message">Votre commentaire</label>
        <textarea
          class="input-comment"
          cols="30"
          rows="10"
          placeholder="Votre texte"
          v-model="message"
        >
        </textarea>
        <button
          id="comment-button" 
          type="submit" 
          @click.prevent="createComment()"
        >
          Publier votre commentaire
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "commentView",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      postId: localStorage.getItem("postId"),
      mode: "create",
      message: "",
      likes: 0,
    };
  },
  methods: {
    createComment() {
      axios
        .post(
          "http://localhost:5000/api/comment",
          {
            postId: this.postId,
            message: this.message,
            userId: this.userId,
            likes: this.likes,
          },
          {
            headers: {
              Authorization: "bearer " + this.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.push("/home");
        })
        .catch((err) => console.log(err.response.data));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#create-container {
  @include flce;
  .comment-form {
    @include flcecol;
    align-items: center;
    margin: 20px 0 20px 0;
    label {
      color: $primary-color;
      font-size: 18px;
      font-weight: bold;
    }
    .input-comment {
      display: flex;
      margin: 15px 0 15px 0;
      @include border(2px, 15px, 0 0 0 15px);
      font-size: 18px;
      @media (max-width: 550px) {
        width: 90%;
      }
    }
    #comment-button {
      @include border(2px, 15px, 0 0 0 15px);
      background-color: $primary-color;
      color: $text-color;
      font-size: 18px;
      @include box-shadow;
      margin-top: 20px;
      padding: 8px 0 8px 0;
      cursor: pointer;
      width: 70%;
    }
  }
}


</style>
