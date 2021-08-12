<template>
  <div>
    <div class="dashboard__title-container">
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
      <h1 class="dashboard__title">Mettre une annonce en ligne</h1>
    </div>
    <div class="add-product-form">
      <form v-on:submit.prevent="checkForm">
        <fieldset>
          <div class="add-product-form__field">
            <label for="productame" class="add-product-form__label"
              >Nom du produit</label
            >
            <input
              v-model="title"
              class="add-product-form__input"
              type="text"
              placeholder="Nom du produit"
              name="productName"
              id="productName"
            />
          </div>
          <div class="add-product-form__field">
            <label for="categories" class="add-product-form__label"
              >Catégorie:</label
            >
            <select
              v-model="category"
              name="categories"
              class="add-product-form__select"
              id="categories"
            >
              <option value>Choisir une catégorie</option>
              <option value="7">Vêtements</option>
              <option value="4">Jouets</option>
              <option value="5">Meubles</option>
              <option value="6">Accessoires</option>
            </select>
          </div>
          <div class="add-product-form__field">
            <label for="cities" class="add-product-form__label">Ville:</label>
            <select
              v-model="localite_produit"
              name="cities"
              class="add-product-form__select"
              id="cities"
            >
              <option value>Choisir une ville</option>
              <option value="Paris">Paris</option>
              <option value="Montpellier">Montpellier</option>
              <option value="Lille">Lille</option>
              <option value="Strasbourg">Strasbourg</option>
              <option value="Nantes">Nantes</option>
            </select>
          </div>
          <div class="add-product-form__field">
            <label for="main-image" class="add-product-form__label"
              >Ajouter une image principale<br />(taille image max 1Mo)</label
            >
            <input
              v-on:change="loadFile"
              type="file"
              class="add-product-form__input"
              id="main-image"
              name="main-image"
              required="required"
            />
          </div>
          <div class="add-product-form__field">
            <label for="price" class="add-product-form__label"
              >Indiquer un prix</label
            >
            <input
              v-model="prix_produit"
              class="add-product-form__input"
              type="text"
              placeholder="Prix de votre article"
              name="price"
              id="price"
            />
          </div>
          <div class="add-product-form__field">
            <label for="description" class="add-product-form__label"
              >Description</label
            >
            <textarea
              id="description"
              v-model="content"
              name="description"
              rows="10"
              cols="80"
            >
	          Ajouter une description ici</textarea
            >
          </div>
        </fieldset>
        <ul class="add-product-form__error-list" v-if="errorList.length > 0">
          <!-- Errors list -->
          <li v-for="error in errorList" v-bind:key="error.id">
            {{ error.message }}
          </li>
        </ul>
        <button class="add-product-form__button">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<script>
import ApiClient from "../../../services/ApiClient";

export default {
  data: () => {
    return {
      title: "",
      category: "",
      localite_produit: "",
      dispo_produit: "",
      prix_produit: "",
      content: "",
      picture: "",
      serverErrorMessage: "",
      errorList: [],
    };
  },
  methods: {
    uploadAlert() {
      this.$swal
        .fire({
          icon: "success",
          title: "Votre annonce est maintenant en ligne",
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
          window.location.href = "/mon-compte";
        });
    },
    loadFile: function (event) {
      this.picture = event.target.files[0];
    },
    reload: () => {
      this.$router.go(this.$router.currentRoute);
    },
    checkForm: function () {
      this.errorList = [];
      if (this.title.length < 1) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Vous devez indiquer un nom de produit",
        });
      }
      if (this.category.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Vous devez choisir une catégorie",
        });
      }
      if (this.localite_produit.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Vous devez choisir une localité",
        });
      }
      if (this.prix_produit.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Vous devez indiquer un prix",
        });
      }
      if (this.content.length < 10) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Votre description doit contenir au moins 10 caractères",
        });
      }
      if (this.errorList.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Ajout en cours ...",
        });
        ApiClient.post("/wp/v2/products", {
          category: this.category,
          meta: {
            localite_produit: this.localite_produit,
            prix_produit: this.prix_produit,
          },
          title: this.title,
          content: this.content,
          status: "publish",
        })
          .then((response) => {
            this.serverErrorMessage = "";
            if (response.status == 201) {
              ApiClient.postfile(
                "/wp/v2/media?featured=" + response.data.id,
                this.picture
              ).then((response) => {
                this.serverErrorMessage = "";
                if (response.status == 201) {
                  this.uploadAlert();
                } else {
                  this.serverErrorMessage = response.data.message;
                  this.errorList.push({
                    id: this.errorList.length + 1,
                    message: response.data.message,
                  });
                }
              });
            }
          })
          .catch((error) => {
            this.serverErrorMessage = error.response.data.message;
            this.errorList.push({
              id: this.errorList.length + 1,
              message: error.response.data.message,
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/main.scss";
.dashboard {
  &__title-container {
    position: relative;
    margin-top: 2rem;
    svg {
      display: none;
      @include breakpoint-medium {
        display: none;
      }

      @include breakpoint-large {
        display: block;
      }

      @include breakpoint-very-large {
        display: block;
      }
    }
  }
  &__title {
    color: white;
    font-family: "Catamaran";
    font-size: 1em;
    position: absolute;
    top: 2rem;
    left: 50%;
    text-align: center;
    text-transform: uppercase;
    transform: translateX(-50%);
    width: 100%;
    @include breakpoint-medium {
      font-size: 1.2em;
      top: 2rem;
      width: 80%;
    }
    @include breakpoint-large {
      font-size: 1.4em;
      top: 3rem;
    }
    @include breakpoint-very-large {
      font-size: 1.4em;
      top: 3rem;
    }
  }
  &__title::after {
    position: absolute;
    content: "";
    left: 50%;
    top: 1.75rem;
    width: 180px;
    height: 0;
    border: 1px solid transparent;
    border-color: #fff transparent transparent transparent;
    transform: translateX(-50%);
    @include breakpoint-medium {
      border: 2px solid transparent;
      border-color: #fff transparent transparent transparent;
      top: 1.75rem;
    }
    @include breakpoint-large {
      border: 2px solid transparent;
      border-color: #fff transparent transparent transparent;
      top: 2rem;
    }
    @include breakpoint-very-large {
      border: 2px solid transparent;
      border-color: #fff transparent transparent transparent;
      top: 2rem;
    }
  }
}
.add-product-form {
  background: $green;
  border-radius: 10px;
  color: white;
  font-family: "Catamaran";
  margin: 1rem;
  padding: 6rem 0.25rem;
  @include breakpoint-medium {
    margin: 1rem;
    padding: 6rem 2rem;
  }
  @include breakpoint-large {
    margin: 4rem;
    padding: 4rem;
  }
  @include breakpoint-very-large {
    margin: 4rem;
    padding: 4rem;
  }
  fieldset {
    border: none;
  }
  form textarea {
    background: white;
    padding: 0.5rem;
    width: 100%;
  }
  input {
    background: white;
    border-radius: 3px;
    color: $grey;
    padding: 0.5rem;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
    width: 100%;
  }
  &__select {
    background: white;
    color: $grey;
    padding: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  &__label {
    color: white;
    font-size: 1.2em;
    @include breakpoint-medium {
      font-size: 1.3em;
    }
    @include breakpoint-large {
      font-size: 1.3em;
    }
    @include breakpoint-very-large {
      font-size: 1.4em;
    }
  }
  &__field {
    color: $grey;
  }
  button {
    background: $orange;
    color: white;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }
  &__error-list {
    text-align: center;
    margin-bottom: 2rem;
    margin-top: 2rem;
    text-transform: uppercase;
  }
}
</style>
