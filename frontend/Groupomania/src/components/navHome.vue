<template>
  <div id="nav-home">
    <ul id="nav-list">
      <li class="nav-component">
        <router-link to="/profil">Profil</router-link>
      </li>
      <li class="nav-component">
        <router-link to="/post">Post</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#nav-home {
  @include flspa;
  #nav-list {
    @include flsparo;
    list-style-type: none;
    .nav-component {
      margin: 30px 80px 30px 80px;
      font-size: 20px;
      a {
        text-decoration: none;
        color: $primary-color;
      }
    }
  }
}
</style>
