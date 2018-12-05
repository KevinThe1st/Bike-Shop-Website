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
            <div class = "ManagePagesHeaders">Manage Homepage</div>
            <div id="container">
              <div id = "row">
                <div id = "col-sm-6">
                    <div class = "ManagePagesSubHeaders">Notification 1</div>
                    <b-form-input id="input-default" class = "ManagePagesInputs" type="text" placeholder="Enter Text"></b-form-input>
                    <button class="btn btn-primary ManagePagesButton">Update</button>
                    <br>
                    <div class = "ManagePagesSubHeaders">Notification 2</div>
                    <b-form-input id="input-default" class = "ManagePagesInputs" type="text" placeholder="Enter Text"></b-form-input>
                    <button class="btn btn-primary ManagePagesButton">Update</button>
                    <br>
                    <div class = "ManagePagesSubHeaders">Notification 3</div>
                    <b-form-input id="input-default" class = "ManagePagesInputs" type="text" placeholder="Enter Text"></b-form-input>
                    <button class="btn btn-primary ManagePagesButton">Update</button>
                    <br>
                    <hr>
                </div>
                <div id = "col-sm-6"></div>
              </div>
            </div>

            <br>

            <div class = "ManagePagesHeaders">Manage About Page</div>
            <div id="container">
              <div id = "row">
                <div id = "col-sm-6">
                    <div class = "ManagePagesSubHeaders">About Page Text</div>
                    <b-form-input id="input-default" class = "ManagePagesInputs" type="text" placeholder="Enter Text"></b-form-input>
                    <button class="btn btn-primary ManagePagesButton">Update</button>
                    <br>
                    <hr>
                </div>
                <div id = "col-sm-6"></div>
              </div>
            </div>
            <br>

            <div class = "ManagePagesHeaders">Manage Services Page</div>
            <div id="container">
              <div id = "row">
                <div id = "col-sm-6">
                    <div class = "ManagePagesSubHeaders">Services Page Text</div>
                    <b-form-input id="input-default" class = "ManagePagesInputs" type="text" placeholder="Enter Text"></b-form-input>
                    <button class="btn btn-primary ManagePagesButton">Update</button>
                    <br>
                    <hr>
                </div>
                <div id = "col-sm-6"></div>
              </div>
            </div>
            <br>

            <div class = "ManagePagesHeaders">Manage Store Location</div>
            <div id="container">
              <div id = "row">
                <div id = "col-sm-6">
                    <div class = "ManagePagesSubHeaders">Store Location</div>
                    <b-form-input id="input-default" class = "ManagePagesInputs" type="text" placeholder="Enter Text"></b-form-input>
                    <button class="btn btn-primary ManagePagesButton">Update</button>
                    <br>
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
