<template>
  <section id="container-create">
    <form @submit.prevent="createProfil" class="profil-form">
      <label for="pseudo">Pseudo</label>
      <input
        class="input-profil"
        v-model="pseudo"
        type="text"
        placeholder="Pseudo"
        id="pseudo"
      />
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
      id: localStorage.getItem("id"),
      mode: "create",
      FILE: null,
      name: "",
      pseudo: "",
      message: "",
      imageUrl: "",
      likes: 0,
      // postId: "",
    };
  },
  methods: {
    createProfil() {
      const formData = new FormData();
      if (this.FILE != null) {
        formData.append("image", this.FILE, this.FILE.name);
      }
      formData.append('pseudo', this.pseudo);
      formData.append('firstname', this.firstname);
      formData.append('lastname', this.lastname);
      formData.append('userId', this.userId)

      axios
        .post("http://localhost:5000/api/user", formData, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$router.push("/home");
        })
        .catch((err) => console.log(err));
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
#container {
  .profil-form {
    @include flcecol;
    margin: 20px;
    flex-wrap: wrap;
    .input-profil {
      margin: 15px 0 15px 0;
      @include border(2px, 15px, 0 0 0 15px);
      font-size: 20px;
      max-width: 80%;
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
