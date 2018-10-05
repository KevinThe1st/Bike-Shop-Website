<template>
  <div>
    <h1>ToDos</h1>
    <div class="container">
      <ToDo v-for="todo in todos" v-bind:key="todo.id" v-bind:todo="todo"></ToDo>
      <hr/>
      <div class="form">
        <div class="field">
          <label class="label">Subject</label>
          <input class="input" type="text" v-model="newSubject"/>
        </div>
        <div class="field">
          <label class="label">Date Due</label>
          <input class="input" type="text" placeholder="DD-MM-YYYY" v-model="newDate"/>
        </div>
        <div class="field">
          <button class="button" v-on:click="submit">Submit</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import ToDo from '@/components/ToDo.vue';
import { ToDoItem } from '@/models';

@Component({ components: { ToDo } })
export default class ToDos extends Vue {
  todos: ToDoItem[] = [];
  newSubject: string = '';
  newDate: string|null = null;

  mounted() {
    axios.get('/api/todos')
      .then((response) => {
        this.todos = response.data.todos;
      });
  }

  submit() {
    axios.post('/api/todos', {
      subject: this.newSubject,
      dueDate: this.newDate
    }).then((res) => {
      this.todos = [...this.todos, res.data];
      this.newSubject = "";
      this.newDate = null;
    })
  }
}
</script>

<style lang="scss" scoped>
  .form {
    text-align: left;
    .field {
      text-align: left;
      .button { margin-top: 10px; }
    }
  }
</style>
