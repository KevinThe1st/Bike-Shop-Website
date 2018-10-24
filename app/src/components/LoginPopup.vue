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
                <button id="registerButton" v-on:click="close()">Register</button>
              </router-link>
            </slot>
            <div class="divider"/>
            <slot name="submit">
              <input id="submitButton" type="submit" value="Sign In" v-on:click="save()">
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
      if(res.data.success){
        this.close();
      }
    })
  }
  close() {
    this.username = ''
    this.password = ''
    this.$emit('close');
  }
}
</script>

<style>
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
    width: 80%;
    height: 40%;
  }

  .modal-header {

  }

  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 10px 10px;
    height: 80%;
  }

  .btn-close {
    border: none;
    font-size: 10px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
    text-align: right;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .divider{
    width:5px;
    height:auto;
    display:inline-block;
  }
</style>
