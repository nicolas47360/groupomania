<template>
  <section id="all-container">
    <article v-for="post in allPosts" :key="post.id" id="container-posts">
      <div class="container-post">
        <div id="user-info">
          <span class="user-pseudo" v-if="post.pseudo != ''">
            {{ post.pseudo }}
          </span>
          <span class="user-pseudo" v-else>
            {{ post.firstname }}
            {{ post.lastname }}
          </span>
          <img
            :src="post.userImageUrl"
            alt="photo de profil"
            id="profil-picture"
          />
        </div>
        <div id="post-info">
          <span id="title-message"> {{ post.title }}</span>
          <span id="post-message"> {{ post.message }} </span>
          <img
            v-if="post.imageUrl != null"
            :src="post.imageUrl"
            alt="photo"
            id="post-picture"
          />
          <img v-else id="none" />
        </div>
        <span id="date">Publier le {{ format_date(post.createdAt) }}</span>
        <div id="link-comment">
          <router-link to="/comment">
            <div id="link-icon">
              <p>commenter</p>
              <fa icon="comment" />
            </div>
          </router-link>
          <button
            class="go"
            v-if="post.userId == this.userId"
            @click.prevent="goToTrash(post._id)"
          >
            <fa icon="trash" />
            supprimer
          </button>
          <button
            class="go"
            v-if="post.userId == this.userId"
            @click.prevent="goToModify(post._id)"
          >
            <fa icon="circle" />
            Modifier
          </button>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "HomeView",
  data() {
    return {
      allPosts: [],
      allUsers: [],
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      postId: "",
    };
  },
  created() {
    this.getUsers();
    this.getPosts();
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY hh:mm");
      }
    },
    getPosts() {
      axios
        .get("http://localhost:5000/api/post", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.allPosts = response.data.reverse();
          this.mergeUsersAndPosts();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getUsers() {
      axios
        .get("http://localhost:5000/api/user", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.allUsers = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    mergeUsersAndPosts() {
      this.allPosts.forEach((post) => {
        this.allUsers.forEach((user) => {
          if (post.userId == user.userId) {
            post.pseudo = user.pseudo;
            post.lastname = user.lastname;
            post.userImageUrl = user.imageUrl;
            post.firstname = user.firstname;
          }
        });
      });
    },

    goToTrash(postId) {
      localStorage.setItem("postId", postId);
      this.$router.push("/post/delete");
    },

    goToModify(postId) {
      localStorage.setItem("postId", postId);
      this.$router.push("/post/modify");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#all-container {
  @include flspa;
  flex-wrap: wrap;
  margin: 0 15px 0 15px;
  @media (max-width: 950px) {
    @include flcecol;
  }
  #container-posts {
    @include flspa;
    flex-wrap: wrap;
    margin: 40px;
    width: 39vw;
    @media (max-width: 950px) {
      width: 85vw;
      @include flce;
    }
    .container-post {
      @include border(2px, 15px, 0);
      @include flcol;
      margin: 30px 0 30px 0;
      width: 100%;
      height: 100%;
      #user-info {
        @include flspa;
        align-items: center;
        .user-pseudo {
          color: $primary-color;
          font-size: 20px;
        }
        #profil-picture {
          max-width: 20%;
          object-fit: cover;
        }
      }
      #post-info {
        @include flcol;
        @include border(1px, 0, 8px);
        align-items: center;
        height: 85%;
        #title-message {
          color: $tertiary-color;
          font-size: 20px;
          font-weight: bold;
        }
        #post-message {
          padding: 15px;
          color: $tertiary-color;
          font-size: 18px;
        }
        #post-picture {
          object-fit: cover;
          max-width: 300px;
          max-height: 300px;
          padding-top: 15px;
        }
      }
      #date {
        padding: 8px;
      }
      #link-comment {
        @include flsparo;
        align-items: center;
        #link-icon {
          @include flspb;
          align-items: center;
          p {
            padding-right: 5px;
          }
        }
      }
      a {
        text-decoration: none;
        color: $tertiary-color;
      }
      .go {
        @include border(2px, 15px, 5px);
        background-color: $primary-color;
        color: $secondary-color;
      }
    }
  }
}
</style>
