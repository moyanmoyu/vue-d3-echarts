<template>
  <div id="container">
  </div>
</template>

<script>
import * as d3 from 'd3'
import tip from 'd3-tip'
var map = require('./../../data/china.json')
export default {
  mounted() {

      var color = d3.scaleOrdinal(d3.schemeCategory20);

      var width  = this.$el.parentElement.offsetWidth-40;
      var height = this.$el.parentElement.offsetHeight-40;

      var projection = d3.geoMercator()
        .center([107, 31])
        .scale(d3.min([width, height]))
        .translate([width/2, height/5*3]);

      var path = d3.geoPath()
        .projection(projection); //地理路径生成器

      var svg = d3.select(this.$el)
        .append('svg')
        .attr('width', width)
        .attr('height', height)

      svg.selectAll('path')
        .data(map.features)
        .enter()
        .append('path')
        .attr('stroke','#000')
        .attr('stroke-width',1)
        .attr('fill', function (d,i) {
          return color(i)
        })
        .attr('d', path)
        .on("mouseover",function(d,i){
          d3.select(this)
            .attr("fill","yellow");
        })
        .on("mouseout",function(d,i){
          d3.select(this)
            .attr("fill",color(i));
        });
  }
}
</script>
