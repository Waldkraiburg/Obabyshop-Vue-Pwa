<template>
  <div>
    <div class="messages__container" @click="toggleAccordion">
      <span class="messages__container-sender"
        >De {{ messageProp.user_nicename }}</span
      >
      <div>
        <span>Message:</span>
        <p>{{ messageProp.content }}</p>
      </div>
      <span>{{ messageProp.date }}</span>
    </div>
    <div class="messages__content-container" :class="accordionClasses">
      <p class="messages__content">
        <span class="messages__message-label">Message:</span>
        {{ messageProp.content }}
      </p>
      <div class="seller-modal__container" id="message-container">
        <form v-on:submit.prevent="checkForm">
          <label class="seller-modal__title" for="client-message"
            >Répondre à {{ messageProp.user_nicename }}:</label
          >
          <textarea
            v-model="message"
            id="client-message"
            name="my-message"
            placeholder="Ecrivez ici ..."
            style="height: 250px"
          ></textarea>
          <input type="submit" value="Envoyer" />
          <ul class="seller-modal__error-list">
            <!-- liste d'erreurs -->
            <li v-for="error in errorList" v-bind:key="error.id">
              {{ error.message }}
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ApiClient from "../../../services/ApiClient";
export default {
  props: ["messageProp"],
  components: {},
  data: () => {
    return {
      isClosed: true,
      message: "",
      serverErrorMessage: "",
      errorList: [],
      recipient_id: "",
    };
  },
  methods: {
    toggleAccordion() {
      this.isClosed = !this.isClosed;
    },
    sendedMessageAlert() {
      this.$swal
        .fire({
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
        })
        .then(() => {
          location.reload();
        });
    },
    reload: () => {
      this.$router.go(this.$router.currentRoute);
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
          recipient_id: this.messageProp.sender_id,
        }).then((response) => {
          this.serverErrorMessage = "";
          if (response.status == 200) {
            this.sendedMessageAlert();
          } else {
            this.serverErrorMessage = response.data.message;
          }
        });
      }
    },
  },
  computed: {
    accordionClasses: function () {
      return {
        "is-closed": this.isClosed,
      };
    },
    isUserConnected: () => {
      return localStorage.getItem("user-token");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/main.scss";
.messages {
  padding: 8rem;
  min-height: 100vh;
  @include breakpoint-medium {
    padding: 2rem;
  }
  @include breakpoint-large {
    padding: 8rem;
  }
  @include breakpoint-very-large {
    padding: 8rem;
  }
  &__not-connected {
    font-size: 1.5em;
    font-style: "Lato";
    margin: 4rem;
  }
  &__container {
    background: $green;
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
    font-style: "Lato";
    justify-content: space-between;
    margin-top: 2rem;
    padding: 0.75rem;
    @include breakpoint-medium {
      flex-direction: column;
      font-size: 1.3em;
    }
    @include breakpoint-large {
      flex-direction: row;
      font-size: 1.3em;
      padding: 2rem;
    }
    @include breakpoint-very-large {
      flex-direction: row;
      font-size: 1.3em;
      padding: 2rem;
    }
  }
  &__container-sender {
    font-style: italic;
  }
  &__message-label {
    font-size: 1.1em;
    display: block;
  }
  &__container :nth-child(1n) {
    width: 100%;
    @include breakpoint-medium {
      width: 100%;
    }
    @include breakpoint-large {
      width: 25%;
    }
    @include breakpoint-very-large {
      width: 25%;
    }
  }
  &__container :nth-child(2n) {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    white-space: nowrap;
    @include breakpoint-medium {
      width: 100%;
    }
    @include breakpoint-large {
      width: 50%;
    }
    @include breakpoint-very-large {
      width: 50%;
    }
    span,
    p {
      display: inline;
    }
    p {
      margin-left: 0.5rem;
    }
  }
  &__content {
    border-top: 1px solid white;
    padding-top: 2rem;
    overflow-wrap: break-word;
    @include breakpoint-medium {
      width: 100%;
    }
    @include breakpoint-large {
      width: 50%;
    }
    @include breakpoint-very-large {
      width: 50%;
    }
  }
  &__content-container {
    background: $green;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: white;
    font-size: 1.2em;
    padding: 0.75rem;
    margin-top: -0.5rem;

    @include breakpoint-large {
      font-size: 1.3em;
      padding: 2rem;
    }
    @include breakpoint-very-large {
      font-size: 1.3em;
      padding: 2rem;
    }
  }
  &__button {
    background: $orange;
    display: inline-block;
    position: relative;
    margin-top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 0.75rem;
    border-radius: 5px;
  }
}
.seller-modal {
  position: relative;
  top: 2rem;
  left: 0;
  width: 100vw;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInAnimation ease-in-out 0.4s;
  padding-bottom: 2rem;
  z-index: 10000000;

  &::before {
    content: "";
    background: white;
    opacity: 0.7;
    position: absolute;
    top: -4rem;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
  &__close {
    color: white;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  &__container {
    background: $green;
    border-radius: 15px;
    font-family: "Roboto", sans-serif;
    height: 50%;
    padding: 0;
    position: relative;
    width: 100%;
    @include breakpoint-medium {
      padding: 2rem;
      width: 50vw;
    }
    @include breakpoint-large {
      padding: 2rem;
      width: 50vw;
    }
    @include breakpoint-very-large {
      padding: 2rem;
      width: 50vw;
    }
    form textarea {
      background: white;
      border: 1px solid rgba($color: #707070, $alpha: 0.5);
      color: $grey;
      padding: 0.5rem;
      width: 100%;
      height: 100%;
      resize: none;
    }
    input {
      background: $orange;
      border-radius: 3px;
      color: white;
      padding: 0.5rem;
      margin-top: 2rem;
    }
  }
  &__title {
    background: $green;
    color: white;
    display: block;
    margin-bottom: 1rem;
    margin-top: 2rem;
    position: relative;
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
  &__error-list {
    color: white;
    font-size: 1em;
    margin-top: 2rem;
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
