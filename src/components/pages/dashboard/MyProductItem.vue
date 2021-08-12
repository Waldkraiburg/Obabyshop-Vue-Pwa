<template>
  <article>
    <div class="categories__my-article">
      <button type="button" class="categories__delete" @click="deleteAlert">
        Effacer
      </button>
      <div class="categories__article-header">
        <a :href="`/articles/${productProp.id}`"
          ><img
            :src="mediaUrl"
            :alt="productProp.title.rendered"
            loading="lazy"
        /></a>
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
import ApiClient from "../../../services/ApiClient";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert2";
export default {
  components: {
    FontAwesomeIcon,
  },
  props: ["productProp"],
  computed: {
    mediaUrl() {
      if (this.productProp.featured_media_url != "") {
        return this.productProp.featured_media_url;
      } else {
        return (
          "https://source.unsplash.com/collection/157&random=" +
          Math.random() * 1000
        );
      }
    },
  },
  data: function () {
    return {
      myIcon: faMapMarkerAlt,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    reload: function () {
      this.$router.go(this.$router.currentRoute);
    },
    deleteAlert: function () {
      swal
        .fire({
          title: "Etes-vous sûr(e)?",
          text: "Cette opération est irréversible !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Annuler",
          confirmButtonText: "Oui, effacer mon annonce !",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            const productId = this.productProp.id;
            ApiClient.delete("/wp/v2/products/" + productId);
            this.$swal
              .fire({
                icon: "success",
                title: "Votre annonce a bien été effacée",
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
                showConfirmButton: false,
                timer: 2500,
              })
              .then(() => {
                location.reload();
              });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/main.scss";
.categories {
  &__article-status {
    position: absolute;
    top: 0;
  }
  &__my-article {
    position: relative;
  }
  &__delete {
    background: red;
    color: white;
    padding: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }
  &__article-container {
    box-sizing: border-box;
  }
  &__article-header {
    height: auto;
    position: relative;
    width: 100%;
    img {
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    }
  }

  &__article-heart {
    font-size: 1.75rem;
    position: absolute;
    right: 0;
    top: 0.5rem;
    input {
      display: none;
      &:checked + label i {
        animation: heart 1.3s forwards ease;
        background: $green;
        border-top-right-radius: 10px;
        color: $orange;
        padding: 0.5rem;
      }
    }
  }
  &__icon {
    background: $green;
    border-top-right-radius: 10px;
    color: white;
    padding: 0.5rem;
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
  &__article-icon {
    line-height: 1.5em;
  }
  &__article-line {
    background: $grey;
    height: 1px;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
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
