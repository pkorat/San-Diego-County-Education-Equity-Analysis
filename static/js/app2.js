// Function for change on dropdown menu
function optionChanged(testSubjectID){
 
  // This will read the samples.json file however this is working only in Live Server option
  d3.json("JSON/sd_white_aa_ratio.json").then((data) => {
 
    // displays the json file in console
    console.log(data);
    
    // Creation of the Test Subject ID dropdown filter
    data.data.forEach(item =>
        {
         //  displayes the id from metadata array  
        //console.log(item);
         // select the individual test subject ID from metadata (i.e. metadata ==> id)
        d3.select ("#selZipcode").append('option').attr('value', item.zipcode).text(item.zipcode);
        });
    // The Test Subject ID is passed to the plotly charts
    //------------ For Test Subject ID filter Section ------------------------------------------
    d3.select("#selZipcode").node().value = testSubjectID;
      
    // Filter Metadata for selected ID from dropdown
const idMetadata = data.data.filter(item=> (item.zipcode == testSubjectID));
const idSample = data.data.filter(item => parseInt(item.zipcode) == testSubjectID);  
 
          
var scatterdata = "JSON/sd_white_aa_ratio.json"


var xvalues = [];
var yvalues  = [];
var pointvalues = [];
var Zipvalue = [];

for (let i=0; i< scatterdata.length; i++){

  row = scatterdata[i];
  xvalues.push(row['population_black_aa_ratio']);
  console.log(xvalues)
  yvalues.push(row['population_white_ratio']);
  console.log(yvalues)
  pointvalues.push(row['Average_School_Rating']);
  console.log(pointvalues)
  Zipvalue.push(row['zipcode']);
  console.log(Zipvalue)
}

  

var trace1 = {
    x: xvalues,
    y: yvalues,
    text: Zipvalue,
    mode: 'markers',
      marker: {
        color: ['rgb(93, 164, 214)'],
        size: pointvalues * 5

    }
};

var chart = [trace1];

var layout = {
  title: 'Bubble Chart Hover Text',
  showlegend: false,
  height: 600,
  width: 600
};

Plotly.newPlot('scatter', chart, layout);

});
}