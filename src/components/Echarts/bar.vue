<template>
  <div>
    <el-switch
      style="display: block"
      v-model="isStack"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="叠加"
      inactive-text="独立">
    </el-switch>
    <div id='main'></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      isStack: false,
      opinion: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      series: [
        {
          name: '邮件营销',
          type: 'bar',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'bar',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'bar',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'bar',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'bar',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
  },
  mounted () {
    this.init('main')
  },
  watch: {
    isStack (val) {
      if (val) {
        this.series.forEach(item => {
          item.stack = '广告'
        })
      } else {
        this.series.forEach(item => {
          delete (item.stack)
        })
      }
      this.update()
    }
  },
  methods: {
    init (id) {
      var width = this.$el.parentElement.offsetWidth - 40
      var height = this.$el.parentElement.offsetHeight - 40 - 40
      var echarts = document.getElementById(id)
      echarts.style.width = `${width}px`
      echarts.style.height = `${height}px`
      this.drawPie('main')
    },
    drawPie (id) {
      if (!this.charts) {
        this.charts = echarts.init(document.getElementById(id))
      }
      this.charts.setOption(this.getOption())
    },
    update () {
      this.drawPie('main')
      this.charts.setOption(this.getOption(), true)
    },
    getOption () {
      return {
        title: {
          text: '堆叠柱状图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.opinion
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: this.series
      }
    }
  }
}
</script>

<style>
.el-switch{
  background: #fff;
  padding: 10px;
}
</style>
