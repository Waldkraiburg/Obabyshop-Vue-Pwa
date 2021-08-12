<template>
  <main>
    <HeroHeader></HeroHeader>
    <HomeToyz></HomeToyz>
    <HomeFurniture></HomeFurniture>
    <HomeAccessories></HomeAccessories>
    <HomeClothing></HomeClothing>
    <HomeBlog></HomeBlog>
  </main>
</template>

<script>
const HeroHeader = () => import("../components/pages/homepage/HeroHeader");
const HomeToyz = () => import("../components/pages/homepage/HomeToyz");
const HomeFurniture = () =>
  import("../components/pages/homepage/HomeFurniture");
const HomeAccessories = () =>
  import("../components/pages/homepage/HomeAccessories");
const HomeClothing = () => import("../components/pages/homepage/HomeClothing");
const HomeBlog = () => import("../components/pages/homepage/HomeBlog");

export default {
  name: "App",
  components: {
    HeroHeader,
    HomeToyz,
    HomeFurniture,
    HomeAccessories,
    HomeClothing,
    HomeBlog,
  },
};
</script>

<style></style>
