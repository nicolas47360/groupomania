<template>
  <div>
    <span>un petit texte</span>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    deleteComment() {
      axios
        .delete("http://localhost:5000/api/comment/" + this.userId, {
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
  },
};
</script>

<style lang="scss" scoped>

</style>