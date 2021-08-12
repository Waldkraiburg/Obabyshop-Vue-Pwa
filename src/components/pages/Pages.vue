<template>
  <div>
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
  </div>
</template>

<script>
import ApiClient from "../../services/ApiClient";
export default {
  props: ["postProp"],
  data: function () {
    return {
      title: "",
      mediaUrl: "",
      content: "",
      id: "",
    };
  },
  mounted: function () {
    const id = this.$route.params.id;
    ApiClient.get("/wp/v2/pages/" + id + "?_embed").then((response) => {
      this.title = response.data.title.rendered;
      this.mediaUrl = response.data._embedded["wp:featuredmedia"][0].source_url;
      this.content = response.data.content.rendered;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
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
    font-family: "Catamaran";
    font-size: 1.2em;
    position: absolute;
    text-align: center;
    top: 1rem;
    text-transform: uppercase;
    width: 100%;
    @include breakpoint-medium {
      font-size: 1.2em;
      top: 1rem;
    }
    @include breakpoint-large {
      font-size: 1.4em;
      top: 1.5rem;
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
    font-family: "Roboto";
    font-size: 1.2em;
    padding: 0.5rem;
    margin-top: 2rem;
    text-align: justify;
    @include breakpoint-medium {
      margin-top: 0;
      padding: 0.75rem;
    }

    @include breakpoint-large {
      margin-top: 0;
      padding: 2.5rem;
    }

    @include breakpoint-very-large {
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
      margin-bottom: 0;
      width: 50%;
    }

    @include breakpoint-large {
      margin-bottom: 0;
      width: 30%;
    }

    @include breakpoint-very-large {
      margin-bottom: 0;
      width: 30%;
    }
  }
}
</style>
