d3.json("http://127.0.0.1:5000/find").then(function(data){

    var tableData = data;

    showTable(tableData)

    function filterTable(){
      let filteredData = tableData;
    
      Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === value)
      })
    
      showTable(filteredData)
    };

    let filters = {}

    function setFilters(){
      let changeElement = d3.select(this).select("input");
      let elementValue = changeElement.property("value");
      let filterID = changeElement.attr("id");
    
      if(elementValue){
        filters[filterID] = elementValue
      }else{
        delete filters[filterID]
      }
    
      filterTable()
    };

    d3.selectAll(".filter").on("change", setFilters)
})

var tbody = d3.select("tbody");

function showTable(data){
  console.log(data)
  tbody.html("")

  data.forEach((schoolInfo) => {
    var row = tbody.append("tr");
    Object.entries(schoolInfo).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

}