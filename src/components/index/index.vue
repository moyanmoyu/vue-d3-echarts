<template>
  <div>
    main
    <el-button
    plain
    @click="open">
    Notification
  </el-button>
  </div>
</template>

<script>
import Notification from './../notification/notification.js'
export default {
  methods: {
    open() {
      Notification({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success'
      })
    }
  }
}
</script>

