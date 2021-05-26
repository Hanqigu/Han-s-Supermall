<template>
  <div id="details">
    <details-nav-bar></details-nav-bar>
  </div>
</template>

<script>
  import DetailsNavBar from './childComps/DetailsNavBar'

  export default {
    name: "Details",
    components: {
      DetailsNavBar
    },
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
