<template>
  <div>
    <section class="min-h-screen pb-7">
      <!--   -->
      <Header @submit-form="showWeatherOnSearch" />
      <BaseContainer>
        <!-- <pre>
          {{ test }}
        </pre>
        <pre>
          {{ forecasts }}
        </pre> -->
        <BaseSpinner v-if="loading && !getDataOneCallComputed" />
        <!-- v-if="!loading && error.status" -->
        <div
          v-else-if="!loading && error.status"
          class="error pt-5 text-center text-white text-lg"
        >
          Упс, что-то пошло не так 😞. Повторите запрос позже.
        </div>
        <div
          v-else-if="!loading && !getDataOneCallComputed && !gotGeoDataComp"
          class="error pt-5 text-center text-white text-lg"
        >
          Наберите название города в строке поиска или разрешите геолокацию
        </div>

        <!--  -->
        <div v-else-if="getDataOneCallComputed" class="content">
          <!-- <span>{{ test }}</span> -->
          <div class="upper-content text-center text-white pt-6">
            <h3 class="date text-sm opacity-80 uppercase"></h3>
            {{ compShortDateTime.date }}
            <!-- 21.12.21 -->
            <h3 class="time mt-1 text-sm opacity-80"></h3>
            {{ compShortDateTime.time }}
            <!-- 11:11 -->
            <h2 class="lоcation mt-3">
              <!-- Москва -->
              <!-- {{ locationData }} -->
              {{ locationData.display_name }}
              <!-- {{ location.display_name }} -->
            </h2>
            <h2 class="temperature mt-4 text-4xl font-bold">
              {{ Math.round(getDataOneCallComputed.current.temp) }}
              <!-- 7 -->
            </h2>

            <h3 class="description mt-2">
              {{ getDataOneCallComputed.current.weather[0].description }}
              <!-- ясно -->
            </h3>

            <img
              :src="`http://openweathermap.org/img/w/${getDataOneCallComputed.current.weather[0].icon}.png`"
              alt="облачно с прояснениями"
              class="description-img rounded-lg mx-auto mt-3 w-12"
            />

            <!-- <div class="main-card mt-5 p-6 pb-7 w-max mx-auto bg-white rounded-3xl text-black flex justify-center gap-x-3 relative"> -->
            <div
              class="
                main-card
                mt-5
                p-6
                pb-7
                w-max
                mx-auto
                bg-white
                rounded-3xl
                text-black
                flex
                justify-center
                gap-x-3
                relative
                sm:(grid
                grid-cols-4)
              "
            >
              <div class="col flex flex-col items-center justify-between">
                <img src="/icons/min.svg" alt="" class="icon w-5 h-5" />
                <span class="value block font-bold">
                  {{ Math.round(getDataOneCallComputed.current.feels_like) }}
                </span>
                <span class="naming block">ощущ, &#8451;</span>
              </div>

              <div
                class="col flex flex-col items-center justify-between gap-y-1"
              >
                <img src="/icons/max.svg" alt="" class="icon w-5 h-5" />
                <span class="value block font-bold">
                  {{
                    Math.round(
                      getDataOneCallComputed.current.pressure *
                        HPA_TO_MM_OF_MERCURY
                    )
                  }}
                </span>
                <span class="naming block">мм.рт.ст</span>
              </div>

              <div
                class="col flex flex-col items-center justify-between gap-y-1"
              >
                <img src="/icons/humidity.svg" alt="" class="icon w-5 h-5" />
                <span class="value block font-bold">
                  {{ Math.round(getDataOneCallComputed.current.humidity) }}%
                </span>
                <span class="naming block">влаж</span>
              </div>

              <div
                class="col flex flex-col items-center justify-between gap-y-1"
              >
                <img
                  src="/icons/clouds.svg"
                  alt=""
                  class="icon w-5 h-5 opacity-50"
                />
                <span class="value block font-bold">
                  {{ Math.round(getDataOneCallComputed.current.wind_speed) }}
                  м/с
                </span>
                <span class="naming block">
                  {{
                    windTextualDescription(
                      getDataOneCallComputed.current.wind_deg
                    )
                  }}
                </span>
              </div>

              <nuxt-link
                tag="a"
                to="/details"
                class="
                  bg-green-500 bg-accent
                  rounded-2xl
                  py-2
                  px-3
                  leading-none
                  text-dark-900 text-sm
                  inline-block
                  absolute
                  top-full
                  left-2/4
                  transform
                  -translate-x-6/12 -translate-y-6/12
                  transition-all
                  hover:(opacity-90)
                "
              >
                Подробнее
              </nuxt-link>
            </div>
          </div>

          <div class="days-wrapper mt-14">
            <h2
              class="
                title
                font-bold
                w-max
                text-white
                py-1
                border-b-2 border-b-accent border-opacity-0
                transition-all
                duration-150
                hover:(!border-opacity-100)
              "
            >
              <nuxt-link to="/forecast" tag="a" class="text-white">
                Прогноз на 7 дней
              </nuxt-link>
            </h2>

            <div
              class="
                cards__wrapper
                mt-5
                flex
                gap-x-3
                items-center
                overflow-x-auto
              "
            >
              <IndexForecastCard
                v-for="forecast in getDataOneCallComputed.daily.slice(1)"
                :key="forecast.dt"
                :data="forecast"
              />
            </div>
          </div>

          <!-- <pre class="text-white"> {{ getDataOneCallComputed?.daily[0] }} </pre> -->

          <!-- <pre class="text-gray-50 ">
            {{ data }}
          </pre> -->
          <!-- <pre class="text-gray-50">
            {{ getDataOneCallComputed }}
          </pre> -->
        </div>
      </BaseContainer>
    </section>
  </div>
