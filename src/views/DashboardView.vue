<template>
  <div>
    <Dashboard></Dashboard>
  </div>
</template>

<script>
const Dashboard = () => import("../components/pages/dashboard/Dashboard");
export default {
  name: "App",
  components: {
    Dashboard,
  },
};
</script>
