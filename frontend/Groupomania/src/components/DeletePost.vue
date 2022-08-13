<template>
  <NavBar />
  <article class="delete" v-if="this.postId != null">
    <p class="delete-text">Voulez vous suprimer ce post?</p>
    <div class="delete-container" v-for="post in allPosts" :key="post.id">
      <div
        class="delete-message"
        v-if="post.userId == this.userId && post._id == this.postId"
      >
        <p>{{ post.message }}</p>
        <img :src="post.imageUrl" alt="photo" v-if="post.imageUrl != null" />
        <button
          id="delete-button"
          type="reset"
          @click.prevent="deletePost(post._id)"
        >
          SUPPRIMER
        </button>
      </div>
    </div>
  </article>
  <article class="delete" v-else>
    <p class="delete-text">Voulez vous suprimer ce post?</p>
    <div
      class="delete-container"
      v-for="post in allPosts.reverse()"
      :key="post.id"
    >
      <div class="delete-message" v-if="post.userId == this.userId">
        <p>{{ post.message }}</p>
        <img :src="post.imageUrl" alt="photo" v-if="post.imageUrl != null" />
        <button
          id="delete-button"
          type="reset"
          @click.prevent="deletePost(post._id)"
        >
          SUPPRIMER
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar.vue";
export default {
  name: "deletePost",
  components: {
    NavBar,
  },
  data() {
    return {
      allPosts: [],
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      postId: localStorage.getItem("postId"),
    };
  },

  created() {
    this.getAllPost();
  },
  methods: {
    deletePost(id) {
      axios
        .delete("http://localhost:5000/api/post/" + id, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
          if (this.postId != null) {
            localStorage.removeItem("postId");
          }
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
.delete {
  @include flcecol;
  align-items: center;
  .delete-text {
    color: $text-alert;
    font-weight: bold;
    font-size: 22px;
  }
  .delete-container {
    @include flcecol;
    .delete-message {
      @include flcecol;
      @include border(2px, 15px, 15px);
      padding: 15px;
      margin: 20px 0 20px 0;
      align-items: center;
      #delete-button {
        @include border(2px, 15px, 0 0 0 15px);
        background-color: $primary-color;
        color: $text-color;
        font-size: 18px;
        @include box-shadow;
        margin-top: 20px;
        padding: 8px 0 8px 0;
        cursor: pointer;
        width: 320px;
      }
    }
  }
}
</style>
