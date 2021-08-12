<template>
  <div>
    <section class="categories">
      <h1 class="categories__title">{{ categoryName }}</h1>
      <div class="categories__search-box">
        <div class="categories__search-icon-container">
          <span><font-awesome-icon :icon="searchIcon" /></span>
        </div>
        <input
          class="categories__search"
          v-model="searchKey"
          type="search"
          id="search"
          :placeholder="'Rechercher dans la catégorie ' + categoryName"
          autocomplete="off"
        />
      </div>
      <span
        v-if="searchKey && filteredList.length >= 1"
        class="categories__results"
      >
        {{ filteredList.length }} résultat<span
          v-if="filteredList.length > 1"
          class="categories__results"
          >s</span
        >
      </span>
      <span
        v-if="searchKey && filteredList.length == []"
        class="categories__results"
      >
        Aucun résultat, essayez un autre mot clé</span
      >
      <div class="categories__sort-container">
        <div class="categories__custom-select">
          <label for="custom-select">Trier</label>
          <div class="categories__order-select" tabindex="1" id="custom-select">
            <input class="selectopt" name="test" type="radio" id="opt1" />
            <label
              for="opt1"
              class="categories__select-option"
              @click="sortLowest()"
              >Du - cher au + cher</label
            >
            <input class="selectopt" name="test" type="radio" id="opt2" />
            <label
              for="opt2"
              class="categories__select-option"
              @click="sortHighest()"
              >Du + cher au - cher</label
            >
          </div>
        </div>
      </div>
      <div class="categories__container">
        <ProductItem
          v-for="ProductItem in filteredList"
          v-bind:key="ProductItem.id"
          v-bind:productProp="ProductItem"
        ></ProductItem>
      </div>
    </section>
  </div>
</template>

<script>
import ApiClient from "../../../services/ApiClient";
const ProductItem = () => import("./ProductItem");
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default {
  data: function () {
    return {
      categoryProducts: [],
      category: "",
      categoryName: "",
      searchKey: "",
      searchIcon: faSearch,
    };
  },
  components: {
    ProductItem,
    FontAwesomeIcon,
  },
  computed: {
    filteredList() {
      return this.categoryProducts.filter((product) => {
        return product.title.rendered
          .toLowerCase()
          .includes(this.searchKey.toLowerCase());
      });
    },
  },
  mounted: function () {
    const category = this.$route.params.id;
    ApiClient.get("/wp/v2/products?category=" + category + "&_embed").then(
      (response) => {
        this.categoryProducts = response.data;
      }
    );
    if (category === "5") {
      this.categoryName = "Meubles";
    } else if (category === "6") {
      this.categoryName = "Accessoires";
    } else if (category === "4") {
      this.categoryName = "Jouets";
    } else if (category === "7") {
      this.categoryName = "Vêtements";
    }
  },
  methods: {
    sortLowest() {
      let sortedProducts = this.categoryProducts.sort(
        (a, b) => a.meta.prix_produit - b.meta.prix_produit
      );
      return sortedProducts;
    },
    sortHighest() {
      let sortedProducts = this.categoryProducts.sort(
        (a, b) => b.meta.prix_produit - a.meta.prix_produit
      );
      return sortedProducts;
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

  &__search-box {
    display: flex;
    width: 100%;
    margin-top: 2rem;
  }
  &__search-icon-container {
    align-items: center;
    background: $green;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: white;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    width: 3rem;
  }
  &__search {
    border: 1px solid rgba($color: $green, $alpha: 0.75);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    color: $grey;
    display: inline-block;
    font-family: "Roboto";
    left: 4rem;
    padding: 0.75rem;
    width: 100%;
    @include breakpoint-medium {
      width: 100%;
    }
    @include breakpoint-large {
      width: 40%;
    }
    @include breakpoint-very-large {
      width: 40%;
    }
  }
  &__results {
    display: inline-block;
    font-family: "Roboto";
    margin-top: 1rem;
  }
  &__search::placeholder {
    color: $grey;
  }
  &__custom-select {
    font-family: "Roboto";
    position: relative;
    top: 1rem;
  }
  &__order-select {
    background: $green;
    color: white;
    display: flex;
    flex-direction: column;
    height: 40px;
    width: 180px;
    position: absolute;
    right: 0;
    top: 1.5rem;

    input {
      opacity: 0;
      position: absolute;
      left: -99999px;
    }

    input:checked + label {
      order: 1;
      z-index: 2;
      background: $green;
      border-top: none;
      position: relative;
    }

    input:checked + label:after {
      content: "";
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid white;
      position: absolute;
      right: 10px;
      top: calc(50% - 2.5px);
      pointer-events: none;
      z-index: 3;
    }

    input:checked + label:before {
      background: $green;
      content: "";
      height: 40px;
      position: absolute;
      right: 0;
      width: 40px;
    }
  }
  &__select-option {
    align-items: center;
    background: #206a64;
    border-top: white solid 1px;
    box-sizing: border-box;
    display: flex;
    font-family: "Roboto";
    min-height: 40px;
    order: 2;
    overflow: hidden;
    padding: 0 30px 0 10px;
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: background 0.4s ease-in-out;
    white-space: nowrap;
    width: 100%;
    z-index: 1;
  }
  &__select-option:hover {
    background: #206a64;
  }
  &__order-select:focus &__select-option {
    pointer-events: all;
    position: relative;
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
  &__sort-container {
    display: flex;
    justify-content: flex-end;
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
}
</style>
