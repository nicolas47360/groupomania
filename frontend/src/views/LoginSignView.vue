<template>
  <section id="home-all">
    <div id="logo-groupo">
      <img src="../assets/icon.png" alt="logo groupomania" />
    </div>
    <div class="home">
      <SignUp />
    </div>
  </section>
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

<style lang="scss">
@import "../styles/utils/_mixin";
#home-all {
  @include flcecol;
  align-items: center;
  flex-wrap: wrap;
  #logo-groupo {
    @include flce;
    margin-bottom: 25px;
    img {
      object-fit: cover;
      display: flex;
      max-width: 70%;
    }
  }
  .home {
    @include flce;
    @include border(2px, 15px, 0 0 0 0);
    max-width: 70vh;
  }
}
</style>
