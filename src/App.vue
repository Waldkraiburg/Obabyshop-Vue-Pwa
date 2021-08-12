<template>
  <div>
    <Loader></Loader>
    <AppHeader></AppHeader>
    <RouterView></RouterView>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Vue from "vue";
const Loader = () => import("./components/ui/Loader");
const AppHeader = () => import("./components/layout/AppHeader");
const AppFooter = () => import("./components/layout/AppFooter");

export default Vue.extend({
  components: {
    Loader,
    AppHeader,
    AppFooter,
  },
});
</script>

<style>
body {
  margin: 0;
}
</style>
