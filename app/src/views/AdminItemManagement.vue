<template>
  <div id="admin-item-management">
    <!-- Page allows managers to edit and add new items -->

    <!-- Page title -->

    <div id = "ManageItemsText">
        Manage Items
    </div>

    <!-- Input fields to allow manager to add new items -->

    <div class="ManageItemsHeader">Add New Item</div>
    <button type="submit" class = "btn btn-primary" v-on:click="addingANewItem = true">Create New Item</button>
    <div id="add-new-item" v-if="addingANewItem">
      <input id="createNewItemName" type="text" v-model="itemName" placeholder="name">
      <input id="createNewItemPrice" type="text" v-model="itemPrice" placeholder="price">
      <input id="createNewItemStock" type="text" v-model="itemStock" placeholder="stock">
      <input id="createNewItemShort" type="text" v-model="itemDescShort" placeholder="short desc">
      <input id="createNewItemLong" type="text" v-model="itemDescLong" placeholder="long desc">
      <upload-image url='/upload' button_html='Drag a product image here'></upload-image>
      <!--input type="file" accept="image/*" @change="uploadImage($event)" id="file-input"-->
      <div id="category-bar">
        <!-- Categories section to be able to place categories on the new items -->

        <div id="top-level-categories" v-if="loadedTopLevelCategoryCount == topLevelCategories.length">
          <ul class ="noItemManagerBullets">
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
      <button type="submit" v-on:click="addNewItem()">Save</button>
    </div>

    <!-- Alert to display if item was added successfully or not -->

    <b-alert variant="success" dismissible :show="successful" @dismissed="successful=false">
      Item was successfully created
    </b-alert>
    <b-alert variant="danger" dismissible :show="failed" @dismissed="failed=false">
      Item failed to create
    </b-alert>
    <hr>

    <!-- Section to manage existing items with new fields -->

    <div id="existing-items">
    <div class="ManageItemsHeader">Edit Existing Item</div>
    <ul class="noItemManagerBullets">
      <li class = "noItemManagerBullets" v-for="(item, index) in allItems">
        <div class="itemManagerDiv">
          <div class = "container">
            <div class = "row">
              <div class = "col-sm-2">ID: {{item.id}}</div>
              <div class = "col-sm-3">Name: {{item.name}}</div>
              <div class = "col-sm-2">Price: ${{item.price}}</div>
              <div class = "col-sm-2">Stock: {{item.stock}}</div>
              <div class = "col-sm-3">
                Short Description: {{item.descShort}}
                <br>
                Long Description: {{item.descLong}}
              </div>

            </div>
          </div>
        </div>
        <button type="submit" v-on:click="beginEditingItem(index)">Edit Item</button>
        <div id="edit-item" v-if="editing == index">
          <input type="text" v-model="editingName" placeholder="name">
          <input type="text" v-model="editingPrice" placeholder="price">
          <input type="text" v-model="editingStock" placeholder="stock">
          <input type="text" v-model="editingDescShort" placeholder="short desc">
          <input type="text" v-model="editingDescLong" placeholder="long desc">
          <button type="submit" v-on:click="saveEdit()">Save</button>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UploadImage from 'vue-upload-image';
import axios from 'axios';
import App from '../App.vue';
import { CategoryItem, ShopItem } from '@/models';

@Component({
  components: {
    UploadImage
  },
  data() {
    return {
      itemName: '',
      itemPrice: '',
      itemStock: '',
      itemDescShort: '',
      itemDescLong: '',
      itemPicName: '',
      editingName: '',
      editingPrice: '',
      editingStock: '',
      editingDescShort: '',
      editingDescLong: ''
    }
  }
})
export default class AdminItemManagement extends App {
  topLevelCategories: CategoryItem[] = [];
  loadedTopLevelCategoryCount: number = 0;
  categoryIds: number[] = [];
  successful: boolean = false;
  failed: boolean = false;
  allItems: ShopItem[] = [];
  addingANewItem: boolean = false;
  editing: number = -1;

  // file upload fields
  uploadedFiles: [];
  uploadFieldName: 'photos';
  /*
   * TODO: need to add file upload stuff
   */

  addNewItem(){
    this.addingANewItem = false;
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

  beginEditingItem(indexIntoAllItems){
    this.editing = indexIntoAllItems;
    this.$data.editingName = this.allItems[indexIntoAllItems].name;
    this.$data.editingPrice = this.allItems[indexIntoAllItems].price;
    this.$data.editingStock = this.allItems[indexIntoAllItems].stock;
    this.$data.editingDescShort = this.allItems[indexIntoAllItems].descShort;
    this.$data.editingDescLong = this.allItems[indexIntoAllItems].descLong;
  }

  saveEdit(){
    axios.put(`/api/items/modifyItem`, {
      id: this.allItems[this.editing].id,
      name: this.$data.editingName,
      price: parseFloat(this.$data.editingPrice),
      stock: parseInt(this.$data.editingStock),
      descShort: this.$data.editingDescShort,
      descLong: this.$data.editingDescLong,
    }).then((res) => {
      console.log(res.data);
      this.successful = true;
      this.failed = false;
      var tempId = res.data.id;
      this.allItems[tempId-1].name = this.$data.editingName;
      this.allItems[tempId-1].price = parseFloat(this.$data.editingPrice);
      this.allItems[tempId-1].stock = parseInt(this.$data.editingStock);
      this.allItems[tempId-1].descShort = this.$data.editingDescShort;
      this.allItems[tempId-1].descLong = this.$data.editingDescLong;
    }).catch((error) => {
      console.log(error.response);
      this.failed = true;
      this.successful = false;
    });
    this.editing = -1;
  }

  getAllItems(){
    axios.get(`/api/items`)
    .then((res) => {
      this.allItems = res.data.items;
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
    this.getAllItems();
    //this.reset();
  }
/*
  reset() {
    this.uploadedFiles = [];
  }

  save(formData) {
    // upload data to the server
    upload(formData)
    .then(x => {
      this.uploadedFiles = [].concat(x);
    });
  }

  filesChange(fieldName, fileList) {
    // handle file changes
    const formData = new FormData();

    if (!fileList.length) return;

    // append the files to FormData
    Array.from(Array(fileList.length).keys()).map(x => {
      formData.append(fieldName, fileList[x], fileList[x].name);
    });

    this.save(formData);
  }*/
}
</script>

<style lang="scss">
#admin-item-management {
  padding: 80px 10px;
}

#ManageItemsText {
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}

.ManageItemsHeader {
  color: blue;
  font-weight: bold;
  font-size: 20px;
}

.noItemManagerBullets {
  ul {
    list-style-type: none;
  }
  li {
    list-style-type: none;
  }
}

.itemManagerDiv {
  border: 1px solid black;
  margin: 10px;
}
</style>
