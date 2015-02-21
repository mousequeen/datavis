var width = 900;
var height = 700;

var graphics = d3.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

// Don't forget to change the data file name!
// d3.json("data/uk.json", loadData);

d3.json("data/europe.json", loadData);


var mapProjection = d3.geo.albers()
    .center([0,56])
    .rotate([0, 0])
    .scale(3000)


function loadData(error, dataset) {
	if (error) {

		console.log(error);
	}
	else {
		drawData(dataset);
	}
};

function drawData(dataset) {
	// Draw your data
    //console.log (dataset);
    // social explorer has data

    var countries = topojson.feature(dataset, dataset.objects.countries).features;
    var subunits = topojson.feature(dataset, dataset.objects.subunits).features;

    var ukSubunits = subunits.filter(function(subunit) {
        return subunit.properties.part_of == "GBR";
    });

    var geoPath = d3.geo.path()
        .projection(mapProjection);

    var color = d3.scale.ordinal()
        .domain(["ENG", "SCT", "NIR", "WAL"])  // to assign specific countries
        .range(["#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#333333"]);

    var defcol = function define_color(subunit) {
        if (subunit.id == "ENG")
            return "#c6dbef"
        else if (subunit.id == "SCT")
            return "#9ecae1"
        else if (subunit.id == "NIR")
            return "#6baed6"
        else if (subunit.id == "WLS")
            return "#4292c6"
        else
            return "#006600"
    }

    //function define_color(country) {
    //    return "#006600"
    //}

    //var color = d3.scale.category20c();  // or anything else

    graphics.selectAll ("path")
        .data(countries)
        .enter() // kind of like sapply() in R
        .append("path")
        .attr("d", geoPath)
        .style("fill", "#999999");
//
////       .attr("class", function (data){
////           console.log (data);
////       })
//// data binding in d3
//// calls geoPath with each item of the data


    // color UK differently
    graphics.selectAll ("path2")
        .data(ukSubunits)
        .enter() // kind of like sapply() in R
        .append("path")
        .attr("d", geoPath)
        .style("fill", defcol);


    // add clickable
    graphics.selectAll("path")
        //.on("click", function(region) { console.log("Clicked on", region)})
        .on("click", zoom)

}


function zoom(region)
{
    var z = 3;  // zoom factor
    graphics.attr("transform",
        "translate(" + width / 2 + "," + height / 2 + ")" +
            "scale(" + z + ")" +
            "translate(" + -width/2 + "," + -height/2 + ")");

}


d3.json("data/usersGraph.json", loadUserData);

function loadUserData(error, dataset) {
    if (error) {

        console.log(error);
    }
    else {
        drawUserData(dataset);
    }
};

function drawUserData(dataset) {
    console.log(dataset)

    var circle_marker = d3.svg.arc()
        .innerRadius(15)
        .outerRadius(20)
        .startAngle(Math.PI/180 * 0)
        .endAngle(Math.PI/180 * 360)

    var x = 0.1275;  // true longitude and latitude for London
    var y = 51.5072;
    var out_loc = mapProjection([x,y]);  // to map coords
    graphics.append("path")
        .style ("fill", "#ff0000")
        .attr("transform", "translate(" + out_loc[0] + "," + out_loc[1] + ")")
        .attr("d", circle_marker)

    //var coord = mapProjection([0.1275, 51.5072])
    graphics.append("circle")
        //.attr("cx", coord[0])
        //.attr("cy", coord[1])
        .attr("r", 3)
        .style ("fill", "#ff9933")
        .attr("transform", "translate(" + mapProjection([0.1275, 51.5072])+")");

    graphics.selectAll(".tweet")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("class", "tweet")
        .attr("r", 2.5)
        .attr("fill", "#800014")
        .attr("transform", function(user) {
            var longitude = user.tweets[0].geo.coordinates[1];
            var latitude = user.tweets[0].geo.coordinates[0];
            var coords = [longitude, latitude];
            return "translate(" + mapProjection(coords)+")";
        })
        .style("opacity", 0.3)

    graphics.selectAll(".link")  // in html
        .data(dataset.links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("stroke", "#000000")
        .attr("stroke-width",.5)
        .style("opacity", 0.3)

        .attr("x1", function(link) {return adjust_coords(dataset, link,1)})
        .attr("y1", function(link) {return adjust_coords(dataset, link,2)})
        .attr("x2", function(link) {return adjust_coords(dataset, link,3)})
        .attr("y2", function(link) {return adjust_coords(dataset, link,4)})
}


function adjust_coords(dataset, link, coord_id)
{
    var s_id = link.source
    var t_id = link.target
    var s_coord = dataset.nodes[s_id].tweets[0].geo.coordinates
    var t_coord = dataset.nodes[t_id].tweets[0].geo.coordinates
    var s_fixed = mapProjection([s_coord[1], s_coord[0]])
    var t_fixed = mapProjection([t_coord[1], t_coord[0]])

    if (coord_id == 1)
        return s_fixed[0]
    if (coord_id == 2)
        return s_fixed[1]
    if (coord_id == 3)
        return t_fixed[0]
    if (coord_id == 4)
        return t_fixed[1]
}

