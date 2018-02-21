<template>
  <div id="container"></div>
</template>

<script>
import * as d3 from 'd3'
import tip from 'd3-tip'
export default {
  mounted(){
    var data = [
      [5, 66], [7, 55], [4, 99], [11, 78], [28, 65], [7, 88], [5, 56], [2, 60], [4, 57], [6, 98],
      [27, 33], [26, 77], [23, 95], [34, 87], [7, 68], [1, 68], [2, 60], [22, 84], [6, 96], [13, 87]
    ];
    var svg_width = this.$el.parentElement.offsetWidth-40;
    var svg_height = this.$el.parentElement.offsetHeight-40;
    var margin = {
      top: 80,
      left: 40,
      bottom: 30,
      right: 80
    }
    var width = svg_width - margin.left - margin.right
    var height = svg_height - margin.top - margin.bottom

    var svg = d3.select(this.$el)
                .append('svg')
                .attr('width', svg_width)
                .attr('height', svg_height)

    var scale_x = d3.scaleLinear()
                    .domain([0, d3.max(data, d=>{
                      return d[0]
                    })])
                    .range([0, width])

    var scale_y = d3.scaleLinear()
                    .domain([0, d3.max(data, d=>{
                      return d[1]
                    })])
                    .range([height, 0])

    var scale_r = d3.scaleLinear()
                    .domain([d3.min(data, d=>{
                      return d[1]
                    }), d3.max(data, d=>{
                      return d[1]
                    })])
                    .range([5, 10])                

    var x_axis = d3.axisBottom().scale(scale_x)   
    var y_axis = d3.axisLeft().scale(scale_y)
    
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    
    var chart = svg.append('g')
                   .attr('width', width)
                   .attr('height', height)
                   .attr('transform', 'translate('+margin.left+','+margin.top+')')

    var d3tip = tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                  return "<strong>运动年限:</strong><span style='color:#ffeb3b'> " + d[0] + " </span><br><strong>健康指数:</strong><span style='color:#ffeb3b'> " + d[1] + " </span>";
                })

    chart.call(d3tip);

    chart.selectAll('.circlePoint')
         .data(data)
         .enter()
         .append('circle')
         .attr('class','circlePoint')
         .attr('cx', d=>{
           return scale_x(d[0])
         })
         .attr('cy', d=>{
           return scale_y(d[1])
         })
         .attr('fill', (d, i)=>{
           return color(i)
         })
         .attr('r', 0)
         .on('mouseover', d3tip.show)
         .on('mouseout', d3tip.hide)
         .transition()
         .duration(1000)
         .attr('r', d=>{
           return scale_r(d[1])
         })

    chart.append('g')
         .call(x_axis)
         .attr('transform', 'translate(0,'+height+')')                  
    
    chart.append('g')
         .call(y_axis)

    chart.append('g')
         .call(x_axis)
         .attr('transform','translate(0,'+height+')')
         .append('text')
         .text('单位/年')
         .attr('transform','translate('+width+',0)')
         .attr('fill','#000')
         .attr('text-anchor','middle')
         .attr('dy', '1.6em')
    chart.append('g')
         .call(y_axis)
         .append('text')
         .text('单位/健康指数')
         .attr('fill','#000')
         .attr('text-anchor','middle')

    chart.append('text')
         .attr('x',width/2)
         .attr('y',0)
         .attr('dy', '-1em')
         .attr('text-anchor','middle')
         .text('[模拟]激烈运动年限与健康指数之间的关系抽样检查')
  },
  beforeDestroy(){
    d3.selectAll('.d3-tip').remove()
  }
}
</script>

<style>
  #container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  svg{
    align-items: center;
    background: #c9c9c9;
  }
  .circlePoint{
    transition-duration: 0.5s;
  }
  .circlePoint:hover{
    r: 15;
  }
</style>
