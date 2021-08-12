<template>
  <transition name="slide-fade">
    <section class="inscription-modal" id="inscription-modal">
      <div class="inscription-modal__container" id="message-container">
        <h3 class="inscription-modal__title">S'inscrire</h3>
        <span class="inscription-modal__close" id="inscription-modal-close"
          ><font-awesome-icon :icon="closeIcon" @click="close"
        /></span>
        <form v-on:submit.prevent="registerCheckForm">
          <fieldset>
            <div class="inscription-modal__field">
              <label for="username" class="inscription-modal__label"
                >Identifiant</label
              >
              <input
                v-model="username"
                class="conection-form__input"
                type="text"
                placeholder="Entrez un identifiant"
                name="username"
                required="required"
              />
            </div>
            <div class="inscription-modal__field">
              <label for="first_name" class="inscription-modal__label"
                >Votre prénom</label
              >
              <input
                v-model="first_name"
                class="conection-form__input"
                type="text"
                placeholder="Ecrivez votre prénom ici"
                name="first_name"
                required="required"
              />
            </div>
            <div class="inscription-modal__field">
              <label for="last_name" class="inscription-modal__label"
                >Votre nom</label
              >
              <input
                v-model="last_name"
                class="conection-form__input"
                type="text"
                placeholder="Ecrivez votre nom ici"
                name="last_name"
                required="required"
              />
            </div>
            <div class="inscription-modal__field">
              <label for="towns" class="inscription-modal__label"
                >Votre ville:</label
              >
              <select
                v-model="city"
                name="towns"
                class="inscription-modal__select"
                required="required"
              >
                <option value>--Choisir une ville--</option>
                <option value="Paris">Paris</option>
                <option value="Montpellier">Montpellier</option>
                <option value="Lille">Lille</option>
                <option value="Strasbourg">Strasbourg</option>
                <option value="Nantes">Nantes</option>
              </select>
            </div>
            <div class="conection-form__field">
              <label for="email" class="inscription-modal__label"
                >Adresse e-mail</label
              >
              <input
                v-model="email"
                class="conection-form__input"
                type="text"
                placeholder="Ecrivez votre e-mail ici"
                name="email"
                required="required"
              />
            </div>
            <div class="conection-form__field">
              <label for="password" class="inscription-modal__label"
                >Mot de passe</label
              >
              <input
                v-model="password"
                class="conection-form__input"
                type="password"
                placeholder="Mot de passe"
                name="password"
                required="required"
              />
            </div>
            <div class="conection-form__field">
              <label for="passwordCheck" class="inscription-modal__label"
                >Confirmation</label
              >
              <input
                v-model="passwordConfirmation"
                class="conection-form__input"
                type="password"
                placeholder="Confirmez le mot de passe"
                name="passwordCheck"
                required="required"
              />
            </div>
          </fieldset>
          <!-- Errors list -->
          <ul class="error-list">
            <li v-for="error in errorList" v-bind:key="error.id">
              {{ error.message }}
            </li>
          </ul>
          <button class="inscription-modal__button">Créer le compte</button>
        </form>
      </div>
    </section>
  </transition>
</template>

