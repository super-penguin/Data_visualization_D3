var w = 350;
var h = 800;
// Define our first path generator:
var projection = d3.geoMercator()
				   .center([-73.94, 40.70])
				   .scale(30000)
				   .translate([(w) / 2, (h)/2]);

//Define path generator
var path = d3.geoPath()
				 .projection(projection);


//Create SVG element
var svg1 = d3.select("#map1")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

var div = d3.select("body").append("div")
		    .attr("class", "tooltip")
		    .style("opacity", 0);

//Load in data
d3.csv("NYC_mental_2014.csv", function(data) {
	//Set input domain for color scale 1385108
	// var color_domain = [450000, 1300000, 2150000, 2400000]
	// var legend_labels = ["<1300000", "1300000+", "1850000+", "2150000+", "2400000+"]

	var color = d3.scaleQuantile()
						.range(["rgb(255,255,212)", "rgb(254,227,145)", "rgb(254,196,79)", "rgb(254,153,41)", "rgb(217,95,14)"]);

	color.domain([
		d3.min(data, function(d) { return d.Population; }),
		d3.max(data, function(d) { return d.Population; })
	]);
	//Load in GeoJSON data
	d3.json("boroughs.geojson", function(json) {
		//Merge the ag. data and GeoJSON
		//Loop through once for each ag. data value
		for (var i = 0; i < data.length; i++) {
			//Grab state name
			var dataState = data[i].BoroName;
			//Grab data value, and convert from string to float
			var dataValue = parseFloat(data[i].Population);
			//Find the corresponding state inside the GeoJSON
			for (var j = 0; j < json.features.length; j++) {
				var jsonState = json.features[j].properties.BoroName;
				if (dataState == jsonState) {
					//Copy the data value into the JSON
					json.features[j].properties.value = dataValue;
					//Stop looking through the JSON
					break;
				}
			}
		}

		//Bind data and create one path per GeoJSON feature
		svg1.append("g")
		   .attr("class", "value")
		   .selectAll("path")
		   .data(json.features)
		   .enter()
		   .append("path")
		   .attr("d", path)
		   .style("fill", function(d) {
		   		//Get data value
		   		var value = d.properties.value;
		   		if (value) {
		   			//If value exists…
			   		return color(value);
		   		} else {
		   			//If value is undefined…
			   		return "#ccc";
		   		}
		   })
		   //Adding mouseevents
		   .on("mouseover", function(d){
			   d3.select(this).transition().duration(300).style("opacity", 1);
    		   div.transition().duration(300).style("opacity", 1)
    		   div.text(d.properties.value)
    			  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY -30) + "px");
		   })
		   .on("mouseout", function(){
			   d3.select(this)
			     .transition().duration(300)
				 .style("opacity", 0.8);
			   div.transition().duration(300)
			     .style("opacity", 0);
		   })

		   var BoroName = svg.selectAll("g.BoroName")
			   .data(data)
			   .enter()
			   .append("g")
			   .attr("class", "BoroName")

			   BoroName.append("circle")
				   .attr("r", 3)
				   .style("fill", "lime")
				   .style("opacity", 0.75);

			   BoroName.append("text")
				   .attr("x", 5)
				   .text(function(d) {return d.properties.value; });
	});
});

var svg3 = d3.select("#map3")
			.append("svg")
			.attr("width", w)
			.attr("height", h);


//Load in data
d3.csv("NYC_mental_2014.csv", function(data) {
	//Set input domain for color scale
	var color = d3.scaleQuantize()
						.range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
	color.domain([
		d3.min(data, function(d) { return d.sum_costs; }),
		d3.max(data, function(d) { return d.sum_costs; })
	]);
	//Load in GeoJSON data
	d3.json("boroughs.geojson", function(json) {
		//Merge the ag. data and GeoJSON
		//Loop through once for each ag. data value
		for (var i = 0; i < data.length; i++) {
			//Grab state name
			var dataState = data[i].BoroName;
			//Grab data value, and convert from string to float
			var dataValue = parseFloat(data[i].sum_costs);
			//Find the corresponding state inside the GeoJSON
			for (var j = 0; j < json.features.length; j++) {
				var jsonState = json.features[j].properties.BoroName;
				if (dataState == jsonState) {
					//Copy the data value into the JSON
					json.features[j].properties.value = dataValue;
					//Stop looking through the JSON
					break;
				}
			}
		}
		//Bind data and create one path per GeoJSON feature
		svg3.selectAll("path")
		   .data(json.features)
		   .enter()
		   .append("path")
		   .attr("d", path)
		   .style("fill", function(d) {
		   		//Get data value
		   		var value = d.properties.value;
		   		if (value) {
		   			//If value exists…
			   		return color(value);
		   		} else {
		   			//If value is undefined…
			   		return "#ccc";
		   		}
		   })
		   .style("stroke", "grey")
		   .style("stroke-width", ".3px");
	});
});


var svg2 = d3.select("#map2")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

//Load in data
d3.csv("NYC_mental_2014.csv", function(data) {
	//Set input domain for color scale'
	var color = d3.scaleQuantize()
					.range(["rgb(222,235,247)", "rgb(49,130,189)", "rgb(33,113,181)", "rgb(8,69,148)", "rgb(8,29,88)"]);
	color.domain([
		d3.min(data, function(d) { return d.mean_charges;}),
		d3.max(data, function(d) { return d.mean_charges;})
	]);
	//Load in GeoJSON data
	d3.json("boroughs.geojson", function(json) {
		//Merge the ag. data and GeoJSON
		//Loop through once for each ag. data value
		for (var i = 0; i < data.length; i++) {
			//Grab state name
			var dataState = data[i].BoroName;
			//Grab data value, and convert from string to float
			var dataValue = parseFloat(data[i].mean_charges);
			//Find the corresponding state inside the GeoJSON
			for (var j = 0; j < json.features.length; j++) {
				var jsonState = json.features[j].properties.BoroName;
				if (dataState == jsonState) {
					//Copy the data value into the JSON
					json.features[j].properties.value = dataValue;
					//Stop looking through the JSON
					break;
				}
			}
		}
		//Bind data and create one path per GeoJSON feature
		svg2.selectAll("path")
		   .data(json.features)
		   .enter()
		   .append("path")
		   .attr("d", path)
		   .style("fill", function(d) {
		   		//Get data value
		   		var value = d.properties.value;
		   		if (value) {
		   			//If value exists…
			   		return color(value);
		   		} else {
		   			//If value is undefined…
			   		return "#ccc";
		   		}
		   })
		   .style("stroke", "grey")
		   .style("stroke-width", ".3px");
	});
});
