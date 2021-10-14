<template>
  <!-- <div>это карточка</div> -->
  <div
    class="
      down-part__card
      card
      p-3
      pt-0
      bg-secondary1
      relative
      rounded-2xl
      mt-7
      max-w-500px
      md:(mt-0)
    "
  >
    <header class="card__header flex justify-start items-center gap-x-4">
      <span
        class="
          title
          bg-secondary2
          rounded-2xl
          font-light
          text-sm text-black80
          p-3
          absolute
          top-0
          right-0
        "
      >
        {{ time }}
      </span>

      <div class="inline-flex items-center gap-x-3 mt-2">
        <img
          class="w-8"
          :src="`http://openweathermap.org/img/w/${data.weather[0].icon}.png`"
          :alt="`иконка ${data.weather[0].description}`"
        />
        <h4
          class="
            text-sm text-black
            font-semibold
            inline-flex
            items-center
            gap-x-2
          "
        >
          <span>{{ Math.round(data.temp) }}</span>
          <span>{{ data.weather[0].description }}</span>
        </h4>
      </div>
    </header>

    <div class="card__body mt-5">
      <div class="card__row">
        <span class="key inline-flex items-center">
          Ощущается как

          <img
            class="w-5 ml-2 opacity-80"
            src="/icons/feels-like.svg"
            alt="Иконка - Ощущается как"
          />
        </span>

        <span class="value font-bold">
          {{ Math.round(data.feels_like) }}
        </span>
      </div>
      <div class="card__row">
        <span class="key inline-flex items-center">
          Ветер, ю-в

          <img
            class="w-5 ml-2 opacity-80"
            src="/icons/wind.svg"
            alt="Иконка - Ветер"
          />
        </span>

        <span class="value font-bold">2 м/с</span>
      </div>
      <div class="card__row">
        <span class="key inline-flex items-center">
          Влажность

          <img
            class="w-5 ml-2 opacity-80"
            src="/icons/humidity.svg"
            alt="Иконка - Влажность"
          />
        </span>

        <span class="value font-bold">{{ data.humidity }} %</span>
      </div>
      <div class="card__row">
        <span class="key inline-flex items-center text-left">
          <span>Давление, мм. рт. ст.</span>

          <img
            class="w-5 ml-2 opacity-80"
            src="/icons/pressure.svg"
            alt="Иконка - давление"
          />
        </span>

        <span class="value font-bold block">{{
          Math.round(data.pressure * HPA_TO_MM_OF_MERCURY)
        }}</span>
      </div>
      <div class="card__row">
        <span class="key inline-flex items-center text-left">
          <span>Видимость, м.</span>

          <img
            class="w-5 ml-2 opacity-80"
            src="/icons/visibility.svg"
            alt="Иконка - видимость"
          />
        </span>

        <span class="value font-bold block">{{ data.visibility }}</span>
      </div>
      <div class="card__row">
        <span class="key inline-flex items-center text-left">
          <span>Облачность, %</span>

          <img
            class="w-5 ml-2 opacity-80"
            src="/icons/clouds.svg"
            alt="Иконка - облачность"
          />
        </span>

        <span class="value font-bold block">{{ data.clouds }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';
import { HPA_TO_MM_OF_MERCURY } from '~/config/config.js';
import { getLocalSunriseSunset } from '~/helpers/helpers.js';

// import { useDate } from '~/composables/useDate.js';
// console.log('useDate: ', useDate);

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: null,
      required: true,
    },
    timezone: {
      type: Number,
      default: null,
      required: true,
    },
  },

  setup(props) {
    // console.log('props: ', props);

    //* получаем локальное время захода / рассвета
    const time = getLocalSunriseSunset(props.data.dt, props.timezone);

    return {
      time,
      HPA_TO_MM_OF_MERCURY,
    };
  },
});
</script>

<style lang="scss" scoped>
.card__body {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)) !important;
  gap: 1.25rem 2.5rem !important;
  grid-auto-flow: row !important;

  .card__row {
    // width: max-content;

    display: inline-flex;
    align-items: center;

    justify-content: space-between;
  }
}
</style>
