<template>
  <form @submit.prevent="createPost" class="post-form">
    <label for="pseudo">Pseudo</label>
    <input
      type="text"
      class="input-post"
      v-model="pseudo"
      placeholder="Pseudo"
    />
    <label for="message">Message</label>
    <textarea
      class="input-post"
      cols="30"
      rows="10"
      placeholder="Votre texte"
      v-model="message"
    >
    </textarea>
    <label for="image">Image</label>
    <input
      class="input-post"
      type="file"
      name="image"
      accept="image/*"
      ref="image"
      @change="filePictureToUpload"
      id="image"
    />
    <button id="post-button" type="submit">Publier votre post</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      id: localStorage.getItem("id"),
      mode: "create",
      FILE: null,
      name: "",
      pseudo: "",
      message: "",
      imageUrl: "",
      likes: 0,
    };
  },
  methods: {
    createPost() {
      const formData = new FormData();
      if (this.FILE != null) {
        formData.append("image", this.FILE, this.FILE.name);
      }
      formData.append("pseudo", this.pseudo);
      formData.append("message", this.message);
      formData.append("userId", this.userId);
      formData.append("likes", this.likes);
      // formData.append("postId", this.postId);
      axios
        .post("http://localhost:5000/api/post", formData, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          this.$router.push("/home");
          console.log(response.data);
        });
    },
    filePictureToUpload(e) {
      if (e.target.files[0]) {
        this.FILE = e.target.files[0];
      }
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
  #post-button {
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
