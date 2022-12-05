const data1 = [
  3200000, 3500000, 1100000, 975000, 557000, 417000, 285000, 231000, 184000, 174000, 162000, 141000, 118000, 120000, 96000, 86000, 80000, 78000, 83000, 66000, 63000, 60000, 69000, 73000
]
const data2 = [
  1600000, 5000000, 4400000, 4000000, 3700000, 2900000, 3100000, 2900000, 3400000, 3400000, 4500000, 3100000, 3100000, 3200000, 3300000, 3100000, 3200000, 3000000, 2400000, 2300000, 3000000, 2100000, 2800000, 2400000, 2300000, 2200000, 2500000, 2900000, 3200000, 3700000, 3400000, 2700000, 2900000, 3000000, 2500000, 2800000, 2900000, 3300000, 2600000, 1000000,
]


createGraph(data1, '.graph1', '.g1-final')
createGraph(data2, '.graph2', '.g2-final')



//helpers

function createGraph(data, gNameClass, gFinalClass) {
  const scaleFactor = 1 / 11000
  const barHeight = 16
  const width = d3.max(data) * scaleFactor + 75

  const graph = d3.select(gNameClass)
    .append('svg')
    .attr('width', width)
    .attr('height', barHeight * data.length);

  const bar = graph.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0,${i * barHeight})`)


  bar.append('rect')
    .attr('width', (d) => d * scaleFactor)
    .attr('height', barHeight - 2)

  bar.append('text')
    .attr('x', (d) => d * scaleFactor + 5)
    .attr('y', barHeight / 2)
    .attr('dy', '4')
    .text((d) => dataReadableText(d))

  const g1Final = document.querySelector(gFinalClass)
  g1Final.innerText = (data.at(-2) / d3.max(data) * 100).toFixed(2) + '%'
}

function dataReadableText(d) {
  const million = 10 ** 6
  // if (d >= million) return d / million + 'млн'
  // if (d >= 10 ** 3 && d < million) return d / 10 ** 3 + 'тыс'
  return d >= million ? d / million + 'млн' : d / 10 ** 3 + 'тыс'
}