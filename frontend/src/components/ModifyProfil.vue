<template>
  <form @submit.prevent="modifyProfil" class="profil-form">
    <label for="pseudo">Pseudo</label>
    <input
      class="input-profil"
      v-model="pseudo"
      type="text"
      placeholder="Pseudo"
    />
    <label for="firstname">Nom</label>
    <input
      class="input-profil"
      v-model="firstname"
      type="text"
      placeholder="Nom de Famille"
      required
    />
    <label for="lastname">Prénom</label>
    <input
      class="input-profil"
      v-model="data"
      type="text"
      placeholder="Prénom"
      required
    />
    <label for="image">Image de profil</label>
    <input
      class="input-profil"
      type="file"
      name="image"
      accept="image/*"
      ref="image"
      @change="filePictureToUpload"
      id="image"
    />
    <button id="profil-button" type="submit">Modifier votre profil</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      mode: "create",
      FILE: null,
      name: "",
      pseudo: "",
      firstname: "",
      lastname: "",
      imageUrl: "",
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
    };
  },
  methods: {
    modifyProfil() {
      const formData = new FormData();
      if (this.FILE != null) {
        formData.append("image", this.FILE, this.FILE.name);
      }
      formData.append("pseudo", this.pseudo);
      formData.append("firstname", this.firstname);
      formData.append("lastname", this.lastname);
      formData.append("userId", this.userId);
      axios
        .put("http://localhost:5000/api/user/" + this.userId, formData, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
          alert(response.data.message);
          this.$router.push("/home");
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
.profil-form {
  @include flcecol;
  margin: 20px;
  align-items: center;
  label {
    color: $primary-color;
    font-size: 18px;
  }
  .input-profil {
    margin: 15px 0 15px 0;
    @include border(2px, 15px, 0 0 0 15px);
    font-size: 20px;
    width: 100%;
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
    width: 60%;
  }
}
</style>
