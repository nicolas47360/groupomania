<template>
  <section>
    <article id="container">
      <div v-for="item in allPosts" :key="item.id" class="container-post">
        <div v-for="user in allUsers" :key="user.id">
          <p v-if="this.userId == user.id">{{ user.pseudo }} {{ user.lastname }}</p>
        </div>
        <div>{{ item.message }}</div>
        <img :src="item.imageUrl" alt="photo" class="post-picture" />
        <span>{{ item.createdAt }}</span>
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
  @include flcecol;
  margin: 10px;
  .container-post {
    max-width: 33%;
    @include border(2px, 15px, 15px);
    @include flspb;
    .post-picture {
      max-width: 33%;
    }
  }
}
</style>
