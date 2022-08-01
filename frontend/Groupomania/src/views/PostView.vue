<template>
  <NavBar />
  <section id="container">
    <section>
      <div class="switch">
        <div class="title-post">
          <h1 v-if="mode == 'create'">Rédiger votre post</h1>
          <h1 v-if="mode == 'modify'">Modifier votre post</h1>
          <h1 v-if="mode == 'delete'">Supprimer votre postS</h1>
        </div>
        <div class="post-switch" v-if="mode == 'create'">
          Modifier ou supprimer votre post
        </div>
        <button
          class="switch-button"
          v-if="mode == 'create'"
          @click="switchtoModifyPost()"
        >
          Modifier votre post
        </button>
        <button
          class="switch-button"
          v-if="mode == 'create'"
          @click="switchtoDeletePost()"
        >
          Supprimer votre post
        </button>
      </div>
    </section>
    <section>
      <div class="create-post" v-if="mode == 'create'">
        <form action="" class="post-form">
          <label for="pseudo">Pseudo</label>
          <input
            type="text"
            class="input-post"
            v-model="pseudo"
            placeholder="Pseudo"
          />
          <label for="message">Message</label>
          <textarea
            class="input-post"
            cols="30"
            rows="10"
            placeholder="Votre texte"
            v-model="message"
          >
          </textarea>
          <label for="image">Image de profil</label>
          <input
            class="input-post"
            type="file"
            name="image"
            accept="image/*"
            ref="image"
            @change="filePictureToUpload()"
          />
          <button id="post-button" type="submit" @click.prevent="createPost()">
            Publier votre post
          </button>
        </form>
      </div>
      <div class="modify-post" v-if="mode == 'modify'">
        <form action="" class="post-form">
          <label for="pseudo">Pseudo</label>
          <input
            type="text"
            class="input-post"
            v-model="pseudo"
            placeholder="Pseudo"
          />
          <label for="message">Message</label>
          <textarea
            class="input-post"
            cols="30"
            rows="10"
            placeholder="Votre texte"
            v-model="message"
          >
          </textarea>
          <label for="image">Image de profil</label>
          <input
            class="input-post"
            type="file"
            name="image"
            accept="image/*"
            ref="image"
            @change="filePictureToUpload()"
          />
          <button id="profil-button" type="submit" @click.prevent="modifyPost()">
            Modifier voter post
          </button>
        </form>
      </div>
      <div class="delte-profil" v-if="mode == 'delete'">
        <p id="delete-text">
          Attention vous êtes sur le point de supprimer votre profil,vous ne
          pourrez plus accéder au service du Réseau Social de Groupomania.<br>
          Si vous voulez de nouveau nous rejoindre réinscrivez-vous
        </p>
        <button
          class="delete-button"
          type="reset"
          @click.prevent="deletePost()"
        >
          SUPPRIMER
        </button>
      </div>
    </section>
  </section>
</template>

<script>
// import axios from "axios";
import axios from "axios";
import NavBar from "../components/NavBar.vue";
export default {
  name: "postsView",
  components: {
    NavBar,
  },

  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      mode: "create",
      post: {
        pseudo: "",
        message: "",
        imageUrl: "",
        likes: 0,
      },
    };
  },
  methods: {
    switchtoModifyPost() {
      this.mode = "modify";
    },

    switchtoCreatePost() {
      this.mode = "create";
    },

    switchtoDeletePost() {
      this.mode = "delete";
    },

    createPost() {
      let post = {
        message: this.message,
        imageUrl: this.imageUrl,
        likes: this.likes,
      };
      axios
        .post("http://localhost:5000/api/post", post, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          this.$router.push("/home");
          console.log(response.data);
        });
    },

    deletePost() {
      axios
        .delete("http://localhost:5000/api/post/" + this.userId, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    modifyPost() {
      axios
        .put("http://localhost:5000/api/post/" + this.userId, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    filePictureToUpload() {
      this.image = this.$refs.image.files[0];
      console.log(this.image);
      this.imageUrl = this.image.name;
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
}
</style>