<script>
import ApiClient from "../../services/ApiClient";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "registerModal",
  components: {
    FontAwesomeIcon,
  },
  data: function () {
    return {
      closeIcon: faTimes,
      username: "",
      first_name: "",
      last_name: "",
      city: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      serverErrorMessage: "",
      errorList: [],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    registerAlert() {
      this.$swal.fire(
        "Compte créé",
        "Vous pouvez maintenant vous connecter avec vos identifiants.",
        "success"
      );
    },
    registerCheckForm: function () {
      this.errorList = [];
      if (this.username.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Veuillez indiquer un nom d'utilisateur",
        });
      }
      if (this.first_name.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Veuillez indiquer un prénom",
        });
      }
      if (this.last_name.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Veuillez indiquer un nom",
        });
      }
      if (!this.city.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Vous devez sélectionner une ville",
        });
      }
      if (!this.email.includes("@")) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Vous devez indiquer un email valide",
        });
      }
      if (this.password.length < 8) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Le mot de passe est trop court !",
        });
      }
      if (this.password != this.passwordConfirmation) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Vous devez confirmer votre mot de passe !",
        });
      }
      if (this.errorList.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Opération en cours",
        });

        ApiClient.post("/wp/v2/users/register", {
          username: this.username,
          first_name: this.first_name,
          last_name: this.last_name,
          city: this.city,
          email: this.email,
          password: this.password,
        })
          .then((response) => {
            this.serverErrorMessage = "";
            if (response.data.code == 200) {
              this.close();
              this.registerAlert();
            } else {
              this.serverErrorMessage = response.data.message;
              this.errorList.push({
                id: this.errorList.length + 1,
                message: response.data.message,
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
  computed: {
    isUserConnected: () => {
      return localStorage.getItem("user-token");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
.slide-fade-enter-active {
  transition: all 0.6s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
.inscription-modal {
  align-items: center;
  display: flex;
  font-size: 0.8em;
  height: 100vh;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000000;
  @include breakpoint-medium {
    font-size: 1em;
  }
  @include breakpoint-large {
    font-size: 1em;
  }
  @include breakpoint-very-large {
    font-size: 1em;
  }
  &__close {
    color: white;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
  &__title {
    background: none !important;
    color: white;
    font-family: "Catamaran";
    text-transform: uppercase;
    text-align: center;
  }
  &__select {
    background: white !important;
    color: $grey !important;
    padding: 0.5rem;
    margin-top: 0rem;
    margin-bottom: 0rem;
    @include breakpoint-medium {
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
    }
    @include breakpoint-large {
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
    }
    @include breakpoint-very-large {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
  &__container {
    background: $green;
    border-radius: 0;
    height: 100vh;
    padding: 0;
    position: relative;
    width: 100%;
    @include breakpoint-medium {
      border-radius: 0;
      height: auto;
      padding: 0.25rem;
      width: 100vw;
    }
    @include breakpoint-large {
      border-radius: 15px;
      border-bottom-right-radius: 75px;
      border-top-left-radius: 75px;
      height: auto;
      padding: 0.25rem;
      width: 45vw;
    }
    @include breakpoint-very-large {
      border-radius: 15px;
      border-bottom-right-radius: 75px;
      border-top-left-radius: 75px;
      height: auto;
      padding: 0.5rem;
      width: 35vw;
    }
    fieldset {
      border: none;
    }
    form {
      padding-bottom: 2rem;
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
      padding: 0.25rem;
      margin-bottom: 0.1rem;
      margin-top: 0.1;
      width: 100%;
      @include breakpoint-medium {
        margin-bottom: 0.25rem;
        margin-top: 0.25rem;
        padding: 0.5rem;
      }
      @include breakpoint-large {
        margin-bottom: 0.25rem;
        margin-top: 0.25rem;
        padding: 0.5rem;
      }
      @include breakpoint-very-large {
        margin-bottom: 0.25rem;
        margin-top: 0.5rem;
        padding: 0.5rem;
      }
    }
    input:focus {
      box-shadow: 0 0 3pt 2pt $orange;
    }
  }
  &__label {
    color: white;
    font-family: "Catamaran";
  }
  &__title {
    background: $green;
    color: white;
    display: block;
    padding: 0.5rem;
  }
  &__container::before {
    content: "";
    background: white;
    opacity: 0.7;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
  &__button {
    background: $orange;
    color: white;
    margin-left: auto !important;
    margin-right: auto !important;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }
  &__field {
    margin: 0 !important;
  }
}
.error-list {
  color: white;
  font-size: 1em;
  margin-bottom: 1rem;
  text-align: center;
  @include breakpoint-medium {
    font-size: 1.1em;
  }
  @include breakpoint-large {
    font-size: 1.1em;
  }
  @include breakpoint-very-large {
    font-size: 1.1em;
  }
}
</style>
