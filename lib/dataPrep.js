export function countTweets(data){
    var tmp = []
    for(const map in data){
        for (var i = 0; i < data[map].tweets.length; i++){
        if(!tmp.includes(data[map].tweets[i])){
            tmp.push(data[map].tweets[i])
        }
        }
    }
    return tmp.length
}

export function prepBarGraph(data){
    data = sortByPercentageLikesWSoftplus(data)
    var series = []
    var names = []
    for (var i = 0; i< 10; i++){
        names.push(`${data[i].emoji} - ${toTitleCase(data[i].name)}`)
        series.push(((data[i].positive/data[i].count)*softplus(1-(data[i].confidence[0]-data[i].confidence[1]))).toFixed(4))
    }

    return {    
      series: [{
        data: series
      }],
      options: {
        chart: {
          type: 'bar',
          height: 380,
          toolbar: {
            show: false,
          }
        },
        legend: {
            show: false,
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
          '#f48024', '#69d2e7'
        ],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex]
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: names,
          labels: {
            show: true,
          },
          axisBorder: {
            show: false,
          },
          min: 0,
          max: 1.2,
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        title: {
            text: 'The Top 10 Zombie Maps of All Time',
            align: 'center',
            floating: true
        },
        subtitle: {
            show: false,
            text: '',
            align: 'center',
            offsetY: 30,
            floating: false,
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex].substring(0,2) + '\'s Approval Score:'
              }
            }
          }
        }
      },
    }
}

export function prepBarGraphAll(data){
    data = sortByPercentageLikesWSoftplus(data)
    var series = []
    var names = []
    for (var i = 0; i< data.length; i++){
        names.push(`${data[i].emoji} - ${toTitleCase(data[i].name)}`)
        series.push(((data[i].positive/data[i].count)*softplus(1-(data[i].confidence[0]-data[i].confidence[1]))).toFixed(4))
    }

    return {    
      series: [{
        data: series
      }],
      options: {
        chart: {
          type: 'bar',
          height: 380,
          toolbar: {
            show: false,
          }
        },
        legend: {
            show: false,
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
          '#f48024', '#69d2e7'
        ],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex]
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: names,
          labels: {
            show: true
          },
          axisBorder: {
            show: false,
          },
          min: 0,
          max: 1.2,
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        title: {
            text: 'The Top Zombie Maps of All Time',
            align: 'center',
            floating: true
        },
        subtitle: {
            show: false,
            text: '',
            align: 'center',
            offsetY: 30,
            floating: false,
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex].substring(0,2) + '\'s Approval Score:'
              }
            }
          }
        }
      },
    }
}

export function prepBarGraphReception(data){
  data = sortByReception(data)
  var series = []
  var names = []
  for (var i = 0; i< 10; i++){
      names.push(`${data[i].emoji} - ${toTitleCase(data[i].name)}`)
      series.push(data[i].reception)
  }

  return {    
    series: [{
      data: series
    }],
    options: {
      chart: {
        type: 'bar',
        height: 380,
        toolbar: {
          show: false,
        }
      },
      legend: {
          show: false,
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom'
          },
        }
      },
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
        '#f48024', '#69d2e7'
      ],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff']
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex]
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: names,
        labels: {
          show: true
        },
        axisBorder: {
          show: false,
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
          text: 'The Top 10 Zombie Maps of All Time',
          align: 'center',
          floating: true
      },
      subtitle: {
          show: false,
          text: '',
          align: 'center',
          offsetY: 30,
          floating: false,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex].substring(0,2) + '\'s Reception Score:'
            }
          }
        }
      }
    },
  }
}

export function prepBarGraphReceptionAll(data){
  data = sortByReception(data)
  var series = []
  var names = []
  for (var i = 0; i< data.length; i++){
      names.push(`${data[i].emoji} - ${toTitleCase(data[i].name)}`)
      series.push((data[i].reception))
  }

  return {    
    series: [{
      data: series
    }],
    options: {
      chart: {
        type: 'bar',
        height: 380,
        toolbar: {
          show: false,
        }
      },
      legend: {
          show: false,
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom'
          },
        }
      },
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
        '#f48024', '#69d2e7'
      ],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff']
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex]
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: names,
        labels: {
          show: true
        },
        axisBorder: {
          show: false,
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
          text: 'The Top 10 Zombie Maps of All Time',
          align: 'center',
          floating: true
      },
      subtitle: {
          show: false,
          text: '',
          align: 'center',
          offsetY: 30,
          floating: false,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex].substring(0,2) + '\'s Reception Score:'
            }
          }
        }
      }
    },
  }
}

