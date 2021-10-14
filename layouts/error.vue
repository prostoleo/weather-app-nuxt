<template>
  <div class="wrapper bg-primary">
    <div class="content">
      <h1 v-if="error.statusCode === 404">
        Упс, кажется вы заблудились.<br />
        Это страницы не существует
      </h1>
      <h1 v-else>Упс, что-то пошло не так</h1>
      <NuxtLink
        to="/"
        class="bg-accent rounded-2xl inline-block py-2 px-4 font-lg"
        >На главную
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error', // you can set a custom layout for the error page
  props: ['error'],
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 1rem;
  min-height: 100vh;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  flex-direction: column;

  background-image: url(/img/404.svg);
  background-position: top center;

  .content {
    margin-top: 3.5em;

    h1 {
      font-size: 2.4rem;
      line-height: 100%;

      margin-bottom: 0.75em;
    }

    a {
      font-size: 1.25rem;
    }
  }
}
</style>
