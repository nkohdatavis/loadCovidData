// import {
//     select,
//     csv,
//     scaleLinear,
//     scaleTime,
//     extent,
//     axisLeft,
//     axisBottom,
//     line,
//     curveBasis
// } from 'd3';

import { colorLegend } from './colorLegend.js';

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

//accessor functions
const render = data => {
    const title = 'Massachusetts Covid-19 Cases by County';

    const xValue = d => d.date;
    const xAxisLabel = 'Time';

    const yValue = d => d.cases;
    const yAxisLabel = 'Cases';
    const circleRadius = 6;

    const margin = { top: 60, right: 200, bottom: 88, left: 130 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleTime()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    // console.log(xScale.domain());
    // console.log(xScale.range());

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    const colorScale = d3.scaleOrdinal(d3.schemeAccent);
    // console.log(yScale.domain());
    // console.log(yScale.range());

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);

    const yAxisG = g.append('g').call(yAxis);

    yAxisG.selectAll('.domain').remove();

    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -80)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    const lineGenerator = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis);

    // yValue of the last entry for each county
    const lastYValue = d =>
        yValue(d.values[d.values.length - 1]);

    // console.log(lastYValue);

    const nested = d3.nest()
        .key(d => d.county)
        .entries(data)
        .sort((a, b) =>
            d3.descending(lastYValue(a), lastYValue(b))
        );

    // console.log(nested);

    //data join
    g.selectAll('.line-path').data(nested)
        .enter().append('path')
        .attr('class', 'line-path')
        .attr('d', d => lineGenerator(d.values))
        .attr('stroke', d => colorScale(d.key));

    //bandwidth compute width of a single bar
    // 	g.selectAll('circle').data(data)
    //   	.enter().append('circle')
    //   		.attr('cy', d => yScale(yValue(d)))
    //   		.attr('cx', d => xScale(xValue(d)))
    //   		.attr('r', circleRadius);

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(title);

    svg.append('g')
        .attr('transform', `translate(780,75)`)
        .call(colorLegend, {
            colorScale,
            circleRadius: 10,
            spacing: 23,
            textOffset: 20
        });

};


//Data Table
d3.csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv')
    .then(data => {
        // console.log(data);
        const MASSDATA = data.filter(function (d) { return d.state == "Massachusetts" })

        MASSDATA.forEach(d => {
            d.date = new Date(d.date);
            d.cases = +d.cases;
            d.deaths = +d.deaths;
        });

        render(MASSDATA);
    });


