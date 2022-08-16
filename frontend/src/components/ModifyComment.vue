<template>
  <section>
    <div class="create-post" v-if="mode == 'create'">
      <form class="post-form" action="">
        <label for="message">Message</label>
        <textarea
          class="input-post"
          cols="30"
          rows="10"
          placeholder="Votre texte"
          v-model="message"
        >
        </textarea>
        <button id="post-button" type="submit" @click.prevent="createComment()">
          Publier votre commentaire
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "commentView",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      mode: "create",
      message: "",
      likes: 0,
    };
  },
  methods: {
    modifyComment() {
      axios
        .put(
          "http://localhost:5000/api/comment/" + this.userId,
          {
            message: this.message,
            userId: this.userId,
            likes: this.likes,
          },
          {
            headers: {
              Authorization: "bearer " + this.token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.$router.push("/home");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#container {
  @include flcecol;
  @include border(2px, 15px, 0);
  align-items: center;
  .switch {
    @include flcecol;
    align-items: center;
    .switch-button {
      margin: 20px 0 0 0;
      @include border(2px, 15px, 5px 15px 5px 15px);
      font-size: 18px;
      background-color: $primary-color;
      color: $text-color;
      @include box-shadow;
      cursor: pointer;
    }
  }

  .post-form {
    @include flcecol;
    margin: 20px;
    .input-post {
      margin: 15px 0 15px 0;
      @include border(2px, 15px, 0 0 0 15px);
      font-size: 18px;
    }
    #post-button {
      @include border(2px, 15px, 0 0 0 15px);
      background-color: $primary-color;
      color: $text-color;
      font-size: 18px;
      @include box-shadow;
      margin-top: 20px;
      padding: 8px 0 8px 0;
      cursor: pointer;
    }
  }
}</style>
