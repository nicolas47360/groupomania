<template>
  <NavBar />
  <section id="container">
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
          alert("commentaire supprimé");
          this.$router.push("/home");
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
          console.log(response.data);
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
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#container {
  @include flcecol;
  align-items: center;
  // flex-wrap: wrap;
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
        width: 40%;
        @media (max-width: 980px) {
          font-size: 14px;
          width: 60vw;
        }
        #container-display {
          @include flcecol;
          align-items: center;
          #display-text {
            padding: 10px 0 10px 0;
            text-align: center;          }
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
          width: 70%;
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
</style>
