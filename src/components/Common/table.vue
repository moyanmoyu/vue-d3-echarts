<template>
  <div>
    <div v-show="!showForm">
      <el-tabs type="border-card">
        <el-tab-pane label="用户管理">
          <h1>ssssssssss</h1>
        </el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>

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
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-sizes="[10, 20, 30]"
        :page-size="20"
        layout="sizes, prev, pager, next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="page"
        :total="100">
      </el-pagination>
      <div style="margin-top: 20px">
        <el-button @click="logClick()">打印选择的</el-button>
        <el-button @click="changeLoading()">{{ loading ? '隐藏' : '显示' }}loading</el-button>
        <el-button @click="add()">添加(router-view)</el-button>
        <el-button @click="show()">添加(show)</el-button>
      </div>
    </div>
    <router-view :add="true"/>
    <el-main v-show="showForm">
      <Form @update="update" :id="index"></Form>
    </el-main>
  </div>
</template>

<script>
import Form from './form'
export default {
  data() {
    return {
      date: 1,
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
      newData: {
        date: '2016-06-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      loading: false,
      page: 3,
      showForm: false,
      index: 0
    }
  },
  components: {
    Form
  },
  watch: {
    $route(val) {
      if (val.params.update) {
        console.log('router: update')
      }
    }
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    deleteClick(row) {
      var index = this.tableData.indexOf(row)
      this.tableData.splice(index, 1)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val){
      console.log(`每页 ${val} 条`);
    },
    logClick() {
      console.log(this.multipleSelection)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}, old: ${this.page}`)
      this.page = val
    },
    changeLoading() {
      this.loading = !this.loading
    },
    add() {
      this.$router.push({
        path: '/table/add',
        replace: true
      })
    },
    show() {
      this.showForm = true
      this.index = 1
    },
    update(val) {
      console.log('show:', val)
      this.index = 0
      this.showForm = false
      var newData = Object.assign({}, this.newData)
      newData.date = newData.date.slice(0, -1)
      newData.date += this.date
      this.date += 1
      this.tableData.push(newData)
    }
  }
}
</script>

<style>
.el-pagination {
  text-align: center;
  background: #fff;
  padding: 20px;
}
</style>
