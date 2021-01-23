<template>
  <div class="home">
    <div class="wrapper">
      <div class="main">
        <blog-list></blog-list>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogList from "@/components/BlogList.vue";

export default {
  name: "Home",
  components: {
    BlogList
  }
};
</script>
<style lang="scss" scoped>
.main{
  margin: 0 20px;
  padding: 20px;
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba($color: #000000, $alpha: 0.4),0 0 30px rgba($color: #0a0a00, $alpha: 0.1) inset;
}
</style>