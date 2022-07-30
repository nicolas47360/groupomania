<template>
  <NavBar />
  <section>
    <div class="switch">
      <div class="title-profil">
        <h1 v-if="mode == 'create'">Créer votre profil</h1>
        <h1 v-if="mode == 'modify'">Modifier votre profil</h1>
        <h1 v-if="mode == 'delete'">Supprimer votre profil</h1>
      </div>
      <div class="profil-switch" v-if="mode == 'create'">
        Modifier ou supprimer votre profil
      </div>
      <button
        class="switch-button"
        v-if="mode == 'create'"
        @click="switchtoModifyPost()"
      >
        Modifier votre post
      </button>
      <button
        class="switch-button"
        v-if="mode == 'create'"
        @click="switchtoDeletePost()"
      >
        Supprimer votre post
      </button>
    </div>
  </section>
</template>

<script>
// import axios from "axios";
import axios from "axios";
import NavBar from "../components/NavBar.vue";
export default {
  name: "postsView",
  components: {
    NavBar,
  },

  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      post: {
        message: "",
        imageUrl: "",
        likes: 0,
      },
    };
  },
  methods: {
    switchtoModifyPost() {
      this.mode = "modify";
    },

    switchtoCreatePost() {
      this.mode = "create";
    },

    switchtoDeletePost() {
      this.mode = "delete";
    },

    createPost() {
      let post = {
        message: this.message,
        imageUrl: this.imageUrl,
        likes: this.likes,
      };
      axios
        .post("http://localhost:5000/api/post", post, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          this.$router.push("/home");
          console.log(response.data);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
</style>
