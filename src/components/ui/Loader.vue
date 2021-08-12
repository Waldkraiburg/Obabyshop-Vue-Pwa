<template>
  <div class="page-loader" v-if="!isloaded">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      Loader: "",
      isloaded: false,
    };
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        return (this.isloaded = true);
      }
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
.page-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 999;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid $green;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  @include breakpoint-medium {
    width: 60px;
    height: 60px;
  }
  @include breakpoint-large {
    width: 80px;
    border: 8px solid #f3f3f3;
    border-top: 8px solid $green;
    height: 80px;
  }
  @include breakpoint-very-large {
    border: 8px solid #f3f3f3;
    border-top: 8px solid $green;
    width: 80px;
    height: 80px;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
