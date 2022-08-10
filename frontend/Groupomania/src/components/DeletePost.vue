<template>
  <article id="delete">
    <p id="delete-text">Voulez vous suprimer ce post?</p>
    <div id="delte-container" v-for="post in allPosts" :key="post.id">
      <div id="delete-message" v-if="post.userId == this.userId">
        {{ post._id }}
        {{ post.userId }}
        {{ post.message }}
        {{ this.postId }}
        <button id="delete-button" type="reset" @click.prevent="deletePost()">
          SUPPRIMER
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      allPosts: [],
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      postId: "",
    };
  },

  created() {
    this.getAllPost();
  },
  methods: {
    deletePost() {
      axios
        .delete("http://localhost:5000/api/post/" + this.postId, {
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
    getAllPost() {
      axios
        .get("http://localhost:5000/api/post", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.allPosts = response.data;
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
#delete {
  @include flcecol;
  align-items: center;
  #delete-text {
    color: $text-alert;
    font-weight: bold;
    font-size: 22px;
    #delete-container {
      @include flcecol;
      #delete-message {
        @include flspa;
        #delete-button {
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
    }
  }
}
</style>
