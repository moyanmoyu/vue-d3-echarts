<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      ref="multipleTable"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size="20"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="page"
      :total="100">
    </el-pagination>
    <div style="margin-top: 20px">
      <el-button @click="logClick()">打印选择的</el-button>
      <el-button @click="changeLoading()">{{ loading ? '隐藏' : '显示' }}loading</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      loading: false,
      page: 3
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    logClick () {
      console.log(this.multipleSelection)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}, old: ${this.page}`)
      this.page = val
    },
    changeLoading () {
      this.loading = !this.loading
    }
  }
}
</script>

<style>
.el-pagination{
  text-align: center;
  background: #fff;
  padding: 20px;
}
</style>
