// Function for change on dropdown menu
function optionChanged(testSubjectID){
 
  // This will read the samples.json file however this is working only in Live Server option
  d3.json("JSON/sd_master_df_table.json").then((data) => {
 
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
    //console.log(idMetadata);
    //------------ Test Subject ID filter Section end------------------------------------------

    //------------ For Demographic Info Section ------------------------------------------
    const panelDisplay = d3.select("#sample-metadata");
    panelDisplay.html("");
    Object.entries(idMetadata[0]).forEach(item=> 
       {
          if (((item[0]) === 'zipcode')||((item[0]) === 'Total Students Enrolled') ||((item[0]) === 'Average_School_Rating')||((item[0]) === 'MEDIAN HOUSEHOLD INCOME')||((item[0]) === 'latitude')||((item[0]) === 'longitude')||((item[0]) === 'POPULATION_TOTAL')){
          // console.log(item);
            panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
          }
       });
      
    //------------ Demographic Info Section end------------------------------------------
       
    //------------ Code for Bar Chart ------------------------------------------------------
    const idSample = data.data.filter(item => parseInt(item.zipcode) == testSubjectID);  
   
    // selecting top 10 test subject ID values
    var mediantext = [] 
    var medianvalues = [] 

    Object.entries(idSample[0]).forEach(item=> 
      {
        if (((item[0]) === 'MEDIAN HOUSEHOLD INCOME')||((item[0]) === 'MEDIAN INCOME ASIAN') ||((item[0]) === 'MEDIAN INCOME BLACK/AA')||((item[0]) === 'MEDIAN HOUSEHOLD INCOME')||((item[0]) === 'MEDIAN INCOME HAW/PAC ISLANDER')||((item[0]) === 'MEDIAN INCOME HISPANIC/LATINO')||((item[0]) === 'MEDIAN INCOME INDIGENOUS PEOPLE')||((item[0]) === 'MEDIAN INCOME MIXED RACE')||((item[0]) === 'MEDIAN INCOME OTHER RACE')||((item[0]) === 'MEDIAN INCOME WHITE/NOT LATINO')){
        // console.log(item);
          mediantext.push(item[0])  
          medianvalues.push(item[1])
        }
      });

    
    title1 = ("<b>Median Household Income by Race</b>")
    
    // Define the layout and trace object, edit color and orientation
       const trace = {
        x: mediantext,
        y: medianvalues,
       type: 'bar',
       orientation: "v",
       text:  mediantext,
       marker: {
          color: '#1966FF',
          line: {
             width: 3
         }
        }
       },
       automargin = true
       layout = {
       title: title1,
       xaxis: {title: 'Race', tickangle: 90},
       yaxis: {title: 'Median Income'}
       };
 
       // Plot using Plotly
       Plotly.newPlot('bar', [trace], layout,  {responsive: true});    
    //------------ Code for Bar Chart ends ------------------------------------------------------
       

    //------------ Code for Bubble Chart ------------------------------------------------------
 
    // Remove Sample value and otuID from individual
    var crimetext = [];
    var crimevalue = [];

    Object.entries(idSample[0]).forEach(item=> 
      {
        if (((item[0]) === 'Violent Count_x')||((item[0]) === 'Substance Abuse Count_x') ||((item[0]) === 'Theft Count_x')||((item[0]) === 'Miscellaneous Count_x')){
        // console.log(item);
          crimetext.push(item[0])  
          crimevalue.push(item[1])
        }
      });
 
    // Define the layout and trace object, edit color and orientation
    const trace1 = {
        x: crimetext,
        y: crimevalue,
        mode: 'markers',
        text:  crimetext,
        type: 'bar',
        marker: {
          color: '#1966FF',
          line: {
             width: 3
          }
        }  
    },
 
    layout1 = {
        title: '<b>Crime Reported by Type</b>',
        xaxis: {title: 'Crime Type'},
        yaxis: {title: 'Counts'},
        showlegend: false,
        height: 600,
        width: 800
    };
    
    // Plot using Plotly
    Plotly.newPlot('bar1', [trace1], layout1);

  // Pie chart for Population - Race ratio  
    var racetype = [] 
    var racevalues = [] 

    title2 = ("<b>Population by Race</b>")

    Object.entries(idSample[0]).forEach(item=> 
      {
        if (((item[0]) === 'population_white_ratio')||((item[0]) === 'population_black_aa_ratio') ||((item[0]) === 'population_indigenous_ratio')||((item[0]) === 'population_asian_ratio')||((item[0]) === 'population_haw_pac_islander_ratio')||((item[0]) === 'population_other_ratio')||((item[0]) === 'population_mixed_ratio')||((item[0]) === 'population_hispanic_latino_ratio')){
        // console.log(item);
          racetype.push(item[0])  
          racevalues.push(item[1])
        }
      });

    // Define the layout and trace object, edit color and orientation
    var data = [{
      values: racevalues,
      labels: racetype,
      type: 'pie'
    }];  

    var layout = {
      height: 600,
      width: 600,
      title: title2
    };
      
     Plotly.newPlot('pie', data, layout);

     // 
     var householdtext = [];
     var householdvalue = [];
 
     Object.entries(idSample[0]).forEach(item=> 
       {
         if (((item[0]) === 'married_ratio')||((item[0]) === 'female_hoh_ratio') ||((item[0]) === 'male_hoh_ratio')||((item[0]) === 'non_family_ratio')){
         // console.log(item);
          householdtext.push(item[0])  
          householdvalue.push(item[1] * 100)
         }
       });
  
     // Define the layout and trace object, edit color and orientation
     const trace2 = {
         x: householdtext,
         y: householdvalue,
         mode: 'markers',
         text:  crimetext,
         type: 'bar',
         marker: {
           color: '#1966FF',
           line: {
              width: 3
           }
         }  
     },
  
     layout2 = {
         title: '<b>House hold configuration</b>',
         xaxis: {title: 'Household Type'},
         yaxis: {title: 'Percentage'},
         showlegend: false,
         height: 600,
         width: 800
     };
     
     // Plot using Plotly
     Plotly.newPlot('bar2', [trace2], layout2);     

});
}
    
 // Initial function for Test Subject ID = 940
 optionChanged(91901);
 
 // Event on change takes the value and calls the function during dropdown selection
 d3.select("#selZipcode").on('change',() => {
 optionChanged(d3.event.target.value);
 });   