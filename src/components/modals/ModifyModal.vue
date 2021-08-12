<template>
  <transition name="slide-fade">
    <section class="modify-modal" id="modify-modal">
      <div class="modify-modal__container" id="modify-container">
        <h3 class="modify-modal__title">
          Veuillez remplir les champs du formulaire:
        </h3>
        <span class="modify-modal__close" id="modify-modal-modal-close"
          ><font-awesome-icon :icon="closeIcon" @click="close"
        /></span>
        <form v-on:submit.prevent="checkForm">
          <fieldset>
            <div class="modify-modal_field">
              <label for="username" class="field__label"
                >Votre nom d'utilisateur</label
              >
              <input
                v-model="nickname"
                class="conection-form__input"
                type="text"
                :placeholder="nickname"
                name="nickname"
                id="nickname"
                readonly="readonly"
              />
            </div>
            <div class="modify-modal_field">
              <label for="first_name" class="field__label"
                >Indiquez votre prénom</label
              >
              <input
                v-model="first_name"
                class="conection-form__input"
                type="text"
                placeholder="Ecrivez votre prénom ici"
                name="first_name"
                id="new_first_name"
              />
            </div>
            <div class="modify-modal__field">
              <label for="last_name" class="field__label"
                >Indiquez votre nom</label
              >
              <input
                v-model="last_name"
                class="conection-form__input"
                type="text"
                placeholder="Ecrivez votre nom ici"
                name="last_name"
                id="new_last_name"
              />
            </div>
            <div class="modify-modal__field">
              <label for="towns" class="inscription-modal__label"
                >Votre ville:</label
              >
              <select
                v-model="city"
                name="towns"
                class="inscription-modal__select"
                id="new_towns"
              >
                <option value>--Choisir une ville--</option>
                <option value="Paris">Paris</option>
                <option value="Montpellier">Montpellier</option>
                <option value="Lille">Lille</option>
                <option value="Strasbourg">Strasbourg</option>
                <option value="Nantes">Nantes</option>
              </select>
            </div>
            <div class="modify-modal__field">
              <label for="email" class="field__label">Adresse e-mail</label>
              <input
                v-model="email"
                class="conection-form__input"
                type="text"
                placeholder="Ecrivez votre mail ici"
                name="email"
                id="new_email"
              />
            </div>
            <div class="modify-modal__field">
              <label for="password" class="conection-form__label"
                >Mot de passe</label
              >
              <input
                v-model="password"
                class="conection-form__input"
                type="password"
                placeholder="Mot de passe"
                name="password"
                id="new_password"
              />
            </div>
            <div class="modify-modal__field">
              <label for="passwordCheck" class="field__label"
                >Confirmation</label
              >
              <input
                v-model="passwordConfirmation"
                class="conection-form__input"
                type="password"
                placeholder="Confirmez le mot de passe"
                name="passwordCheck"
                id="new_passwordCheck"
              />
            </div>
          </fieldset>
          <ul class="error-list" v-if="errorList.length > 0">
            <li v-for="error in errorList" v-bind:key="error.id">
              {{ error.message }}
            </li>
          </ul>
          <button class="modify-modal__button">Modifier mes infos</button>
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
  props: ["id", "nickname"],
  name: "modifyModal",
  components: {
    FontAwesomeIcon,
  },
  data: () => {
    return {
      closeIcon: faTimes,
      first_name: "",
      last_name: "",
      city: "",
      email: "",
      passwordConfirmation: "",
      password: "",
      errorList: [],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    reload: () => {
      this.$router.go(this.$router.currentRoute);
    },
    modifyAlert() {
      this.$swal
        .fire({
          icon: "success",
          title: "Modification réussie",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2000,
        })
        .then(() => {
          location.reload();
        });
    },
    errorAlert() {
      this.$swal
        .fire({
          icon: "error",
          title: "Oups",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2000,
        })
        .then(() => {
          location.reload();
        });
    },
    checkForm: function () {
      this.errorList = [];
      if (this.password.length < 3) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Le mot de passe est trop court !",
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
      if (this.errorList.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Opération en cours",
        });
        ApiClient.post("/wp/v2/users/me", {
          nickname: this.nickname,
          first_name: this.first_name,
          last_name: this.last_name,
          city: this.city,
          email: this.email,
          password: this.password,
        })
          .then((response) => {
            this.serverErrorMessage = "";
            if (response.status == 200) {
              this.modifyAlert();
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
.modify-modal {
  align-items: center;
  animation: fadeInAnimation ease-in-out 0.4s;
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow: scroll;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 10000000;

  &__close {
    color: white;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
  &__title {
    color: white;
    font-family: "Catamaran";
    text-align: center;
  }
  &__select {
    background: white;
    color: $grey;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0.5rem;

    @include breakpoint-medium {
      margin-top: 0.3rem 0;
    }
    @include breakpoint-large {
      margin-top: 0.5rem 0;
    }
    @include breakpoint-very-large {
      margin-top: 0.5rem 0;
    }
  }
  &__container {
    background: $green;
    border-radius: 0;
    font-family: "Catamaran";
    font-size: 1.2em;
    height: 100vh;
    padding: 0;
    position: relative;
    width: 100%;
    @include breakpoint-medium {
      height: auto;
      border-radius: 0;
      padding: 1rem;
      width: 100vw;
    }
    @include breakpoint-large {
      border-radius: 15px;
      border-bottom-right-radius: 75px;
      border-top-left-radius: 75px;
      height: auto;
      padding: 1rem;
      width: 45vw;
    }
    @include breakpoint-very-large {
      border-radius: 15px;
      border-bottom-right-radius: 75px;
      border-top-left-radius: 75px;
      height: auto;
      padding: 1rem;
      width: 40vw;
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
      padding: 0.25rem;
      margin-bottom: 0.1rem;
      margin-top: 0.1rem;
      width: 100%;
      @include breakpoint-medium {
        margin-bottom: 0.5rem;
        margin-top: 0.5rem;
        padding: 0.5rem;
      }
      @include breakpoint-large {
        margin-bottom: 0.5rem;
        margin-top: 0.1rem;
        padding: 0.5rem;
      }
      @include breakpoint-very-large {
        margin-bottom: 0.5rem;
        margin-top: 0.1rem;
        padding: 0.3rem 0.5rem;
      }
    }
  }

  &__label {
    color: white;
    font-family: "Catamaran";
  }
  &__title {
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
    margin-left: auto;
    margin-right: auto;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }
}
.inscription-modal {
  &__select {
    background: white !important;
    color: $grey !important;
    padding: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
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
