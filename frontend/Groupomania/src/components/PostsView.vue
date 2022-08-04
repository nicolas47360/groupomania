<template>
  <section>
    <article id="container">
      <div v-for="post in allPosts" :key="post.id" class="container-post">
        <div v-for="user in allUsers" :key="user.id" id="user-info">
          <p v-if="post.userId == user.userId">
            {{ user.pseudo }}
            {{ user.lastname }}
          </p>
          <img
            :src="user.imageUrl"
            alt="photo de profil"
            class="post-picture"
          />
        </div>
        <div>
          {{ post.message }}
          <img :src="post.imageUrl" alt="photo" class="post-picture" />
          <span>{{ post.createdAt }}</span>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeView",
  data() {
    return {
      allPosts: [],
      allUsers: [],
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
    };
  },
  created() {
    this.getUsers();
    this.getPosts();
  },
  methods: {
    getPosts() {
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

    getUsers() {
      axios
        .get("http://localhost:5000/api/user", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.allUsers = response.data;
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
#container {
  @include flspa;
  margin: 10px;
  flex-wrap: wrap;
  .container-post {
    max-width: 33%;
    @include border(2px, 15px, 0);
    @include flcol;
    margin: 15px 0 15px 0;
    #user-info {
      @include flspa;
      @include border(2px, 15px 15px 0 0, 8px);
      margin-bottom: 20px;
    }
    .post-picture {
      max-width: 33%;
    }
  }
}
</style>
