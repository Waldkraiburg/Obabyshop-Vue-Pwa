<template>
  <transition name="slide-fade">
    <section class="login-modal" id="login-modal">
      <div class="login-modal__container" id="message-container">
        <h3 class="login-modal__title">Se connecter</h3>
        <span class="login-modal__close" id="login-modal-close">
          <font-awesome-icon :icon="closeIcon" @click="close" />
        </span>
        <form v-on:submit.prevent="loginCheckForm">
          <fieldset>
            <div class="login-modal__field">
              <label class="login-modal__label">Votre nom d'utilisateur</label>
              <input
                v-model="username"
                ref="usernameInput"
                class="login-modal__input"
                type="text"
                placeholder="Ecrivez ici"
              />
            </div>
            <div class="login-modal__field">
              <label class="login-modal__label">Votre mot de passe</label>
              <input
                v-model="password"
                class="login-modal__input"
                type="password"
                placeholder="Ecrivez ici"
              />
              <!-- Errors list -->
              <ul class="login-modal__error-list">
                <li v-for="error in errorList" v-bind:key="error.id">
                  {{ error.message }}
                </li>
              </ul>
            </div>
          </fieldset>
          <button class="login-modal__button">Envoyer</button>
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
  name: "loginModal",
  components: {
    FontAwesomeIcon,
  },
  data: () => {
    return {
      closeIcon: faTimes,
      username: "",
      password: "",
      serverErrorMessage: "",
      errorList: [],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loginAlert() {
      this.$swal
        .fire({
          icon: "success",
          title: "Connexion réussie",
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
    reload: () => {
      this.$router.go(this.$router.currentRoute);
    },
    loginCheckForm() {
      this.errorList = [];
      if (this.username.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Vous devez saisir un nom d'utilisateur",
        });
      }
      if (this.password.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Vous devez saisir un mot de passe",
        });
      }
      if (this.errorList.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Connexion en cours",
        });

        ApiClient.post("/jwt-auth/v1/token", {
          username: this.username,
          password: this.password,
        })
          .then((response) => {
            this.serverErrorMessage = "";
            if (response.data.success == true) {
              this.close();
              // catch token
              const token = response.data.data.token;
              // stock token in localstorage
              localStorage.setItem("user-token", token);
              this.loginAlert();
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
.login-modal {
  font-size: 0.8em;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 10000000;
  @include breakpoint-medium {
    align-items: center;
    display: flex;
    font-size: 1em;
    justify-content: center;
  }
  @include breakpoint-large {
    align-items: center;
    display: flex;
    font-size: 1em;
    justify-content: center;
  }
  @include breakpoint-very-large {
    align-items: center;
    display: flex;
    font-size: 1em;
    justify-content: center;
  }
  &__title {
    color: white;
    font-family: "Catamaran";
    text-transform: uppercase;
    text-align: center;
  }
  &__close {
    color: white;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  &__select {
    background: white;
    color: $grey;
    padding: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  &__container {
    background: $green;
    border-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 0;
    height: 100vh;
    padding: 2rem 1rem 2rem 1rem;
    position: relative;
    width: 100vw;
    @include breakpoint-medium {
      border-radius: 15px;
      border-bottom-right-radius: 75px;
      border-top-left-radius: 75px;
      height: auto;
      width: 80vw;
    }
    @include breakpoint-large {
      border-radius: 15px;
      border-bottom-right-radius: 75px;
      border-top-left-radius: 75px;
      height: auto;
      width: 35vw;
    }
    @include breakpoint-very-large {
      border-radius: 15px;
      border-bottom-right-radius: 75px;
      border-top-left-radius: 75px;
      height: auto;
      width: 25vw;
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
      border-radius: 10px;
      color: $grey;
      padding: 0.5rem;
      margin-bottom: 1.5rem;
      width: 100%;
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
    background: $orange !important;
    color: white;
    margin-left: auto;
    margin-right: auto;
    padding: 0.5rem 1rem;
    border-radius: 10px !important;
  }
  &__error-list {
    color: white;
    font-size: 1em;
    margin-bottom: 1rem;
    margin-top: 1.5rem;
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
  &__field {
    margin-right: 0 !important;
  }
}
</style>
