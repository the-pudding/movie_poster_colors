// data
let data = []
let nestedData = []

// selection
let $container = d3.selectAll('.container__histogram')


function setupChart(){
  nestedData = d3.nest()
    .key(d => +d.hueGroup)
    .sortKeys(d3.ascending)
    .entries(data)

  console.log({nestedData})

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
    .style('background-color', d => d.imgPalette1)
    // .style('background-image', d => {
    //   const path = `url('assets/low-res/${d.fileName}')`
    //   return path})
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
