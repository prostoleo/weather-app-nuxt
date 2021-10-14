<template>
  <section class="bg-primary min-h-screen pb-10">
    <Header :not-home="true" />
    <BaseContainer>
      <!-- это детали -->
      <!-- <pre>
        {{ data }}
      </pre> -->
      <!-- <pre>
        {{ coords }}
      </pre> -->
      <!-- <BaseSpinner v-if="loading" /> -->
      <div v-if="!data" class="error text-center text-black text-lg">
        Упс, что-то пошло не так 😞. Повторите запрос позже.
      </div>
      <div v-else class="content text-center pt-5">
        <div class="upper-content text-center text-black">
          <h3 class="date text-sm opacity-80 uppercase">
            {{ shortDate.date }}
          </h3>
          <h3 class="time mt-1 text-sm opacity-80">
            {{ shortDate.time }}
          </h3>
          <h2 class="lоcation mt-3">
            {{ locationData.display_name }}
          </h2>
          <h2 class="temperature mt-4 text-4xl font-bold">
            {{ Math.round(data.current.temp) }}
          </h2>

          <h3 class="description mt-2">
            {{ data.current.weather[0].description }}
          </h3>

          <img
            :src="`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`"
            alt="облачно с прояснениями"
            class="description-img mx-auto mt-3 w-10"
          />

          <div
            class="
              main-card
              mt-5
              mb-8
              p-6
              pb-8
              max-w-18rem
              mx-auto
              bg-secondary1
              rounded-2xl
              text-black
              flex flex-col
              justify-center
              gap-y-2
              drop-shadow-lg
            "
          >
            <div
              class="
                main-card__row
                flex
                items-center
                justify-between
                gap-x-5
                text-left
              "
            >
              <span class="key font-thin text-black80 block w-8/12">
                Ощущается как, &#8451;
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(data.current.feels_like) }}
              </span>
            </div>
            <div
              class="
                main-card__row
                flex
                items-center
                justify-between
                gap-x-5
                text-left
              "
            >
              <span class="key text-black80 block w-8/12"> Мин., &#8451; </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(data.daily[0].temp.min) }}
              </span>
            </div>
            <div
              class="
                main-card__row
                flex
                items-center
                justify-between
                gap-x-3
                text-left
              "
            >
              <span class="key text-black80 block w-8/12">
                Макс., &#8451;
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(data.daily[0].temp.max) }}
              </span>
            </div>
            <div
              class="
                main-card__row
                flex
                items-center
                justify-between
                gap-x-3
                text-left
              "
            >
              <span class="key text-black80 block w-8/12"> Влажность, % </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(data.daily[0].humidity) }}
              </span>
            </div>
            <div
              class="
                main-card__row
                flex
                items-center
                justify-between
                gap-x-3
                text-left
              "
            >
              <span class="key text-black80 block w-8/12">
                Давление, мм.рт.ст.
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(data.daily[0].pressure * HPA_TO_MM_OF_MERCURY) }}
              </span>
            </div>
            <div
              class="
                main-card__row
                flex
                items-center
                justify-between
                gap-x-3
                text-left
              "
            >
              <span class="key text-black80 block w-8/12"> Видимость, м. </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ data.current.visibility }}
              </span>
            </div>
            <div
              class="
                main-card__row
                flex
                items-center
                justify-between
                gap-x-3
                text-left
              "
            >
              <span class="key text-black80 block w-8/12"> Облачность, % </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ data.current.clouds }}
              </span>
            </div>
          </div>

          <div
            class="two-cards flex items-stretch gap-x-3 mx-auto justify-center"
          >
            <div class="left flex flex-col w-12/12 max-w-350px">
              <h2
                class="
                  inline-flex
                  gap-x-3
                  justify-start
                  items-center
                  font-bold
                  mb-4
                "
              >
                Ветер
                <img src="/icons/wind.svg" alt="" />
              </h2>

              <div class="card p-2 rounded-2xl bg-secondary1">
                <p class="text-left">
                  {{ windTextualDescription(data.current.wind_deg) }},
                  <b>{{ data.current.wind_speed.toFixed(1) }}</b> м/с
                </p>
                <p v-if="data.daily[0].wind_gust" class="text-left mt-1">
                  c порывами, до
                  <b>{{ data.daily[0].wind_gust.toFixed(1) }} м/с</b>
                </p>
              </div>
            </div>

            <div class="right flex flex-col w-12/12 max-w-350px">
              <h2
                class="
                  inline-flex
                  gap-x-3
                  justify-start
                  items-center
                  font-bold
                  mb-4
                "
              >
                День
                <img src="/icons/rain.svg" alt="" />
              </h2>

              <div class="card p-2 rounded-2xl bg-secondary1">
                <p class="text-left">
                  Восход - <b>{{ sunriseComp }}</b>
                </p>

                <p class="text-left mt-1">
                  Закат - <b>{{ sunsetComp }}</b>
                </p>

                <p class="text-left mt-1">
                  Продолжительность дня - <b>{{ durationOfDay }}</b>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="down-part mt-6">
          <h2 class="title font-bold text-left mb-5 text-black">
            В течение суток
          </h2>

          <div class="down-part__wrapper md:(grid grid-cols-2 gap-5)">
            <DuringDayCard
              v-for="hour in data.hourly.slice(1, 25)"
              :key="hour.dt"
              :data="hour"
              :timezone="data.timezone_offset"
            />
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script>
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api';

import { HPA_TO_MM_OF_MERCURY } from '~/config/config';

// import { useWeather } from '../composables/useWeather';
// import { useDate } from '~/composables/useDate.js';
import { useWind } from '~/composables/useWind.js';
import { useDate } from '~/composables/useDate.js';
import { getLocalSunriseSunset } from '~/helpers/helpers.js';

export default defineComponent({
  setup(props) {
    const store = useStore();
    const { windTextualDescription } = useWind();

    const data =
      store.getters.getWeather ?? JSON.parse(localStorage.getItem('weather'));

    const { compShortDateTime, getLocalDate } = useDate(data);

    const locationData =
      store.getters.getLocation ?? JSON.parse(localStorage.getItem('location'));
    console.log('locationData: ', locationData);

    const shortDate = computed(() => {
      const locale = navigator.language;

      if (data) {
        //* получаем реальную дату по локальному timestamp
        const realDate = getLocalDate(data.timezone_offset);
        // const realDate = getLocalDate(timezone);

        const date = Intl.DateTimeFormat(locale, {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }).format(realDate);

        const time = Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
        }).format(realDate);

        return {
          date,
          time,
        };
        // return getData.value.dt;
      }
    });

    const durationOfDay = computed(() => {
      const durationSec = data?.current?.sunset - data?.current?.sunrise;

      const hours = Math.trunc(durationSec / 3600);
      // console.log('hours: ', hours);
      const minutes = Math.floor((durationSec - hours * 3600) / 60);
      // console.log('minutes: ', minutes);

      return `${hours} ч. ${minutes} мин.`;
    });

    const sunriseComp = computed(() => {
      return getLocalSunriseSunset(data.current?.sunrise, data.timezone_offset);
    });

    const sunsetComp = computed(() => {
      return getLocalSunriseSunset(data.current.sunset, data?.timezone_offset);
    });

    return {
      data,
      windTextualDescription,
      HPA_TO_MM_OF_MERCURY,
      compShortDateTime,
      shortDate,
      locationData,

      durationOfDay,
      sunriseComp,
      sunsetComp,
    };
  },
});
</script>
