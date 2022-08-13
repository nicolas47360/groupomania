<template>
  <section id="all-container">
    <article v-for="post in allPosts.reverse()" :key="post.id" id="container">
      <div class="container-post">
        <div id="user-info">
          <p>
            {{ post.pseudo }}
            {{ post.lastname }}
          </p>
          <img
            :src="post.userImageUrl"
            alt="photo de profil"
            id="profil-picture"
          />
        </div>
        <div id="post-info">
          {{ post.message }}
          <img
            v-if="post.imageUrl != null"
            :src="post.imageUrl"
            alt="photo"
            id="post-picture"
          />
          <span>{{ format_date(post.createdAt) }}</span>
        </div>
        <div id="link-comment">
          <router-link to="/comment">
            <div id="link-icon">
              <p>commenter</p>
              <fa icon="comment" />
            </div>
          </router-link>
          <button
            id="delete-button"
            v-if="post.userId == this.userId"
            @click.prevent="goToTrash(post._id)"
          >
            <fa icon="trash" />
            supprimer
          </button>
          <button
            id="delete-button"
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
          this.allPosts = response.data;
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
  #container {
    @include flspa;
    margin: 10px;
    width: 30%;
    .container-post {
      @include border(2px, 15px, 0);
      @include flcol;
      margin: 15px 0 15px 0;
      #user-info {
        @include flspa;
        align-items: center;
        margin-bottom: 20px;
        #profil-picture {
          max-width: 20%;
          object-fit: cover;
        }
      }
      #post-info {
        @include flcol;
        @include border(1px, 0, 8px);
        height: 80%;
        #post-picture {
          max-width: 25%;
          object-fit: cover;
        }
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
    }
  }
}
</style>
