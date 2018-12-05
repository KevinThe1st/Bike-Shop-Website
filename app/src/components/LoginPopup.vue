<template>
  <div class = "model-backdrop" v-show="visible">
    <div class="modal d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="close()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <p>
              <slot name="username-field">
                <input type="text"  id="loginUsernameInput" placeholder="Username" v-model="username">
              </slot>
            </p>
            <p>
              <slot name='password-field'>
                <input type="password"  id="loginPasswordInput" placeholder="Password" v-model="password">
              </slot>
            </p>
          </div>
          <div class="modal-footer">
            <button id="forgotPasswordButton" v-on:click="passwordAlert()">Forgot Password?</button><!-- An empty button to send an email to client.  Does not work as email auto service is not set up, but would be filled in case of site deployment -->
            <router-link :to="{name: 'register'}">
              <button class="btn btn-primary" v-on:click="close()">Register</button>
            </router-link>
            <button type="button" id="loginButton" class="btn btn-secondary" data-dismiss="modal" v-on:click="save()">Login</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LoginPopup extends Vue {
  username: string = '';
  password: string = '';
  @Prop() visible: boolean = false;

  save() {
    axios.put(`/api/users/login`, {
      username: this.username,
      password: this.password
    }).then((res) => {
      if(res.status == 200){
        this.$store.commit('login', res.data.user_id)
        this.$store.commit('permission', res.data.type)
        this.close();
      }
      console.log("Login response:" + res.status);
    })
  }
  close() {
    this.username = ''
    this.password = ''
    this.$emit('close');
  }
  passwordAlert() {
    alert("An email has been sent to recover your passcode");
  }
}
</script>

<style lang="scss">
  .model-backdrop{
    z-index: 32;
  }

  .divider{
    width:10px;
    height:auto;
    display:inline-block;
  }

  #forgotPasswordButton {
    border: none;
    background-color: white;
    color: blue;
  }

</style>
