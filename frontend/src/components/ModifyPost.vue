<template>
  <NavBarVue />
  <section id="modify">
    <span v-if="this.messagedata" class="message-back">
      {{ this.messagedata }}
    </span>
    <h1 class="delete-text">Modifier votre Post</h1>
    <article class="container">
      <div id="modify-one" v-for="post in allPosts" :key="post.id">
        <div
          class="container-modify"
          v-if="
            (post.userId == this.userId && post._id == this.postId) ||
            (post._id == this.postId && this.isAdmin === 'true')
          "
        >
          <div class="container-info">
            <span id="title"> {{ post.title }}</span>
            <span id="text"> {{ post.message }} </span>
            <img
              class="modify-picture"
              v-if="post.imageUrl != null"
              :src="post.imageUrl"
              alt="photo"
            />
          </div>
          <form
            class="post-form"
            v-if="
              (post.userId == this.userId && post._id == this.postId) ||
              (post._id == this.postId && this.isAdmin === 'true')
            "
          >
            <label for="title">Titre</label>
            <input
              type="text"
              class="input-post"
              v-model="title"
              :placeholder="post.title"
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
            <label for="image">Image du Post</label>
            <input
              class="input-post"
              type="file"
              name="image"
              accept="image/*"
              ref="image"
              @change="filePictureToUpload"
              id="image"
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
  </section>
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
      isAdmin: localStorage.getItem("isAdmin"),
      mode: "create",
      FILE: null,
      name: "",
      title: "",
      message: "",
      imageUrl: "",
      likes: 0,
      allPosts: [],
      messagedata: "",
    };
  },
  created() {
    this.getAllPost();
  },
  methods: {
    /*
allows you to update the post by the post _id
delete item postId if his exist in the localstorage and return in to the homepage
*/
    modifyPost(postId) {
      const formData = new FormData();
      if (this.FILE != null) {
        formData.append("image", this.FILE, this.FILE.name);
      }
      formData.append("title", this.title);
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
          console.log(response.data);
          if (this.postId != null) {
            localStorage.removeItem("postId");
          }
          this.messagedata = response.data.message;
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*
allows you to upload the picture
*/
    filePictureToUpload(e) {
      if (e.target.files[0]) {
        this.FILE = e.target.files[0];
      }
    },
    /*
allows you to get all posts in DB and return a reverse array allPosts
*/
    getAllPost() {
      axios
        .get("http://localhost:5000/api/post", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.allPosts = response.data.reverse();
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
@import "../styles/utils/_keyframes";
#modify {
  @include flcecol;
  align-items: center;
  .message-back {
    font-size: 25px;
    color: $text-alert;
    position: absolute;
    top: 25%;
    bottom: 25%;
    left: 25%;
    right: 0;
    background-color: black;
    text-align: center;
    @include flcecol;
    width: 50%;
    animation: message 1s ease-in-out;
  }
  .delete-text {
    color: $text-alert;
    font-weight: bold;
    font-size: 22px;
    margin: 20px 0 40px 0;
  }
  .container {
    @include flspa;
    flex-wrap: wrap;
    @media (max-width: 750px) {
      @include flcecol;
      align-items: center;
    }
    #modify-one {
      @include flcecol;
      width: 75vw;
      align-items: center;
      @media (max-width: 750px) {
        margin: 0 15px 0 15px;
        width: 95vw;
      }
      .container-modify {
        @include border(2px, 15px, 0);
        margin: 15px;
        width: 80%;
        .container-info {
          @include flcecol;
          align-items: center;
          @include border(2px, 15px, 0);
          margin: 15px;
          #title {
            padding: 15px 10px 30px 10px;
            color: $primary-color;
          }
          #text {
            padding: 15px;
            font-size: 18px;
            color: $tertiary-color;
          }
          .modify-picture {
            width: 40%;
            margin-bottom: 20px;
          }
        }
        .post-form {
          @include flcecol;
          margin: 20px;
          align-items: center;
          width: auto;
          label {
            color: $primary-color;
          }
          .input-post {
            margin: 15px 0 15px 0;
            @include border(2px, 15px, 0 0 0 15px);
            font-size: 18px;
            width: 90%;
          }
          #modify-button {
            @include border(2px, 15px, 0 0 0 15px);
            background-color: $primary-color;
            color: $text-color;
            font-size: 18px;
            @include box-shadow;
            margin-top: 20px;
            padding: 8px 0 8px 0;
            width: 40%;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
