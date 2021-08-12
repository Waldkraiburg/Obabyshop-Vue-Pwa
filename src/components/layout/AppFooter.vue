<template>
  <footer class="footer home-footer">
    <div class="footer__background">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1820"
        height="253.58"
        viewBox="0 0 1820 253.58"
      >
        <g transform="translate(-50 -3414.419)">
          <path
            d="M0-21.61S480.828-43.455,934.99-40.927,1820-21.61,1820-21.61v169.6H0Z"
            transform="translate(50 3455.55)"
            fill="#f7a072"
          />
          <path
            d="M0-5.259S480.828-43.027,934.99-40.392,1820-5.259,1820-5.259V156.476H0Z"
            transform="translate(50 3511.524)"
            fill="#26827b"
          />
        </g>
      </svg>
      <div class="footer__content">
        <nav>
          <ul class="footer__menu-content">
            <li>
              <a href="/page/252">Mentions légales</a>
            </li>
            <li class="footer__separator">|</li>
            <li><a href="/page/254">FAQ</a></li>
            <li class="footer__separator">|</li>
            <li>
              <a href="/page/256">Qui sommes-nous ?</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script></script>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
.footer {
  margin-top: 2rem;
  position: relative;

  @include breakpoint-medium {
    margin-top: 1rem;
  }
  @include breakpoint-large {
    margin-top: 1rem;
  }
  @include breakpoint-very-large {
    margin-top: 1rem;
  }
  &__background {
    background: $green;
    position: relative;
    width: 100%;
    height: 145px;
    @include breakpoint-medium {
      background: $green;
      height: 155px;
    }
    @include breakpoint-large {
      background: none;
      height: auto;
    }
    @include breakpoint-very-large {
      background: none;
      height: auto;
    }
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
  &__background-path {
    box-shadow: 0 12px 32px 4px rgba(black, 0.2);
  }
  &__content {
    position: absolute;
    bottom: 0.75rem;
    color: white;
    width: 100%;
    @include breakpoint-medium {
      bottom: 1rem;
    }
    @include breakpoint-large {
      bottom: 3rem;
    }
    @include breakpoint-very-large {
      bottom: 4rem;
    }
    nav {
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      @include breakpoint-medium {
        width: 80%;
      }
      @include breakpoint-large {
        width: 450px;
      }
      @include breakpoint-very-large {
        width: 450px;
      }
    }
    ul {
      align-items: center;
      display: flex;
      flex-direction: column;

      @include breakpoint-medium {
        display: flex;
      }
      @include breakpoint-large {
        flex-direction: row;
      }
      @include breakpoint-very-large {
        flex-direction: row;
      }
    }
  }

  &__separator {
    display: none;
    @include breakpoint-medium {
      display: none;
    }
    @include breakpoint-large {
      display: inline-block;
    }
    @include breakpoint-very-large {
      display: inline-block;
    }
  }
  &__menu-content {
    font-family: "Catamaran";
    font-size: 1.1em;
    display: flex;
    justify-content: space-between;
    li a {
      margin-bottom: 0.5rem;
    }
    @include breakpoint-medium {
      font-size: 1.2em;
    }
    @include breakpoint-large {
      font-size: 1.2em;
    }
    @include breakpoint-very-large {
      font-size: 1.3em;
    }
  }
}
</style>