</template>

<script>
// todo  получаем инфу из конфига
// eslint-disable-next-line no-unused-vars
import {
  defineComponent,
  useStore,
  ref,
  computed,
} from '@nuxtjs/composition-api';
import { useWeather } from '~/composables/useWeather';
import { useDate } from '~/composables/useDate.js';
import { useWind } from '~/composables/useWind.js';

import { HPA_TO_MM_OF_MERCURY } from '~/config/config.js';

// todo получаем инфу по странам
// import { getCountryByCode } from '~/data/data.js';

// import { useWeatherStore } from '~/stores/weather.ts';

export default defineComponent({
  transition: 'slide-left',

  setup() {
    // todo используем store
    const store = useStore();
    console.log('store: ', store);

    // const test = store.getters.getTest;
    // const loadingLocal = ref(false);

    // todo для карточек прогноза на 7 дней
    const forecasts = ref(null);

    // const dataToShow

    // todo используем composable с получением данных
    const {
      // dataOneCall,
      loading,
      // loadingComp,
      error,
      // gotGeoData,
      gotGeoDataComp,
      locationData,
      getDataOneCallComputed,
      getGeocoding,
      getOneCallData,
    } = useWeather();

    forecasts.value = getDataOneCallComputed?.daily;

    // const location = computed(() => {
    //   return locationData.value ?? JSON.parse(localStorage.getItem('location'));
    // });
    // =====================================

    // todo используем composable для получения даты
    const { compShortDateTime } = useDate(getDataOneCallComputed);

    // todo используем composable для получения даты
    const { windTextualDescription } = useWind(getDataOneCallComputed);

    async function showWeatherOnSearch(searchQuery) {
      console.log('searchQuery: ', searchQuery);

      /* store.dispatch('addQuery', searchQuery);
      getGeocoding(searchQuery)
        // .then(() => {
        //   //* добавляем поисковый запрос в store
        // })
        .then(() => {
          //* добавляем координаты в store
          // store.addCoords(coords);

          getOneCallData();

          console.log('dataOneCall: ', dataOneCall);
          console.log('getDataOneCallComputed: ', getDataOneCallComputed);
        })
        .then(() => {
          // loading.value = false;
        }); */

      store.dispatch('addQuery', searchQuery);

      await getGeocoding(searchQuery);
      await getOneCallData();
    }

    const location = computed(() => {
      if (!gotGeoDataComp && !store.getters.getQuery) {
        return JSON.parse(localStorage.getItem('location'));
      }

      /* if (gotGeoDataComp && store.getters.getQuery) {
        return JSON.parse(localStorage.getItem('location'));
      } */

      /* if (store.getters.getQuery) {
        return locationData;
      } */

      return locationData;
    });

    return {
      /* forecasts,
      loading,
      error,
      gotGeoData,
      locationData,
      getDataOneCallComputed,
      getGeocoding,
      getOneCallData,
      compShortDateTime,
      windTextualDescription,
      showWeatherOnSearch,
      HPA_TO_MM_OF_MERCURY, */
      loading,
      // loadingComp,
      error,
      forecasts,
      locationData: location,
      // location,
      gotGeoDataComp,
      windTextualDescription,
      compShortDateTime,
      getDataOneCallComputed,
      showWeatherOnSearch,
      HPA_TO_MM_OF_MERCURY,
    };
  },
});
</script>

<style lang="scss" scoped>
/*  @use '~/assets/scss/main.scss' as *; */

section {
  /* background: url('/public/img/bg/bg-main.jpg'); */
  background: url(https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)
    hsla(0, 0%, 0%, 40%);
  background-blend-mode: overlay;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
