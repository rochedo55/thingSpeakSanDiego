var ctx = document.getElementById("canvas3");
var config_line3 = {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: "Temperatura",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [],
    },
    {
      label: 'Umidade',
      data: [],
      borderWidth: 6,
      borderColor: 'rgba(56,176,222,0.85)',
      backgroundColor: 'transparent',
    }]
  },options: {
    responsive: true,
    title: {
      display: true,
      text: 'Chart.js and Thingspeak Chart'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        type: 'time',
        ticks: {
          minRotation: 90,
          source: 'data'  
        },
        distribution: 'series',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Sample'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Values'
        }
      }]
    }
  }
};

function createmyline3() {
    var ctx = document.getElementById('canvas3').getContext('2d');
    window.myline3 = new Chart(ctx, config_line3);
    getLastThingSpeakData3();
};

function getLastThingSpeakData3(){
  
    var channel_id = 1293177; //id do canal
    var field_number1 = 1; //numero do field
    var field_number2 = 2; //numero do field
    var num_results = 10; //numero de resultados requisitados
    $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/fields/' + field_number1 + '.json?results=10', function(data) {
        // get the data point
        feeds = data.feeds;
        // imprime os feeds recebidos
        console.log("aa",data.feeds)
        // intera em todos os feeds recebidos e os adiciona no grafico
        for (d in feeds)
        {
        //variavel config_line3.data.datasets[0].data eh equivalente ao eixo y
        config_line3.data.datasets[0].data.push(feeds[d].field1);
        //variavel config_line3.labels eh equivalente ao eixo x
        var x_date = new Date(feeds[d].created_at);
        config_line3.data.labels.push(x_date);
        }
        window.myline3.update();
    });

    $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/fields/' + field_number2 + '.json?results=10', function(data) {
        // get the data point
        feeds = data.feeds;
        // imprime os feeds recebidos
        console.log(data.feeds)
        // intera em todos os feeds recebidos e os adiciona no grafico
        for (d in feeds)
        {
        //variavel config_line3.data.datasets[1].data eh equivalente ao eixo y
        config_line3.data.datasets[1].data.push(feeds[d].field2);
        //variavel config_line3.labels eh equivalente ao eixo x
        var x_date = new Date(feeds[d].created_at);
        config_line3.data.labels.push(x_date);
        }
        window.myline3.update();
    });
}