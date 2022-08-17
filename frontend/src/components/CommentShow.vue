<template>
  <NavBar />
  <section id="container-show">
    <h1>Les commentaires du post</h1>
    <div id="show-comment" v-for="comment in allComments" :key="comment.id">
      <div v-if="comment.postId == this.postId">
        <span>{{ comment.message }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar.vue";
export default {
  name: "CommentShow",
  components: {
    NavBar,
  },
  data() {
    return {
      allComments: [],
      allPosts: [],
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      postId: localStorage.getItem("postId"),
    };
  },
  created() {
    this.getComments();
    this.getPosts();
  },
  methods: {
    getComments() {
      axios
        .get("http://localhost:5000/api/comment", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.allComments = response.data.comments;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPosts() {
      axios
        .get("http://localhost:5000/api/post", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.allPosts = response.data.reverse();
          this.mergeUsersAndPosts();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    mergePostsAndComments() {
      this.allPosts.forEach((post) => {
        this.allCcomments.forEach((user) => {
          if (post.userId == user.userId) {
            post.pseudo = user.pseudo;
            post.lastname = user.lastname;
            post.userImageUrl = user.imageUrl;
            post.firstname = user.firstname;
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#container-show {
  @include flcecol;
  align-items: center;
  #show-comment {
    @include border(2px, 15px, 15px);
    @include flce;
    margin: 15px 0 15px 0;
    width: 87%;
  }
}
</style>
