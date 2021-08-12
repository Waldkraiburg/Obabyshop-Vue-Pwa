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
      <h1 class="dashboard__title">Mes messages</h1>
    </div>
    <div class="messages" v-if="isUserConnected">
      <MessageItem
        v-for="messageItem in messageList"
        v-bind:key="messageItem.message_id"
        v-bind:messageProp="messageItem"
      ></MessageItem>
    </div>
    <div v-if="!isUserConnected">
      <p class="messages__not-connected">
        Vous devez vous connecter pour pouvoir voir vos messages.
      </p>
    </div>
    <div v-if="isUserConnected && messageList.length === 0">
      <p class="messages__not-connected">Vous n'avez pas encore de message.</p>
    </div>
  </div>
</template>

<script>
import ApiClient from "../../../services/ApiClient";
const MessageItem = () => import("./MessageItem.vue");
export default {
  components: {
    MessageItem,
  },
  data: function () {
    return {
      messageList: [],
    };
  },
  computed: {
    isUserConnected: function () {
      return localStorage.getItem("user-token");
    },
  },
  created: function () {
    ApiClient.get("/wp/v2/users/messages").then((response) => {
      this.messageList = response.data;
    });
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
    color: $green;
    font-family: "Catamaran";
    font-size: 1em;
    position: absolute;
    top: 0;
    left: 50%;
    text-align: center;
    text-transform: uppercase;
    transform: translateX(-50%);
    width: 100%;
    @include breakpoint-medium {
      color: $green;
      font-size: 1.2em;
      top: 0;
      width: 80%;
    }
    @include breakpoint-large {
      color: white;
      font-size: 1.8em;
      top: 3rem;
    }
    @include breakpoint-very-large {
      color: white;
      font-size: 1.8em;
      top: 3rem;
    }
  }
  &__title::after {
    position: absolute;
    content: "";
    left: 50%;
    top: 1.25rem;
    width: 90px;
    height: 0;
    border: 1px solid transparent;
    border-color: $green transparent transparent transparent;
    transform: translateX(-50%);
    @include breakpoint-medium {
      border: 1px solid transparent;
      border-color: $green transparent transparent transparent;
      top: 1.55rem;
      width: 110px;
    }
    @include breakpoint-large {
      border: 2px solid transparent;
      border-color: #fff transparent transparent transparent;
      top: 2.5rem;
      width: 180px;
    }
    @include breakpoint-very-large {
      border: 2px solid transparent;
      border-color: #fff transparent transparent transparent;
      top: 2.5rem;
      width: 180px;
    }
  }
}
.messages {
  display: flex;
  flex-direction: column-reverse;
  min-height: 70vh;
  padding: 1rem 0.5rem 2rem 0.5rem;

  @include breakpoint-medium {
    padding: 3rem 1rem 2rem 1rem;
  }
  @include breakpoint-large {
    padding: 8rem;
  }
  @include breakpoint-very-large {
    padding: 8rem;
  }
  &__not-connected {
    color: $grey;
    font-size: 1.3em;
    font-style: "Lato";
    margin: 4rem;
    text-align: center;
    min-height: 49vh;
    position: relative;
    top: 6rem;
    @include breakpoint-medium {
      min-height: 64vh;
    }
  }
}
</style>
