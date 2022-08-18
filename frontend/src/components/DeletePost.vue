<template>
  <NavBar />
  <section id="delete">
    <span class="delete-text">Suprimer vos Posts</span>
    <article id="delete-one" v-if="this.postId != null">
      <section id="one-container">
        <div class="delete-container" v-for="post in allPosts" :key="post.id">
          <div
            class="delete-message"
            v-if="post.userId == this.userId && post._id == this.postId"
          >
            <span id="title-message"> {{ post.title }}</span>
            <span id="text-message">{{ post.message }}</span>
            <img
              class="delete-picture"
              :src="post.imageUrl"
              alt="photo"
              v-if="post.imageUrl != null"
            />
            <button
              id="delete-button"
              type="reset"
              @click.prevent="deletePost(post._id)"
            >
              SUPPRIMER
            </button>
          </div>
        </div>
      </section>
    </article>
    <article id="delete-all" v-else>
      <section id="all-container" v-for="post in allPosts" :key="post.id">
        <div class="delete-container" v-if="post.userId == this.userId">
          <div class="delete-message">
            <span id="title-message"> {{ post.title }}</span>
            <span id="text-message">{{ post.message }}</span>
            <img
              class="delete-picture"
              :src="post.imageUrl"
              alt="photo"
              v-if="post.imageUrl != null"
            />
            <button
              id="delete-button"
              type="reset"
              @click.prevent="deletePost(post._id)"
            >
              SUPPRIMER
            </button>
          </div>
        </div>
      </section>
    </article>
  </section>
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar.vue";
export default {
  name: "deletePost",
  components: {
    NavBar,
  },
  data() {
    return {
      allPosts: [],
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      postId: localStorage.getItem("postId"),
    };
  },

  created() {
    this.getAllPost();
  },
  methods: {
    deletePost(id) {
      axios
        .delete("http://localhost:5000/api/post/" + id, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
          if (this.postId != null) {
            localStorage.removeItem("postId");
          }
          alert(response.data.message);
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
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
#delete {
  @include flcecol;
  align-items: center;
  .delete-text {
    color: $text-alert;
    font-weight: bold;
    font-size: 28px;
    margin-top: 20px;
  }
  #delete-one {
    @include flcecol;
    align-items: center;
    margin: 10px;
    .delete-text {
      color: $text-alert;
      font-weight: bold;
      font-size: 22px;
    }
    #one-container {
      @include flce;
      margin: 40px;
      .delete-container {
        .delete-message {
          @include flcecol;
          @include border(2px, 15px, 15px);
          padding: 15px;
          margin: 20px 0 20px 0;
          align-items: center;
          #title-message {
            margin-top: 20px;
            font-size: 20px;
            color: $primary-color;
            font-weight: bold;
          }
          #text-message {
            margin: 15px 0 20px 0;
            color: $tertiary-color;
            font-size: 18px;
          }
          .delete-picture {
            width: 85%;
            object-fit: cover;
          }
          #delete-button {
            @include border(2px, 15px, 0 0 0 15px);
            background-color: $primary-color;
            color: $text-color;
            font-size: 18px;
            @include box-shadow;
            margin-top: 20px;
            padding: 8px 0 8px 0;
            cursor: pointer;
            width: 50%;
            @media (max-width: 750px) {
              width: 75%;
            }
          }
        }
      }
    }
  }

  #delete-all {
    @include flcecol;
    align-items: center;
    #all-container {
      @include flspa;
      width: 45vw;
      @media (max-width: 900px) {
        @include flcecol;
        align-items: center;
      }
      .delete-container {
        margin: 20px;
        .delete-message {
          @include flcecol;
          @include border(2px, 15px, 0);
          padding: 15px;
          margin: 20px 0 20px 0;
          align-items: center;
          width: 40vw;
          @media (max-width: 900px) {
            width: 80vw;
          }
          #title-message {
            margin-top: 20px;
            font-size: 20px;
            color: $primary-color;
            font-weight: bold;
          }
          #text-message {
            margin: 15px 0 20px 0;
            color: $tertiary-color;
            font-size: 18px;
          }
          .delete-picture {
            object-fit: cover;
            width: 80%;
          }
          #delete-button {
            @include border(2px, 15px, 0 0 0 15px);
            background-color: $primary-color;
            color: $text-color;
            font-size: 18px;
            @include box-shadow;
            margin-top: 20px;
            padding: 8px 0 8px 0;
            cursor: pointer;
            width: 50%;
          }
        }
      }
    }
  }
}
</style>
