<template>
  <div id="container"></div>
</template>

<script>
import * as d3 from 'd3'
import tip from 'd3-tip'
export default {
  mounted(){
    var svg_width  = this.$el.parentElement.offsetWidth-40;
    var svg_height = this.$el.parentElement.offsetHeight-40;
    var margin = {
      top: 80,
      left: 60,
      bottom: 30,
      right: 20
    }

    var width = svg_width - margin.left - margin.right
    var height = svg_height - margin.top - margin.bottom

    var data = [{ letter: "一", frequency: 0.08167 },
                { letter: "二", frequency: 0.13492 },
                { letter: "三", frequency: 0.02782 },
                { letter: "四", frequency: 0.04253 },
                { letter: "五", frequency: 0.12702 },
                { letter: "六", frequency: 0.02288 },
                { letter: "日", frequency: 0.22288 }
              ];

    var svg = d3.select(this.$el)
                .append('svg')
                .attr('width', svg_width)
                .attr('height', svg_height)

    var scale_x = d3.scaleBand()
                  .domain(data.map(function (d) {
                    return d.letter
                  }))
                  .range([0, width])
                  .padding(0.1)

    var scale_y = d3.scaleLinear()
                  .domain([0, d3.max(data, function (d) {
                    return d.frequency
                  })])
                  .range([height, 0])

    var x_axis = d3.axisBottom().scale(scale_x)
    var y_axis = d3.axisLeft().scale(scale_y) 

    var d3tip = tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return "<span style='color:red'>" + d.frequency + "</span>";
              })

                  
    var chart = svg.append('g')
                  .attr('transform', 'translate('+margin.left+','+margin.top+')')              

    var bar = chart.selectAll('g')
                  .data(data)
                  .enter()
                  .append('g')
                  .attr('transform', function (d, i) {
                    return 'translate('+ scale_x(d.letter) +',0)'
                  });

    chart.call(d3tip)

    var rect = bar.append('rect')
                  .attr('y', function (d,i) {
                    return scale_y(d.frequency)
                  })
                  .attr('width', scale_x.bandwidth())
                  .attr("fill","steelblue")
                  .on('mouseover', d3tip.show)
                  .on('mouseout', d3tip.hide)
                  .transition()
                  .duration(200)
                  .delay(function (d, i) { return i * 200; })
                  .attr("height", function (d) { return height - scale_y(d.frequency) })


    bar.append('text')
      .attr('x',scale_x.bandwidth()/2,)
      .attr('y', function (d) {
        return scale_y(d.frequency)
      })
      .attr('dy','1em')
      .attr('text-anchor','middle')
      .text(function (d) {
        return d.frequency
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

    chart.append('g')
        .call(x_axis)
        .attr('transform', 'translate(0,'+height+')')
    chart.append('g')
        .call(y_axis)
  },
  beforeDestroy(){
    d3.selectAll('.d3-tip').remove()
  }
}
</script>

