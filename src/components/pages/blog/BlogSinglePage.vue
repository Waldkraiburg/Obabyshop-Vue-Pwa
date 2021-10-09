<template>
  <main>
    <div class="blog-article__title-container">
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
      <h1 class="blog-article__title">{{ title }}</h1>
    </div>
    <section class="blog-article">
      <div class="blog-article__container">
        <img class="blog-article__float-right-img" :src="mediaUrl" />
        <div v-html="content"></div>
      </div>
    </section>
  </main>
</template>

<script>
import ApiClient from "../../../services/ApiClient";
export default {
  props: ["postProp"],
  data: () => {
    return {
      title: "",
      date: "",
      mediaUrl: "",
      content: "",
    };
  },
  mounted: function () {
    const postId = this.$route.params.id;
    ApiClient.get("/wp/v2/posts/" + postId + "?_embed").then((response) => {
      this.title = response.data.title.rendered;
      this.date = response.data.date;
      this.mediaUrl = response.data._embedded["wp:featuredmedia"][0].source_url;
      this.content = response.data.content.rendered;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/main.scss";
.blog-article {
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

  &__date {
    color: $grey;
    font-style: italic;
    font-size: 0.8em;
  }
  &__title {
    color: white;
    background: #26827b;
    font-family: "Catamaran";
    font-size: 1.3em;
    position: absolute;
    top: 1rem;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    width: 100%;
    @include breakpoint-medium {
      font-size: 1.4em;
      top: 1rem;
    }
    @include breakpoint-large {
      font-size: 1.4em;
      top: 4rem;
    }
    @include breakpoint-very-large {
      font-size: 1.4em;
      top: 4rem;
    }
  }
  &__container {
    border: 1px solid rgba($color: #707070, $alpha: 0.25);
    border-radius: 15px;
    color: $grey;
    padding: 0.5rem;
    margin-top: 2rem;
    p {
      font-family: "Roboto";
      font-size: 1.2em !important;
    }
    blockquote {
      width: 100%;
    }
    @include breakpoint-medium {
      font-size: 1.4em;
      margin-top: 0;
      padding: 2.5rem;
    }

    @include breakpoint-large {
      font-size: 1.4em;
      margin-top: 4rem;
      padding: 2.5rem;
    }

    @include breakpoint-very-large {
      font-size: 1.4em;
      margin-top: 0;
      padding: 2.5rem;
    }
  }
  &__float-right-img {
    border-radius: 15px;
    float: right;
    width: 100%;
    margin-bottom: 1.5rem;
    margin-left: 1.5rem;
    @include breakpoint-medium {
      margin-bottom: 0rem;
      margin-top: 2.5rem;
      width: 35%;
    }

    @include breakpoint-large {
      margin-bottom: 0;
      margin-top: 2.5rem;
      width: 35%;
    }

    @include breakpoint-very-large {
      margin-bottom: 0.5rem;
      margin-top: 2.5rem;
      width: 35%;
    }
  }
}
</style>
