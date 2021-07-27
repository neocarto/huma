// https://observablehq.com/@neocartocnrs/black-lives-matter-in-the-mediterranean@1060
import define1 from "./450051d7f1174df8@252.js";
import define2 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Black Lives Matter in the Mediterranean`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`To date, there is no official system in Europe for counting the dead of migration. [UNITED for Intercultural Action](http://www.unitedagainstracism.org/) was the first to take the lead in the 1990s to fill this gap. This collective, which today brings together more than 560 organizations, launched itself very early on into this macabre accounting system in an attempt to understand the extent of what was at stake in the Mediterranean and thus denounce the racism and nationalism of European countries. At the same time, the Italian journalist Gabriele Del Grande was also trying to reference these dramas in the Mediterranean through his blog [Fortress Europe](http://fortresseurope.blogspot.com/). In 2013, in an attempt to cross-reference and verify as much information as possible, the "[Migrants Files](https://www.themigrantsfiles.com/) project, initiated by a group of European journalists, compiled all available information and verified it one by one, revealing that all the data known until then underestimated the reality. Finally, since 2014, the IOM (International Organization for Migration) has been referring daily in a database the dead or missing persons in migration around the world on its portal "[Missing Migrants Project](https://missingmigrants.iom.int/).`
)});
  main.variable(observer()).define(["md","d3","data"], function(md,d3,data){return(
md`### ${d3.rollup(data, v =>
  d3.sum(v, d => d.nb)
)} deaths in migration in Europe's neighbourhood, 1993 - 2020`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Putting these different data together gives the tragic figure of **50,000** women, men and children who have died in migration in the vicinity of the European Union since the early 1990s. According to all the experts, this figure greatly underestimates the reality...`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`See also: https://www.humanite.fr/comment-la-mediterranee-est-devenue-la-frontiere-migratoire-la-plus-meurtriere-au-monde-carte-698546`
)});
  main.variable(observer("viewof language")).define("viewof language", ["select"], function(select){return(
select({
  title: "Language",
  options: ["fr", "en"],
  value: "fr"
})
)});
  main.variable(observer("language")).define("language", ["Generators", "viewof language"], (G, _) => G.input(_));
  main.variable(observer("viewof date")).define("viewof date", ["Scrubber","range"], function(Scrubber,range){return(
Scrubber(range, { delay: 1000, loopDelay: 1500 })
)});
  main.variable(observer("date")).define("date", ["Generators", "viewof date"], (G, _) => G.input(_));
  main.variable(observer("map")).define("map", ["simulation","d3","width","height","sphere","path","countries","topojson","schengen","col","phrase","mdm","radius","language","title","callout","legtitle","legend","date","source"], function(simulation,d3,width,height,sphere,path,countries,topojson,schengen,col,phrase,mdm,radius,language,title,callout,legtitle,legend,date,source)
{
  for (let i = 0; i < 200; i++) {
    simulation.tick();
  }

  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("width", "100%")
    .style("height", "auto");

  var defs = svg.append("defs");

  // Sphere

  svg
    .append("g")
    .append("path")
    .datum(sphere)
    .attr("class", "graticuleOutline")
    .attr("d", path)
    .style('fill', "#3A3A3A");

  // Countries

  svg
    .append("path")
    .datum(countries)
    .attr("fill", "#444444")
    .attr("d", path);

  // Schengen

  svg
    .append("path")
    .datum(topojson.feature(schengen, schengen.objects.schengenline))
    .attr("stroke", col)
    .attr("fill", "none")
    .attr("stroke-dasharray", 1)
    .attr("d", path);

  // phrase

  for (let i = 0; i < phrase.length; i++) {
    svg
      .append("text")
      .attr("y", 315 + i * 14)
      .attr("x", 15)
      .attr("font-family", "sans-serif")
      .attr("fill", col)
      .style("font-size", i == 0 ? "25px" : "11px")
      .text(phrase[i]);
  }

  // Dorling circles

  svg
    .append("g")
    .selectAll("circle")
    .data(mdm)
    .enter()
    .append("circle")
    .attr("r", d => radius(d.nb))
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("fill", col)
    .attr("stroke", "none")
    .attr("class", "dots");

  // Schengen Area label

  svg
    .append("text")
    .text("Schengen")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .attr("stroke", "white")
    .attr("stroke-width", 6)
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round")
    .attr("stroke", "#3A3A3A")
    .attr("transform", "translate(152,138) rotate(-63)")
    .style("font-size", "9px")
    .attr("fill-opacity", 1);

  svg
    .append("text")
    .text("Schengen")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .attr("fill", col)
    .attr("transform", "translate(152,138) rotate(-63)")
    .style("font-size", "9px")
    .attr("fill-opacity", 1);

  // Title

  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", language == "fr" ? 305 : 265)
    .attr("height", 35)
    .attr("fill", col);

  svg
    .append("text")
    .text(title)
    .attr("x", 15)
    .attr("y", 23)
    .attr("font-family", "sans-serif")
    .attr("font-weight", "bold")
    .attr("fill", "#3A3A3A")
    .style("font-size", "17px")
    .attr("fill-opacity", 1);

  // Tooltip

  const tooltip = svg.append("g");

  svg
    .selectAll(".dots")
    .on("touchmove mousemove", function(event, d) {
      tooltip.call(
        callout,
        (language == "fr" ? d.date_fr : d.date_en) +
          "\n\n" +
          d.count +
          "\n" +
          d.children
      );
      tooltip.attr("transform", `translate(${d3.pointer(event, this)})`);
      d3.select(this)
        .attr("stroke", "#141414")
        .attr("stroke-width", 2);
      //.raise();
    })
    .on("touchend mouseleave", function() {
      tooltip.call(callout, null);
      d3.select(this)
        .attr("fill", col)
        .attr("stroke", "none");
      //.lower();
    });

  // Legend

  for (let i = 0; i < legtitle.length; i++) {
    svg
      .append("text")
      .attr("y", 50 + i * 9)
      .attr("x", 15)
      .attr("font-family", "sans-serif")
      .attr("fill", col)
      .style("font-size", "8px")
      .text(legtitle[i]);
  }

  svg
    .append("g")
    .attr("transform", `translate(15, 66)`)
    .call(legend);

  // Year

  svg
    .append("text")
    .attr("x", 476)
    .attr("y", 60)
    .text(date)
    .attr("font-family", "sans-serif")
    .attr("font-weigt", "bold")
    .style("font-size", "70px")
    .style('fill', col);
  //.attr("fill-opacity", 0.05);

  // Source

  svg
    .append("text")
    .attr("x", 5)
    .attr("y", height - 5)
    .text(source)
    .attr("font-family", "sans-serif")
    .style("font-size", "7px")
    .style("font-style", "italic")
    .attr("fill-opacity", 0.4)
    .style('fill', col);

  // Signature

  svg
    .append("svg:image")
    .attr("x", width - 37)
    .attr("y", height - 17)
    .attr("width", 35)
    .attr(
      "xlink:href",
      "https://nlambert.gitpages.huma-num.fr/resources/images/signature_yellow.svg"
    );

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`# Parameters`
)});
  main.variable(observer("k")).define("k", function(){return(
25
)});
  main.variable(observer("col")).define("col", function(){return(
"#E8AE38"
)});
  main.variable(observer("range")).define("range", function()
{
  let foo = [];
  for (var i = 1993; i <= 2020; i++) {
    foo.push(i);
  }
  return foo;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`# Texts`
)});
  main.variable(observer("title")).define("title", ["language"], function(language){return(
language == "fr"
  ? "Les damnés de la mer, 1993 - 2020"
  : "The Border Kills, 1993 - 2020"
)});
  main.variable(observer("legtitle")).define("legtitle", ["language","date"], function(language,date)
{
  let txt =
    language == "fr"
      ? "Femmes, hommes et enfants morts ou portés disparus\nlors de leur migration en " +
        date
      : "Dead or missing women, men and children\nduring their migration in " +
        date;
  return txt.split("\n");
}
);
  main.variable(observer("phrase")).define("phrase", ["totaux","date","language"], function(totaux,date,language)
{
  let txt1 =
    totaux.get(date) +
    "\npersonnes sont mortes en migration\nau voisinage de l'Europe au cours de l'année " +
    date +
    ".\nCela représente " +
    Math.round(totaux.get(date) / 12) +
    " personnes par mois, " +
    Math.round(totaux.get(date) / 52) +
    " par semaine,\nsoit environ " +
    Math.round((10 * totaux.get(date)) / 365) / 10 +
    " vies perdues par jour.";

  let txt2 =
    totaux.get(date) +
    "\npeople died in migration in the\nneighborhood of Europe in " +
    date +
    ". This\nmeans " +
    Math.round(totaux.get(date) / 12) +
    " people per month, " +
    Math.round(totaux.get(date) / 52) +
    " per week,\nor about " +
    Math.round((10 * totaux.get(date)) / 365) / 10 +
    " human lives lost per day.";

  let txt = language == "fr" ? txt1 : txt2;

  return txt.split("\n");
}
);
  main.variable(observer("source")).define("source", ["language"], function(language){return(
language == "fr"
  ? "Cartoraphie : Nicolas Lambert, 2021. Données : United Against Racism (1993 - 1999) ; The Migrant's file (2000 - 2013) ; OIM (2014 - 2020)"
  : "Map Design: Nicolas Lambert, 2021. Data: United Against Racism (1993 - 1999) ; The Migrant's file (2000 - 2013) ; OIM (2014 - 2020)"
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Data Handling`
)});
  main.variable(observer("simulation")).define("simulation", ["d3","mdm","projection","radius"], function(d3,mdm,projection,radius){return(
d3
  .forceSimulation(mdm)
  .force("x", d3.forceX(d => projection(d.coords)[0]))
  .force("y", d3.forceY(d => projection(d.coords)[1]))
  .force("collide", d3.forceCollide(d => 0.5 + radius(d.nb)))
  .stop()
)});
  main.variable(observer("csv")).define("csv", ["d3"], function(d3){return(
d3.csv(
  "https://raw.githubusercontent.com/neocarto/resources/master/datasets/deadandmissing/output/mdm.csv"
)
)});
  main.variable(observer("data")).define("data", ["csv"], function(csv){return(
csv
  .filter(d => +d.latitude >= 22.5)
  .filter(d => +d.latitude <= 65)
  .filter(d => +d.longitude >= -20)
  .filter(d => +d.longitude <= 47)
  .filter(d => +d.year <= 2020)
)});
  main.variable(observer("mdm")).define("mdm", ["data","language","date"], function(data,language,date){return(
data
  .map(d => ({
    coords: [+d.longitude, +d.latitude],
    date_fr: d["date_fr"],
    date_en: d["date_en"],
    year: +d["year"],
    count:
      language == "fr"
        ? +d["nb"] > 1
          ? d["nb"] + " vies perdues"
          : d["nb"] + " vie perdue"
        : +d["nb"] > 1
        ? d["nb"] + " lives lost"
        : d["nb"] + " file lost",
    children:
      language == "fr"
        ? d["children"] != "NA"
          ? "dont au moins " +
            +d["children"] +
            " enfant" +
            (d["children"] > 1 ? "s" : "")
          : ""
        : d["children"] != "NA"
        ? "including at least " +
          +d["children"] +
          (d["children"] > 1 ? " children" : " child")
        : "",
    nb: +d["nb"]
  }))
  .filter(d => +d.year == +date)
)});
  main.variable(observer("radius")).define("radius", ["d3","data","k"], function(d3,data,k){return(
d3.scaleSqrt([0, d3.max(data, d => +d["nb"])], [0, k])
)});
  main.variable(observer("legend")).define("legend", ["legendCircle","d3","mdm","radius"], function(legendCircle,d3,mdm,radius){return(
legendCircle()
  .tickValues([1, d3.max(mdm, d => d.nb)])
  .scale(radius)
)});
  main.variable(observer("totaux")).define("totaux", ["d3","data"], function(d3,data){return(
d3.rollup(
  data,
  v => d3.sum(v, d => d.nb), //Aggregate by the sum of amount
  d => +d.year // group first by name
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Appendix`
)});
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  main.variable(observer("callout")).define("callout", ["col"], function(col){return(
(g, value) => {
  if (!value) return g.style("display", "none");

  g.style("display", null)
    .style("pointer-events", "none")
    .style("font", "8px sans-serif");

  const path = g
    .selectAll("path")
    .data([null])
    .join("path")
    .attr("fill", col)
    .attr("stroke", "black");

  const text = g
    .selectAll("text")
    .data([null])
    .join("text")
    .call(text =>
      text
        .selectAll("tspan")
        .data((value + "").split(/\n/))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        .style("font-weight", (_, i) => (i ? null : "bold"))
        .style("font-size", (_, i) => (i ? null : 9))
        .text(d => d)
    );

  const { x, y, width: w, height: h } = text.node().getBBox();

  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr(
    "d",
    `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
  );
}
)});
  main.variable(observer("legendCircle")).define("legendCircle", ["col"], function(col){return(
function(context) {
  let scale,
    tickValues,
    tickFormat = d => d,
    tickSize = 5;

  function legend(context) {
    let g = context.select("g");
    if (!g._groups[0][0]) {
      g = context.append("g");
    }
    g.attr("transform", `translate(${[1, 1]})`);

    const ticks = tickValues || scale.ticks();

    const max = ticks[ticks.length - 1];

    g.selectAll("circle")
      .data(ticks.slice().reverse())
      .enter()
      .append("circle")
      .attr("fill", "none")
      .attr("stroke", col)
      .attr("stroke-width", 0.9)
      .attr("cx", scale(max))
      .attr("cy", scale)
      .attr("r", scale);

    g.selectAll("line")
      .data(ticks)
      .enter()
      .append("line")
      .attr("stroke", col)
      .attr("stroke-dasharray", "2, 1")
      .attr("stroke-width", 0.5)
      .attr("x1", scale(max))
      .attr("x2", tickSize + scale(max) * 2)
      .attr("y1", d => scale(d) * 2)
      .attr("y2", d => scale(d) * 2);

    g.selectAll("text")
      .data(ticks)
      .enter()
      .append("text")
      .attr("font-family", "'Helvetica Neue', sans-serif")
      .attr("font-size", 7)
      .attr("fill", col)
      .attr("dx", 3)
      .attr("dy", 2.5)
      .attr("x", tickSize + scale(max) * 2)
      .attr("y", d => scale(d) * 2)
      .text(tickFormat);
  }

  legend.tickSize = function(_) {
    return arguments.length ? ((tickSize = +_), legend) : tickSize;
  };

  legend.scale = function(_) {
    return arguments.length ? ((scale = _), legend) : scale;
  };

  legend.tickFormat = function(_) {
    return arguments.length ? ((tickFormat = _), legend) : tickFormat;
  };

  legend.tickValues = function(_) {
    return arguments.length ? ((tickValues = _), legend) : tickValues;
  };

  return legend;
}
)});
  main.variable(observer("projection")).define("projection", ["d3"], function(d3){return(
d3
  .geoAzimuthalEqualArea()
  .rotate([-20.0, -52.0])
  .translate([420, 70])
  .scale(620)
  .precision(.1)
)});
  main.variable(observer("width")).define("width", function(){return(
640
)});
  main.variable(observer("height")).define("height", function(){return(
400
)});
  main.variable(observer("sphere")).define("sphere", function(){return(
{ type: "Sphere" }
)});
  main.variable(observer("countries")).define("countries", ["topojson","land"], function(topojson,land){return(
topojson.feature(land, land.objects.land)
)});
  main.variable(observer("schengen")).define("schengen", ["d3"], function(d3){return(
d3.json(
  "https://raw.githubusercontent.com/neocarto/resources/master/geometries/Europe/schengenline.topojson"
)
)});
  main.variable(observer("land")).define("land", ["d3"], function(d3){return(
d3.json(
  "https://raw.githubusercontent.com/neocarto/resources/master/geometries/World/ne_50m_admin_0_land.topojson"
)
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require('topojson')
)});
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  main.import("select", child2);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6", "d3-force@2", "d3-geo-projection@2")
)});
  return main;
}
