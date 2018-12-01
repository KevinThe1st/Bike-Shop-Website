<template>
  <div id="admin-item-management">
    <input type="text" v-model="itemName" placeholder="name">
    <input type="text" v-model="itemPrice" placeholder="price">
    <input type="text" v-model="itemStock" placeholder="stock">
    <input type="text" v-model="itemDescShort" placeholder="short desc">
    <input type="text" v-model="itemDescLong" placeholder="long desc">
    <input type="text" v-model="itemPicName" placeholder="picture name">
    <!--form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Upload images</h1>
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form-->
    <div id="category-bar">
      <div id="top-level-categories" v-if="loadedTopLevelCategoryCount == topLevelCategories.length">
        <ul class ="noBullets">
          <li v-for="(category, categoryIndex) in topLevelCategories">
            {{category.name}}
            <ul class ="noBullets">
              <li v-for="(subcategory, subcategoryIndex) in category.subcategories">
                <input type="checkbox" v-on:click="categoryChanged(categoryIndex, subcategoryIndex)">
                {{subcategory.name}}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <button type="submit" v-on:click="addNewItem()">save</button>
    <b-alert variant="success" dismissible :show="successful" @dismissed="successful=false">
      Item was successfully created
    </b-alert>
    <b-alert variant="danger" dismissible :show="failed" @dismissed="failed=false">
      Item failed to create
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import App from '../App.vue';
import { CategoryItem } from '@/models';

@Component({
  data() {
    return {
      itemName: '',
      itemPrice: '',
      itemStock: '',
      itemDescShort: '',
      itemDescLong: '',
      itemPicName: ''
    }
  }
})
export default class AdminItemManagement extends App {
  topLevelCategories: CategoryItem[] = [];
  loadedTopLevelCategoryCount: number = 0;
  categoryIds: number[] = [];
  successful: boolean = false;
  failed: boolean = false;

  /*
   * TODO: need to add file upload stuff
   */

  addNewItem(){
    /*
    I could check for invalid stuff before a backend request or I could make the request and deete the items if it's
    malformed in some way.

    if(this.$data.itemPrice.length == 0 || this.$data.itemName.length == 0 || this.$data.itemStock.length == 0 ||
       this.$data.itemDescShort.length == 0 || this.$data.itemDescLong.length == 0 || this.$data.itemPicName.length == 0){
      this.failed = true;
      this.successful = false;
      return;
    }
    */

    axios.put(`/api/items`, {
      name: this.$data.itemName,
      price: parseFloat(this.$data.itemPrice),
      stock: parseInt(this.$data.itemStock),
      descShort: this.$data.itemDescShort,
      descLong: this.$data.itemDescLong,
      picName: this.$data.itemPicName,
      categories: this.categoryIds
    }).then((res) => {
      console.log(res.data);
      this.successful = true;
      this.failed = false;
    }).catch((error) => {
      console.log(error.response);
      this.failed = true;
      this.successful = false;
      axios.delete(`/api/items/` + error.response.data.id); // should probably do this at some point
    });
  }

  getAllTopLevelCategories(){
    this.topLevelCategories = [];
    this.loadedTopLevelCategoryCount = 0;
    axios.get(`/api/categories/parents`)
    .then((res) => {
      this.topLevelCategories = res.data.categories;
      for(var i = 0; i < this.topLevelCategories.length; i++){
        this.getSubLevelCategories(i);
      }
    })
  }

  getSubLevelCategories(index){
    this.topLevelCategories[index].subcategories = [];
    axios.get(`/api/categories/parent/` + this.topLevelCategories[index].id)
    .then((res) => {
      this.topLevelCategories[index].subcategories = res.data.category;
      this.loadedTopLevelCategoryCount++; // only render when all responses have got back
    })
  }

  categoryChanged(index1, index2){
    console.log(this.topLevelCategories[index1].subcategories[index2].id);
    for(var i = 0; i < this.categoryIds.length; i++){
      if(this.topLevelCategories[index1].subcategories[index2].id == this.categoryIds[i]){
        this.categoryIds.splice(i, 1);
        return;
      }
    }
    this.categoryIds.push(this.topLevelCategories[index1].subcategories[index2].id);
  }

  beforeMount(){
    this.getAllTopLevelCategories();
  }
}
</script>

<style lang="scss">
#admin-item-management {
  padding: 80px 10px;
}
</style>
