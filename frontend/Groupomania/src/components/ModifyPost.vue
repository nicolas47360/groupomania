<template>
  <div>
    <form action="" class="post-form">
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
      <label for="image">Image de profil</label>
      <input
        class="input-post"
        type="file"
        name="image"
        accept="image/*"
        ref="image"
        @change="filePictureToUpload()"
      />
      <button id="modify-button" type="submit" @click.prevent="modifyPost()">
        Modifier voter post
      </button>
    </form>
  </div>
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
    modifyPost() {
      const formData = new FormData();
      if (this.FILE != null) {
        formData.append("image", this.FILE, this.FILE.name);
      }
      formData.append("pseudo", this.pseudo);
      formData.append("message", this.message);
      formData.append("userId", this.userId);
      formData.append("likes", this.likes);
      axios
        .put("http://localhost:5000/api/post/" + this.userId, {
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
  #modify-button {
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
