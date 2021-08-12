<template>
  <main>
    <div class="dashboard__title-container">
      <svg width="480.5" height="69" viewBox="0 0 1922 274.71">
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
      <h1 class="dashboard__title">Mon compte</h1>
    </div>
    <div class="dashboard__content">
      <h2 class="dashboard__content-title">Informations personnelles</h2>
      <ul class="dashboard__content-menu">
        <li>Nom: {{ lastname }}</li>
        <li>Prénom: {{ first_name }}</li>
        <li>Pseudo: {{ nickname }}</li>
        <li>Ville: {{ city }}</li>
        <li>Email: {{ email }}</li>
      </ul>
      <button
        type="button"
        class="dashboard__button"
        @click="showModifyModal = true"
      >
        Modifier mes informations
      </button>
      <modifyModal
        v-bind:nickname="this.nickname"
        v-show="showModifyModal"
        @close="showModifyModal = false"
        v-bind:id="this.id"
      ></modifyModal>
    </div>
    <myProducts v-bind:userId="this.id"></myProducts>
  </main>
</template>

<script>
import ApiClient from "../../../services/ApiClient";
const myProducts = () => import("./MyProducts.vue");
const modifyModal = () => import("../../modals/ModifyModal.vue");
export default {
  components: {
    myProducts,
    modifyModal,
  },
  data: () => {
    return {
      nickname: "",
      first_name: "",
      lastname: "",
      city: "",
      email: "",
      username: "",
      id: "",
      modifyModal: "",
      showModifyModal: false,
    };
  },
  mounted: function () {
    ApiClient.get("/wp/v2/users/me?context=edit").then((response) => {
      this.lastname = response.data.last_name;
      this.nickname = response.data.nickname;
      this.first_name = response.data.first_name;
      this.city = response.data.meta.city;
      this.email = response.data.email;
      this.id = response.data.id;
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

  &__button {
    background: white;
    color: $grey;
    font-family: "Roboto";
    margin-top: 2rem;
    padding: 0.5rem;
  }
  &__title {
    color: white;
    display: inline-block;
    font-family: "Catamaran";
    font-size: 1.2em;
    position: absolute;
    top: 2rem;
    left: 50%;
    text-align: center;
    text-transform: uppercase;
    transform: translateX(-50%);
    @include breakpoint-medium {
      font-size: 1.2em;
      top: 2rem;
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
    width: 100%;
    height: 0;
    border: 1px solid transparent;
    border-color: #fff transparent transparent transparent;
    transform: translateX(-50%);
    @include breakpoint-medium {
      border: 1px solid transparent;
      border-color: #fff transparent transparent transparent;
      top: 1.75rem;
    }
    @include breakpoint-large {
      border: 1px solid transparent;
      border-color: #fff transparent transparent transparent;
      top: 2rem;
    }
    @include breakpoint-very-large {
      border: 1px solid transparent;
      border-color: #fff transparent transparent transparent;
      top: 2rem;
    }
  }
  &__content {
    background: $green;
    border-radius: 10px;
    color: white;
    padding: 4rem 1rem;
    margin: 4rem 0.5rem;
    @include breakpoint-medium {
      margin: 4rem 1rem;
      padding: 4rem 1rem;
    }
    @include breakpoint-large {
      margin: 4rem;
      padding: 8rem 4rem;
    }
    @include breakpoint-very-large {
      margin: 4rem;
      padding: 8rem 4rem;
    }
  }
  &__content-menu {
    margin-top: 4rem;
    font-family: "Roboto";
    font-size: 1.2em;
    @include breakpoint-medium {
      font-size: 1.2em;
    }
    @include breakpoint-large {
      font-size: 1.4em;
    }
    @include breakpoint-very-large {
      font-size: 1.4em;
    }
  }
  &__content-title {
    display: inline-block;
    font-family: "Roboto";
    font-size: 1em;
    text-transform: uppercase;
    position: relative;
    top: 2rem;
    @include breakpoint-medium {
      font-size: 1.2em;
      top: 2rem;
    }
    @include breakpoint-large {
      font-size: 1.5em;
      top: 0;
    }
    @include breakpoint-very-large {
      font-size: 1.5em;
      top: 0;
    }
  }
  &__content-title::after {
    position: absolute;
    content: "";
    left: 50%;
    top: 1.3rem;
    width: 100%;
    height: 0;
    border: 1px solid transparent;
    border-color: #fff transparent transparent transparent;
    transform: translateX(-50%);
    @include breakpoint-medium {
      top: 1.5rem;
    }
    @include breakpoint-large {
      top: 1.85rem;
    }
    @include breakpoint-very-large {
      top: 1.85rem;
    }
  }
}
</style>
