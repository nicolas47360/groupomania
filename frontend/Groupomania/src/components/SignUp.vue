<template>
  <div id="form-home">
    <form class="signin-form">
      <label for="email">Email</label>
      <input
        v-model="email"
        id="signin-email"
        type="email"
        placeholder="Email"
        required
      />
      <label for="password">Mot de passe</label>
      <input
        v-model="password"
        id="signin-password"
        type="password"
        placeholder="Mot de passe"
        required
      />
      <button id="button-form" @click="login()">Se connecter</button>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
    name: "signin",
    data(){
        return {            
            email: "",
            password: "",
        }
    },
    methods: {
    login(){      
      console.log(this.email);
      console.log(this.password);
      const userInfo = {
        email: this.email,
        password: this.password,
      }
       
            axios.post('http://localhost:5000/api/auth/login', this.userInfo)
            .then(response =>{
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("isAdmin", response.data.isAdmin)
                this.$router.push("/home");
                })
            .catch((err) => console.log(err));            
        
    }
    },
}
</script>

<style>
#form-home{
  border: 2px solid;
  display: flex;
  justify-content: center;
  width: 500px;  
}
.signin-form{
  display: flex;
  flex-direction: column;
  margin: 20px;
}
#signin-email{
  margin: 10px;
  border-radius: 15px;
  padding-left: 15px;
}
#signin-password{
  margin:10px;
  border-radius: 15px;
  padding-left: 15px;
}

#button-form{
  border-radius: 15px;
  margin-top: 10px;
}
</style>