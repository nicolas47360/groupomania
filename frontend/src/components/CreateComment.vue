<template>
  <section id="create-container">
    <span v-if="this.messagedata" class="message-back">
      {{ this.messagedata }}
    </span>
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
      messagedata: "",
    };
  },
  methods: {
    /*
allows you to create comment in the DB, remove item postId to the localstorage and return in to homepage
*/
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
          localStorage.removeItem("postId");
          this.messagedata = response.data.message;
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 1000);
        })
        .catch((err) => console.log(err.response.data));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
@import "../styles/utils/_keyframes";
#create-container {
  @include flce;
  .message-back {
    font-size: 25px;
    color: $text-alert;
    position: absolute;
    top: 25%;
    bottom: 25%;
    left: 25%;
    right: 0;
    background-color: black;
    text-align: center;
    @include flcecol;
    width: 50%;
    animation: message 1s ease-in-out;
  }
  .comment-form {
    @include flcecol;
    align-items: center;
    margin: 20px 0 20px 0;
    width: 80vw;
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
      width: 80%;
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
      width: 40%;
      @media (max-width: 550px) {
        width: 70%;
      }
    }
  }
}
</style>
