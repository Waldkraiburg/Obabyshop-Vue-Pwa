<template>
  <section class="home-blog">
    <div class="home-blog__container">
      <div class="home-blog__title-container">
        <h3 class="home-blog__title">Notre blog</h3>
      </div>
      <BlogItem
        v-for="blogItem in posts"
        v-bind:key="blogItem.id"
        v-bind:postProp="blogItem"
      ></BlogItem>
    </div>
  </section>
</template>

<script>
import ApiClient from "../../../services/ApiClient";
const BlogItem = () => import("../blog/BlogItem");
export default {
  data: () => {
    return {
      posts: [],
    };
  },
  components: {
    BlogItem,
  },
  mounted: function () {
    ApiClient.get("/wp/v2/posts?per_page=2&_embed").then((response) => {
      this.posts = response.data;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/main.scss";
.home-blog {
  margin-top: 4rem;
  &__container {
    background: $green;
    color: white;
    margin-bottom: -2rem;
    padding-bottom: 6rem;
    width: 100%;

    @include breakpoint-very-large {
      margin-bottom: -3.25rem;
      padding-bottom: 6rem;
    }
  }
  &__title {
    font-family: "Catamaran", sans-serif;
    font-size: 2.5em;
    text-transform: uppercase;
    position: relative;
    @include breakpoint-medium {
      font-size: 2.5em;
    }
    @include breakpoint-large {
      font-size: 2em;
    }
    @include breakpoint-very-large {
      font-size: 2em;
    }
  }
  &__title::after {
    content: "";
    position: absolute;
    top: 3.25rem;
    left: 50%;
    width: 8rem;
    height: 3px;
    transform: translateX(-50%);
    background: white;
    @include breakpoint-medium {
      top: 3.25rem;
    }
    @include breakpoint-large {
      top: 2.75rem;
    }
    @include breakpoint-very-large {
      top: 2.75rem;
    }
  }
  &__title-container {
    text-align: center;
    display: inline-block;
    width: 100%;
    height: 100%;
    margin-top: 4rem;
  }
}
</style>
