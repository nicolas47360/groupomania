<template>
  <div id="nav-home">
    <ul id="nav-list">
      <li class="nav-component">
        <router-link to="/profil">Gérer votre profil</router-link>
      </li>
      <li class="nav-component" v-if="this.userId != null">
        <router-link to="/post">Gérer vos posts</router-link>
      </li>
      <li class="nav-component" v-if="this.userId != null">
        <router-link to="/comment">Gérer vos commentaires</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: localStorage.getItem("userId"),
    };
  },
};
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
      @include border(2px, 15px, 15px);
      background-color: $secondary-color;
      color: $tertiary-color;
      @include box-shadow;
      a {
        text-decoration: none;
        color: $primary-color;
      }
    }
  }
}
</style>
