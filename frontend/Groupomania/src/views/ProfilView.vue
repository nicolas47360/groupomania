<template>
  <NavBar />
  <section id="profil-template">
    <div class="profil">
      <div class="title-profil">
        <h1 v-if="mode == 'create'">Créer votre profil</h1>
        <h1 v-if="mode == 'modify'">Modifier votre profil</h1>
        <h1 v-else>Supprimer votre profil</h1>
      </div>
      <div class="profil-switch" v-if="mode == 'login'">
        Modifier ou supprimer votre profil
      </div>
      <button class="profil-button-switch">Modifier votre profil</button>
      <button class="profil-button-switch">Supprimer votre profil</button>
    </div>
    <section>
      <div class="create-profile">
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
            @click.prevent="createProfil()"
          >
            Créer votre profil
          </button>
        </form>
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
      id : localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      pseudo: "",
      firstname: "",
      lastname: "",
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
        const token = this.token;
        const userId = this.userId;

        axios
          .post("http://localhost:5000/api/", userProfil ,
          {
            headers: {
              Authorization: "bearer " + token
            }
            
          })
          .then((response) => {
              console.log(response);
              this.$router.push("/home");
            })
          .catch((err) => console.log(err)) 
    }
  },
}


</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";

 #profil-template { 
  @include flcecol;
   @include border(2px, 15px, 0);
  align-items: center;
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
        cursor: pointer;    
    }    
  }

  }

</style>