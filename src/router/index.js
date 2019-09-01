import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
const Main = resolve => require(['../components/Main.vue'], resolve)
const Index = resolve => require(['../components/index/index.vue'], resolve)
const SimpleLine = resolve =>
  require(['../components/D3/SimpleLine.vue'], resolve)
const SimplePie = resolve =>
  require(['../components/D3/SimplePie.vue'], resolve)
const ChinaMap = resolve => require(['../components/D3/ChinaMap.vue'], resolve)
const SimpleForce = resolve =>
  require(['../components/D3/SimpleForce.vue'], resolve)
const SimpleBar = resolve =>
  require(['../components/D3/SimpleBar.vue'], resolve)
const SimplePoints = resolve =>
  require(['../components/D3/SimplePoints.vue'], resolve)

const Bar = resolve => require(['../components/Echarts/bar.vue'], resolve)
const Line = resolve => require(['../components/Echarts/line.vue'], resolve)
const Map = resolve => require(['../components/Echarts/map.vue'], resolve)
const Pie = resolve => require(['../components/Echarts/pie.vue'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: 'index',
          component: Index
        },
        {
          path: '/simpleline',
          name: 'simpleline',
          component: SimpleLine
        },
        {
          path: '/chinamap',
          name: 'chinamap',
          component: ChinaMap
        },
        {
          path: '/simplebar',
          name: 'simplebar',
          component: SimpleBar
        },
        {
          path: '/simpleforce',
          name: 'simpleforce',
          component: SimpleForce
        },
        {
          path: '/simplepoints',
          name: 'simplepoints',
          component: SimplePoints
        },
        {
          path: '/simplepie',
          name: 'simplepie',
          component: SimplePie
        },
        {
          path: '/echartspie',
          name: 'echartspie',
          component: Pie
        },
        {
          path: '/echartsline',
          name: 'echartsline',
          component: Line
        },
        {
          path: '/echartsbar',
          name: 'echartsbar',
          component: Bar
        },
        {
          path: '/echartsmap',
          name: 'echartsmap',
          component: Map
        }
      ]
    }
  ]
})
