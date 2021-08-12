<template>
  <transition name="slide-fade">
    <section class="product-modal" id="message-modal">
      <div class="product-modal__container" id="message-container">
        <span class="product-modal__close" id="product-modal-close"
          ><font-awesome-icon :icon="closeIcon" @click="closeModal"
        /></span>
        <form v-on:submit.prevent="checkForm">
          <label class="product-modal__title" for="client-message"
            >Ecrivez votre message:</label
          >
          <textarea
            v-model="message"
            id="client-message"
            name="client-message"
            placeholder="Ecrivez ici ..."
            style="height: 250px"
          ></textarea>
          <input type="submit" value="Envoyer" />
          <!-- Errors list -->
          <ul class="product-modal__error-list">
            <li v-for="error in errorList" v-bind:key="error.id">
              {{ error.message }}
            </li>
          </ul>
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
  props: ["authorID"],
  components: {
    FontAwesomeIcon,
  },
  data: () => {
    return {
      closeIcon: faTimes,
      message: "",
      serverErrorMessage: "",
      errorList: [],
      author: "",
    };
  },
  name: "modal",
  methods: {
    closeModal() {
      this.$emit("close");
    },
    sendedMessageAlert() {
      this.$swal.fire({
        icon: "success",
        title: "Votre message a bien été envoyé",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        showConfirmButton: false,
        timer: 2500,
      });
    },
    checkForm: function () {
      this.errorList = [];
      if (this.message.length < 3) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Le message est trop court !",
        });
      }
      if (this.errorList.length === 0) {
        this.errorList.push({
          id: this.errorList.length + 1,
          message: "Envoi en cours",
        });
        ApiClient.post("/wp/v2/users/messages", {
          content: this.message,
          recipient_id: this.authorID,
        })
          .then((response) => {
            this.serverErrorMessage = "";
            if (response.status == 200) {
              this.closeModal();
              this.sendedMessageAlert();
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
    isUserConnected: function () {
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
.product-modal {
  align-items: center;
  animation: fadeInAnimation ease-in-out 0.4s;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10000000;
  &__close {
    color: white;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
  &__container {
    background: $green;
    border-radius: 0;
    font-family: "Roboto", sans-serif;
    height: 100%;
    padding: 2rem;
    position: relative;
    width: 100vw;
    @include breakpoint-medium {
      border-radius: 15px;
      height: 50%;
      width: 80vw;
    }
    @include breakpoint-large {
      border-radius: 15px;
      height: 50%;
      width: 50vw;
    }
    @include breakpoint-very-large {
      border-radius: 15px;
      height: 50%;
      width: 50vw;
    }
    form textarea {
      background: white;
      border: 1px solid rgba($color: #707070, $alpha: 0.5);
      height: 100%;
      padding: 0.5rem;
      resize: none;
      width: 100%;
    }
    input {
      background: $orange;
      border-radius: 3px;
      color: white;
      margin-top: 2rem;
      padding: 0 0.5rem 0 0.5rem;
    }
  }
  &__title {
    background: $green;
    color: white;
    display: block;
    padding: 0.5rem;
  }
  &__container::before {
    background: white;
    content: "";
    height: 100vh;
    left: 0;
    opacity: 0.7;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: -1;
  }
  &__error-list {
    color: white;
    font-size: 1em;
    margin-bottom: 1rem;
    margin-top: 1rem;
    text-align: center;
  }
}
</style>
