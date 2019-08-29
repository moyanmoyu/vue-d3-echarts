<template>
  <div id="container"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  mounted(){
    var nodes = [ { name: "桂林" }, { name: "广州" },
                  { name: "厦门" }, { name: "杭州" },
                  { name: "上海" }, { name: "青岛" },
                  { name: "天津" } ];
    
    var links = [ { source : 0 , target: 1 } , { source : 0 , target: 2 } ,
                  { source : 0 , target: 3 } , { source : 1 , target: 4 } ,
                  { source : 1 , target: 5 } , { source : 1 , target: 6 } ];

    var width  = this.$el.parentElement.offsetWidth-40;
    var height = this.$el.parentElement.offsetHeight-40;

    var force = d3.forceSimulation().alphaDecay(0.1) // 设置alpha衰减系数
                .force('collide', d3.forceCollide().radius(() => 30)) // collide 为节点指定一个radius区域来防止节点重叠。
                .force("charge", d3.forceManyBody().strength(-400))  // 节点间的作用力
                .force("center", d3.forceCenter().x(width/2).y(height/2))  // 中心坐标

    force.nodes(nodes)   // 节点数据
          .force('link', d3.forceLink(links).distance(150))  // 连线数据 distance为连线的距离设置
          .alpha(1)  // 设置alpha值，让里导向图有初始动力
          .restart();   // 启动仿真计时器

    var drag = d3.drag()
      .on('start', d => {
        d3.event.active || force.alphaTarget(.3).restart()
        d3.event.subject.fx = d3.event.subject.x
        d3.event.subject.fy = d3.event.subject.y
      })
      .on('drag', d => {
        d3.event.subject.fx = d3.event.x
        d3.event.subject.fy = d3.event.y
      })
      .on('end', d => {
        d3.event.active || force.alphaTarget(0)
        d3.event.subject.fx = null
        d3.event.subject.fy = null
      })

    var svg = d3.select(this.$el)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    var svg_edges = svg.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .style('stroke','red')
      .style('stroke-width',1)

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var svg_nodes = svg.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r',20)
      .style('fill', function (d,i) {
        return color(i);
      })
      .call(drag)  //使得节点能够拖动

    var svg_texts = svg.selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .style('fill','black')
      .attr('dx',20)
      .attr('dy',8)
      .text(function (d) {
        return d.name;
      })

    force.on("tick", function(){ //对于每一个时间间隔
      //更新连线坐标
      svg_edges.attr("x1",function(d){ return d.source.x; })
          .attr("y1",function(d){ return d.source.y; })
          .attr("x2",function(d){ return d.target.x; })
          .attr("y2",function(d){ return d.target.y; });

      //更新节点坐标
      svg_nodes.attr("cx",function(d){ return d.x; })
          .attr("cy",function(d){ return d.y; });

      //更新文字坐标
      svg_texts.attr("x", function(d){ return d.x; })
          .attr("y", function(d){ return d.y; });
    });
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

