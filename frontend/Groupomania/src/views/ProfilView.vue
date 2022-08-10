<template>
  <NavBar />
  <section id="container">
    <div class="switch">
      <div class="title-profil">
        <h1 v-if="mode == 'create' && this.user != this.userId">
          Créer votre profil
        </h1>
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
      <div
        class="create-profil"
        v-if="mode == 'create' && this.user != this.userId"
      >
        <CreateProfil />
      </div>
      <div class="modify-profil" v-if="mode == 'modify'">
        <ModifyProfil />
      </div>
      <div class="delte-profil" v-if="mode == 'delete'">
        <DeleteProfil />
      </div>
    </section>
  </section>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import CreateProfil from "../components/CreateProfil.vue";
import ModifyProfil from "../components/ModifyProfil.vue";
import DeleteProfil from "../components/DeleteProfil.vue";
export default {
  name: "profil",
  components:{
    NavBar,
    CreateProfil,
    ModifyProfil,
    DeleteProfil,
  },
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
      user: "",
      nickname : "",      
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
    switchtoModifyProfil(){
      this.mode = "modify"
    },

    switchtoCreateProfil(){
      this.mode = "create"
    },

    switchtoDeleteProfil(){
      this.mode = "delete"
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
  margin: 35px 0 35px 0;
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