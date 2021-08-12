<template>
  <article>
    <div class="categories__article">
      <div class="categories__article-header">
        <router-link :to="`/articles/${productProp.id}`" aria-label="product">
          <img
            width="300"
            height="200"
            :src="mediaUrl"
            :alt="productProp.title.rendered"
            loading="lazy"
          />
        </router-link>
      </div>
      <div class="categories__article-description">
        <div class="categories__article-datas">
          <p>
            <span><font-awesome-icon :icon="myIcon" /></span>
            <span v-html="productProp.meta.localite_produit"></span>
          </p>
          <p class="categories__article-price">
            <span v-html="productProp.meta.prix_produit"></span>€
          </p>
        </div>
        <p
          v-html="productProp.title.rendered"
          class="categories__article-content"
        ></p>
      </div>
    </div>
  </article>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export default {
  components: {
    FontAwesomeIcon,
  },
  props: ["productProp"],
  computed: {
    mediaUrl() {
      return this.productProp.featured_media_url;
    },
  },
  data: function () {
    return {
      myIcon: faMapMarkerAlt,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/main.scss";
.categories {
  &__article-header {
    height: auto;
    position: relative;
    width: 100%;
    img {
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      max-height: 320px;
      @include breakpoint-medium {
        max-height: 300px;
      }
      @include breakpoint-large {
        max-height: 400px;
      }
      @include breakpoint-very-large {
        max-height: 250px;
      }
    }
  }
  &__title {
    color: $grey;
    font-family: "Lato", sans-serif;
    font-size: 2em;
    font-style: italic;
    text-transform: uppercase;
    margin-top: 4rem;
    position: relative;
  }
  &__title::after {
    background: $grey;
    content: "";
    height: 3px;
    left: 0;
    position: absolute;
    top: 2.5rem;
    width: 4rem;
  }
  &__article-datas {
    display: flex;
    font-size: 1.4em;
    justify-content: space-between;
    margin-bottom: 1rem;
    position: relative;
    p {
      align-items: center;
      color: $grey;
      display: flex;
      font-family: "Catamaran";
    }
    svg {
      color: $green;
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  &__article-datas::after {
    background: rgba(112, 112, 112, 0.25);
    content: "";
    height: 1px;
    left: 50%;
    position: absolute;
    top: 2.5rem;
    transform: translateX(-50%);
    width: 50%;
  }
  &__article-description {
    border: 1px solid rgba($color: #707070, $alpha: 0.5);
    border-top: none;
    border-bottom-left-radius: 5px 5px;
    border-bottom-right-radius: 5px 5px;
    box-shadow: 0 12px 32px 4px rgba(black, 0.2);
    color: $grey;
    padding: 1rem;
    -webkit-box-shadow: 0 12px 32px 4px rgba(black, 0.2);
  }
  &__article-content {
    font-family: "Catamaran";
    font-size: 1.3em;
  }
  &__article-price {
    color: $green !important;
    font-family: "Roboto";
    font-weight: bold;
    text-align: right;
  }
}
</style>
