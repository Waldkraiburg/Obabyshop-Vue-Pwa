<template>
  <header>
    <div class="topbar">
      <a href="/"
        ><img
          src="../../assets/img/logo-full.png"
          class="topbar__logo"
          alt="logo"
          width="400"
          height="79"
      /></a>
      <div class="topbar__connection">
        <button
          type="button"
          id="inscriptionModal"
          v-if="!isUserConnected"
          @click="showRegisterModal = true"
          aria-label="accéder au formulaire d'inscription"
        >
          S'inscrire
        </button>
        <registerModal
          v-show="showRegisterModal"
          @close="showRegisterModal = false"
        ></registerModal>
        <li v-if="!isUserConnected">|</li>
        <button
          type="button"
          id="login"
          v-if="!isUserConnected"
          @click="showLoginModal = true"
          aria-label="accéder au formulaire de connexion"
        >
          Se connecter
        </button>
        <loginModal
          v-show="showLoginModal"
          @close="showLoginModal = false"
        ></loginModal>
        <div class="topbar__dropdown" v-if="isUserConnected">
          <button
            class="topbar__dropdown-button"
            type="button"
            aria-label="accéder à mon compte"
          >
            <a href="/mon-compte" class="topbar__my-account-link">Mon compte</a>
          </button>
          <div class="topbar__dropdown-content">
            <a href="/ajouter-un-produit">Mettre une annonce en ligne</a>
            <a href="/mes-messages">Mes Messages</a>
            <button
              type="button"
              @click="logoutAlert"
              aria-label="se déconnecter"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
      <button
        class="topbar__menu-icon"
        @click="showMenu = true"
        aria-label="accéder au menu"
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
      <mobileMenu v-show="showMenu" @close="showMenu = false"></mobileMenu>
    </div>
    <div class="bottombar">
      <nav class="bottombar__left">
        <div class="bottombar__dropdown">
          <button
            class="bottombar__dropdown-button"
            aria-label="voir les catégories"
          >
            Catégories
          </button>
          <div class="bottombar__dropdown-content">
            <a href="/categorie/1">Accessoires</a>
            <a href="/categorie/2">Jouets</a>
            <a href="/categorie/3">Meubles</a>
            <a href="/categorie/4">Vêtements</a>
          </div>
        </div>
        <span>|</span>
        <div class="bottombar__dropdown">
          <button
            class="bottombar__dropdown-button"
            aria-label="voir les villes"
          >
            Villes
          </button>
          <div class="bottombar__dropdown-content">
            <a href="/ville/lille">Lille</a>
            <a href="/ville/montpellier">Montpellier</a>
            <a href="/ville/nantes">Nantes</a>
            <a href="/ville/paris">Paris</a>
            <a href="/ville/strasbourg">Strasbourg</a>
          </div>
        </div>
      </nav>
      <nav>
        <ul class="bottombar__right">
          <li><a href="/blog">Derniers articles</a></li>
          <li>|</li>
          <li>
            <a href="/page/247">Comment ça marche ?</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
