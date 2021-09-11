var data = "JSON/sd_white_aa_ratio.json"

var chart = new Taucharts.Chart({
    guide: {
      x: {
        label: 'Cycle Time in days'
      },
      y: {
        label: 'Effort in points'
      },
      padding: {
        b: 40,
        l: 40,
        t: 10,
        r: 10
      },
    
    },
    data: data,
    type: 'scatterplot',
    x: 'population_black_aa_ratio',
    y: 'population_white_ratio',
    size: 'Average_School_Rating',
    plugins: [Taucharts.api.plugins.get('legend')()]
  });
  chart.renderTo('#scatter');