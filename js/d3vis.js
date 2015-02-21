1
// Let's draw something

// check rilanalyzer

var body = d3.select("body");
// we find the element body of the document

var graphics = body.append("svg");
// we want a new graphics element

graphics.attr ("width", 700);
graphics.attr ("height", 600);


//////// THIS IS A FACE

// eyes
graphics.append("circle")
    .attr ("r", 200)
    .attr ("cx", 300)
    .attr ("cy", 300)
    .style ("fill", "#003399")
    .style ("stroke", "#999999")
    .style ("stroke-width", "10px")
    .style ("opacity", "1");

graphics.append("circle")
    .attr ("r", 50)
    .attr ("cx", 230)
    .attr ("cy", 250)
    .style ("fill", "#999999")

graphics.append("circle")
    .attr ("r", 50)
    .attr ("cx", 370)
    .attr ("cy", 250)
    .style ("fill", "#999999")

graphics.append("circle")
    .attr ("r", 10)
    .attr ("cx", 230)
    .attr ("cy", 250)
    .style ("fill", "#000000")

graphics.append("circle")
    .attr ("r", 10)
    .attr ("cx", 370)
    .attr ("cy", 250)
    .style ("fill", "#000000")



// eyebrows
var eyebrow = d3.svg.arc()
    .innerRadius(80)
    .outerRadius(100)
    .startAngle(Math.PI/180 * 0)
    .endAngle(Math.PI/180 * 60)

graphics.append("path")
    .attr("d", eyebrow)
    .style ("fill", "#999999")
    .attr("transform", "translate(230,250) rotate(-20)");

graphics.append("path")
    .attr("d", eyebrow)
    .style ("fill", "#999999")
    .attr("transform", "translate(370,250) rotate(-40)");

// mouth
var arc_mouth = d3.svg.arc()
    .innerRadius(130)
    .outerRadius(150)
    .startAngle(Math.PI/180*0)
    .endAngle(Math.PI/180*70)

// check http://mathjs.org/

graphics.append("path")
    .attr("d", arc_mouth.outerRadius(170))
    .style ("fill", "#ff9933")
    .attr("transform", "translate(300,270) rotate(155)");




//////// THIS IS AN AWESOME BAR CHART, with some other stuff

//graphics.append("rect")
//    .attr ("x", 40)
//    .attr ("y", 20)
//    .attr ("height", 30)
//    .attr ("width", 50);
//
//
//
//graphics.append("line")
//    .attr ("x1", 100)
//    .attr ("y1", 50)
//    .attr ("x2", 180)
//    .attr ("y2", 10)
//    .attr ("stroke", "#000000")
//    .attr ("stroke-width", 3)
//
//
//
//graphics.append("text")
//    .text ("Best drawing ever!!!!")
//    .attr ("x", 190)
//    .attr ("y", 30);

/*
var charHeight = 297;
var breaks = 40;
var offset = 13;
var initialHeight = 200

// barplot
graphics.append("line")     .attr ("x1", 10)    .attr ("y1", 200)
                            .attr ("x2", 10)    .attr ("y2", 500)
                            .attr ("stroke", "#000000") .attr ("stroke-width", 3)
graphics.append("line")     .attr ("x1", 10)    .attr ("y1", 500)
                            .attr ("x2",510)   .attr ("y2", 500)
                            .attr ("stroke", "#000000") .attr ("stroke-width", 3)

// labels
graphics.append("text") .text ("Y Axis")    .attr ("x", 10)    .attr ("y", 195);
graphics.append("text") .text ("X Axis")    .attr ("x", 515)   .attr ("y", 500);

// bars
for (var n=0; n<9; n++)
{
    var y0=(n^2)*10;
    graphics.append("rect") .attr ("x", offset+n*breaks) .attr ("y", charHeight+y0) .attr ("height", initialHeight-y0) .attr ("width", breaks-2)
        .attr ("transform", "rotate(10)")  //, offset+n*breaks, charHeight+y0)")
        .style ("fill", "#003399")
        .style ("opacity", "1");
}
*/


