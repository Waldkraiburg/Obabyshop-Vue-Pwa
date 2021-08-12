<template>
  <div>
    <AddProductForm></AddProductForm>
  </div>
</template>

<script>
const AddProductForm = () =>
  import("../components/pages/products/AddProductForm");
export default {
  name: "App",
  components: {
    AddProductForm,
  },
};
</script>

<style></style>
