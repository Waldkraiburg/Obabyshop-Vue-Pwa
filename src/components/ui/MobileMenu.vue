<template>
  <transition name="slide-fade">
    <nav class="topbar__mobile-menu">
      <span class="topbar__mobile-menu-close" id="mobile-menu-close">
        <font-awesome-icon :icon="closeIcon" @click="close" />
      </span>
      <ul>
        <li>
          <a href="#" v-if="!isUserConnected" @click="loginModal = true"
            >Se connecter</a
          >
          <loginModal
            v-show="loginModal"
            @close="loginModal = false"
          ></loginModal>
        </li>
        <li>
          <a href="#" v-if="!isUserConnected" @click="registerModal = true"
            >S'inscrire</a
          >
          <registerModal
            v-show="registerModal"
            @close="registerModal = false"
          ></registerModal>
        </li>
        <li>
          <a href="/">Accueil</a>
        </li>
        <li>
          <a v-if="isUserConnected" href="/mon-compte">Mon compte</a>
        </li>
        <li>
          <a href="#">Catégories</a>
          <ul class="topbar__mobile-submenu">
            <li><a href="/categorie/7">Vêtements</a></li>
            <li><a href="/categorie/5">Meubles</a></li>
            <li><a href="/categorie/4">Jouets</a></li>
            <li><a href="/categorie/6">Accessoires</a></li>
          </ul>
        </li>
        <li>
          <a href="#">Villes</a>
          <ul class="topbar__mobile-submenu">
            <li><a href="/ville/paris">Paris</a></li>
            <li><a href="/ville/lille">Lille</a></li>
            <li><a href="/ville/nantes">Nantes</a></li>
            <li><a href="/ville/montpellier">Montpellier</a></li>
            <li><a href="/ville/strasbourg">Strasbourg</a></li>
          </ul>
        </li>
        <li>
          <a href="/blog">Derniers articles</a>
        </li>
        <li>
          <a href="/ajouter-un-produit" v-if="isUserConnected"
            >Mettre une annonce en ligne</a
          >
          <a href="/mes-messages" v-if="isUserConnected">Mes Messages</a>
        </li>
        <li>
          <button v-if="isUserConnected" type="button" @click="logoutAlert">
            Se déconnecter
          </button>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const loginModal = () => import("../modals/LoginModal.vue");
const registerModal = () => import("../modals/RegisterModal.vue");
export default {
  name: "mobileMenu",
  components: {
    FontAwesomeIcon,
    loginModal,
    registerModal,
  },
  data: () => {
    return {
      closeIcon: faTimes,
      loginModal: false,
      registerModal: false,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    login() {},
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
.topbar {
  &__mobile-menu {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    background-color: white;
    width: 100%;
    height: 100%;
    max-height: 100%;
    z-index: 50;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    transition: all 0.3s ease-in;
    -webkit-box-shadow: -1px 1px 15px 6px rgba(0, 0, 0, 0.47);
    box-shadow: -1px 1px 15px 6px rgba(0, 0, 0, 0.47);
    li a {
      margin-bottom: 1rem;
      color: black;
    }
    li button {
      color: black;
    }
  }
  &__mobile-menu-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: $grey;
    svg {
      font-size: 0.8em;
    }
  }
  &__mobile-menu li:hover &__mobile-submenu {
    display: block;
    margin-left: 2rem;
    max-height: 300px;
  }
  &__mobile-submenu {
    overflow: hidden;
    max-height: 0;
    transition: all 0.5s ease-out;
    -webkit-transition: all 0.5s ease-out;
    li a {
      color: $green;
    }
  }
}
</style>
