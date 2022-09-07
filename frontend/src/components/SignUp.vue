<template>
  <article class="global-form">
    <div class="title-form">
      <h1 v-if="mode == 'login'">Connexion</h1>
      <h1 v-else>Inscription</h1>
    </div>
    <br />
    <div class="login-switch" v-if="mode == 'login'">
      Vous n'avez pas encore de compte
      <button class="switch-button" @click="SwitchtoCreateAccount()">
        S'inscrire
      </button>
    </div>
    <div class="login-switch" v-else>
      Vous avez déja un compte
      <button class="switch-button" @click="SwitchToLogin()">
        Se connecter
      </button>
    </div>
    <div id="form-home">
      <div v-if="mode == 'login'" class="form-content">
        <form class="signin-form">
          <label class="label-form" for="email">Email</label>
          <input
            v-model="email"
            id="signin-email"
            type="email"
            placeholder="Email"
            required
          />
          <label class="label-form" for="password">Mot de passe</label>
          <input
            v-model="password"
            id="signin-password"
            type="password"
            placeholder="Mot de passe"
            required
          />
          <span v-if="this.error" class="error-auth">
            {{ this.error.error }}
          </span>
          <button id="button-form" @click.prevent="login()">
            Se connecter
          </button>
        </form>
      </div>
      <div v-else class="form-content">
        <form class="signin-form">
          <label class="label-form" for="email">Email</label>
          <input
            v-model="email"
            id="signin-email"
            type="email"
            placeholder="Email"
            required
          />
          <label class="label-form" for="password">Mot de passe</label>
          <input
            v-model="password"
            id="signin-password"
            type="password"
            placeholder="Mot de passe"
            required
          />
          <span v-if="this.error" class="error-auth">
            {{ this.error.error }}
          </span>
          <button id="button-form" @click.prevent="createAccount()">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  </article>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "signin",
  data() {
    return {
      mode: "login",
      error: "",
      email: "",
      password: "",
      account: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    /*
allows you to connect at an account with a email and a password,
send the items email, token, uersId, isAdmin in a localstorage
return to homepage
*/
    login() {
      const userInfo = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:5000/api/auth/login", userInfo)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("email", this.email);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          this.$router.push({name: 'Home'});
        })
        .catch((err) => {
          console.log(err.response.data);
          this.error = err.response.data;
        });
    },
    /*
allows you to create an account with a email and a password,
send the items email, token, uersId, isAdmin in a localstorage
return to the create profil page
*/
    createAccount() {
      const userInfo = {
        email: this.email,
        password: this.password,
      };

      axios
        .post("http://localhost:5000/api/auth/signup", userInfo)
        .then((response) => {
          localStorage.setItem("email", this.email);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          this.$router.push("/profil");
        })
        .catch((err) => {
          console.log(err.response.data);
          this.error = err.response.data;
        });
    },

    SwitchtoCreateAccount() {
      this.mode = "account";
    },

    SwitchToLogin() {
      this.mode = "login";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
.global-form {
  @include flcecol;
  width: 70vw;
  .title-form {
    @include flce;
    margin: 10px;
    h1 {
      font-size: 35px;
      color: $tertiary-color;
    }
  }
  .login-switch {
    @include flcecol;
    margin: 0 20px 0 20px;
    align-items: center;
    font-size: 20px;
    color: $tertiary-color;
    font-weight: bold;
    text-align: center;
    // width: 80%;
    .switch-button {
      background-color: $primary-color;
      @include border(2px, 15px, 0 0 0 15px);
      margin: 20px;
      padding: 20px;
      color: $text-color;
      @include box-shadow;
      font-size: 18px;
      cursor: pointer;
      width: 40%;
      @media (max-width: 900px) {
          width: 60%;
        }
      @media (max-width: 550px) {
        font-size: 16px;
      }
    }
  }

  #form-home {
    @include flce;
    border: none;
    width: auto;
    .form-content{
      width: 60%;
      @media (max-width: 900px) {
        width: 90%;
      }
      .signin-form {
      @include flcol;
      margin: 20px;
      align-items: center;      
      .label-form {
        font-size: 18px;
        margin: 15px;
        color: $tertiary-color;
        font-weight: bold;
        width: auto;
      }
      #signin-email {
        margin: 10px;
        @include border(2px, 15px, 0 0 0 15px);
        font-size: 20px;
        width: 90%;
      }
      .error-auth {
        color: $text-alert;
        font-size: 18px;
        font-weight: bold;
        margin: 15px;
      }
      #signin-password {
        margin: 10px;
        @include border(2px, 15px, 0 0 0 15px);
        font-size: 18px;
        width: 90%;
      }
      #button-form {
        @include border(2px, 15px, 0 0 0 15px);
        background-color: $primary-color;
        color: $text-color;
        font-size: 18px;
        @include box-shadow;
        margin: 20px;
        cursor: pointer;
        padding: 5px;
        width: 60%;        
        @media (max-width: 550px) {
        font-size: 16px;
      }
      }
    }
    }
    
  }
}
</style>
