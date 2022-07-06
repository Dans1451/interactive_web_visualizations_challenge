// Get the Roadster endpoint
const samples = `https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json`;

// Fetch the JSON data and console log it
d3.json(samples).then(function(data) {
  console.log(data)

  var IDnames = data.names;
  let dropdownMenu = d3.select("#selDataset");
  IDnames.forEach(name => dropdownMenu.append('option').text(name).property('value',name));

});




function optionChanged(ID) {
    d3.json(samples).then(function(data) {
        var samp = data.samples
        console.log(samp);

        var otu_ids = []
        var otu_labels= []
        values = []

        for (let x = 0; x < samp.length; x++ ) {
            if (samp[x].id == ID) {
                let otu_ids = samp[x].otu_ids;
                let otu_labels = samp[x].otu_labels.slice(0,10).reverse();
                let values = samp[x].sample_values.slice(0,10).reverse();
                let otu_label = otu_labels;
                

                // console.log(otu_ids)
                // console.log(otu_label)
                // console.log(values)
                

                var plotData = [{

                    type: 'bar',
                  
                    x: values,
                  
                    y: otu_ids.map(otu_ids => `OTU ${otu_ids}`).slice(0,10).reverse(),
                  
                    orientation: 'h',

                    text: otu_label,

                    marker: {

                    color: 'blue'

                    }
                  
                  }];
                  
                  
                  Plotly.newPlot('bar', plotData, 
                  {title:'Biodiversity Rates',xaxis: {title: 'Population Size' },
                  yaxis:{title:'Organism ID', type: 'category'}, autosize: false, width: 500, height: 500 ,bargap:0.2});

            }
        }
 let stuff = d3.select("#sample-metadata").text(``);
         data.metadata.forEach(x => {
           

            if (x.id == ID) {
                console.log(Object.keys(x));
                Object.keys(x).forEach(y =>{
                    key = y;
                    info = (x[y]);
                    let panel = d3.select("#sample-metadata").append("ul").text(`${key} : ${info}`);


                })
              
            }


         }

         )
         
         for (let x = 0; x < samp.length; x++ ) {
            if (samp[x].id == ID) {
                let otu_ids = samp[x].otu_ids;
                let otu_labels = samp[x].otu_labels.reverse();
                let values = samp[x].sample_values.reverse();
                let otu_label = otu_labels;
         var bubble1 = {

            x: otu_ids,
          
            y: values,
          
            mode: 'markers',
          
            marker: {
          
              color: otu_ids,
          
             text: otu_labels.map(otu_labels => `OTU ${otu_labels}`).reverse(),
          
              size: values
          
            }
          
          };
          
          
          var data = [bubble1];
          
          
          var layout = {
            autosize: true,
          
            title: 'OTUs Found in the Sample',
          
            showlegend: false,

            xaxis:{title:'OTU ID'}
          
          
          
          };
          
          
          Plotly.newPlot('bubble', data, layout);
        }
}
})};

