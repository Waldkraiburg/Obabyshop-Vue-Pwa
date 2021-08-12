<template>
  <div>
    <MessagesPanel></MessagesPanel>
  </div>
</template>

<script>
const MessagesPanel = () =>
  import("../components/pages/messaging/MessagesPanel");
export default {
  name: "App",
  components: {
    MessagesPanel,
  },
};
</script>

<style></style>
