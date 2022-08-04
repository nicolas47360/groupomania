<template>
  <NavBar />
  <section id="container">
    <div class="switch">
      <div class="title-profil" v-if="this.user == this.userId">
        <!-- <h1 v-if="mode == 'create'">Créer votre profil</h1> -->
        <h1 v-if="mode == 'modify'">Modifier votre profil</h1>
        <h1 v-if="mode == 'delete'">Supprimer votre profil</h1>
      </div>
       <div class="title-profil" v-else>
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
            @change="filePictureToUpload"
            id="image"
          />
          <button id="profil-button" type="submit">Créer votre profil</button>
        </form>
      </div>
      <div class="modify-profil" v-if="mode == 'modify'">
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
          <button id="profil-button" type="submit">
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
      FILE: null,
      name:"",      
      pseudo: "",
      firstname: "",
      lastname: "",            
      imageUrl: "",
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
    };
}, 
  mounted() {          
      axios
      .get("http://localhost:5000/api/user/" + this.userId,{
         headers: {
              Authorization: "bearer " + this.token
            }
      })
      .then((response) => {
        console.log(response.data);
        this.nickname = response.data.pseudo;
        this.user = response.data.userId;
        this.prenom = response.data.lastname;
        this.nom = response.data.firstname;
        console.log(this.user)
      })
      .catch((error) => {
        console.log(error);
      })
    },
  
  methods: {
    createProfil() {
      const formData = new FormData();
      formData.append("image", this.FILE, this.FILE.name);
      formData.append('pseudo', this.pseudo);
      formData.append('firstname', this.firstname);
      formData.append('lastname', this.lastname);
      formData.append('userId', this.userId)

        axios
          .post("http://localhost:5000/api/user", formData ,
          {
            headers: {
              Authorization: "bearer " + this.token
            }
            
          })
          .then((response) => {
              console.log(response.data);
              this.$router.push("/home");
            })
          .catch((err) => console.log(err)) 
    },

    deleteProfil() {     
      axios
      .delete("http://localhost:5000/api/user/" + this.userId,{
         headers: {
              Authorization: "bearer " + this.token
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
      const formData = new FormData();
      formData.append("image", this.FILE, this.FILE.name);
      formData.append('pseudo', this.pseudo);
      formData.append('firstname', this.firstname);
      formData.append('lastname', this.lastname);
      formData.append('userId', this.userId)     
      axios
      .put("http://localhost:5000/api/user/" + this.userId, formData, {
         headers: {
              Authorization: "bearer " + this.token
            }
      })
      .then((response) => {
        console.log(response);
        this.$router.push("/home")
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
    filePictureToUpload(e) {
      this.FILE = e.target.files[0];      
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
  margin: 35px;
  flex-wrap: wrap;
  .switch{
    @include flcecol;
    align-items: center;
    .title-profil{
      color: $tertiary-color;
      font-size: 19px;
    }
    .profil-switch{
      color: $tertiary-color;
      font-weight: bold;
      font-size: 18px;
      margin: 10px;
    }
    .switch-button{
    margin: 20px 0 10px 0;
    @include border(2px, 15px, 5px 15px 5px 15px);
    font-size: 20px;
    background-color: $primary-color;
    color: $text-color;
    @include box-shadow;
    cursor: pointer; 
  }
  }
  
  .profil-form{
    @include flcecol;
    margin: 20px;
    flex-wrap: wrap;
    .input-profil{
      margin: 15px 0 15px 0;
      @include border(2px, 15px, 0 0 0 15px);
      font-size: 20px;
      max-width: 80%;
    }
    #profil-button{
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