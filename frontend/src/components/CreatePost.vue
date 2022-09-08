<template>
  <span v-if="this.messagedata" class="message-back">
    {{ this.messagedata }}
  </span>
  <section id="create-container">
    <form @submit.prevent="createPost" class="create-form">
      <label for="title">Titre</label>
      <input
        type="text"
        class="input-post"
        v-model="title"
        placeholder="Titre du post"
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
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      postId: localStorage.getItem("postId"),
      mode: "create",
      FILE: null,
      name: "",
      title: "",
      message: "",
      imageUrl: "",
      likes: 0,
      messagedata: "",
    };
  },
  methods: {
    /*
allows you to create post in the DB and return in to homepage
*/
    createPost() {
      const formData = new FormData();
      if (this.FILE != null) {
        formData.append("image", this.FILE, this.FILE.name);
      }
      formData.append("title", this.title);
      formData.append("message", this.message);
      formData.append("userId", this.userId);
      formData.append("likes", this.likes);
      axios
        .post("http://localhost:5000/api/post", formData, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          this.messagedata = response.data.message;
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 1000);
        });
    },
    /*
allows you to upload the picture
*/
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
.message-back {
  font-size: 25px;
  color: $text-alert;
  margin: 45px 0 45px 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  text-align: center;
  @include flcecol;
}
#create-container {
  @include flce;
  .create-form {
    @include flcecol;
    align-items: center;
    margin: 20px 0 20px 0;
    label {
      color: $primary-color;
    }
    .input-post {
      display: flex;
      flex-wrap: wrap;
      margin: 15px 0 15px 0;
      @include border(2px, 15px, 6px);
      font-size: 18px;
      width: 70vw;
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
      width: 200px;
    }
  }
}
</style>
