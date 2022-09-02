<template>
  <section id="all-container">
    <article v-for="post in allPosts" :key="post.id" id="container-posts">
      <div class="container-post">
        <div id="user-info">
          <span class="user-pseudo">
            {{ post.firstname }}
            {{ post.lastname }}
          </span>
          <img
            v-if="post.userImageUrl != null"
            :src="post.userImageUrl"
            alt="photo de profil"
            class="profil-picture"
          />
          <img
            v-else
            src="/image/profil.png"
            alt="photo-par-default"
            class="profil-picture"
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
        <div id="time-like">
          <span id="date">Publier le {{ format_date(post.createdAt) }}</span>
          <div v-if="this.isAdmin != 'True' && post.pseudo != null">
            <fa
              id="fa-icon-like"
              icon="thumbs-up"
              @click="likePost(post._id)"
              v-if="post.likes > 0"
            />
            <fa
              id="fa-icon-none"
              icon="thumbs-up"
              @click="likePost(post._id)"
              v-else
            />
            <span v-if="post.likes > 0"> {{ post.likes }}</span>
          </div>
        </div>
        <div class="link-comment">
          <div class="link-page" v-if="this.isAdmin != 'True'">
            <button
              class="button-comment"
              @click.prevent="goTocomment(post._id)"
            >
              <div class="link-icon">
                <p>commenter</p>
                <fa icon="comment" />
              </div>
            </button>
            <button
              class="button-comment"
              @click.prevent="goToShowComment(post._id)"
              v-for="comment in sortComments"
              :key="comment"
            >
              <div class="link-icon" v-if="post._id == comment.postId">
                <p>Voir les commentaires</p>
                <fa icon="comment" />
              </div>
            </button>
          </div>
          <div class="link-page">
            <button
              class="go"
              v-if="post.userId == this.userId || this.isAdmin === 'True'"
              @click.prevent="goToTrash(post._id)"
            >
              <div class="link-icon">
                <fa icon="trash" />
                <p>Supprimer</p>
              </div>
            </button>
            <button
              class="go"
              v-if="post.userId == this.userId || this.isAdmin === 'True'"
              @click.prevent="goToModify(post._id)"
            >
              <fa icon="circle" />
              <p>Modifier</p>
            </button>
          </div>
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
      allComments: [],
      sortComments: [],
      commentPostId: "",
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
      postId: "",
      likes: {
        type: Number,
        default: 0,
      },
    };
  },
  created() {
    this.getUsers();
    this.getPostsUser();
    this.getAllComment();
    this.getCommentForPost();
  },

  methods: {
    /*
allows you to transform the format date for the display
*/
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY hh:mm");
      }
    },
    /*
allows you to get all users and the all post in teh DB and merge the both
return a reverse array allPosts 
*/
    getPostsUser() {
      axios
        .get("http://localhost:5000/api/post", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          this.allPosts = response.data.reverse();
          this.mergeUsersAndPosts();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*
allows you to get all users in the DB
return a array allPosts 
*/
    getUsers() {
      axios
        .get("http://localhost:5000/api/user", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          this.allUsers = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*
allows you to get all comments in the DB
return a array allComments
*/
    getAllComment() {
      axios
        .get("http://localhost:5000/api/comment", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          this.allComments = response.data.comments;
          this.getCommentForPost();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*
allows you to merge the all users and the all posts
*/
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
    /*
allows you to go to the post delete page 
send the item postId in the loacalstorage 
*/
    goToTrash(postId) {
      localStorage.setItem("postId", postId);
      this.$router.push("/post/delete");
    },
    /*
allows you to go to the post modify page 
send the item postId in the loacalstorage 
*/
    goToModify(postId) {
      localStorage.setItem("postId", postId);
      this.$router.push("/post/modify");
    },
    /*
allows you to go to the comment show page 
send the item postId in the loacalstorage 
*/
    goToShowComment(postId) {
      localStorage.setItem("postId", postId);
      this.$router.push("/comment/show");
    },
    /*
allows you to go to the comment page 
send the item postId in the loacalstorage 
*/
    goTocomment(postId) {
      localStorage.setItem("postId", postId);
      this.$router.push("/comment");
    },
    /*
allows you to put a like on a post and return to the homepage 
*/
    likePost(postId) {
      console.log(postId);
      axios
        .put(
          "http://localhost:5000/api/post/" + postId + "/like",
          {
            likes: 1,
            userId: this.userId,
          },
          {
            headers: {
              Authorization: "bearer " + this.token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.$router.go(0);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    getCommentForPost() {
      let commentaires = [];
      let newcomment = [];
      let sortcomment = [];
      this.allPosts.forEach((post) => {
        this.allComments.forEach((comment) => {
          if (post._id == comment.postId) {
            commentaires.push(comment);
          }
        });
        let trie = commentaires.find(
          (commentaire) => post._id == commentaire.postId
        );
        newcomment.push(trie);
      });
      newcomment.forEach((sort) => {
        if (sort != undefined) {
          sortcomment.push(sort);
        }
      });
      this.sortComments = sortcomment;
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
    width: 25%;
    @media (max-width: 1200px) {
      width: 35%;
    }
    @media (max-width: 1000px) {
      @include flcecol;
      margin: 20px 5px 10px 5px;
      width: 90%;
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
        .profil-picture {
          max-width: 20%;
          height: 55px;
          object-fit: cover;
          border-radius: 220px;
        }
      }
      #no-info {
        @include flce;
        text-align: center;
        h1 {
          color: $text-alert;
        }
      }
      #post-info {
        @include flcol;
        @include border(1px, 15px, 8px);
        align-items: center;
        border-color: $tertiary-color;
        height: 85%;
        margin: (0 -1px 0 -1px);
        #title-message {
          color: $tertiary-color;
          font-size: 20px;
          font-weight: bold;
        }
        #post-message {
          padding: 15px;
          color: $tertiary-color;
          font-size: 18px;
          text-align: center;
        }
        #post-picture {
          object-fit: cover;
          max-width: 70%;
          max-height: 70%;
          padding-top: 15px;
        }
      }
      #time-like {
        @include flspa;
        align-items: center;
        #date {
          padding: 8px;
          color: $tertiary-color;
        }
        #fa-icon-like {
          margin-right: 5px;
          color: $primary-color;
        }
        #fa-icon-none {
          margin-right: 5px;
          color: $tertiary-color;
        }
        #fa-icon-like:active {
          margin-right: 5px;
          color: $primary-color;
        }
      }
      .link-comment {
        @include flsparo;
        align-items: center;
        @media (max-width: 350px) {
          @include flcecol;
        }
        .link-page {
          @include flspb;
          margin: 15px;
          flex-wrap: wrap;
          @media (max-width: 1100px) {
            @include flcecol;
          }
          .button-comment {
            background-color: white;
            border: none;
            cursor: pointer;
            .link-icon {
              @include flspb;
              color: $tertiary-color;
              align-items: center;
              background-color: white;
              @include border(2px, 15px, 0 5px 0 5px);
              height: 25px;
              margin-bottom: 10px;
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
            @include flspb;
            @include border(2px, 15px, 5px);
            background-color: $primary-color;
            color: $secondary-color;
            align-items: center;
            height: 40px;
            .link-icon {
              @include flspb;
              align-items: center;
            }
            p {
              padding-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
