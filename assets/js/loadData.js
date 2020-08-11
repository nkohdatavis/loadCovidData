
function readData(file, id) {
  console.log(
    "Read the data"
  ); /*Returns a Promise Object the eventual result of an asynchronous operation*/
  d3.csv(
    file,
    processData
  ) /*first line column headings used as property names and every line after that as data*/
    .then((data) => {
      graph(data, id);
      // write(data);

      //filter State Data
      // const MASSDATA = stateDaily(data, 'Massachusetts');

      //Chart State Data
      chart(data);


    }
      /* do something with array of data items collected from processed data*/
    )
    .catch((error) => console.log("Error:", error.message)
    ); /* called when  there is an error anywhere and also takes a callback if there is an error*/
}

//  Data Load
//record read into an array
function processData(datum) {
  return datum; /*Array of all objects processed as file is read */
}

// Assign an id to each record
function graph(data, id) {
  console.log(id, data);
}

// Filter Massachusetts dataset
function filterData(data, state) {
  console.log("Filter Data");

  const MASSDATA = data.filter(d => {
    return d.state === state;
  });

  return MASSDATA;
  console.log(MASSDATA);
  console.log("Filter Completed")

}

function stateDaily(massdata, state) {

  console.log("Display State Daily");

  const MASSDAILY = massdata.filter(d => {
    return (d.state === state
      &&
      d.date >= "2020-02-01" &&
      d.date < "2020-04-01"
    );
  });

  console.log(MASSDAILY);
  console.log("Display State Daily Completed")

};


// Calculate Data Domain Info
// List of category values
// max min
// (data[, accessor]) value and position in the list
// d3.max(data[, accessor])
// d3.extent(data[, accessor])
// d3.sum(data[, accessor])
// d3.mean(data[, accessor])


// Data Transform
// d3.cross d3.max

// Map Data to Image Space
// d3.scalelinear d3.scaletime

//Compute Layout and Paths
// d3.path d3.treemap

//Selection of elements for updates
//Get  let var = selection.element()   
//Set selection.<element>("<value>"")
//Set selectAll("<element>").text("<value>")
//set selection.element"<(value>) 
//Add html element on page d3.select("<element>").html("this <tag>content</tag>")



//Draw Visualization
// d3.select(selector) d3.selectALL d3.append
// return d3 wrapper not the element itself



// let dataset = d3.select("#data-covid")
// console.log(dataset.node())
// console.log(dataset.nodes())


// Bind data to elements using joins
// Data and Elements
// selection.data (data [,key]) list/Array and key
// data appends and does the join
// enter - to access everything data point that is new 
// exit - every element that is not associated with an element
// .event to access the elements
// Update is  using append to create the elements
// call data again gets all the data points with the elements
// when dat gets removed or added
// when selecting d3 gets
//
// Add new elements to the screen
// d3.select("#chart").selectAll("li").data(data)
// the intersection of data that will have elements
// Enter Data with no elements data-points
// d3.select("#chart").selectAll("li").data(data).exit()
// Exist elements with no data 
// d3.select("#chart").selectAll("li").data(data).exit()
// Create and bind elements and data
//d3.select("#chart").selectAll("li").data(data)


