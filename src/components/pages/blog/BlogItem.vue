<template>
  <article class="blog__article">
    <div class="blog__article-image-container">
      <router-link :to="`/blog/${postProp.id}`"
        ><img width="464" height="269" :src="mediaUrl"
      /></router-link>
    </div>
    <div class="blog__article-text-container">
      <div>
        <h2 v-html="postProp.title.rendered.slice(0, 500)"></h2>
        <p v-html="postProp.excerpt.rendered.slice(0, 500)"></p>
        <router-link :to="`/blog/${postProp.id}`">
          <span>Continuer de lire</span>
        </router-link>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ["postProp"],
  computed: {
    mediaUrl() {
      if (this.postProp._embedded["wp:featuredmedia"][0].source_url != "") {
        return this.postProp._embedded["wp:featuredmedia"][0].source_url;
      } else {
        return (
          "https://source.unsplash.com/collection/157&random=" +
          Math.random() * 1000
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/main.scss";
.blog {
  margin-top: 4rem;
  &__article {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 4rem;
    width: 100%;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    @include breakpoint-medium {
      flex-direction: column;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    @include breakpoint-large {
      flex-direction: row;
      padding-left: 4rem;
      padding-right: 4rem;
    }
    @include breakpoint-very-large {
      justify-content: row;
      padding-left: 4rem;
      padding-right: 4rem;
    }
  }
  &__article-image-container {
    top: 12rem;
    width: 100%;
    img {
      border-radius: 15px;
      margin-bottom: 0.5rem;
      @include breakpoint-medium {
        margin-bottom: 0.75rem;
      }

      @include breakpoint-large {
        margin-bottom: 0;
      }

      @include breakpoint-very-large {
        margin-bottom: 0;
      }
    }

    @include breakpoint-medium {
      width: 100%;
    }
    @include breakpoint-large {
      width: 40%;
    }
    @include breakpoint-very-large {
      width: 35%;
    }
  }
  &__article-text-container {
    font-family: "Roboto", sans-serif;
    font-size: 1.2em;
    top: 12rem;
    width: 100%;
    display: flex;
    align-items: center;
    span {
      background: $green;
      color: white;
      display: inline-block;
      font-style: italic;
      font-weight: bold;
      margin-top: 1.5rem;
      padding: 0.5rem 0.75rem;
      position: relative;
      transition: all 0.4s ease-in-out;
    }
    span:hover {
      text-decoration: underline;
    }
    h2 {
      font-family: "Catamaran";
      font-size: 1.2em;
    }
    @include breakpoint-medium {
      font-size: 1.4em;
      width: 100%;
    }
    @include breakpoint-large {
      font-size: 1.4em;
      width: 55%;
    }
    @include breakpoint-very-large {
      font-size: 1.4em;
      width: 62%;
    }
  }
}
</style>
