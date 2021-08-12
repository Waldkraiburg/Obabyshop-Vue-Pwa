<template>
  <div>
    <CategoryPage></CategoryPage>
  </div>
</template>

<script>
const CategoryPage = () => import("../components/pages/products/CategoryPage");
export default {
  name: "App",
  components: {
    CategoryPage,
  },
};
</script>

<style></style>
