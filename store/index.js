// * state
export const state = () => ({
  weather: null,
  query: '',
  coords: null,
  test: 7,
});

// todo getters
export const getters = {
  getTest: (state) => {
    console.log('state.test: ', state.test);
    return state.test;
  },

  getWeather: (state) => {
    console.log('getter - getWeatherNow: ', state.weather);
    return state.weather;
  },

  getCoords: (state) => {
    console.log('state: ', state);
    console.log('getter - getCoords: ', state.coords);
    return state?.coords;
  },

  getQuery: (state) => {
    console.log('getter - getQuery: ', state.query);
    return state?.query;
  },
};

// todo actions
export const actions = {
  addWeather(context, wth) {
    // this.weather = unref(weather);

    console.log('weather - addWeather action: ', wth);
    context.commit('addWeather', wth);
  },

  addCoords(context, cds) {
    console.log('cds in addCoords action: ', cds);

    // if (!cds) return;

    context.commit('addCoords', cds);
  },

  addQuery(context, q) {
    console.log('query in AddQuery action: ', q);

    context.commit('addQuery', q);
  },
};

// todo mutations
export const mutations = {
  addWeather(state, weather) {
    // this.weather = unref(weather);

    state.weather = weather;
    console.log('weather - addWeatherNow mutation: ', state.weather);
  },

  addCoords(state, cds) {
    state.coords = cds;
    console.log('cds in addCoords mutation: ', state.coords);
  },

  addQuery(state, q) {
    state.query = q;
    console.log('query in action mutation: ', state.query);
  },
};