export function prepMostTweets(data){
    data = sortByTweets(data)

    return {
        title : 'Most Tweeted Map',
        emoji : data[0].emoji,
        mapName : toTitleCase(data[0].name),
        data : data[0].tweets.length,
        descL : 'With over',
        descR : `tweets, ${toTitleCase(data[0].name)} is the most tweeted map in this dataset.`,
    }
}

export function prepMostDisliked(data){
    data = sortByPercentageLikes(data)

    return {
        title : 'Most Hated On Map',
        emoji : data[data.length-1].emoji,
        mapName : toTitleCase(data[data.length-1].name),
        data : `${(data[data.length-1].positive / data[data.length-1].count).toFixed(2)}%`,
        descL : `${toTitleCase(data[data.length-1].name)} has an approval rating of`,
        descR : `and is the least liked map in our dataset.`,
    }
}

export function prepMostControversial(data){
    data = sortByControversial(data)

    return {
        title : 'Most Controversial Map',
        emoji : data[0].emoji,
        mapName : toTitleCase(data[0].name),
        data : `${data[0].likes}:${data[0].dislikes}`,
        descL : 'With a like to dislike ratio of',
        descR : `${toTitleCase(data[0].name)} has divided the community on opinion.`,
    }
}

export function prepLeastTweets(data){
    data = sortByTweets(data)

    return {
        title : 'Most Irrelevant Map',
        emoji : data[data.length-1].emoji,
        mapName : toTitleCase(data[data.length-1].name),
        data : data[data.length-1].tweets.length,
        descL : 'With only',
        descR : `tweets discussing ${toTitleCase(data[data.length-1].name)}, it\'s the most irrelevant map.`,
    }
}

export function sortByPercentageLikes(stats){
  var tmp = []
  for (const map in stats){
      tmp.push({name:map, ...stats[map]})
  }
  return tmp.sort(compare)

  function compare( a, b ) {
      if ( (a.positive/a.count) < (b.positive/b.count) ){
          return 1;
      }
      if ( (a.positive/a.count) > (b.positive/b.count) ){
          return -1;
      }
      return 0;
  }
}

export function sortByReception(stats){
    var tmp = []
    for (const map in stats){
        tmp.push({name:map, ...stats[map]})
    }
    return tmp.sort(compare)

    function compare( a, b ) {
        if ( a.reception < b.reception ){
            return 1;
        }
        if ( a.reception > b.reception ){
            return -1;
        }
        return 0;
    }
}

export function sortByAvgReception(stats){
  var tmp = []
  for (const map in stats){
      tmp.push({name:map, ...stats[map]})
  }
  return tmp.sort(compare)

  function compare( a, b ) {
      if ( (a.reception/a.count) < (b.reception/b.count) ){
          return 1;
      }
      if ( (a.reception/a.count) > (b.reception/b.count) ){
          return -1;
      }
      return 0;
  }
}

export function sortByNegative(stats){
  var tmp = []
  for (const map in stats){
      tmp.push({name:map, ...stats[map]})
  }
  return tmp.sort(compare)

  function compare( a, b ) {
      if ( (a.negative) < (b.negative) ){
          return 1;
      }
      if ( (a.rnegative) > (b.negative) ){
          return -1;
      }
      return 0;
  }
}

export function sortByTweets(stats){
    var tmp = []
    for (const map in stats){
        tmp.push({name:map, ...stats[map]})
    }
    return tmp.sort(compare)

    function compare( a, b ) {
        if ( a.tweets.length < b.tweets.length ){
            return 1;
        }
        if ( a.tweets.length > b.tweets.length ){
            return -1;
        }
        return 0;
    }
}

export function sortByControversial(stats){
    var tmp = []
    for (const map in stats){
        tmp.push({name:map, ...stats[map]})
    }
    return tmp.sort(compare)

    function compare( a, b ) {
        if ( Math.abs(a.likes - a.dislikes) > Math.abs(b.likes - b.dislikes) ){
            return 1;
        }
        if ( Math.abs(a.likes - a.dislikes) < Math.abs(b.likes - b.dislikes) ){
            return -1;
        }
        return 0;
    }
}

export function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function sortByPercentageLikesWSoftplus(stats){
  var tmp = []
  for (const map in stats){
      tmp.push({name:map, ...stats[map]})
  }
  return tmp.sort(compare)

  function compare( a, b ) {
      if (((a.positive/a.count)*softplus(1-(a.confidence[0]-a.confidence[1]))) < ((b.positive/b.count)*softplus(1-(b.confidence[0]-b.confidence[1])))){
          return 1;
      }
      if (((a.positive/a.count)*softplus(1-(a.confidence[0]-a.confidence[1]))) > ((b.positive/b.count)*softplus(1-(b.confidence[0]-b.confidence[1])))){
          return -1;
      }
      return 0;
  }
}

function softplus(z) {
  return Math.log(1 + Math.pow(Math.E, z))
}
