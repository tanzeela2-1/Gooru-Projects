const data = [15, 22, 35, 45, 34, 60, 70, 90];
const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;
const g = svg
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);
const x = d3
  .scaleBand()
  .domain(data.map((d, i) => i))
  .range([0, chartWidth])
  .padding(0.2);
const y = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([chartHeight, 0]);
g.selectAll('.bar')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', (d, i) => x(i))
  .attr('y', (d) => y(d))
  .attr('width', x.bandwidth())
  .attr('height', (d) => chartHeight - y(d));
g.selectAll('.label')
  .data(data)
  .enter()
  .append('text')
  .attr('class', 'label')
  .attr('x', (d, i) => x(i) + x.bandwidth() / 2) // center of bar
  .attr('y', (d) => y(d) - 5) // slightly above bar
  .attr('text-anchor', 'middle') // center align
  .attr('font-size', '12px')
  .attr('fill', '#333')
  .text((d) => d); // display data value
g.append('g')
  .attr('transform', `translate(0, ${chartHeight})`)
  .call(d3.axisBottom(x).tickFormat((i) => `Item ${i + 1}`));
g.append('g').call(d3.axisLeft(y));
