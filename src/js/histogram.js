// data
let data = []
let nestedData = []

var diff = require('color-diff');

// selection
let $container = d3.selectAll('.container__histogram')


function setupChart(){

  var color_buckets = d3.range(0,1,.001);
  color_buckets = color_buckets.map(function(d){
    var rgb = d3.rgb(d3.interpolateSpectral(d));
    return {R:rgb.r, B:rgb.b, G:rgb.g};
  })

  nestedData = d3.nest()
    .key(function(d){
      var color = d3.color("rgb("+d.rgb+")");
      var rgb = d3.rgb(color)
      var closest = diff.closest({R:rgb.r, B:rgb.b, G:rgb.g}, color_buckets);

      var color = "rgb("+closest.R+","+closest.G+","+closest.B+")";
      return color;
    })
    .sortKeys(function(a,b){
      var a_color = d3.hsl(a);
      var b_color = d3.hsl(b);
      return a_color.h - b_color.h;
    })
    .entries(data)

  console.log(nestedData)

  const $groups = $container
    .selectAll('.group')
    .data(nestedData)
    .enter()
    .append('div')
    .attr('class', 'group')

  $groups
    .selectAll('.poster')
    .data(d => d.values)
    .enter()
    .append('div')
    .attr('class', 'poster')
    .style('background-color', function(d){
      return d3.rgb(d3.color("rgb("+d.rgb+")"));
    })
    .style('background-image', d => {
      const path = `url('assets/low-res/${d.fileName}')`
      return path
    })
}

function setup(){
  setupChart()
}

function cleanData(arr){
	return arr.map((d, i) => {
		return {
			...d,
      h: +d.h,
      s: +d.s,
      v: +d.v,
      year: +d.Year,
		}
	})
}

function resize() {}

function init() {
  return new Promise((resolve) => {
		d3.loadData('assets/data/lastData.csv', (err, response) => {
			data = cleanData(response[0])
			setup()
			// setupCompleteButton()
			// $container.each(setupChart)
			resolve()
		})
	})
}

export default { init, resize };
