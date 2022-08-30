<template>
  <div id="delete-profil">
    <p id="delete-text">
      Attention vous êtes sur le point de supprimer votre compte, vous ne
      pourrez plus accéder au réseau social Groupomania
    </p>
    <button id="delete-button" type="reset" @click.prevent="deleteAccount()">
      SUPPRIMER
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      email: localStorage.getItem("email"),
    };
  },
  methods: {
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
allows you delete the account and the profil user in a same time
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
#delete-profil {
  @include flcecol;
  align-items: center;
  #delete-text {
    color: $text-alert;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
  }
  #delete-button {
    @include border(2px, 15px, 0 0 0 15px);
    background-color: $primary-color;
    color: $text-color;
    font-size: 18px;
    @include box-shadow;
    margin: 20px 0 20px 0;
    padding: 8px 0 8px 0;
    cursor: pointer;
    width: 150px;
  }
}
</style>
