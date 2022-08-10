<template>
  <p id="delete-text">Voulez vous suprimer ce post?</p>
 
  <div v-for="post in allPosts" :key="post.id">
    <div v-if="post.userId == this.userId">
      {{ post._id }} {{post.userId}} {{post.message}}
       <button class="delete-button" type="reset" @click.prevent="deletePost()">
    SUPPRIMER
  </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      allPosts: [],
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
    };
  },
  created() {
    this.getAllPost();
  },
  methods: {
    deletePost() {
      axios
        .delete("http://localhost:5000/api/post/" + this.userId, {
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
.post-form {
  @include flcecol;
  margin: 20px;
  .input-post {
    margin: 15px 0 15px 0;
    @include border(2px, 15px, 0 0 0 15px);
    font-size: 18px;
  }
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
</style>
