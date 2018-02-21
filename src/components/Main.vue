<template>
  <el-container class="is-vertical wrapper">
    <Eheader></Eheader>
    <el-container>
      <el-aside>
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
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



