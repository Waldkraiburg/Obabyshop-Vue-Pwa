<template>
  <main>
    <section class="product__slider">
      <img
        class="product__slider-main-image"
        id="main-image"
        :src="pictureUrl"
        alt="title"
        width="375"
        height="250"
      />
    </section>
    <section class="product__datas">
      <div class="product__datas-background">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1730 271.919"
        >
          <defs>
            <filter
              id="Tracé_7"
              x="0"
              y="0"
              width="1730"
              height="271.919"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="7" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood flood-opacity="0.161" />
              <feComposite operator="in" in2="blur" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Tracé_7)">
            <path
              id="Tracé_7-2"
              data-name="Tracé 7"
              d="M-.984,2.226S432.74-48.448,855.36-48.448s855.655,50.58,855.655,50.58V203.2L-.906,205.471Z"
              transform="translate(1720.02 207.47) rotate(180)"
              fill="#26827b"
            />
          </g>
        </svg>
      </div>
      <div class="product__datas-content">
        <p>
          <span><font-awesome-icon :icon="mapIcon" /> </span>{{ place }}
        </p>
        <h1>{{ title }}</h1>
        <span>Prix: {{ price }} €</span>
      </div>
    </section>

    <section class="product__description">
      <p>
        ARTICLE :
        <span class="product__category-description">{{ title }}</span>
      </p>
      <p>
        CATÉGORIE :
        <span class="product__category-description">{{ categoryName }}</span>
      </p>
      <span>DESCRIPTION :</span>
      <p v-html="content" class="product__content-description"></p>
      <div class="product__contact">
        <span
          >PSEUDO DU VENDEUR:
          <span class="product__seller">{{ author }}</span></span
        >
        <div id="app">
          <div v-if="!isUserConnected">
            <p>Vous devez vous connecter pour pouvoir contacter le vendeur</p>
            <div
              v-if="!isUserConnected"
              class="product__contact-button-container"
            >
              <button
                type="button"
                id="login"
                v-if="!isUserConnected"
                @click="showLoginModal = true"
              >
                Se connecter
              </button>
            </div>
            <loginModal
              v-show="showLoginModal"
              @close="showLoginModal = false"
            ></loginModal>
          </div>
          <button
            v-else
            tag="button"
            id="message-button"
            @click="showMessageModal = true"
          >
            Envoyer un message
          </button>
          <messageModal
            v-bind:authorID="authorID"
            v-show="showMessageModal"
            @close="showMessageModal = false"
          ></messageModal>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ApiClient from "../../../services/ApiClient";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
