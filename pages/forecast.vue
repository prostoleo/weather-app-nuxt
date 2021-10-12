<template>
  <section class="bg-primary min-h-screen pb-10">
    <Header :not-home="true" />
    <BaseContainer>
      это прогноз

      <!-- <BaseSpinner v-if="loading && !getDataOneCallComputed" /> -->
      <!-- <div v-else-if="error.status"   class="error pt-5 text-center text-white text-lg">
        Упс, что-то пошло не так 😞. Повторите запрос позже.
      </div> -->

      <!-- v-else-if="getDataOneCallComputed" -->
      <div class="all-content">
        <h1 class="text-black font-semibold mb-2 pt-5">Прогноз на 7 дней</h1>
        <h2 class="text-black mb-4 pt-2">
          <!-- {{ locationData?.display_name }} -->
          Москва
        </h2>
        <div class="card__wrapper md:(grid grid-cols-2) gap-5">
          <!-- <ForecastCard v-for="(day, index) in getDataOneCallComputed?.daily.slice(1)" :key="index" :data="day" :timezone="getDataOneCallComputed?.timezone_offset" /> -->
        </div>
      </div>

      <!-- <pre>
        {{ getDataOneCallComputed?.daily.slice(0, 1) }}
      </pre> -->
    </BaseContainer>
  </section>
</template>
