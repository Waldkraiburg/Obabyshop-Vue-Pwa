<template>
  <section class="hero">
    <div class="hero__container">
      <span>Moi je grandis et mes parents trient !</span><br />
      <span
        >Avec O'Babyshop, triez, achetez, ou vendez à proximité de chez
        vous.</span
      >
    </div>
  </section>
</template>

<script></script>

<style lang="scss" scoped>
@import "../../../assets/scss/main.scss";
.hero {
  background-image: url("../../../assets/img/hero-background.jpg");
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 95vh;
  position: relative;
  width: 100%;
  z-index: -1;
  @include breakpoint-medium {
    background-position: bottom right;
  }
  @include breakpoint-large {
    background-position: bottom center;
  }
  @include breakpoint-very-large {
    background-position: bottom center;
  }
  &__container {
    background: white;
    border-radius: 15px;
    color: $grey;
    display: inline-block;
    font-family: "Roboto";
    font-size: 1.2em;
    width: 80%;
    padding: 1rem;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    @include breakpoint-medium {
      font-size: 1.3em;
      left: 50%;
      max-width: 450px;
      transform: translateX(-50%);
      width: 80%;
      top: 13%;
    }
    @include breakpoint-large {
      font-size: 1.5em;
      left: 50%;
      max-width: 450px;
      transform: translateX(-50%);
      top: 6rem;
    }
    @include breakpoint-very-large {
      font-size: 1.5em;
      left: 50%;
      max-width: 450px;
      transform: translateX(-50%);
      top: 6rem;
    }
  }
}
</style>
