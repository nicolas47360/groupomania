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
  data() {
    return {
      userId: localStorage.getItem("userId"),
    };
  },
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
    width: 70%;
    img {
      object-fit: cover;
      display: flex;
      width: 70%;
    }
  }
  .home {
    @include flce;
    @include border(2px, 15px, 0 0 0 0);
    width: 50%;
    @media (max-width: 900px) {
      width: 80%;
    }
  }
}
</style>
