<template>
  <div>
    <Pages></Pages>
  </div>
</template>

<script>
const Pages = () => import("../components/pages/Pages");
export default {
  name: "App",
  components: {
    Pages,
  },
};
</script>
