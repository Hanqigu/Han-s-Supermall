<template>
  <div>
    {{id}}
  </div>
</template>

<script>
  export default {
    name: "Details",
    data() {
      return {
        id: null,
      };
    },
    created() {
      this.id = this.$route.params.id;
    },
  }
</script>

<style>

</style>
