<template>
  <div id="container"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  mounted() {
    var data = [
                { age: '<5', population: 2704659 },
                { age: '5-13', population: 4499890 },
                { age: '14-17', population: 2159981 },
                { age: '18-24', population: 3853788 },
                { age: '25-44', population: 14106543 },
                { age: '45-64', population: 8819342 },
                { age: '≥65', population: 612463 }
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

    var radius = Math.min(width, height) / 3;
    
    var svg = d3.select(this.$el)
                .append('svg')
                .attr('width', svg_width)
                .attr('height', svg_height)

    var chart = svg.append('g')
                   .attr('width',width/3*2)
                   .attr('height', height/3*2)
                   .attr('transform', 'translate('+svg_width/3+','+svg_height/2+')') 
                   
    var color = d3.scaleOrdinal(d3.schemeCategory10); 
    

    var arc = d3.arc()
      .innerRadius(0) //设置内半径
      .outerRadius(radius) //设置外半径

    var pie = d3.pie() // 定义饼图
            .sort(null)
            .value(function (d) { return d.population; });

    var pieData = pie(data);

    var sum = 0;
    var allTime = 1000;
    pieData.forEach(d => {
      d.duration = d.data.population / d3.sum(data, d=>{return d.population}) * allTime
      d.newEndAngle = d.endAngle
      d.endAngle = d.startAngle
      d.delay = sum
      sum += d.duration
    });

    chart.selectAll('.cirlcePath')
        .data(pieData)
        .enter()
        .append('path')
        .attr('class', 'cirlcePath')
        .attr('id', function (d, i) {
          return 'circleId' + i
        })
        .attr("d", arc)
        .attr("cursor", 'pointer')
        .style('fill', function (d,i) {
          return color(i)
        })
        .on('mouseover', function (d, i) {
          d3.select(this).transition().duration(200).attr('transform','scale(1.1)');
          var id = '#titleId' + i;
          d3.select(id).transition().duration(200).attr('transform', 'translate(-20, '+ i*30 +')');
        })
        .on('mouseout', function (d, i) {
          d3.select(this).transition().duration(200).attr('transform','scale(1)');
          var id = '#titleId' + i;
          d3.select(id).transition().duration(200).attr('transform', 'translate(0, '+ i*30 +')');
        })
        .transition()
        .duration(function (d, i) {
          return d.duration
        })
        .delay(function (d, i) {
          return d.delay
        })
        .ease(d3.easeLinear)
        .attrTween("d", tweenArc(function(d, i) {  
            return {    
                startAngle: d.startAngle, 
                endAngle: d.newEndAngle
            };
        }))

    var titleGroup = svg.append('g')
        .attr('width', 200)
        .attr('height', data.length * 30)
        .attr('transform', 'translate('+ (svg_width - 300) +','+margin.top+')')

    var titlebox = titleGroup.selectAll('.title')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'title')
        .attr("cursor", 'pointer')
        .attr('id', function (d, i) {
          return 'titleId' + i
        })
        .attr('width', 200)
        .attr('height', 30)
        .attr('transform', function (d, i) {
          return 'translate(0, '+ i*30 +')'
        })
        .on('mouseover', function (d, i) {
          d3.select(this).transition().duration(200).attr('transform', 'translate(-20, '+ i*30 +')');
          var id = '#circleId' + i;
          d3.select(id).transition().duration(200).attr('transform','scale(1.1)');
        })
        .on('mouseout', function (d, i) {
          d3.select(this).transition().duration(200).attr('transform', 'translate(0, '+ i*30 +')');
          var id = '#circleId' + i;
          d3.select(id).transition().duration(200).attr('transform','scale(1)');
        })

    titlebox.append('circle')
        .attr('cx', 8)
        .attr('cy', 8)
        .attr('r', 8)
        .attr('transform', 'translate(0, 4)')
        .attr('fill', function (d, i) {
          return color(i)
        })

    titlebox.append('text')
        .attr('x', 20)
        .attr('y', 15)
        .text(function (d, i) {
          return 'age:' + d.age + ' - population:' + d.population
        })
        .attr('fill', function (d, i) {
          return color(i)
        })

    svg.append('text')
         .attr('x',width/2)
         .attr('y',0)
         .attr('dy', margin.top)
         .attr('text-anchor','middle')
         .text('人口普查各年龄段分布图')

    function tweenArc(b) {  
      return function(a, i) {  
        var d = b.call(this, a, i),  
            i = d3.interpolate(a, d);  
            //d保存转换之后的信息  
            //插值模式，从d.endAnle=d.startAngle到d.endAngle=d._endAngle转换  
        return function(t) {  
            return arc(i(t));  
        };  
      };  
    }

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
  text{
    line-height: 20px;
  }
</style>