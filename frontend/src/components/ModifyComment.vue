<template>
  <NavBar />
  <section id="modify-comment" v-for="comment in allComments" :key="comment.id">
    <div id="comment-show" v-if="comment._id == this.commentId">
      <span id="border-comment">Votre commentaire</span>
      <span id="post-message">{{ comment.message }}</span>
      <span>Publier le {{ format_date(comment.createdAt) }}</span>
    </div>
    <div class="modify-comment" v-if="comment._id == this.commentId">
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
import NavBar from "./NavBar.vue";
export default {
  name: "commentView",
  components: {
    NavBar,
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      commentId: localStorage.getItem("commentId"),
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
    /*
allows you to transform the format date for the display
*/
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY hh:mm");
      }
    },
    /*
allows you to update a comment by the comment _id
delete the item commentId in the local storage and return to the homepage
*/
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
          localStorage.removeItem("commentId");
          alert(response.data.message);
          this.$router.push("/home");
        })
        .catch((err) => console.log(err));
    },
    /*
allows you to get all comments in the DB and return a reverse array allcomments
*/
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
  @include flcecol;
  align-items: center;
  margin-top: 20px;
  #comment-show {
    @include border(2px, 15px, 15px);
    margin: 15px 0 15px 0;
    @include flcecol;
    align-items: center;
    width: 60vw;
    overflow: auto;
    #border-comment {
      color: $primary-color;
      font-size: 18px;
      font-weight: bold;
    }
    #post-message {
      font-size: 18px;
      color: $tertiary-color;
      padding: 15px 0 15px 0;
      width: 80%;
      text-align: center;
    }
  }
  .comment-form {
    @include flcecol;
    margin: 20px;
    align-items: center;
    width: 90vw;
    .input-comment {
      margin: 15px 0 15px 0;
      @include border(2px, 15px, 0 0 0 15px);
      font-size: 18px;
      width: 80%;
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
      width: 40%;
      @media (max-width: 550px) {
        width: 70%;
      }
    }
  }
}
</style>
