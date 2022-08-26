<template>
  <NavBar />
  <section id="global">
    <h1 v-if="mode == 'create' && this.userprofil == null">
      Créer votre profil
    </h1>
    <h1 v-if="this.userprofil != null">Modifier ou supprimer votre profil</h1>
    <section id="container">
      <section id="profil">
        <div
          class="create-profil"
          v-if="mode == 'create' && this.userprofil == null"
        >
          <CreateProfil />
        </div>
        <div class="modify-profil" v-if="this.userprofil != null">
          <section id="modify-container">
            <div id="container-user" v-for="user in allUsers" :key="user._id">
              <div id="user-info" v-if="user.userId === this.userId">
                <span>Pseudo: {{ user.pseudo }}</span>
                <span>Nom: {{ user.firstname }}</span>
                <span>Prénom: {{ user.lastname }}</span>
                <img :src="user.imageUrl" alt="photo de profil" />
              </div>
              <div id="container-form" v-if="user.userId === this.userId">
                <form @submit.prevent="modifyProfil" class="profil-form">
                  <label for="pseudo">Pseudo</label>
                  <input
                    class="input-profil"
                    v-model="pseudo"
                    type="text"
                    :placeholder="user.pseudo"
                    required
                  />
                  <label for="firstname">Nom</label>
                  <input
                    class="input-profil"
                    v-model="firstname"
                    type="text"
                    :placeholder="user.firstname"
                    required
                  />
                  <label for="lastname">Prénom</label>
                  <input
                    class="input-profil"
                    v-model="lastname"
                    type="text"
                    :placeholder="user.lastname"
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
                  <button id="profil-button" type="submit">MODIFIER</button>
                  <button
                    id="profil-button"
                    type="submit"
                    @click.prevent="deleteAccount()"
                  >
                    SUPPRIMER
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import CreateProfil from "../components/CreateProfil.vue";
export default {
  name: "profil",
  components: {
    NavBar,
    CreateProfil,
  },
  data() {
    return {
      allUsers: [],
      userprofil: "",
      user: "",
      mode: "create",
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),
      pseudo: "",
      lastname: "",
      firstname: "",
    };
  },
  created() {
    this.getUser();
    this.getUsers();
  },

  methods: {
    switchtoCreateProfil() {
      this.mode = "create";
    },

    getUser() {
      axios
        .get("http://localhost:5000/api/user/" + this.userId, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.userprofil = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
    deleteProfil() {
      axios
        .delete("http://localhost:5000/api/user/" + this.userId, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
    deleteAccount() {
      axios
        .delete("http://localhost:5000/api/auth/delete/" + this.email, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
          alert(response.data.message);
          this.deleteProfil();
          localStorage.clear();
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#global {
  @include flcecol;
  align-items: center;
  h1 {
    color: $primary-color;
    text-align: center;
  }
  #container {
    @include border(2px, 15px, 0);
    margin: 35px 0 35px 0;
    @media (max-width: 750px) {
      width: 80vw;
      @include flcecol;
    }

    #profil {
      @include flcecol;
    }
    #modify-container {
      @include flspa;
      @media (max-width: 750px) {
        @include flcecol;
      }
      #container-user {
        @include flspa;
        @media (max-width: 750px) {
          @include flcecol;
        }
        #user-info {
          @include flcecol;
          align-items: center;
          span {
            font-size: 18px;
            color: $tertiary-color;
            margin: 20px 0 20px 0;
          }
          img {
            width: 55%;
            margin-top: 50px;
          }
        }
      }
      #container-form {
        width: 80%;
        @media (max-width: 750px) {
          width: auto;
        }
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
      }
    }
  }
}
</style>
