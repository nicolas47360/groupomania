<template>
  <NavBarVue />
  <article class="container" v-if="this.postId != null">
    <div id="modify-one" v-for="post in allPosts" :key="post.id">
      <div
        class="container-modify"
        v-if="post.userId == this.userId && post._id == this.postId"
      >
        <div class="container-info">
          <P> {{ post.message }} </P>
          <img
            class="modify-picture"
            v-if="post.imageUrl != null"
            :src="post.imageUrl"
            alt="photo"
          />
        </div>
        <form
          class="post-form"
          v-if="post.userId == this.userId && post._id == this.postId"
        >
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
            :placeholder="post.message"
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
            :placeholder="post.imageUrl"
          />
          <button
            id="modify-button"
            type="submit"
            @click.prevent="modifyPost(post._id)"
          >
            Modifier voter post
          </button>
        </form>
      </div>
    </div>
  </article>
  <article class="container" v-else>
    <div id="modify-all" v-for="post in allPosts.reverse()" :key="post.id">
      <div class="container-modify" v-if="post.userId == this.userId">
        <div class="container-info">
          <P> {{ post.message }} </P>
          <img
            class="modify-picture"
            v-if="post.imageUrl != null"
            :src="post.imageUrl"
            alt="photo"
          />
        </div>
        <form action="" class="post-form" v-if="post.userId == this.userId">
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
            :placeholder="post.message"
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
          <button
            id="modify-button"
            type="submit"
            @click.prevent="modifyPost(post._id)"
          >
            Modifier voter post
          </button>
        </form>
      </div>
    </div>
  </article>
</template>

<script>
import axios from "axios";
import NavBarVue from "./NavBar.vue";
export default {
  name: "modifyPost",
  components: {
    NavBarVue,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      postId: localStorage.getItem("postId"),
      mode: "create",
      FILE: null,
      name: "",
      pseudo: "",
      message: "",
      imageUrl: "",
      likes: 0,
      allPosts: [],
    };
  },
  created() {
    this.getAllPost();
  },
  methods: {
    modifyPost(postId) {
      const formData = new FormData();
      if (this.FILE != null) {
        formData.append("image", this.FILE, this.FILE.name);
      }
      formData.append("pseudo", this.pseudo);
      formData.append("message", this.message);
      formData.append("userId", this.userId);
      formData.append("likes", this.likes);
      axios
        .put("http://localhost:5000/api/post/" + postId, formData, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          if (this.postId != null) {
            localStorage.removeItem("postId");
          }
          console.log(response);
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filePictureToUpload(e) {
      if (e.target.files[0]) {
        this.FILE = e.target.files[0];
      }
    },
    getAllPost() {
      axios
        .get("http://localhost:5000/api/post", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.allPosts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
.container {
  @include flspa;
  flex-wrap: wrap;
  #modify-one {
    @include flcecol;
    width: 60%;
    .container-modify {
      @include border(2px, 15px, 0);
      margin: 15px;
      width: 80%;
      .container-info {
        @include flcecol;
        align-items: center;
        @include border(2px, 15px, 0);
        margin: 15px;
        .modify-picture {
          width: 80%;
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
        #modify-button {
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
  }
  #modify-all {
    @include flspa;
    width: 40%;
    flex-wrap: wrap;
    .container-modify {
      @include border(2px, 15px, 0);
      margin: 15px;
      width: 80%;
      .container-info {
        @include flcecol;
        align-items: center;
        @include border(2px, 15px, 0);
        margin: 15px;
        .modify-picture {
          width: 80%;
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
        #modify-button {
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
  }
}
</style>
