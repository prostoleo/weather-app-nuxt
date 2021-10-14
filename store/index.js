export const strict = false;

// * state
export const state = () => ({
  weather: null,
  query: '',
  coords: null,
  location: null,
  test: 7,
});

// todo getters
export const getters = {
  getTest: (state) => {
    return state.test;
  },

  getWeather: (state) => {
    return state.weather;
  },

  getCoords: (state) => {
    return state.coords;
  },

  getLocation: (state) => {
    return state.location;
  },

  getQuery: (state) => {
    return state.query;
  },
};

// todo actions
export const actions = {
  addWeather(context, wth) {
    // this.weather = unref(weather);

    context.commit('addWeather', wth);
  },

  addCoords(context, cds) {
    // if (!cds) return;

    context.commit('addCoords', cds);
  },

  addLocation(context, location) {
    localStorage.setItem('location', JSON.stringify(location));

    // if (!cds) return;

    context.commit('addLocation', location);
  },

  addQuery(context, q) {
    context.commit('addQuery', q);
  },
};

// todo mutations
export const mutations = {
  addWeather(state, weather) {
    // this.weather = unref(weather);

    state.weather = weather;
  },

  addCoords(state, cds) {
    state.coords = cds;
  },

  addLocation(state, location) {
    state.location = location;
  },

  addQuery(state, q) {
    state.query = q;
  },
};
