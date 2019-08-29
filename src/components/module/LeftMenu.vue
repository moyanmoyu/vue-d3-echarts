<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <div v-for="(item, itemIndex) in menu" :key="item.id">
        <el-submenu v-if="item.children" :key="item.id" :index="item.index">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item v-for="(child,childIndex) in item.children" 
            :key="child.id" :index="child.index" 
            @click="childRoute(itemIndex,childIndex)">
            {{child.title}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :key="item.id" :index="item.index" @click="itemRoute(itemIndex)">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        </div>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  import Axios from 'axios'
  var menu = require('./../../data/meun.json')
  export default {
    data() {
      return {
        menu: {
          type: Array
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData(){
        this.menu = menu.data
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      itemRoute(itemIndex) {
        this.$router.push({ path: this.menu[itemIndex].pathName })
      },
      childRoute(itemIndex,childIndex) {
        this.$router.push({ path: this.menu[itemIndex].children[childIndex].pathName })
      }
    }
  }
</script>