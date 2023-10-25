
  // Create an SVG element for the chart
  const svg = d3.select('body').append('svg');

  // Define your graph dimensions
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Create a scale for the x-axis
  const xScale = d3.scaleTime()
    .domain(d3.extent(dataPoints, (d) => d.time)) // Assuming 'time' property is the timestamp
    .range([0, width]);

  // Create a scale for the y-axis
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataPoints, (d) => d.partsPerMinute)]) // Assuming 'partsPerMinute' is the value
    .nice()
    .range([height, 0]);

  // Create a line generator
  const line = d3.line()
    .x((d) => xScale(d.time))
    .y((d) => yScale(d.partsPerMinute));

  // Append a chart group to the SVG
  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Append the line path to the chart
  chart.append('path')
    .datum(dataPoints)
    .attr('class', 'line')
    .attr('d', line);

  // Implement the rest of your graph here

  res.send(svg.node().outerHTML); // Return the SVG as a response
});

export default router;
