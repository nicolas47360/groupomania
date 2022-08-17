<template>
  <section id="container" v-for="comment in allComments" :key="comment.id">
    <div>
      <div v-if="comment.userId == this.userId">
        <span> {{ comment.message }}</span>
        <span> {{ comment.createdAt }}</span>
      </div>
    </div>
    <button @click.prevent="deleteComment(comment._id)">
      Supprimer le commentaire
    </button>
  </section>
 
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      allComments: [],
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    deleteComment(id) {
      axios
        .delete("http://localhost:5000/api/comment/" + id, {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
          // this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getComments() {
      axios
        .get("http://localhost:5000/api/comment", {
          headers: {
            Authorization: "bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.allComments = response.data.comments.reverse();
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
#container {
  @include border(2px, 15px, 0);
  margin: 15px 0 15px 0;
  padding: 15px;
}
</style>
