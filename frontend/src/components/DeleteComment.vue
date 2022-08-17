<template>
  <section id="container" v-for="comment in allComments" :key="comment.id">
    <div id="container-info" v-if="comment.userId == this.userId">
      <div id="container-display">
        <span id="display-text"> {{ comment.message }}</span>
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
    </div>
  </section>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      allComments: [],
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    deleteComment(id) {
      axios
        .delete("http://localhost:5000/api/comment/" + id, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
          alert(response.data.message);
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
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
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY hh:mm");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#container {
  margin: 15px 0 15px 0;
  padding: 15px;
  #container-info {
    @include border(2px, 15px, 25px);
    @include flcecol;
    align-items: center;
    #container-display {
      @include flcecol;
      #display-text {
        padding: 10px 0 10px 0;
      }
      #display-date {
        padding: 10px 0 10px 0;
      }
    }
    button {
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
