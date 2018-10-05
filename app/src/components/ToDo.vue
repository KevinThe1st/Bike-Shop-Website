<template>
  <div class="todo field is-grouped">
      <input type="checkbox" class="checkbox" v-bind:checked="todo.done" v-on:click="updateDone"/>
      <div class="control is-expanded">
        <label v-bind:for="todo.id">{{todo.subject}}</label>
      </div>
      <div class="date control">
        <label v-if="todo.dueDate">{{todo.dueDate | moment("MM-DD-YYYY")}}</label>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { ToDoItem } from '@/models';

@Component
export default class ToDo extends Vue {
  @Prop({ default: null })
  todo!: ToDoItem;

  updateDone (event: any) {
    if (this.todo) {
      let checked = event.target.checked;
      axios.put(`/api/todos/${this.todo.id}`, {...this.todo, done: checked}).then((res) => {
        this.todo = res.data;
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .checkbox {
    margin-right: 10px;
  }
</style>

