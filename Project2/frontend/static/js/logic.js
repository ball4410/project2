//Layout for the Plotly plot
var layout = {
  xaxis: { title: "Undergraduate Major",
            automargin: true},
  yaxis: { title: "Mid-Career Median Salary",
        automargin: true}
  };

  //Bar chart 
d3.json("http://127.0.0.1:5000/majors").then(function(data){
    console.log(data)
    Plotly.newPlot('plot', [data], layout);
})

  //Bar chart 
d3.json("http://127.0.0.1:5000/types").then((data) => {
    console.log(data.engineering)
    var trace1 = {
      y: data.engineering,
      name: "Engineering",
      type: "box",
      boxpoints: "all"
    }

    var trace2 = {
      y: data.ivyLeague,
      name: "Ivy League",
      type: "box",
      boxpoints: "all"
    }

    var trace3 = {
      y: data.liberalArts,
      name: "Liberal Arts",
      type: "box",
      boxpoints: "all"
    }

    var trace4 = {
      y: data.party,
      name: "Party",
      type: "box",
      boxpoints: "all"
    }

    var trace5 = {
      y: data.state,
      name: "State",
      type: "box",
      boxpoints: "all"
    }

    var data = [trace1, trace2, trace3, trace4, trace5];

    var boxLayout = {
      xaxis: {title: "Type of College"},
      yaxis: {title: "Median Salary"}
    };

    console.log(data)
    Plotly.newPlot('plot2', data, boxLayout);
})
