<template>
  <main>
    <ProductSinglePage></ProductSinglePage>
  </main>
</template>

<script>
const ProductSinglePage = () =>
  import("../components/pages/products/ProductSinglePage");
export default {
  name: "App",
  components: {
    ProductSinglePage,
  },
};
</script>

<style lang="scss" scoped></style>
