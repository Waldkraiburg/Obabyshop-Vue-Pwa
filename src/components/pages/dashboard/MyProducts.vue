<template>
  <div>
    <section class="categories">
      <h1 class="categories__title">Mes annonces</h1>
      <div class="categories__container" :v-bind="userId">
        <MyProductItem
          v-for="ProductItem in myProducts"
          v-bind:key="ProductItem.id"
          v-bind:productProp="ProductItem"
        ></MyProductItem>
      </div>
      <div v-if="myProducts.length === 0">
        <p class="categories__no-products">
          Vous n'avez pas encore d'annonces.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import ApiClient from "../../../services/ApiClient";
const MyProductItem = () => import("./MyProductItem");
export default {
  props: ["userId"],
  data: () => {
    return {
      myProducts: [],
    };
  },
  components: {
    MyProductItem,
  },
  watch: {
    userId: function () {
      ApiClient.get(
        "/wp/v2/products?author=" + this.userId + "&per_page=50&_embed"
      ).then((response) => {
        this.myProducts = response.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/main.scss";
.categories {
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
  position: relative;
  @include breakpoint-medium {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @include breakpoint-large {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  @include breakpoint-very-large {
    padding-left: 4rem;
    padding-right: 4rem;
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

  &__container {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 4rem;
    margin-top: 2rem;
    width: 100%;

    @include breakpoint-medium {
      margin-bottom: 4rem;
    }
    @include breakpoint-large {
      margin-bottom: 6rem;
    }
    @include breakpoint-very-large {
      padding-bottom: 1rem;
    }
    article {
      height: auto;
      margin-top: 4rem;
      width: 100%;

      @include breakpoint-medium {
        width: 48%;
      }
      @include breakpoint-large {
        width: 48%;
      }
      @include breakpoint-very-large {
        width: 22%;
      }
    }
  }
  &__no-products {
    color: $grey;
    font-size: 1.3em;
    font-style: "Lato";
    margin: 4rem;
    text-align: center;
    min-height: 25vh;
  }
}
@keyframes heart {
  0% {
    filter: hue-rotate(0deg);
    font-size: 1.75rem;
  }
  50% {
    filter: hue-rotate(-20deg);
    font-size: 2.4rem;
  }
  100% {
    filter: hue-rotate(0deg);
    font-size: 1.75rem;
  }
}
</style>
