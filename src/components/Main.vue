<template>
  <el-container class="is-vertical wrapper">
    <Eheader></Eheader>
    <el-aside width="200px">
      <LeftMenu></LeftMenu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
  import LeftMenu from './module/LeftMenu.vue'
  import Eheader from './module/Eheader.vue'
  import SimpleLine from './D3/SimpleLine.vue'
  export default {
    components: {
      LeftMenu,
      Eheader,
      SimpleLine
    }
  }
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
.el-header,
.el-footer,
.el-aside,
.el-main{
  position: fixed;
  overflow: auto;
}
.el-header{
  top: 0;
  left: 0;
  height: 60px;
  right: 0;
  line-height: 60px;
  background-color: #b3c0d1;
}
.el-footer{
  bottom: 0;
  left: 200px;
  right: 0;
  height: 60px;
  line-height: 60px;
  background-color: #b3c0d1;
}
.el-aside {
  top: 60px;
  left: 0;
  width: 200px;
  bottom: 0;
  color: #333;
  line-height: 200px;
  background-color: #d3dce6;
}
.el-main {
  top: 60px;
  left: 200px;
  bottom: 60px;
  right: 0;
  background-color: #e9eef3;
  color: #333;
}
</style>
