<template>
  <section class="bg-primary min-h-screen pb-10">
    <Header :not-home="true" />
    <BaseContainer>
      <!-- <BaseSpinner v-if="loading && !data" /> -->
      <div v-if="!data" class="error pt-5 text-center text-white text-lg">
        Упс, что-то пошло не так 😞. Повторите запрос позже.
      </div>

      <!--  -->
      <div v-else-if="data" class="all-content">
        <h1 class="text-black font-semibold mb-2 pt-5">Прогноз на 7 дней</h1>
        <h2 class="text-black mb-4 pt-2">
          {{ locationData.display_name }}
        </h2>
        <div class="card__wrapper md:(grid grid-cols-2) gap-5">
          <ForecastCard
            v-for="(day, index) in data.daily.slice(1)"
            :key="index"
            :data="day"
            :timezone="data.timezone_offset"
          />
        </div>
      </div>

      <!-- <pre>
        {{ getDataOneCallComputed?.daily.slice(0, 1) }}
      </pre> -->
    </BaseContainer>
  </section>
</template>

<script>
import { defineComponent, useStore } from '@nuxtjs/composition-api';

// import { HPA_TO_MM_OF_MERCURY } from '~/config/config';

// import { useWeather } from '../composables/useWeather';
// import { useDate } from '~/composables/useDate.js';
// import { useWind } from '~/composables/useWind.js';
// import { useDate } from '~/composables/useDate.js';
// import { getLocalSunriseSunset } from '~/helpers/helpers.js';

export default defineComponent({
  setup(props) {
    const store = useStore();

    const data =
      store.getters.getWeather ?? JSON.parse(localStorage.getItem('weather'));

    // const { compShortDateTime, getLocalDate } = useDate(data);

    const locationData =
      store.getters.getLocation ?? JSON.parse(localStorage.getItem('location'));

    return {
      data,
      locationData,
    };
  },
});
</script>
