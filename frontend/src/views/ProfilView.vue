<template>
  <NavBar />
  <section id="global">
    <span v-if="this.message" class="message-back">
      {{ this.message }}
    </span>
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
            <div id="user-info" v-if="userprofil.userId === this.userId">
              <span id="name">Nom: {{ userprofil.firstname }}</span>
              <span id="prenom">Prénom: {{ userprofil.lastname }}</span>
              <img
                :src="userprofil.imageUrl"
                alt="photo de profil"
                v-if="userprofil.imageUrl != null"
              />
              <img src="/image/profil.png" alt="avatar" v-else />
            </div>
            <div id="container-form" v-if="userprofil.userId === this.userId">
              <form @submit.prevent="modifyProfil" class="profil-form">
                <label for="firstname">Nom</label>
                <input
                  class="input-profil"
                  v-model="firstname"
                  type="text"
                  :placeholder="userprofil.firstname"
                  required
                />
                <label for="lastname">Prénom</label>
                <input
                  class="input-profil"
                  v-model="lastname"
                  type="text"
                  :placeholder="userprofil.lastname"
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
      userprofil: "",
      user: "",
      mode: "create",
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),      
      lastname: "",
      firstname: "",
      message: "",
    };
  },
  created() {
    this.getUser();    
  },

  methods: {
    switchtoCreateProfil() {
      this.mode = "create";
    },
    /*
    allows you to get a user and return the data of the user
*/
    getUser() {
      axios
        .get("http://localhost:5000/api/user/" + this.userId, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {          
          this.userprofil = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*
allows you to update a profil by the userId
return to the homepage
*/ 
    modifyProfil() {
      const formData = new FormData();
      if (this.FILE != null) {
        formData.append("image", this.FILE, this.FILE.name);
      }      
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
          this.message = response.data.message;
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 1000);
        });
    },
    /*
allows you to upload a picture
*/
    filePictureToUpload(e) {
      if (e.target.files[0]) {
        this.FILE = e.target.files[0];
      }
    },
  
      /*
allows you to delete profil by the userId
*/  
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
    /*
allows you delete the account, the profile user, the posts and comment at a user
clear the localstorage and return to the account page
*/
    deleteAccount() {
      axios
        .delete("http://localhost:5000/api/auth/delete/" + this.email, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {         
          this.deleteProfil();
          this.deletePosts();          
          localStorage.clear();
          this.message = response.data.message;
          setTimeout(() => {
            this.$router.push({ name: "Registration" });
          }, 1000);
          
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
    /*
    allows you to delete all the post and the associate comments at a user 
    */
    deletePosts() {
      axios
        .delete("http://localhost:5000/api/post/all/" + this.userId, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then(() => {          
          this.deleteComments();                    
        })
        .catch((error) => {
          console.log(error);
        });
    },
     /*
    allows you to delete all comments at a user 
    */
    deleteComments() {
      axios
        .delete("http://localhost:5000/api/comment/userId/" + this.userId, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
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
#global {
  @include flcecol;
  align-items: center;
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
      #user-info {
        @include flcecol;
        align-items: center;
        width: 40%;
        margin: 0 15px 0 15px;
        @media (max-width: 750px) {
          width: auto;
      } 
        #name {
          font-size: 18px;
          color: $tertiary-color;
          margin: 0 20px 65px 20px;
          @media (max-width: 750px) {
          margin: 10px 0 10px 0;
      } 
        }     
        #prenom {
          font-size: 18px;
          color: $tertiary-color;
          margin: 0 20px 45px 20px;
          @media (max-width: 750px) {
          margin: 10px 0 10px 0;
        }           
      }
      
        img {
          width: 55%;
          margin-top: 50px;
          @media (max-width: 750px) {
          margin-top: 5px;
          width: 35%;
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
