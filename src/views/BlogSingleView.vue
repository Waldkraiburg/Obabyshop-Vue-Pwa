<template>
  <main>
    <BlogSinglePage></BlogSinglePage>
  </main>
</template>

<script>
const BlogSinglePage = () => import("../components/pages/blog/BlogSinglePage");
export default {
  name: "App",
  components: {
    BlogSinglePage,
  },
};
</script>

<style></style>
