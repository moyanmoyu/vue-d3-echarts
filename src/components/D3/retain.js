function relation() {
    var a, b, c, d, e, f = "id",
        g = 15,
        width = 600,
        height = 600,
        j = -30,
        k = 20,
        l = 2;
    this.init = function() {
      c = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(j))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(1.2 * g)), 
      c.nodes(a).on("tick", this.render), 
      c.force("link", d3.forceLink().links(b).id(function(a) {
            return a[f]
        })
        .distance(k)
      ), 
      this.initDrag(), 
      e = d.getContext("2d"), 
      this.restart(), 
      this.pause()
    }, 
    this.render = function() {
        e.clearRect(0, 0, h, i), 
        e.lineWidtwidth = l, 
        e.strokeStyle = "black", 
        e.beginPath(), 
        b.forEach(function(a) {
            e.moveTo(a.source.x, a.source.y), 
            e.lineTo(a.target.x, a.target.y)
        }), 
        e.stroke(), 
        e.lineWidtwidth = 3, 
        e.strokeStyle = "black", 
        a.forEach(function(a) {
            e.fillStyle = a.color, 
            e.beginPath(), 
            e.arc(a.x, a.y, a.radius, 0, 2 * Math.PI), 
            e.fill(), 
            e.stroke()
        }), 
        e.font = "14px Comic Sans MS", 
        e.fillStyle = "black", 
        e.textAlign = "center", 
        a.forEach(function(a) {
            e.fillText(a.name, a.x, a.y + 2.5 * a.radius)
        })
    }, 
    this.initDrag = function() {
        function a() {
            return c.find(d3.event.x, d3.event.y)
        }

        function b() {
            d3.event.active || c.alphaTarget(.3).restart(), d3.event.subject.fx = d3.event.subject.x, d3.event.subject.fy = d3.event.subject.y
        }

        function e() {
            d3.event.subject.fx = d3.event.x, d3.event.subject.fy = d3.event.y
        }

        function f() {
            d3.event.active || c.alphaTarget(0), d3.event.subject.fx = null, d3.event.subject.fy = null
        }
        d3.select(d).call(d3.drag().container(d).subject(a).on("start", b).on("drag", e).on("end", f))
    }, 
    this.pause = function() {
        c.stop()
    }, 
    this.run = function() {
        c.restart()
    }, 
    this.restart = function() {
        c.alpha(1), this.run()
    }, 
    this.setNodes = function(b) {
        a = b
    }, 
    this.setLinks = function(a) {
        b = a
    }, 
    this.setId = function(a) {
        f = a
    }, 
    this.setRadius = function(a) {
        g = a
    }, 
    this.setCanvas = function(a) {
        d = a
    }, 
    this.setSize = function(a, b) {
        width = a, height = b
    }, 
    this.setCharge = function(a) {
        j = a
    }, 
    this.setLinkLengtwidth = function(a) {
        k = a
    }
}