<template>
  <div class="navbar">
    <img src="../assets/icon.png" alt="logo groupomania" id="logo" />
    <div id="router">
      <router-link :to="{ name: 'Home' }" @click="removePostId()">
        <div class="back-login">
          <span class="nav-text">HOME</span>
          <fa icon="rotate-left" class="bracket"/>
        </div>
      </router-link>
      <router-link :to="{ name: 'Registration' }" @click="clearStorage()">
        <div class="back-login">
          <span class="nav-text">Se Déconnecter</span>
          <fa icon="right-to-bracket" class="bracket" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clearStorage() {
      localStorage.clear();
    },
    removePostId() {
      localStorage.removeItem("postId");
      localStorage.removeItem("commentId");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
.navbar {
  @include flspb;
  align-items: center;
  @media (max-width: 600px) {
    @include flcecol;
    align-items: center;
  }
  #logo {
    max-width: 35%;
    object-fit: cover;
    @media (max-width: 600px) {
      max-width: 60%;
    }
  }
  a {
    text-decoration: none;
    color: $primary-color;
  }
  #router {
    @include flspa;
    align-items: center;
    margin-right: 20px;
    flex-wrap: wrap;
    @media (max-width: 600px) {
      margin: 15px 0 15px 0;
      @include flcecol;
    }
    .back-login {
      @include flsparo;
      align-items: center;
      margin: 15px;
      @include border(2px, 15px, 10px);
      border-color: $tertiary-color;
      @media (max-width: 600px) {
        margin: 15px 0 15px 0;
        height: 10px;
      }
      .bracket {
        font-size: 20px;
        cursor: pointer;
      }
      .nav-text {
        cursor: pointer;
        margin-right: 20px;
      }
    }
  }
}
</style>
