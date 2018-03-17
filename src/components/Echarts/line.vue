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
    <el-switch
      style="display: block"
      v-model="isSmooth"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="曲线"
      inactive-text="折线">
    </el-switch>
    <div id='main'></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      isStack: false,
      isSmooth: false,
      opinion: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
  },
  mounted() {
    this.init('main')
    window.addEventListener('resize', this.resize)
  },
  watch: {
    isStack(val) {
      if (val) {
        this.series.forEach(item => {
          item.stack = '总量'
        })
      } else {
        this.series.forEach(item => {
          delete (item.stack)
        })
      }
      this.update()
    },
    isSmooth(val) {
      if (val) {
        this.series.forEach(item => {
          item.smooth = true
        })
      } else {
        this.series.forEach(item => {
          item.smooth = false
        })
      }
      this.update()
    }
  },
  methods: {
    init(id) {
      this.parentElement = this.$el.parentElement
      var width = this.parentElement.offsetWidth - 40
      var height = this.parentElement.offsetHeight - 40 - 80
      this.echarts = document.getElementById(id)
      this.echarts.style.width = `${width}px`
      this.echarts.style.height = `${height}px`
      this.drawPie('main')
    },
    resize() {
      var width = this.parentElement.offsetWidth - 40
      var height = this.parentElement.offsetHeight - 40 - 80
      this.echarts.style.width = `${width}px`
      this.echarts.style.height = `${height}px`

      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.charts.resize()
      }, 200)
    },
    drawPie(id) {
      if (!this.charts) {
        this.charts = echarts.init(document.getElementById(id))
      }
      this.charts.setOption(this.getOption())
    },
    update() {
      this.charts.setOption(this.getOption(), true)
    },
    getOption() {
      return {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
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
          boundaryGap: false,
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
.el-switch {
  background: #fff;
  padding: 10px;
}
</style>
