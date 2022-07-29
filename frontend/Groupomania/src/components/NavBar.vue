<template>
  <div class="navbar">
    <img src="../assets/icon.png" alt="logo groupomania" id="logo" />
    <router-link to="/">
      <div id="back-login">
        <p id="nav-text">Se Déconnecter</p>
        <fa icon="right-to-bracket" id="bracket" />
      </div>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
.navbar {
  @include flspb;
  align-items: center;
  #logo {
    max-width: 450px;
  }
  a {
    text-decoration: none;
    color: $primary-color;
  }
  #back-login {
    @include flsparo;
    align-items: center;
    margin: 20px;
    #bracket {
      font-size: 35px;
      cursor: pointer;
    }
    #nav-text {
      cursor: pointer;
      margin-right: 20px;
    }
  }
}
</style>
