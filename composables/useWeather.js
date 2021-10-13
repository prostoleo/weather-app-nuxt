import {
  ref,
  computed,
  watch,
  watchEffect,
  readonly,
  reactive,
  useStore,
} from '@nuxtjs/composition-api';

import {
  API_KEY,
  TIME,
  API_KEY_CODING,
  API_KEY_REVERSE_CODING,
  CODING_URL,
  CODING_REVERSE_URL,
} from '~/config/config.js';

export function useWeather(indexPage = true) {
  //* для основных данных
  // const data = ref(null);

  //* для всех данных сразу
  const dataOneCall = ref(null);

  //* для загрузки
  const loading = ref(false);

  //* для координат
  /* const coords = reactive({
    lat: null,
    lon: null,
  }); */

  // todo получили ли гео данные
  const gotGeoData = ref(false);

  // todo данные локации, в которой находимся / ищем
  const locationData = reactive({
    display_name: '',
    icon: '',
  });

  const error = reactive({
    status: false,
    message: 'Упс, что-то пошло не так',
  });

  // todo таймер
  const timer = null;

  // todo используем store
  const store = useStore();

  // todo получаем основную информацию о погоде
  async function getWeatherData() {
    loading.value = true;

    const dataFromStore = store.getters.getWeather;
    console.log('dataFromStore: ', dataFromStore);
    const location = store.getters.getLocation;

    //* если получили данные из store - записываем данные и выходим из функции
    if (dataFromStore && location) {
      dataOneCall.value = dataFromStore;
      locationData.display_name = location.display_name;
      locationData.icon = location.icon;

      return;
    }

    try {
      loading.value = true;

      const optionsGeoData = {
        enableHighAccuracy: true,
        timeout: TIME * 1000,
      };

      if (indexPage) {
        // todo получаем геоданные
        navigator.geolocation.getCurrentPosition(
          successGetGeoData,
          failGetGeoData,
          optionsGeoData
        );
      } else {
        await getOneCallData();

        return;
      }

      /* timer = setTimeout(() => {
        error.status = true;
        throw new Error ('Упс, запрос занял слишком много времени');
      }, TIME * 1000); */
    } catch (error) {
      console.error(`💣💣💣 ${error}`);
    } finally {
      loading.value = false;

      clearTimeout(timer);
    }
  }

  // todo удалось получить геоданные
  async function successGetGeoData(pos) {
    console.log('store.getQuery: ', store.getQuery);

    const query = store.getters.getQuery;

    loading.value = true;

    if (query) {
      console.log(' грузим существующие данные ');

      await getOneCallData();

      loading.value = false;
      return;
    }

    console.log('pos: ', pos);
    const cds = pos.coords;
    console.log('cds: ', cds);

    /* coords.lat = cds.latitude;
    coords.lon = cds.longitude; */

    gotGeoData.value = true;
    store.dispatch('addCoords', cds);
    localStorage.setItem('coords', JSON.stringify(cds));

    await getReverseGeocoding();
    await getOneCallData();
    loading.value = false;
  }

  function failGetGeoData() {
    console.log('не удалось получить данные о местоположении');

    loading.value = true;
    // await getGeocoding();
    // await getOneCallData();
    loading.value = false;
  }

  async function getGeocoding(query) {
    console.log('query: ', query);
    loading.value = true;

    console.log('locationData: ', locationData);
    if (!query) {
      throw new Error('не удалось получить данные');
    }
    // const request = `${WEATHER_URL}?q=Челябинск&units=metric&appid=${API_KEY}&lang=ru`;
    const request = `${CODING_URL}?key=${API_KEY_CODING}&q=${query}&format=json`;

    const response = await fetch(request, {
      headers: {
        'Accept-Language': 'ru',
      },
    });
    console.log('response: ', response);

    if (!response.ok) {
      throw new Error('Упс, что-то пошло не так ');
    }

    const result = await response.json();
    console.log('result: ', result);

    // data.value = result;
    //* сохраняем необходимые данные

    /* coords.lat = result[0].lat;
    coords.lon = result[0].lon; */
    const coordsObj = {
      latitude: result[0].lat,
      longitude: result[0].lon,
    };
    console.log('coordsObj: ', coordsObj);

    // store.addCoords(coordsObj);
    store.dispatch('addCoords', coordsObj);

    localStorage.setItem('coords', JSON.stringify(coordsObj));

    locationData.display_name = result[0].display_name;
    locationData.icon = result[0].icon;

    store.dispatch('addLocation', locationData);
    localStorage.setItem('location', JSON.stringify(locationData));

    return {
      // coords,
      locationData,
    };
  }

  async function getReverseGeocoding() {
    // const store = useWeatherStore();

    const coords = store.getters.getCoords;

    loading.value = true;

    console.log('coords - reverseGeoCoding: ', coords);

    if (!coords) {
      throw new Error(' не удалось получить координаты  ');
    }
    // const request = `${WEATHER_URL}?q=Челябинск&units=metric&appid=${API_KEY}&lang=ru`;
    const request = `${CODING_REVERSE_URL}?key=${API_KEY_REVERSE_CODING}&lat=${coords.latitude}&lon=${coords.longitude}&format=json`;

    const response = await fetch(request, {
      headers: {
        'Accept-Language': 'ru',
      },
    });
    console.log('response: ', response);

    if (!response.ok) {
      throw new Error('Упс, что-то пошло не так ');
    }

    const result = await response.json();
    console.log('result: ', result);

    // data.value = result;
    //* сохраняем необходимые данные
    locationData.display_name = result.display_name;
    locationData.icon = result?.icon;

    store.dispatch('addLocation', locationData);

    localStorage.setItem('location', JSON.stringify(locationData));
  }

  // todo для oneCall API
  async function getOneCallData() {
    // const store = useWeatherStore();
    console.log('store: ', store);
    // const coords = store.getters.getCoords;
    const coords =
      store.getters.getCoords ?? JSON.parse(localStorage.getItem('coords'));
    // console.log('coords in getOneCallData(): ', cds);

    const exclude = 'minutely,alerts';

    /* const coordsToApi = cds ?? {
      lat: coords.lat, 
      lon: coords.lon, 
    }
    console.log('coordsToApi: ', coordsToApi); */
    // console.log('coordsToApi: ', coordsToApi);
    // const requestOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordsToApi.lat}&lon=${coordsToApi.lon}&units=metric&&exclude=${exclude}&appid=${API_KEY}&lang=ru`;

    /* console.log('coords.lat: ', coords.lat);
    console.log('coords.lon: ', coords.lon); */

    const requestOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&&exclude=${exclude}&appid=${API_KEY}&lang=ru`;

    const responseOneCall = await fetch(requestOneCall);
    console.log('responseOneCall: ', responseOneCall);

    if (!responseOneCall.ok) {
      throw new Error('Упс, что-то пошло не так ');
    }

    const resultOneCall = await responseOneCall.json();
    console.log('resultOneCall: ', resultOneCall);

    dataOneCall.value = resultOneCall;

    // store.addWeatherNow(resultOneCall);
    store.dispatch('addWeather', resultOneCall);
    localStorage.setItem('weather', JSON.stringify(resultOneCall));

    // return result;
    loading.value = false;

    return resultOneCall;
  }

  //* наблюдаем за функцией для получения основных данных
  /* watch(getWeatherData, (newVal) => {
    console.log('newVal: ', newVal);
    // data.value = await newVal;
  }); */

  watchEffect(
    getWeatherData,
    () => {
      console.log(' watch effect ');
    },
    {
      immediate: true,
    }
  );

  watch(getOneCallData, (newVal, oldVal) => {
    if (!newVal.current) return;

    if (newVal.current.dt !== oldVal.current.dt) {
      dataOneCall.value = newVal;
    }
  });

  /* watch(getOneCallData, () => {

  }); */

  // const getDataComputed = computed(() => data.value);

  const getDataOneCallComputed = computed(() => dataOneCall.value);

  const loadingComp = computed(() => loading.value);

  // todo работа с pinia store
  // store.addWeatherNow(dataOneCall);

  return {
    // data: readonly(data),
    dataOneCall: readonly(dataOneCall),
    loading: readonly(loading),
    gotGeoData: readonly(gotGeoData),
    locationData: readonly(locationData),

    getGeocoding,
    getOneCallData,

    error,
    // coords,
    getWeatherData,
    // getDataComputed,
    getDataOneCallComputed,
    loadingComp,
  };
}
