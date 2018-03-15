<template>
  <div id="main"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      charts: '',
      opinion: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      opinionData: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
    }
  },
  mounted () {
    this.init('main')
  },
  methods: {
    init (id) {
      var width = this.$el.parentElement.offsetWidth - 40
      var height = this.$el.parentElement.offsetHeight - 40
      var echarts = document.getElementById(id)
      echarts.style.width = `${width}px`
      echarts.style.height = `${height}px`
      this.drawPie('main')
    },
    drawPie (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