const registerModal = () => import("../modals/RegisterModal.vue");
const loginModal = () => import("../modals/LoginModal.vue");
const mobileMenu = () => import("../ui/MobileMenu.vue");
export default {
  components: {
    registerModal,
    loginModal,
    mobileMenu,
  },
  data: function () {
    return {
      showRegisterModal: false,
      showLoginModal: false,
      showMenu: false,
    };
  },
  methods: {
    logoutAlert() {
      this.$swal
        .fire({
          icon: "success",
          title: "Vous êtes bien déconnecté(e)",
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
          localStorage.clear();
        })
        .then(() => {
          location.reload();
        });
    },
    reload: function () {
      this.$router.go(this.$router.currentRoute);
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
.topbar {
  align-items: center;
  color: $grey;
  display: flex;
  font-family: "Roboto", sans-serif;
  font-size: 1.1em;
  min-height: 3.5rem;
  padding: 1rem 2rem 1rem 1.5rem;
  justify-content: space-between;
  width: 100%;
  &__my-account-link {
    position: absolute;
    left: 6rem;
    width: 170px;
  }
  &__select-container {
    margin: 0 auto;
    background: $green;
    color: white;
    width: 250px;
  }
  &__custom-select {
    background: $green;
    color: white;
    position: relative;
    font-family: "Roboto", sans-serif;
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
  &__custom-select select {
    display: none;
  }
  &__selected {
    background-color: $green;
    position: relative;
  }
  &__search-button {
    background: $orange;
    color: white;
    height: 100%;
    left: 100%;
    position: absolute;
    padding: 0 1rem;
  }
  &__select-selected:after {
    position: absolute;
    content: "";
    top: 14px;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
  }
  &__select-selected &__select-arrow-active:after {
    border-color: transparent transparent #fff transparent;
    top: 7px;
  }
  .topbar__select-items div,
  .topbar__select-selected {
    color: #ffffff;
    padding: 8px 16px;
    border: 1px solid transparent;
    border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
    cursor: pointer;
    user-select: none;
  }
  &__select-items {
    position: absolute;
    background-color: $orange;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 99;
  }
  &__select-hide {
    display: none;
  }
  &__select-items div:hover,
  &__same-as-selected {
    background: $green;
  }
  &__logo {
    display: none;
    visibility: hidden;
    @include breakpoint-medium {
      display: none;
    }
    @include breakpoint-large {
      display: inline-block;
      width: 400px;
      visibility: visible;
    }
    @include breakpoint-very-large {
      display: inline-block;
      width: 400px;
      visibility: visible;
    }
  }
  &__connection {
    justify-content: space-between;
    display: none;
    visibility: hidden;
    cursor: pointer;
    button {
      font-size: 1.2em;
    }
    @include breakpoint-medium {
      display: none;
      visibility: hidden;
    }
    @include breakpoint-large {
      display: flex;
      visibility: visible;
      width: 240px;
    }
    @include breakpoint-very-large {
      display: flex;
      visibility: visible;
      width: 240px;
    }
  }
  &__menu-icon {
    display: block;
    visibility: visible;
    div {
      background-color: $grey;
      height: 3px;
      margin: 6px 0;
      width: 35px;
    }
    @include breakpoint-medium {
      display: block;
      visibility: visible;
    }
    @include breakpoint-large {
      display: none;
      visibility: hidden;
    }
    @include breakpoint-very-large {
      display: none;
      visibility: hidden;
    }
  }

  &__search-bar {
    background: $orange;
  }
  &__dropdown {
    position: relative;
    display: inline-block;
  }
  &__dropdown-button {
    background-color: white;
    color: $grey;
    font-size: 1.1em;
    border: none;
    font-family: "Catamaran";
  }
  &__dropdown-content {
    display: none;
    position: absolute;
    background-color: #fff;
    height: auto;
    min-width: 300px;
    left: -3rem;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 5px;
    padding: 0.75rem 1.5rem;
    top: 2rem;
    a {
      margin: 0.5rem 0 !important;
    }
    a:hover {
      color: $green;
    }
    button {
      color: $grey;
      font-size: 1.1em;
      margin: 0 !important;
    }
  }
  &__dropdown:hover &__dropdown-content {
    display: block;
  }
  .open &__selected {
    position: absolute;
  }
}
.bottombar {
  align-items: center;
  background: $green;
  color: white;
  display: flex;
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  padding: 1rem 2rem;
  justify-content: center;
  width: 100%;
  li a {
    color: white;
    display: inline;
    position: relative;
    text-decoration: none;
    transition: all 0.4s ease-in-out;
  }
  li a::after {
    border-bottom: solid 2px white;
    content: "";
    left: 0;
    position: absolute;
    top: 1.75rem;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.25s;
    width: 100%;
  }
  li a:hover {
    &::after {
      transform-origin: left;
      transform: scaleX(1);
    }
  }
  @include breakpoint-medium {
    justify-content: center;
  }
  @include breakpoint-large {
    justify-content: space-between;
  }
  @include breakpoint-very-large {
    justify-content: space-between;
  }
  &__left {
    display: flex;
    justify-content: space-evenly;
    width: 90vw;
    position: relative;
    @include breakpoint-medium {
      justify-content: space-evenly;
      width: 90vw;
    }
    @include breakpoint-large {
      justify-content: space-between;
      width: 190px;
    }
    @include breakpoint-very-large {
      justify-content: space-between;
      width: 190px;
    }
  }
  &__right {
    display: none;
    visibility: hidden;
    justify-content: space-between;
    li a {
      font-size: 1em;
    }
    @include breakpoint-medium {
      display: none;
      visibility: hidden;
    }
    @include breakpoint-large {
      display: flex;
      visibility: visible;
      width: 380px;
    }
    @include breakpoint-very-large {
      display: flex;
      visibility: visible;
      width: 380px;
    }
  }
  &__dropdown {
    position: relative;
    display: inline-block;
  }
  &__dropdown-button {
    color: white;
    font-size: 1em;
  }
  &__dropdown-content {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    color: $grey;
    display: none;
    font-size: 1.1em;
    height: auto;
    left: -4rem;
    min-width: 200px;
    position: absolute;
    top: 1.25rem;
    z-index: 1;
    padding: 0.5rem 1.5rem;
    a {
      margin: 0.5rem 0 !important;
    }
    a:hover {
      color: $green;
    }
    @include breakpoint-large {
      left: 0;
    }
    @include breakpoint-very-large {
      left: 0;
    }
  }
  &__dropdown:hover &__dropdown-content {
    display: block;
  }
}
.router-link-active {
  background: white;
  color: $green !important;
  padding: 0.5rem;
}
</style>