const loginModal = () => import("../../modals/LoginModal.vue");
const messageModal = () => import("../../modals/ProductModal.vue");
export default {
  name: "app",
  components: {
    FontAwesomeIcon,
    loginModal,
    messageModal,
  },
  data: function () {
    return {
      title: "",
      content: "",
      price: "",
      place: "",
      author: "",
      authorID: "",
      pictureUrl: "",
      category: "",
      categoryName: "",
      mapIcon: faMapMarkerAlt,
      showLoginModal: false,
      showMessageModal: false,
    };
  },
  created: function () {
    const productId = this.$route.params.id;
    ApiClient.get("/wp/v2/products/" + productId + "?_embed").then(
      (response) => {
        this.title = response.data.title.rendered;
        this.content = response.data.content.rendered;
        this.price = response.data.meta.prix_produit;
        this.place = response.data.meta.localite_produit;
        this.author = response.data._embedded.author[0].name;
        this.authorID = response.data.author;
        this.category = response.data.category[0];
        if (response.data._embedded["wp:featuredmedia"]) {
          this.pictureUrl =
            response.data._embedded["wp:featuredmedia"][0].source_url;
        }

        if (this.category == 2) {
          this.categoryName = "Jouets";
        } else if (this.category == 1) {
          this.categoryName = "Accessoires";
        } else if (this.category == 3) {
          this.categoryName = "Meubles";
        } else if (this.category == 4) {
          this.categoryName = "Vêtements";
        }
      }
    );
  },
  computed: {
    isUserConnected: () => {
      return localStorage.getItem("user-token");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/main.scss";
.product {
  &__slider {
    padding: 2rem 0 0 0;
    display: flex;
    justify-content: space-around;
    flex-direction: column;

    @include breakpoint-very-large {
      flex-direction: row;
      padding: 2rem 4rem;
      min-height: 86vh;
    }
  }
  &__slider-main-image {
    height: auto;
    margin-bottom: 2rem;
    width: 100%;
    animation: 1s ease fadeInAnimation;
    @include breakpoint-medium {
      width: 100%;
      margin-bottom: 2rem;
    }
    @include breakpoint-large {
      width: 50%;
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 2rem;
    }
    @include breakpoint-very-large {
      width: 70%;
      margin-bottom: 0;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
  &__slider-small-image {
    height: auto;
    width: 30%;
    @include breakpoint-medium {
      height: auto;
      width: 30%;
    }
    @include breakpoint-large {
      height: auto;
      width: 30%;
    }
    @include breakpoint-very-large {
      height: 25vh;
      width: auto;
    }
  }
  &__slider-pagination {
    display: flex;
    flex-direction: raw;
    justify-content: space-between;
    @include breakpoint-medium {
      flex-direction: row;
    }
    @include breakpoint-large {
      flex-direction: row;
    }
    @include breakpoint-very-large {
      flex-direction: column;
    }
  }

  &__datas {
    position: relative;
    z-index: -1;
  }
  &__datas-background {
    background: $green;
    height: 6rem;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    width: calc(100%);
    z-index: -1;
    svg {
      display: none;

      @include breakpoint-medium {
        display: block;
        width: auto;
        height: auto;
      }
      @include breakpoint-large {
        width: auto;
        height: auto;
      }
      @include breakpoint-very-large {
        width: auto;
        height: auto;
      }
    }

    @include breakpoint-medium {
      background: none;
      height: 350px;
      width: calc(100%);
    }
    @include breakpoint-large {
      background: none;
      height: 200px;
      width: calc(100% - 3rem);
    }
    @include breakpoint-very-large {
      width: calc(100% - 7rem + 2px);
    }
  }
  &__datas-content {
    align-items: center;
    box-sizing: border-box;
    color: white;
    font-family: "Roboto", sans-serif;
    font-size: 1.2em;
    height: 6rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    position: relative;
    top: 0;
    p {
      span {
        display: inline-block;
        margin-right: 0.5rem;
      }
    }
    h1 {
      display: none;
      @include breakpoint-large {
        display: block;
      }
      @include breakpoint-very-large {
        display: block;
      }
    }
    @include breakpoint-medium {
      flex-direction: row;
      font-size: 1.2em;
      height: 85px;
      padding-left: 2rem;
      padding-right: 2rem;
    }
    @include breakpoint-large {
      flex-direction: row;
      font-size: 1.5em;
      height: 140px;
      padding-left: 8rem;
      padding-right: 8rem;
    }
    @include breakpoint-very-large {
      height: 200px;
      font-size: 1.5em;
      padding-left: 8rem;
      padding-right: 8rem;
    }
  }
  &__category-description {
    color: $green;
    font-weight: bold;
  }
  &__content-description {
    margin-top: 3rem;
    overflow-wrap: anywhere;
  }
  &__description {
    border: 1px solid rgba($color: #707070, $alpha: 0.25);
    border-top: none;
    font-family: "Roboto", sans-serif;
    line-height: 1.6em;
    font-size: 1.4em;
    margin: 0 0 4rem 0;
    padding: 4rem 1rem 6rem 1rem;

    @include breakpoint-medium {
      margin: 0 0.5rem 4rem 0.5rem;
      padding: 7rem 1rem 6rem 1rem;
    }
    @include breakpoint-large {
      margin: 0 2rem 4rem 2rem;
      padding: 4rem 4rem 6rem 4rem;
    }
    @include breakpoint-very-large {
      margin: 0 4rem 4rem 4rem;
      padding: 8rem 4rem 6rem 4rem;
    }
  }

  &__contact {
    display: flex;
    flex-direction: column;
    font-family: "Roboto", sans-serif;
    justify-content: space-between;
    margin-top: 4rem;
    padding-left: 1rem;
    padding-right: 1rem;

    button {
      background: $green;
      border-radius: 5px;
      box-shadow: -5px 5px rgba($color: #707070, $alpha: 0.5);
      color: white;
      font-family: "Roboto", sans-serif;
      margin-left: auto;
      margin-right: auto;
      margin-top: 2rem;
      padding: 0.25rem 0.75rem;
    }
    button:active {
      box-shadow: -1px 1px rgba($color: #707070, $alpha: 0.5);
    }
    @include breakpoint-medium {
      flex-direction: column;
      padding-left: 4rem;
      padding-right: 4rem;
    }
    @include breakpoint-large {
      flex-direction: row;
      padding-left: 5rem;
      padding-right: 5rem;
    }
    @include breakpoint-very-large {
      flex-direction: row;
      padding-left: 10rem;
      padding-right: 10rem;
    }
  }
  &__seller {
    color: $green;
    font-style: italic;
    font-weight: bold;
  }
}
@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
