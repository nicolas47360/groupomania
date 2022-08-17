<template>
  <section id="modify-comment" v-for="comment in allComments" :key="comment.id">
    <div id="comment-show" v-if="comment.userId == this.userId">
      <span id="post-message">{{ comment.message }}</span>
      <span>Publier le {{ format_date(comment.createdAt) }}</span>
    </div>
    <div class="modify-comment" v-if="comment.userId == this.userId">
      <form class="comment-form" action="">
        <label for="message">Message</label>
        <textarea
          class="input-comment"
          cols="30"
          rows="10"
          placeholder="Votre texte"
          v-model="message"
        >
        </textarea>
        <button
          id="post-button"
          type="submit"
          @click.prevent="modifyComment(comment._id)"
        >
          Modifier votre commentaire
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import moment from "moment";
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
      allComments: [],
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY hh:mm");
      }
    },
    modifyComment(id) {
      axios
        .put(
          "http://localhost:5000/api/comment/" + id,
          {
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
          console.log(response.data);
          this.$router.push("/home");
        })
        .catch((err) => console.log(err));
    },

    getComments() {
      axios
        .get("http://localhost:5000/api/comment", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.allComments = response.data.comments.reverse();
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
#modify-comment {
  @include flspa;
  margin: 15px 0 30px 0;
  width: 50vw;
  flex-wrap: wrap;
  #comment-show {
    @include border(2px, 15px, 15px);
    margin: 15px 0 15px 0;
    width: 75%;
    @include flcecol;
    align-items: center;
    #post-message {
      font-size: 18px;
      color: $tertiary-color;
      padding: 15px 0 15px 0;
    }
  }
  .comment-form {
    @include flcecol;
    margin: 20px;
    align-items: center; 
    .input-comment {
      margin: 15px 0 15px 0;
      @include border(2px, 15px, 0 0 0 15px);
      font-size: 18px;
      @media (max-width: 550px) {
        width: 90%;
      }
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
      width: 80%;
    }
  }
}
</style>
