<template>
  <div>
    <PlacePage></PlacePage>
  </div>
</template>

<script>
const PlacePage = () => import("../components/pages/products/PlacePage");
export default {
  name: "App",
  components: {
    PlacePage,
  },
};
</script>

<style lang="scss" scoped></style>
