<template>
  <div id='main'></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
export default {
  data () {
    return {
      geoCoordMap: {
        '海门': [121.15, 31.89],
        '鄂尔多斯': [109.781327, 39.608266],
        '招远': [120.38, 37.35],
        '舟山': [122.207216, 29.985295],
        '齐齐哈尔': [123.97, 47.33],
        '盐城': [120.13, 33.38],
        '赤峰': [118.87, 42.28],
        '青岛': [120.33, 36.07]
      },
      mapValue: [
        { name: '海门', value: 9 },
        { name: '鄂尔多斯', value: 12 },
        { name: '招远', value: 12 },
        { name: '舟山', value: 12 },
        { name: '齐齐哈尔', value: 14 },
        { name: '盐城', value: 15 },
        { name: '赤峰', value: 16 },
        { name: '青岛', value: 18 }
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
        backgroundColor: '#404a59',
        title: {
          text: '全国主要城市空气质量',
          subtext: 'data from PM25.in',
          sublink: 'http://www.pm25.in',
          x: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + ' : ' + params.value[2]
          }
        },
        legend: {
          orient: 'vertical',
          y: 'bottom',
          x: 'right',
          data: ['pm2.5'],
          textStyle: {
            color: '#fff'
          }
        },
        visualMap: {
          min: 0,
          max: this.maxValue(),
          calculable: true,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d']
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: this.convertData(),
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          }
        ]
      })
    },
    convertData () {
      var res = []
      for (var i = 0; i < this.mapValue.length; i++) {
        var geoCoord = this.geoCoordMap[this.mapValue[i].name]
        if (geoCoord) {
          res.push({
            name: this.mapValue[i].name,
            value: geoCoord.concat(this.mapValue[i].value)
          })
        }
      }
      return res
    },
    maxValue () {
      var max = 0
      this.mapValue.forEach(item => {
        if (item.value > max) {
          max = item.value
        }
      })
      return max
    }
  }
}
</script>
