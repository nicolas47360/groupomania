<template>
  <span v-if="this.message" class="message-back">
    {{ this.message }}
  </span>
  <section id="container-create">
    <form @submit.prevent="createProfil" class="profil-form">
      <label for="firstname">Nom</label>
      <input
        class="input-profil"
        v-model="firstname"
        type="text"
        placeholder="Nom de Famille"
        required
        id="firstname"
      />
      <label for="lastname">Prénom</label>
      <input
        class="input-profil"
        v-model="lastname"
        type="text"
        placeholder="Prénom"
        required
        id="lastname"
      />
      <label for="image">Image de profil</label>
      <input
        class="input-profil"
        type="file"
        name="image"
        accept="image/*"
        ref="image"
        id="image"
        @change="filePictureToUpload"
      />
      <button id="profil-button" type="submit">Créer votre profil</button>
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
      allUsers: [],
      mode: "create",
      error: "",
      FILE: null,
      name: "",
      firstname: "",
      lastname: "",
      imageUrl: "",
      message: "",
    };
  },
  methods: {
    /*
allows you to create users in the DB and return in to homepage
*/
    createProfil() {
      const formData = new FormData();
      if (this.FILE != null) {
        formData.append("image", this.FILE, this.FILE.name);
      }
      formData.append("firstname", this.firstname);
      formData.append("lastname", this.lastname);
      formData.append("userId", this.userId);

      axios
        .post("http://localhost:5000/api/user", formData, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          this.message = response.data.message;
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response.data);
          this.error = err.response.data;
        });
    },
    /*
allows you to upload picture
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
@import "../styles/utils/_keyframes";
.message-back {
  font-size: 25px;
  color: $text-alert;
  position: absolute;
  top: 25%;
  bottom: 25%;
  left: 25%;
  right: 0;
  background-color: black;
  text-align: center;
  @include flcecol;
  width: 50%;
  animation: message 1s ease-in-out;
}
#container {
  .profil-form {
    @include flcecol;
    margin: 20px;
    #error-message {
      color: $text-alert;
      padding: 10px 0 10px 0;
      font-size: 18px;
      font-weight: bold;
    }
    .input-profil {
      margin: 15px 0 15px 0;
      @include border(2px, 15px, 0 0 0 15px);
      font-size: 20px;
      width: 90%;
    }
    #profil-button {
      @include border(2px, 15px, 0 0 0 15px);
      background-color: $primary-color;
      color: $text-color;
      font-size: 18px;
      @include box-shadow;
      margin: 20px 0 20px 0;
      padding: 8px 0 8px 0;
      cursor: pointer;
    }
  }
}
</style>
