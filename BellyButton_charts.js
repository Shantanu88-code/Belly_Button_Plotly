d3.json("samples.json").then((data) => {
  console.log(data);
})


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// // 1. Create the buildCharts function.
// function buildCharts(sample) {
//   // 2. Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
//     // 3. Create a variable that holds the samples array. 
//     var samples = data.samples;
//     // 4. Create a variable that filters the samples for the object with the desired sample number.
//     var filterArray = samples.filter(sampleObject => sampleObject.id == sample);
    
//     //  5. Create a variable that holds the first sample in the array.
//     var resultSample = filterArray[0];

//     // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
//     var ids = resultSample.otu_ids
//     var labels = resultSample.otu_labels
//     var values = resultSample.sample_values

//     // 7. Create the yticks for the bar chart.
//     // Hint: Get the the top 10 otu_ids and map them in descending order  
//     //  so the otu_ids with the most bacteria are last. 

//     var yticks = ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

//     // 8. Create the trace for the bar chart. 
//     var barData = [
//       {   
//           y: yticks,//otu_ids top10
//           x: values.slice(0,10).reverse(),
//           text: labels.slice(0,10).reverse(), //otu_labels  top10
//           type: 'bar',
//           orientation: 'h',
//           width: 0.6
          
//       }
//   ];
//     // 9. Create the layout for the bar chart. 
//     var barLayout = {

//       title : "Top 10 Bacteria Cultures Found",
//       xaxis : {title : "Sample Value", tickangle : 0},
//       yaxis : {title : "OTU", gridwidth : 1}
//     };
//     // 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot('bar', barData, barLayout); 
//   });
// }

// Bar and Bubble charts
// Create the buildCharts function.
// function buildCharts(sample) {
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
    

//     // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot('bar', barData, barLayout); 

//     // 1. Create the trace for the bubble chart.
//     let xticksBubble = ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()
//     var bubbleData = [
//       {
//       x: xticksBubble, //otu_id
//       y: values.slice(0,10).reverse(), // sample_values
//       text: labels.slice(0,10).reverse(), // otu_labels
//       mode: 'markers',
//       marker: {
//       // color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
//       size: values.slice(0,10).reverse() //size = sample value
//       }  
//     }   
//     ];

//     // 2. Create the layout for the bubble chart.
//     var bubbleLayout = {
//       title : "Bacteria Cultures Per Sample",
//       showlegend: false,
//       height: 600,
//       width: 1150,
//       margin: { t:40 , l: 70, b: 35, r: 20 },
//       showlegend: false,
//       xaxis : {title : "OTU ID"},
//       yaxis : {title : "Sample Value"}
//     };

//     // 3. Use Plotly to plot the data with the layout.
//     Plotly.newPlot('bubble', bubbleData, bubbleLayout); 
//   });
// }

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    let arraySample = data.samples;
    let metadataArray = data.metadata;
    // Create a variable that filters the samples for the object with the desired sample number.
    let filteredSample = arraySample.filter(sampleName => sampleName.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    let filteredMetaSample = metadataArray.filter(sampleName => sampleName.id == sample);
    // Create a variable that holds the first sample in the array.
    let firstSampleData = filteredSample[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    let firstMetadata = filteredMetaSample[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    let ids = firstSampleData.otu_ids;
    let labels = firstSampleData.otu_labels;
    let samples_values = firstSampleData.sample_values;

    // 3. Create a variable that holds the washing frequency.
    let wfreq = parseInt(firstMetadata.wfreq)
    // Create the yticks for the bar chart.
    let yticks = ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()
    // BarData
    var barData = [
      {   
          y: yticks,//otu_ids top10
          x: samples_values.slice(0,10).reverse(),
          text: labels.slice(0,10).reverse(), //otu_labels  top10
          type: 'bar',
          orientation: 'h',
          width: 0.6
          
      }
  ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {

      title : "Top 10 Bacteria Cultures Found",
      xaxis : {title : "Sample Value", tickangle : 0},
      yaxis : {title : "OTU", gridwidth : 1},
      margin : { t:30, l: 150}
    };
    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot('bar', barData, barLayout);

    // let xticksBubble = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()
    
    var bubbleData = [
      {
      x: ids, //otu_id
      y: samples_values, // sample_values
      text: labels, // otu_labels
      mode: 'markers',
      marker: {
        color: ids,
        colorscale: "Portland",
        size: samples_values //size = sample value
      }
    }   
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title : "Bacteria Cultures Per Sample",
      showlegend: false,
      // height: 600,
      // width: 1150,
      hovermode: 'closest',
      margin: { t:30 },
      showlegend: false,
      xaxis : {title : "OTU ID"},
      yaxis : {title : "Sample Value"}
    };
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq, //Washing frequency
        title: { text: "Belly Button Washing frequency" },
        type: "indicator",

        mode: "gauge+number+delta",
        delta: { reference: 4, increasing: { color: 'green' } },
        gauge: {
            axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
            bar:{color: 'blue'},
            steps: [
                { range: [0, 4], color: "red" },
                { range: [4, 9], color: "green" }
            ],
            threshold: {
                line: { color: "grey", width: 4 },
                thickness: 1,
                value: 9
            }
        },
        bgcolor: "lavender",
    }
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      width: 400,
      height: 370,
      // margin: { t: 25, r: 25, l: 25, b: 25 },
      margin: {t: 0, b:0},
      paper_bgcolor: "white",
      font: { color: "darkblue", family: "Arial" }
  };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}
