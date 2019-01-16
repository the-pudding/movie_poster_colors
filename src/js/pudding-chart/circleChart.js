/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.circle_chart = function init(options) {
	function createChart(el) {
		const $sel = d3.select(el);
		let data = $sel.datum();
		// dimension stuff
		let width = 0;
		let height = 0;
		const marginTop = 4;
		const marginBottom = 4;
		const marginLeft = 0;
		const marginRight = 0;
    const radius = 4

		// scales
		const scaleX = d3.scaleLinear();
		const scaleY = d3.scaleLinear();

		// dom elements
		let $svg = null;
		let $axis = null;
		let $vis = null;

		// helper functions

		const Chart = {
			// called once at start
			init() {
				$svg = $sel.append('svg.pudding-chart');

        $svg.append('text.title')
          .text(d => d.key)
				const $g = $svg.append('g');

				// offset chart for margins
				$g.at('transform', `translate(${marginLeft}, ${marginTop})`);

				// create axis
				$axis = $svg.append('g.g-axis');

				// setup viz group
				$vis = $g.append('g.g-vis');

				Chart.resize();
				Chart.render();
			},
			// on resize, update new dimensions
			resize() {
				// defaults to grabbing dimensions from container element
				width = $sel.node().offsetWidth - marginLeft - marginRight;
				height = $sel.node().offsetHeight - marginTop - marginBottom;

        scaleX
          .domain([0, 1])
          //.domain([1960, 2018])
          .range([0, width - marginRight - marginLeft])

        scaleY
          //.domain([0, 1])
          .domain([1960, 2018])
          .range([0, height - marginTop - marginBottom])


				$svg.at({
					width: width + marginLeft + marginRight,
					height: height + marginTop + marginBottom
				});
				return Chart;
			},
			// update scales and render chart
			render() {

        const circle = $vis.selectAll('.circle__movie')
          .data(data.values)
          .enter()
          .append('circle')
          .attr('class', d => `circle__movie circle__movie-${d.year}`)
          .attr('r', radius)
          .attr('cy', d => scaleY(d.year))
          .attr('cx', d => scaleX(d.h))
          .st('fill', d => d.imgPalette1)
          .st('opacity', 0.8)

				return Chart;
			},
			// get / set data
			data(val) {
				if (!arguments.length) return data;
				data = val;
				$sel.datum(data);
				Chart.render();
				return Chart;
			}
		};
		Chart.init();

		return Chart;
	}

	// create charts
	const charts = this.nodes().map(createChart);
	return charts.length > 1 ? charts : charts.pop();
};
