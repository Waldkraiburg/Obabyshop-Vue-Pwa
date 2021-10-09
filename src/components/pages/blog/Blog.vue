<template>
  <div>
    <div class="blog__title-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1922"
        height="274.71"
        viewBox="0 0 1922 274.71"
      >
        <g transform="translate(1970 2740.21) rotate(180)">
          <path
            d="M0-18.645S507.776-43.808,987.39-40.9,1922-18.645,1922-18.645V176.721H0Z"
            transform="translate(48 2506.631)"
            fill="#f7a072"
          />
          <path
            d="M0-3.953S507.776-43.119,987.39-40.387,1922-3.953,1922-3.953V163.772H0Z"
            transform="translate(48 2576.439)"
            fill="#26827b"
          />
        </g>
      </svg>
      <h1 class="blog__title">Blog</h1>
    </div>
    <section class="blog">
      <div class="blog__container">
        <BlogItem
          v-for="blogItem in postsBlogPage"
          v-bind:key="blogItem.id"
          v-bind:postProp="blogItem"
        ></BlogItem>
      </div>
    </section>
  </div>
</template>

<script>
import ApiClient from "../../../services/ApiClient";
const BlogItem = () => import("./BlogItem");
export default {
  data: () => {
    return {
      postsBlogPage: [],
    };
  },
  components: {
    BlogItem,
  },
  mounted: function () {
    ApiClient.get("/wp/v2/posts?_embed").then((response) => {
      this.postsBlogPage = response.data;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/main.scss";
.blog {
  margin-top: 4rem;
  &__container {
    background: rgb(255, 255, 255);
    color: $grey;
    margin-bottom: -1.2rem;
    padding-bottom: 6rem;
    width: 100%;
  }
  &__title-container {
    background: $green;
    height: 4rem;
    position: relative;
    margin-top: 2rem;
    z-index: -1;
    svg {
      display: none;
      @include breakpoint-large {
        display: block;
      }
      @include breakpoint-very-large {
        display: block;
        padding-bottom: 6rem;
      }
    }
    @include breakpoint-large {
      background: none;
      height: auto;
    }
    @include breakpoint-very-large {
      background: none;
      height: auto;
    }
  }
  &__title {
    color: white;
    font-family: "Catamaran";
    font-size: 1.4em;
    position: absolute;
    top: 1rem;
    left: 50%;
    text-transform: uppercase;
    transform: translateX(-50%);
    @include breakpoint-medium {
      top: 1rem;
    }

    @include breakpoint-large {
      top: 4rem;
    }

    @include breakpoint-very-large {
      top: 4rem;
    }
  }
  &__title::after {
    content: "";
    position: absolute;
    top: 1.75rem;
    left: 50%;
    width: 100%;
    height: 3px;
    transform: translateX(-50%);
    background: white;
  }
}
</style>
