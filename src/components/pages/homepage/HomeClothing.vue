<template>
  <section class="home-categories">
    <h2 class="home-categories__title">Vêtements</h2>
    <div class="home-categories__container">
      <ProductItem
        v-for="ProductItem in homeClothingProducts"
        v-bind:key="ProductItem.id"
        v-bind:productProp="ProductItem"
      ></ProductItem>
    </div>
    <div class="home-categories__link-container">
      <router-link :to="`/categorie/4`" class="home-categories__link`"
        >Voir tous les vêtements</router-link
      >
    </div>
  </section>
</template>

<script>
import ApiClient from "../../../services/ApiClient";
const ProductItem = () => import("../products/ProductItem");
export default {
  data: function () {
    return {
      homeClothingProducts: [],
    };
  },
  components: {
    ProductItem,
  },
  mounted: function () {
    ApiClient.get("/wp/v2/products?per_page=4&category=4").then((response) => {
      this.homeClothingProducts = response.data;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/main.scss";
.home-categories {
  padding: 0 1rem;
  position: relative;

  @include breakpoint-medium {
    padding: 0 2rem;
  }
  @include breakpoint-large {
    padding: 0 4rem;
  }
  @include breakpoint-very-large {
    padding: 0 4rem;
  }
  &__article-header {
    width: 100%;
    height: auto;
    img {
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    }
  }
  &__title {
    color: $grey;
    font-family: "Lato", sans-serif;
    font-size: 1.5em;
    font-style: italic;
    text-transform: uppercase;
    position: relative;
    margin-top: 4rem;
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
    top: 1.75rem;
    left: 0;
    width: 4rem;
    height: 3px;
    background: $grey;
    @include breakpoint-medium {
      top: 2.75rem;
    }
    @include breakpoint-large {
      top: 2.5rem;
    }
    @include breakpoint-very-large {
      top: 2.5rem;
    }
  }
  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 4rem;
    width: 100%;
    box-sizing: border-box;
    @include breakpoint-medium {
      margin-bottom: 4rem;
    }
    @include breakpoint-large {
      margin-bottom: 6rem;
    }
    @include breakpoint-very-large {
      margin-bottom: 12rem;
    }
    article {
      margin-top: 4rem;
      width: 100%;
      height: auto;
      @include breakpoint-medium {
        width: 48%;
      }
      @include breakpoint-large {
        width: 48%;
      }
      @include breakpoint-very-large {
        width: 22%;
        height: 12.5rem;
      }
    }
  }
  &__link-container {
    text-align: right;
  }
  &__link {
    color: $green;
    font-family: "Catamaran", sans-serif;
    font-size: 1.2em;
    font-weight: bold;
    text-decoration: underline;
    @include breakpoint-very-large {
      font-size: 1.3em;
    }
  }
}
</style>
