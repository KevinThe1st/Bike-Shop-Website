<template>
  <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            Login

            <button
              type="button"
              class="btn-close"
              @click="close"
            >
              x
            </button>
          </slot>
        </header>
        <section class="modal-body">
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
         </section>
         <footer class="modal-footer">
            <slot name="register">
              <router-link :to="{name: 'register'}">
                <button class="register-button" v-on:click="close()">Register</button>
              </router-link>
            </slot>
            <div class="divider"/>
            <slot name="submit">
              <input class="submit-button" type="submit" value="Sign In" v-on:click="save()">
            </button>
          </slot>
        </footer>
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
  save() {
    axios.put(`/api/users/login`, {
      username: this.username,
      password: this.password
    }).then((res) => {
      if(res.status == 200){
        this.$store.commit('login', res.data.user_id)
        this.close();
      }
      console.log("Login response:" + res.status);
    })
  }
  close() {
    console.log("asdf");
    this.username = ''
    this.password = ''
    this.$emit('close');
  }
}
</script>

<style lang="scss">
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 10%;
    height: 10%;
    min-width:200px;
    min-height:200px;
  }

  .modal-header {
    font-weight: bold;
    padding: 2px 15px;
    text-align: left;
    line-height: 35px;
    border-bottom: 1px solid #eeeeee;
    color: #000000;
    justify-content: space-between;
    background: #D0F0E0;
  }

  .modal-footer {
    padding: 15px;
    display: flex;
    height:70px;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
    height:60px;
  }

  .modal-body {
    position: relative;
    padding: 10px 10px;
    height: 60%;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 5px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
    float: right;
  }

  .register-button {
    border: #000000;
    border-style: solid;
    border-width: 1px;
    font-size: 10px;
    padding:10px;
    line-height: 3px;
    cursor: pointer;
    font-weight: bold;
    color: #000000;
    background: transparent;
    border-radius: 25px;
    float: right;
  }

  .submit-button {
    border: none;
    font-size: 10px;
    padding:10px;
    line-height: 3px;
    cursor: pointer;
    font-weight: bold;
    color: #ffffff;
    background: #328632;
    border-radius: 25px;
    float: right;
    height: 25px;
  }

  .divider{
    width:10px;
    height:auto;
    display:inline-block;
  }

</style>
