<template>
  <NavBar />
  <section id="container-show">
    <h1>Les commentaires du post</h1>
    <article>
      <div id="show-post" v-for="post in allPosts" :key="post._id">
        <div id="post-info" v-if="post._id == this.postId">
          <div id="border-post">
            <h2>Le post original</h2>
            <span id="post-title"> {{ post.title }} </span>
            <span id="post-message"> {{ post.message }} </span>
            <img
              :src="post.imageUrl"
              alt="photo du post"
              v-if="post._id == this.postId && post.imageUrl != null"
            />
          </div>
        </div>
      </div>
      <div id="show-comment" v-for="comment in allComments" :key="comment.id">
        <div id="comment-info" v-if="comment.postId == this.postId">
          <div id="comment">
            <span>{{ comment.message }}</span>
            <span>Publier le {{ format_date(comment.createdAt) }} </span>
          </div>
        </div>
      </div>
    </article>
  </section>
  <div class="button-up" @click="goUp()">
    <fa id="arrow" icon="arrow-up" />
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar.vue";
import moment from "moment";
export default {
  name: "CommentShow",
  components: {
    NavBar,
  },
  data() {
    return {
      allComments: [],
      allPosts: [],
      postComments: [],
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      postId: localStorage.getItem("postId"),
      comment: "",
    };
  },
  created() {
    this.getComment();
    this.getPosts();
  },

  updated() {
    this.allPosts;
    this.allComments;
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
allows you to get all comments in for a postId  the DB and return a reverse array allComments
*/
    getComment() {
      axios
        .get("http://localhost:5000/api/comment/" + this.postId, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.allComments = response.data.reverse();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*
allows you to get all posts in the DB and return a array allPosts
*/
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
        })
        .catch((error) => {
          console.log(error);
        });
    },

    goUp() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/utils/__mixin.scss";
@import "../styles/utils/__variables.scss";
#container-show {
  @include flcecol;
  align-items: center;
  h1 {
    color: $primary-color;
    font-size: 35px;
    text-align: center;
    @media (max-width: 600px) {
      font-size: 25px;
    }
  }
  article {
    width: 70vw;
    #show-post {
      #post-info {
        #border-post {
          @include border(2px, 15px, 15px);
          @include flcecol;
          align-items: center;
          h2 {
            font-size: 18px;
            @include border(2px, 15px, 15px);
            @include box-shadow;
            background-color: $primary-color;
            color: $secondary-color;
            width: 40%;
            text-align: center;
            height: 10px;
            @media (max-width: 600px) {
              width: 80%;
              height: 25px;
            }
          }
          #post-title {
            color: $primary-color;
            font-size: 22px;
          }
          #post-message {
            padding: 15px;
            color: $tertiary-color;
          }
          img {
            object-fit: cover;
            width: 40%;
          }
        }
      }
    }
    #show-comment {
      @include flcecol;
      margin: 15px 0 15px 0;
      #comment-info {
        @include border(2px, 15px, 15px);
        @include flce;
        #comment {
          @include flcecol;
          span {
            font-size: 18px;
            padding: 15px 0 15px 0;
            color: $tertiary-color;
          }
        }
      }
    }
  }
}
.button-up {
  width: 50px;
  height: 50px;
  background: $primary-color;
  border-radius: 50%;
  @include flce;
  align-items: center;
  position: fixed;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  @media (max-width: 550px) {
    width: 30px;
    height: 30px;
    @media (max-width: 400px) {
      width: 20px;
      height: 20px;
    }
  }
  #arrow {
    color: $text-color;
  }
}
</style>
