<template>
  <div class="home">
    <p>salut le monde</p>
    <SignUp />
  </div>
</template>

<script>
import SignUp from "../components/SignUp.vue";

export default {
  name: "LoginSign",
  components: {
    SignUp,
  },
};
</script>

<style>
.home{
  display: flex;
  justify-content: center;  
}
</style>
