<template>
  <div id="admin-account-management">
    <!-- Title for the page -->
    <h3>Users Accounts:</h3>

    <!-- Categories to be displayed to manage users -->
    <div class = "row" id = "AdminPageTopLevelCategories">
      <div class="col-sm-1 AdminPageCategoryText">ID</div>
      <div class="col-sm-3 AdminPageCategoryText">Name</div>
      <div class="col-sm-3 AdminPageCategoryText">Username</div>
      <div class="col-sm-2 AdminPageCategoryText">Type</div>
      <div class="col-sm-3 AdminPageCategoryText">Status</div>
    </div>

    <!-- Fill data from backend about users -->

    <div class = "row">
      <div class="col-sm-1">
        <div v-for="(user, index) in allUsers" v-if="user.type != 'Admin'">
          <p>
            {{user.id}}
          </p>
        </div>
      </div>
      <div class="col-sm-3">
        <div v-for="(user, index) in allUsers" v-if="user.type != 'Admin'">
          <p>
            {{user.firstName}}
            {{user.lastName}}
          </p>
        </div>
      </div>
      <div class="col-sm-3">
        <div v-for="(user, index) in allUsers" v-if="user.type != 'Admin'">
          <p>
            {{user.username}}
          </p>
        </div>
      </div>
      <div class="col-sm-2">
        <div v-for="(user, index) in allUsers" v-if="user.type != 'Admin'">
          <p class="type">
            {{user.type}}
          </p>
        </div>
      </div>

      <!-- Button to allow manager to change users to employees -->
      <div class="col-sm-3">
        <div v-for="(user, index) in allUsers" v-if="user.type != 'Admin'">
          <button id="status" @click="changeStatus(user)" type="button" class="btn btn-primary btn-sm myButton">Change</button>
        </div>
      </div>
    </div>



  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class AdminAccountManagement extends Vue {

  allUsers: User[] = [];

  getAllUsers(){
    axios.get(`/api/users`)
    .then((res) => {
      this.allUsers = res.data.users;
    });
  }

  changeStatus(user){
    axios.put(`/api/users/type`, {
          id: user.id
      }).then((res) => {
        console.log("Update Successful");
      })
    window.location.reload();

  }

  beforeMount(){
    this.getAllUsers();
  }
}
</script>

<style lang="scss">
#admin-account-management {
  padding: 75px 10px;
}

.AdminPageCategoryText {
  font-size: 20px;
}

.myButton
{
  margin-bottom: 9px;
}

.type
{
  color: #4CAF50;
}

#AdminPageTopLevelCategories
{
  border-bottom: 1px #D3D3D3 solid;
  margin-bottom: 5px;
}
</style>
