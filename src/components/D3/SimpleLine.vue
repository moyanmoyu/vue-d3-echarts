<template>
  <div id="container">
  </div>
</template>

<script>
import * as d3 from 'd3'
import tip from 'd3-tip'
export default {
  mounted(){
    var data = [
      { date: '2009', apple: 130, banana: 40 },
      { date: '2010', apple: 137, banana: 58 },
      { date: '2011', apple: 166, banana: 97 },
      { date: '2012', apple: 154, banana: 117 },
      { date: '2013', apple: 179, banana: 98 },
      { date: '2014', apple: 187, banana: 120 },
      { date: '2015', apple: 189, banana: 84 },
      { date: '2016', apple: 210, banana: 53 }
    ];
    
    var svg_width = this.$el.parentElement.offsetWidth-40;
    var svg_height = this.$el.parentElement.offsetHeight-40;
    var margin = {
      top: 80,
      left: 40,
      bottom: 30,
      right: 100
    }
    
    var width = svg_width - margin.left - margin.right
    var height = svg_height - margin.top - margin.bottom
    
    var svg = d3.select(this.$el)
                .append('svg')
                .attr('width', svg_width)
                .attr('height', svg_height)
    
    function maxNumber() {
      var max1 = d3.max(data.map(function (d) {
        return d.apple
      }))
      var max2 = d3.max(data.map(function (d) {
        return d.banana
      }))
      return Math.max(max1, max2)
    }
    
    var scale_x = d3.scaleBand()
                    .domain(data.map(function (d) {
                      return d.date
                    }))
                    .range([0, width])
    
    var scale = d3.scaleLinear()
                   .domain([0, data.length-1])
                   .range([0+width/data.length/2, width-width/data.length/2])
    
    var scale_y = d3.scaleLinear()
                    .domain([0, maxNumber()])
                    .range([height, 0])
    
    var x_axis = d3.axisBottom().scale(scale_x)
    var y_axis = d3.axisLeft().scale(scale_y)
    
    
    var appletip = tip()
               .attr('class', 'd3-tip')
               .offset([-10, 0])
               .html(function(d) {
                 return "<span style='color:red'>" + d.apple + "</span>";
               })
    
    var bannertip = tip()
               .attr('class', 'd3-tip')
               .offset([-10, 0])
               .html(function(d) {
                 return "<span style='color:red'>" + d.banana + "</span>";
               })
    
    var chart = svg.append('g')
                   .attr('width',width)
                   .attr('height', height)
                   .attr('transform', 'translate('+margin.left+','+margin.top+')')
    
    chart.call(appletip)
    chart.call(bannertip)
    
    var line_generator = d3.line()
                           .x(function (d, i) {
                             return scale(i)
                           })
                           .y(function (d, i) {
                             return scale_y(d)
                           })
    
    // 绘制遮罩
    chart.append("defs").append("clipPath") // 添加长方形方块，遮罩作用
         .attr("id", "clip")
         .append("rect")
         .attr('transform','translate('+ -margin.top +','+ -margin.left +')')
         .attr("height", svg_height)
         .attr("width", 0) // 用遮罩实现线动画
         .transition()
         .duration(1000)   
         .attr("width", svg_width)
    
    chart.append('path')
         .attr('d',line_generator(data.map(function (d) {
           return d.apple
         })))
         .attr('clip-path', 'url(#clip)')
         .attr('fill','none')
         .attr('stroke','red')
    
    chart.append('path')
         .attr('clip-path', 'url(#clip)')
         .attr('d',line_generator(data.map(function (d) {
           return d.banana
         })))
         .attr('fill','none')
         .attr('stroke','yellow')
    
    chart.selectAll('.appleCircle')
         .data(data)
         .enter()
         .append('circle')
         .attr('clip-path', 'url(#clip)')
         .attr('class','appleCircle')
         .attr('cx',function (d, i) {
           return scale(i)
         })
         .attr('cy',function (d, i) {
           return scale_y(d.apple)
         })
         .attr('fill','red')
         .attr('r',5)
         .on('mouseover', appletip.show)
         .on('mouseout', appletip.hide)
    
    chart.selectAll('.bannerCircle')
         .data(data)
         .enter()
         .append('circle')
         .attr('clip-path', 'url(#clip)')
         .attr('fill','yellow')
         .attr('class','bannerCircle')
         .attr('cx',function (d, i) {
           return scale(i)
         })
        .attr('cy',function (d, i) {
          return scale_y(d.banana)
       })
       .attr('r',5)
       .on('mouseover', bannertip.show)
       .on('mouseout', bannertip.hide)
    
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
         .text('单位/万吨')
         .attr('fill','#000')
         .attr('text-anchor','middle')
    
    chart.append('text')
         .attr('clip-path', 'url(#clip)')
         .attr('x',width-width/data.length/2)
         .attr('y',scale_y(data[data.length-1].apple))
         .attr('dx','0.5em')
         .attr('fill','red')
         .attr('dy',5)
         .text('apple')
    
    chart.append('text')
         .attr('clip-path', 'url(#clip)')
         .attr('x',width-width/data.length/2)
         .attr('y',scale_y(data[data.length-1].banana))
         .attr('dx','0.5em')
         .attr('dy',5)
         .attr('fill','yellow')
         .text('banner')

    chart.append('text')
         .attr('x',width/2)
         .attr('y',0)
         .attr('dy', '-1em')
         .attr('text-anchor','middle')
         .text('水果年产量变化图')
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
</style>




