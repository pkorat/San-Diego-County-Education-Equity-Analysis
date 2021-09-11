// Function for change on dropdown menu
function optionChanged(testSubjectID){
 
  // This will read the samples.json file however this is working only in Live Server option
  d3.json("JSON/sdcrime_statistics.json").then((data) => {
 
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

    // Check the metadata loaded for the test subject ID
    console.log(idMetadata);
    //------------ Test Subject ID filter Section end------------------------------------------

    //------------ For Demographic Info Section ------------------------------------------
    const panelDisplay = d3.select("#sample-metadata");
    panelDisplay.html("");
    Object.entries(idMetadata[0]).forEach(item=> 
       {
          // console.log(item);
          panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
       });
    //------------ Demographic Info Section end------------------------------------------
       
    //------------ Code for Bar Chart ------------------------------------------------------
    const idSample = data.samples.filter(item => parseInt(item.zipcode) == testSubjectID);  
   
    // selecting top 10 test subject ID values
    var testSubjectValue = idSample[0].sample_values.slice(0,10);
    testSubjectValue= testSubjectValue.reverse();
    var otuID = idSample[0].otu_ids.slice(0,10);
    otuID = otuID.reverse();
    var otuLabels = idSample[0].otu_labels
    otuLabels = otuLabels.reverse();
    title1 = ("<b>Top 10 OTUs found for Test Subject ID: </b>")
 
    // Y axis of bar chart
    const yAxis = otuID.map(item => 'OTU' + " " + item);
    
    // Define the layout and trace object, edit color and orientation
       const trace = {
        x: testSubjectValue,
        y: yAxis,
       type: 'bar',
       orientation: "h",
       text:  otuLabels,
       marker: {
          color: '#1966FF',
          line: {
             width: 3
         }
        }
       },
       layout = {
       title: title1 + testSubjectID,
       xaxis: {title: 'Number of Samples Collected'},
       yaxis: {title: 'OTU ID'}
       };
 
       // Plot using Plotly
       Plotly.newPlot('bar', [trace], layout,  {responsive: true});    
    //------------ Code for Bar Chart ends ------------------------------------------------------
       

    //------------ Code for Bubble Chart ------------------------------------------------------
 
    // Remove Sample value and otuID from individual
    var testSubjectValue1 =idSample[0].sample_values;
    var otuID1= idSample[0].otu_ids;
 
    // Define the layout and trace object, edit color and orientation
    const trace1 = {
        x: otuID1,
        y: testSubjectValue1,
        mode: 'markers',
        marker: {
            color: otuID1,
            size: testSubjectValue1
        }
    },
 
    layout1 = {
        title: '<b>Bubble Chart For Each Sample</b>',
        xaxis: {title: 'OTU ID'},
        yaxis: {title: 'Number of Samples Collected'},
        showlegend: false,
        height: 800,
        width: 1200
    };
    
    // Plot using Plotly
    Plotly.newPlot('bubble', [trace1], layout1);

    //------------ Code for Bubble Chart ------------------------------------------------------

//------------ BONUS ---------------------------------------------------------------------
//------------ Code for Gauge Chart ------------------------------------------------------

 // Gauge Chart to plot weekly washing frequency 
 const guageDisplay = d3.select("#gauge");
 guageDisplay.html(""); 
 const washFreq = idMetadata[0].wfreq;
 
 const guageData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: washFreq,
      title: { text: "<b>Belly Button Washing Frequency </b><br> Scrubs Per Week" },
      type: "indicator",
      mode: "gauge+number+delta",     
       gauge: {
       axis: { range: [0,9] },
       bar: { color: "#1919FF" },
       steps: [
        { range: [0, 1], color: "#FF0000" },
        { range: [1, 2], color: "#FF5533" },
        { range: [2, 3], color: "#FF9933" },
        { range: [3, 4], color: "#FFDD33" },
        { range: [4, 5], color: "#FFFF33" },
        { range: [5, 6], color: "#DDFF33" },
        { range: [6, 7], color: "#99FF33" },
        { range: [7, 8], color: "#77FF33" },
        { range: [8, 9], color: "#33FF33" }        
      ],
       threshold: {
            line: { color: "#F5F3F2", width: 5 },
            thickness: 0.75,
            value: washFreq
        }
      }
    }
  ]; 
  const gaugeLayout = {  width: 600, 
                   height: 400, 
                   margin: { t: 0, b: 0 }, 
                    };
 
 // Plot using Plotly
  Plotly.newPlot('gauge', guageData, gaugeLayout); 
 
});
}
    
 // Initial function for Test Subject ID = 940
 optionChanged(91901);
 
 // Event on change takes the value and calls the function during dropdown selection
 d3.select("#selDataset").on('change',() => {
 optionChanged(d3.event.target.value);
 });   