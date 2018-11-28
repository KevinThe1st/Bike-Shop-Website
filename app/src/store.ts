import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const state = {
  logged_in: false,
  permission_level: "Customer",
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
  },
  getLoginPermissionLevel(state){
    return state.permission_level;
  }
}

const mutations = {
  login(state, id/*, permission_level*/){
    state.id = id,
    state.logged_in = true//,
    //state.permission_level = permission_level
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
