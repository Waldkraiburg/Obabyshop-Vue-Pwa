<template>
  <div>
    <NotFound></NotFound>
  </div>
</template>

<script>
const NotFound = () => import("../components/pages/NotFound");
export default {
  name: "App",
  components: {
    NotFound,
  },
};
</script>
