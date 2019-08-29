<template>
  <el-header style="text-align: right; font-size: 12px">
    <a class="href-index" href="/">
      <img src="../../assets/logo.png" alt="">
    </a>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>王小虎</span>
  </el-header>
</template>

<script>
export default {
  
}
</script>

<style>
  .el-header{
    background: #474747;
    line-height: 60px;
    color: #fff;
  }
  .el-dropdown{
    color: #fff;
  }
  .href-index{
    float: left;
    height: 40px;
    padding: 10px;
  }
  .href-index img{
    height: 40px;
  }
</style>


