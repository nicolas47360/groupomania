<template>
  <div>bonjouyr</div>
</template>

<script>
import axios from "axios";
export default {
  name: "comment-post",
  data() {
    return {
      message: "",
      likes: 0,
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
    };
  },

  methods: {
    createComment() {
      axios.
        post("http://localhost:5000/api/comment",
         {
            headers: {
              Authorization: "bearer " + this.token
            }
            
          })
          .then((response) => {
              console.log(response.data);
              this.$router.push("/home");
            })
          .catch((err) => console.log(err)) 
    },
  },
};
</script>

<style lang="scss" scoped></style>
