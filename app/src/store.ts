import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const state = {
  logged_in: false,
  id: 0
}

const getters = {
  getLoginStatus(state){
    if(state.logged_in){
      return state.id;
    }
    else{
      return false;
    }
  }
}

const mutations = {
  login(state, id){
    state.id = id,
    state.logged_in = true
  },
  logout(state){
    state.logged_in = false
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions: {

  },
  plugins: [vuexLocal.plugin],
});
