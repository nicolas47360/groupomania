<template>
  <NavBar />
  <section id="container">
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
        @click="switchtoModifyProfil()"
      >
        Modifier votre profil
      </button>
      <button 
        class="switch-button"
        v-if="mode == 'create'"
        @click="switchtoDeleteProfil()"
      >
        Supprimer votre profil
      </button>
    </div>
    <section id="profil">
      <div class="create-profil" v-if="mode == 'create'">
        <form action="" class="profil-form">
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
            v-model="lastname"
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
            @change="filePictureToUpload()"
          />
          <button
            id="profil-button"
            type="submit"
            @click.prevent="createProfil()"
          >
            Créer votre profil
          </button>
        </form>
      </div>
      <div class="modify-profil" v-if="mode == 'modify'">
        <form action="" class="profil-form">
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
          <input class="input-profil" type="file" name="image" id="" />
          <button
            id="profil-button"
            type="submit"
            @click.prevent="modifyProfil()"
          >
            Modifier votre profil
          </button>
        </form>
      </div>
      <div class="delte-profil" v-if="mode == 'delete'">
        <p id="delete-text">
          Attention vous êtes sur le point de supprimer votre profil,vous ne
          pourrez plus accéder au service du Réseau Social de Groupomania.<br>
          Si vous voulez de nouveau nous rejoindre réinscrivez-vous
        </p>
        <button
          class="delete-button"
          type="reset"
          @click.prevent="deleteProfil()"
        >
          SUPPRIMER
        </button>
      </div>
    </section>
  </section>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import NavBar from "../components/NavBar.vue";
export default {
  name: "profil",
  components:{
    NavBar,
  },
  data() {
    return {
      mode: "create",      
      pseudo: "",
      firstname: "",
      lastname: "",
      image:"",      
      imageUrl: "",
    };
}, 

  methods: {
    createProfil() {
        const userProfil = {
            pseudo: this.pseudo,
            firstname: this.firstname,
            lastname: this.lastname,
            imageUrl: this.imageUrl,
        }
        // let token = this.token;
        // let userId = this.userId;
        
        let token = localStorage.getItem("token")

        axios
          .post("http://localhost:5000/api/user", userProfil ,
          {
            headers: {
              Authorization: "bearer " + token
            }
            
          })
          .then((response) => {
              console.log(response.imageUrl);
              this.$router.push("/home");
            })
          .catch((err) => console.log(err)) 
    },

    deleteProfil() {
      let id = localStorage.getItem("userId")
      let token = localStorage.getItem("token")
      console.log(id);
      axios
      .delete("http://localhost:5000/api/user/" + id,{
         headers: {
              Authorization: "bearer " + token
            }
      })
      .then((response) => {
        console.log(response);
        this.$router.push("/")
      })
      .catch((error) => {
        console.log(error)
      })
    },

    modifyProfil () {
      let token = this.token;
      let userId = this.userId;
      axios
      .put("http://localhost:5000/api/user/" + userId,{
         headers: {
              Authorization: "bearer " + token
            }
      })
      .then((response) => {
        console.log(response);
        this.$router.push("/home")
      })

    },

    getUserProfil() {
       let token = this.token;
      let userId = this.userId;
      axios
      .get("http://localhost:5000/api/user/" + userId,{
         headers: {
              Authorization: "bearer " + token
            }
      })
      .then((response) => {
        let users = respone.data.user;

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    switchtoModifyProfil(){
      this.mode = "modify"
    },

    switchtoCreateProfil(){
      this.mode = "create"
    },

    switchtoDeleteProfil(){
      this.mode = "delete"
    },
    filePictureToUpload() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },   
  },
}


</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";

 #container { 
  @include flcecol;
  @include border(2px, 15px, 0);
  align-items: center;
  .switch{
    @include flcecol;
    .switch-button{
    margin: 20px 0 0 0;
    @include border(2px, 15px, 5px 15px 5px 15px);
    font-size: 18px;
    background-color: $primary-color;
    color: $text-color;
    @include box-shadow;
    cursor: pointer; 
  }
  }
  
  .profil-form{
    @include flcecol;
    margin: 20px;
    .input-profil{
      margin: 15px 0 15px 0;
      @include border(2px, 15px, 0 0 0 15px);
      font-size: 18px;
    }
    #profil-button{
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

  }

</style>