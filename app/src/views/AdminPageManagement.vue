<template>
  <div id="admin-page-management">
    <div id = "container">
      <div id = "row">
          <div id = "col-sm-12">
              <div id= "ManagePagesText">Manage Notifications and Page Content</div>
          </div>
      </div>

    </div>

    <div id="container">
      <div id = "row">
        <div id = "col-sm-12">
            <div class = "ManagePagesHeaders">All textboxes on site</div>
            <div id="container">
              <div id = "row">
                <div id = "col-sm-6">
                    <div v-for="field in textfields">
                      <div class = "ManagePagesSubHeaders">{{field.name}}</div>
                      <b-form-input id="input-default" class = "ManagePagesInputs" type="text" v-model="field.text"></b-form-input>
                      <button class="btn btn-primary ManagePagesButton" v-on:click="update(field)">Update</button>
                      <br>
                    </div>
                    <hr>
                </div>
                <div id = "col-sm-6"></div>
              </div>
            </div>

            <br>

        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class AdminPageManagement extends Vue {
  textfields: any[] = [{
    name: "PlaceHolder",
    text: "I am text on a page that you can edit"
  }];

  update(text){
    axios
    .put('/api/textbox/', {
      name: text.name,
      text: text.text
    })
    .then((res) => {
      this.beforeMount()
    })
  }

  beforeMount(){
    axios
      .get('/api/textbox/')
      .then((res) => {
        this.textfields = res.data.text;
      })
  }
}
</script>

<style lang="scss">
#admin-page-management {
  padding: 80px 0px;
  margin-left: 10px;
}

#ManagePagesText {
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}

.ManagePagesHeaders {
  font-weight: bold;
  font-size: 20px;
  color: blue;
}

.ManagePagesSubHeaders {
  font-weight: bold;
  font-size: 15px;
  margin-left: 15px;
}

.ManagePagesInputs {
  margin-left: 15px;
  width: 50%;
}

.ManagePagesButton {
  margin-left: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
}

</style>
