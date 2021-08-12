<template>
  <div>
    <Blog></Blog>
  </div>
</template>

<script>
const Blog = () => import("../components/pages/blog/Blog");
export default {
  name: "App",
  components: {
    Blog,
  },
};
</script>

<style></style>
