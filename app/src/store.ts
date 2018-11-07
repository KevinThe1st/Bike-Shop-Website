import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  logged_in: false,
  id: 0
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

const getters = {
  isLoggedIn(state){
    return state.logged_in
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions: {

  },
});
