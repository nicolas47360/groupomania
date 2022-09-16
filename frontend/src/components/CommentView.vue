<template>
  <NavBar />
  <section id="container">
    <span v-if="this.message" class="message-back">
      {{ this.message }}
    </span>
    <h1 class="comment-switch" v-if="mode == 'create' && this.postId == null">
      Modifier ou supprimer votre commentaire
    </h1>
    <h1 v-if="mode == 'create' && this.postId != null">
      Rédiger votre comentaire
    </h1>
    <section id="container-comment">
      <article id="mode">
        <div id="create-comment" v-if="mode == 'create' && this.postId != null">
          <CreateComment />
        </div>
        <div id="modify-comment" v-if="mode == 'modify' && this.postId == null">
          <ModifyComment />
        </div>
      </article>
      <article id="delete-modify" v-if="this.postId == null">
        <div
          id="container-info"
          v-for="comment in allComments"
          :key="comment.id"
        >
          <div id="container-display" v-if="this.userId == comment.userId">
            <span id="display-text"> {{ comment.message }} </span>
            <span id="display-date">
              Publier le {{ format_date(comment.createdAt) }}
            </span>
          </div>
          <button
            @click.prevent="deleteComment(comment._id)"
            v-if="comment.userId == this.userId"
          >
            Supprimer le commentaire
          </button>
          <button
            @click.prevent="goToModify(comment._id)"
            v-if="comment.userId == this.userId"
          >
            Modifier le commentaire
          </button>
        </div>
      </article>
    </section>
  </section>
  <div class="button-up" @click="goUp()">
    <fa id="arrow" icon="arrow-up" />
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import NavBar from "../components/NavBar.vue";
import CreateComment from "./CreateComment.vue";
import ModifyComment from "./ModifyComment.vue";

export default {
  name: "commentView",
  data() {
    return {
      allComments: [],
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      postId: localStorage.getItem("postId"),
      mode: "create",
      message: "",
      likes: 0,
    };
  },
  created() {
    this.getComments();
  },

  components: {
    NavBar,
    CreateComment,
    ModifyComment,
  },

  methods: {
    switchtoModifyComment() {
      this.mode = "modify";
    },

    switchtoCreateComment() {
      this.mode = "create";
    },
    /*
allows you to delete comment with the comment _id in the DB 
*/
    deleteComment(id) {
      axios
        .delete("http://localhost:5000/api/comment/" + id, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.message = response.data.message;
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*
allows you to get all comments for a user in the DB and return a reverse array allComments
*/
    getComments() {
      let commentsList = [];
      axios
        .get("http://localhost:5000/api/comment", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          let comments = response.data.comments;
          comments.forEach((comment) => {
            if (comment.userId == this.userId) {
              commentsList.push(comment);
            }
          });
          this.allComments = commentsList.reverse();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*
allows you to transform the format date for the display
*/
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY hh:mm");
      }
    },
    /*
allows you to go to the comment modify page and send the item commentId in the localstorage
*/
    goToModify(commentId) {
      localStorage.setItem("commentId", commentId);
      this.$router.push("comment/modify");
    },

    goUp() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
@import "../styles/utils/_keyframes";
#container {
  @include flcecol;
  align-items: center;
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
  h1 {
    color: $primary-color;
    font-size: 24px;
    text-align: center;
    margin: 45px 0 0 25px;
  }
  #container-comment {
    @include flspa;
    flex-wrap: wrap;
    margin: 2px 0 0 0;
    width: 90vw;
    @media (max-width: 980px) {
      @include flcecol;
      align-items: center;
    }
    #delete-modify {
      margin: 15px 0 15px 0;
      padding: 15px;
      @include flspa;
      width: 90vw;
      flex-wrap: wrap;
      @media (max-width: 980px) {
        @include flcecol;
      }
      #container-info {
        @include border(2px, 15px, 0 0 0 15px);
        @include flcecol;
        align-items: center;
        overflow: auto;
        margin: 0 15px 25px 15px;
        width: 30%;
        @media (max-width: 980px) {
          font-size: 14px;
          width: 80%;
        }
        #container-display {
          @include flcecol;
          align-items: center;
          #display-text {
            padding: 10px 0 10px 0;
            text-align: center;
          }
          #display-date {
            padding: 10px 0 10px 0;
          }
        }
        button {
          @include border(2px, 15px, 0 0 0 15px);
          background-color: $primary-color;
          color: $text-color;
          font-size: 16px;
          margin-bottom: 10px;
          @include box-shadow;
          margin-top: 20px;
          padding: 8px 0 8px 0;
          cursor: pointer;
          width: 50%;
          @media (max-width: 600px) {
            font-size: 14px;
            width: 80%;
          }
        }
      }
      #none {
        display: none;
      }
    }
    #mode {
      @include flspa;
      margin-top: 30px;
      width: 85%;
      #modify-comment {
        @include border(2px, 15px, 25px);
      }
      #delete-comment {
        @include flcecol;
      }
    }
  }
}

.button-up {
  width: 50px;
  height: 50px;
  background: $primary-color;
  border-radius: 50%;
  @include flce;
  align-items: center;
  position: fixed;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  @media (max-width: 550px) {
    width: 30px;
    height: 30px;
    @media (max-width: 400px) {
      width: 20px;
      height: 20px;
    }
  }
  #arrow {
    color: $text-color;
  }
}
</style>
