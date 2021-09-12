// Function for change on dropdown menu
function optionChanged(testSubjectID){
 
  // This will read the sd_master_df_table.json file however this is working only in Live Server option
  d3.json("JSON/sd_master_df_table.json").then((data) => {
 
    // displays the json file in console
    console.log(data);
    
    // Creation of the Test Subject ID dropdown filter
    data.data.forEach(item =>
        {
         // select the individual test subject ID (Zipcode) from data object (i.e. data ==> zipcode)
          d3.select ("#selZipcode").append('option').attr('value', item.zipcode).text(item.zipcode);
        });
    // The Test Subject ID (zipcode) is passed to the plotly charts

    //------------ For Test Subject ID filter Section ------------------------------------------
    d3.select("#selZipcode").node().value = testSubjectID;
    
    // Filter data for selected ID from dropdown
    const idMetadata = data.data.filter(item=> (item.zipcode == testSubjectID));

    //------------ Test Subject ID filter Section end------------------------------------------

    //------------ For Zipcode Demographic Info Section ------------------------------------------
    const panelDisplay = d3.select("#sample-metadata");
    panelDisplay.html("");

    //Selecting the required parameters from the Json to display in the Zipcode Demographic section 
    Object.entries(idMetadata[0]).forEach(item=> 
       {
          if (((item[0]) === 'zipcode')||((item[0]) === 'Total Students Enrolled') ||((item[0]) === 'Average_School_Rating')||((item[0]) === 'MEDIAN HOUSEHOLD INCOME')||((item[0]) === 'latitude')||((item[0]) === 'longitude')||((item[0]) === 'POPULATION_TOTAL')){
            panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
          }
       });
      
    //------------ Zipcode Demographic Info Section end------------------------------------------
       
    //------------ Code for Bar Chart "Median Household Income by Race in San Diego County for each zipcode" ----------------
    const idSample = data.data.filter(item => parseInt(item.zipcode) == testSubjectID);  
   
    // selecting top 10 test subject ID values
    //var mediantext = [] 
    var medianvalues = [] 
    var mediantitles = ['Median','African Americans','Indigenous','Asian','H/P Islander','Others','Mixed','White','Hispanic']

    Object.entries(idSample[0]).forEach(item=> 
      {
        if (((item[0]) === 'MEDIAN HOUSEHOLD INCOME')||((item[0]) === 'MEDIAN INCOME ASIAN') ||((item[0]) === 'MEDIAN INCOME BLACK/AA')||((item[0]) === 'MEDIAN HOUSEHOLD INCOME')||((item[0]) === 'MEDIAN INCOME HAW/PAC ISLANDER')||((item[0]) === 'MEDIAN INCOME HISPANIC/LATINO')||((item[0]) === 'MEDIAN INCOME INDIGENOUS PEOPLE')||((item[0]) === 'MEDIAN INCOME MIXED RACE')||((item[0]) === 'MEDIAN INCOME OTHER RACE')||((item[0]) === 'MEDIAN INCOME WHITE/NOT LATINO')){
        // console.log(item);
          //mediantext.push(item[0])  
          medianvalues.push(item[1])
        }
      });

    
    title1 = ("<b>Median Household Income by Race</b>")
    
    // Define the layout and trace object, edit color and orientation
       const trace = {
        x: mediantitles,
        y: medianvalues,
       type: 'bar',
       orientation: "v",
       name: 'Race',
       text:  mediantitles,
       marker: {
          color: '#1966FF',
          line: {
             width: 1
         }
        }
       }
      
       layout = {
       title: title1,
       xaxis: {title: 'Race'},
       yaxis: {title: 'Median Income (in $)'},
       showlegend: true,
       height: 400,
       width: 600
       };
 
       // Plot using Plotly
       Plotly.newPlot('bar', [trace], layout,  {responsive: true});    
    //------------ Code for Bar Chart ends ------------------------------------------------------
     
    //------------ Code Crime Reported by Type in selected zipcode bar chart----------------------------------------------------
 
    // Create dictionary to store data from JSON
    var crimevalue = [];
    var crimedata = ['Theft','Substance Abuse','Violent','Miscellaneous'];

    Object.entries(idSample[0]).forEach(item=> 
      {
        if (((item[0]) === 'Violent Count_x')||((item[0]) === 'Substance Abuse Count_x') ||((item[0]) === 'Theft Count_x')||((item[0]) === 'Miscellaneous Count_x')){
          crimevalue.push(item[1])
        }
      });
 
    // Define the layout and trace object, edit color and orientation
    const trace1 = {
        x: crimedata,
        y: crimevalue,
        mode: 'markers',
        text:  crimedata,
        type: 'bar',
        name: 'Crime Categories',
        marker: {
          color: '#1966FF',
          line: {
             width: 1
          }       
        }  
    },
 
    layout1 = {
        title: '<b>Crime Reported by Categories</b>',
        xaxis: {title: 'Crime Categories'},
        yaxis: {title: 'Counts (Last 6 months)'},
        showlegend: true,
        height: 400,
        width: 500
    };
    
    // Plot using Plotly
    Plotly.newPlot('bar1', [trace1], layout1);

  // Pie chart for Population - Race ratio  
    var racetype = ['White','African','Indigenous','Asian','H/P Islander','Other','Mixed','Hispanic'] 
    var racevalues = [] 

    title2 = ("<b>Population by Race</b>")

    Object.entries(idSample[0]).forEach(item=> 
      {
        if (((item[0]) === 'population_white_ratio')||((item[0]) === 'population_black_aa_ratio') ||((item[0]) === 'population_indigenous_ratio')||((item[0]) === 'population_asian_ratio')||((item[0]) === 'population_haw_pac_islander_ratio')||((item[0]) === 'population_other_ratio')||((item[0]) === 'population_mixed_ratio')||((item[0]) === 'population_hispanic_latino_ratio')){
        // console.log(item); 
          racevalues.push(item[1])
        }
      });

    // Define the layout and trace object, edit color and orientation
    var data = [{
      values: racevalues,
      labels: racetype,
      type: 'pie',
      hole:.3
    }];  

    var layout = {
      height: 400,
      width: 500,
      title: title2
    };
      
     Plotly.newPlot('pie', data, layout);

    //------------ Code Household configuration in selected zipcode bar chart---------------------------------------------------- 
     var householdtext = ['Married','Female HOH','Male HOH','Non Family'];
     var householdvalue = [];
 
     Object.entries(idSample[0]).forEach(item=> 
       {
         if (((item[0]) === 'married_ratio')||((item[0]) === 'female_hoh_ratio') ||((item[0]) === 'male_hoh_ratio')||((item[0]) === 'non_family_ratio')){
         // console.log(item);
          householdvalue.push(item[1] * 100)
         }
       });
  
     // Define the layout and trace object, edit color and orientation
     const trace2 = {
         x: householdtext,
         y: householdvalue,
         mode: 'markers',
         text:  householdtext,
         type: 'bar',
         name: 'Household Type',
         marker: {
           color: '#1966FF',
           line: {
              width: 1
           }
         }  
     },
  
     layout2 = {
         title: '<b>House hold Configuration</b>',
         xaxis: {title: 'Household Type'},
         yaxis: {title: 'Percentage'},
         showlegend: true,
         height: 400,
         width: 500
     };
     
     // Plot using Plotly
     Plotly.newPlot('bar2', [trace2], layout2);     

    //------------ Education Statistics in selected zipcode bar chart----------------------------------------------------
 
    // Create dictionary to store data from JSON
    var eduvalue = [];
    var edudata = ['10th','High School','GED','Associate','Bachelors','Masters','Professional','Doctoral'];

    Object.entries(idSample[0]).forEach(item=> 
      {
        if (((item[0]) === 'o25_10th_grade_attained_ratio')||((item[0]) === 'o25_high_school_completed_ratio') ||((item[0]) === 'o25_ged_attained_ratio')||((item[0]) === 'o25_assoc_degree_completed_ratio')||((item[0]) === 'o25_bach_degree_completed_ratio')||((item[0]) === 'o25_masters_degree_completed_ratio') ||((item[0]) === 'o25_professional_degree_completed_ratio')||((item[0]) === 'o25_doctoral_degree_completed_ratio')){
          edudata.push(item[0])
          eduvalue.push(item[1] * 100)
        }
      });
 
    // Define the layout and trace object, edit color and orientation
    const trace3 = {
        x: edudata,
        y: eduvalue,
        mode: 'markers',
        text:  edudata,
        type: 'bar',
        name: 'Education Level',
        marker: {
          color: '#1966FF',
          line: {
             width: 1
          }       
        }  
    },
 
    layout3 = {
        title: '<b>Educational Statistics</b>',
        xaxis: {title: 'Educational Statistics'},
        yaxis: {title: 'Counts (in %)'},
        showlegend: true,
        height: 400,
        width: 500
    };
    
    // Plot using Plotly
    Plotly.newPlot('bar3', [trace3], layout3);

});
}
    
 // Initial function for Test Subject ID = 940
 optionChanged(91901);
 
 // Event on change takes the value and calls the function during dropdown selection
 d3.select("#selZipcode").on('change',() => {
 optionChanged(d3.event.target.value);
 });   