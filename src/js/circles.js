import './pudding-chart/circleChart'

// data
let data = []
let nested = []

// selections
const $circles = d3.selectAll('.container__circles')

function resize() {}

function nestData(){
  nested = d3.nest()
    .key(d => d.genres)
    .entries(data)

  console.log({nested})
}

function setupCharts(){
  const charts = $circles
    .selectAll('.chart')
    .data(nested)
    .enter()
    .append('div')
    .attr('class', d => `chart chart--${d.key}`)
    .circle_chart()
}

function setup(){
  nestData()
  setupCharts()
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

function init() {
  return new Promise((resolve) => {
		d3.loadData('assets/data/genreColors.csv', (err, response) => {
			data = cleanData(response[0])
			setup()
			// setupCompleteButton()
			// $container.each(setupChart)
			resolve()
		})
	})
}

export default { init, resize };
