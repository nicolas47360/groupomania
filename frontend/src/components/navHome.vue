<template>
  <div id="nav-home" v-if="this.isAdmin != 'true'">
    <ul id="nav-list">
      <li class="nav-component">
        <router-link :to="{ name: 'Profil' }">Gérer votre profil</router-link>
      </li>
      <li class="nav-component" v-if="this.userId != null">
        <router-link :to="{ name: 'deletePost' }">Gérer vos posts</router-link>
      </li>
      <li class="nav-component" v-if="this.userId != null">
        <router-link :to="{ name: 'comment' }">
          Gérer vos commentaires
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
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
    @media (max-width: 700px) {
      @include flcecol;
      padding: 0;
      width: 50%;
      @media (max-width: 400px) {
        width: 70%;
      }
    }
    .nav-component {
      margin: 30px 40px 30px 40px;
      font-size: 15px;
      text-align: center; 
      @include border(2px, 15px, 15px);
      color: $tertiary-color;
      @media (max-width: 800px) {
        margin: 30px 20px 30px 20px;
      }
      @media (max-width: 700px) {
        @include flcecol;
        margin: 15px 5px 15px 5px;
      }
      a {
        text-decoration: none;
        color: $primary-color;
      }
    }
  }
}
</style>
