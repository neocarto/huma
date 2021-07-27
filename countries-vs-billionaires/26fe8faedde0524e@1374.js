// https://observablehq.com/@neocartocnrs/countries-vs-billionaires@1374
import define1 from "./a4f599acbbef9a1e@218.js";
import define2 from "./a2e58f97fd5e8d7c@620.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Countries *vs* Billionaires`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`This map shows that one person can be richer than countries. But when we look at the size of the circles, we also see that because of their economic power, the rich states are largely able to oppose these new masters. Sharing or accumulating? It's up to us to decide...`
)});
  main.variable(observer("viewof language")).define("viewof language", ["Toggle"], function(Toggle){return(
Toggle({ label: "English", value: false })
)});
  main.variable(observer("language")).define("language", ["Generators", "viewof language"], (G, _) => G.input(_));
  main.variable(observer("viewof who")).define("viewof who", ["Select","billionaires","language"], function(Select,billionaires,language){return(
Select(billionaires, {
  label: language ? "Choose a billionaire" : "Choisissez un milliardaire",
  value: billionaires.find(t => t.name === "Jeff Bezos"),
  format: x => x.name == "- - - - -" ?  "- Richesse des pays -": x.name + " (" + x.company+")"
})
)});
  main.variable(observer("who")).define("who", ["Generators", "viewof who"], (G, _) => G.input(_));
  main.variable(observer("map")).define("map", ["d3","width","height","sphere","path","countries","source","legcircles","language","gdpbyid","countriesEnter","countriesExit","circlesEnter","circlesExit"], function(d3,width,height,sphere,path,countries,source,legcircles,language,gdpbyid,countriesEnter,countriesExit,circlesEnter,circlesExit)
{
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("width", "100%")
    .style("height", "auto");

  var defs = svg.append("defs");

  const filter = defs
    .append('filter')
    .attr('id', 'border-blur')
    .append('feGaussianBlur')
    .attr('in', 'SourceGraphic')
    .attr('stdDeviation', 7)
    .attr('result', 'shadow');

  const pattern = defs
    .append("pattern")
    .attr("id", "hatch")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", 8)
    .attr("height", 8);

  pattern
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 8)
    .attr("y1", 8)
    .attr("stroke", "white")
    .attr("stroke-width", 0.3)
    .attr("stroke-opacity", 0.8);

  svg
    .append("g")
    .append("path")
    .datum(sphere)
    .attr("class", "graticuleOutline")
    .attr("d", path)
    .style('fill', "#9ACBE3");

  svg
    .append("g")
    .append("path")
    .datum(sphere)
    .attr("class", "graticuleOutline")
    .attr("d", path)
    .attr('fill', "url('#hatch')");
  //.style('fill', "#9ACBE3");

  svg
    .append("g")
    .append("path")
    .datum(d3.geoGraticule10())
    .attr("class", "graticule")
    .attr("d", path)
    .attr("clip-path", "url(#clip)")
    .style('fill', "none")
    .style('stroke', "white")
    .style('stroke-width', .8)
    .style('stroke-opacity', .5)
    .style('stroke-dasharray', 2);

  svg
    .append('g')
    .selectAll("path")
    .data(countries.features)
    .join('path')
    .attr("d", path)
    .attr("fill", "white")
    .attr("fill-opacity", 0.15);

  svg
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("x", 0)
    .attr("y", height - 20)
    .attr("width", width)
    .attr("height", 20);

  svg
    .append("g")
    .append("path")
    .datum(sphere)
    .attr("d", path)
    .attr("clip-path", "url(#clip)")
    .attr("fill", '#C84742');

  svg
    .append('text')
    .attr("x", width / 2)
    .attr("y", height - 7)
    .attr("fill", 'white')
    .attr("font-family", "sans-serif")
    .style("font-size", "11px")
    .attr("text-anchor", "middle")
    .attr("fill-opacity", 1)
    .text(source);

  let txt1 = svg
    .append('text')
    .attr("x", 310)
    .attr("y", 670)
    .attr("font-weight", "bold")
    .attr("font-family", "sans-serif")
    .style("font-size", "140px")
    .attr("fill", "#fbd14b")
    .attr("stroke-width", 4)
    .attr("stroke", "#C84742");

  let txt2 = svg
    .append('text')
    .attr("x", 340)
    .attr("y", 695)
    .attr("font-weight", "bold")
    .attr("font-family", "sans-serif")
    .style("font-size", "25px")
    .attr("fill", "#C84742");

  let txt3 = svg
    .append('text')
    .attr("x", 340)
    .attr("y", 740)
    .attr("font-weight", "bold")
    .attr("font-family", "sans-serif")
    .style("font-size", "50px")
    .attr("fill", "#C84742");

  let txt4 = svg
    .append('text')
    .attr("x", 340)
    .attr("y", 760)
    .attr("font-weight", "bold")
    .attr("font-family", "sans-serif")
    .style("font-size", "15px")
    .attr("fill", "#C84742")
    .attr("fill-opacity", 0.7);

  let leg = svg
    .append("g")
    .attr("transform", `translate(360, 555)`)
    .call(legcircles);

  const ctr = svg.append('g');

  const t = svg.transition().duration(750);

  return Object.assign(svg.node(), {
    update(who) {
      let data;
      let col;
      let col2;
      if (who.name == "- - - - -") {
        data = countries.features;
        col = "#94a1a8";
        col2 = "#C84742";
        txt1.text("");
        txt2.text("");
        txt3.text(language ? "The Wealth of Nations" : "Richesse des nations");
        txt4.text(
          language
            ? "Gross domestic product in 2019 (US$ billion)"
            : "Produit intérieur brut en 2019 (en milliards de $US)"
        );
        leg.attr("opacity", 1);
      } else {
        data = countries.features.filter(
          d =>
            +gdpbyid.get(d.properties.ISO3) <= +who["value"] * 1000000000 ||
            gdpbyid.get(d.properties.ISO3) == "NA"
        );
        col = "#C84742";
        col2 = "#fbd14b";

        txt1.text(data.length);
        txt2.text(
          language
            ? "countries are not as rich as"
            : "pays sont moins riches que"
        );
        txt3.text(who.name);
        txt4.text(
          language
            ? "Estimated wealth in 2021 of " + who.fortune + "."
            : "Fortune estimée en 2021 à " + who.fortune + "."
        );
        leg.transition(300).attr("opacity", 0);
      }

      ctr
        .selectAll("path")
        .data(data, d => d)
        .join(
          enter => countriesEnter(enter, col),
          update => update,
          exit => countriesExit(exit)
        );

      ctr
        .selectAll("circle")
        .data(data, d => d)
        .join(
          enter => circlesEnter(enter, col2),
          update => update,
          exit => circlesExit(exit)
        );
    }
  });
}
);
  main.variable(observer()).define(["md"], function(md){return(
md `<div style="color:#e0655c">**WARNING**: his map compares the wealth accumulated by individual billionaires with the gross domestic product of nations, i.e. the wealth produced during a year by the whole population. In other words, it compares a stock (accumulated wealth) and a flow (wealth produced during a year). While this comparison is not very robust methodologically, it does allow us to understand the orders of magnitude.</div>`
)});
  main.variable(observer("update")).define("update", ["map","who"], function(map,who){return(
map.update(who)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**1. Data import**`
)});
  main.variable(observer("billionaires")).define("billionaires", ["d3"], function(d3){return(
d3.csv(
  "https://raw.githubusercontent.com/neocarto/resources/master/datasets/billionaires/billionaires_2021.csv"
)
)});
  main.variable(observer("gdp")).define("gdp", ["d3"], function(d3){return(
d3.csv(
  "https://raw.githubusercontent.com/neocarto/resources/master/datasets//UNSTATS/gdp2019.csv"
)
)});
  main.variable(observer("world")).define("world", ["d3"], function(d3){return(
d3.json(
  "https://raw.githubusercontent.com/neocarto/resources/master/datasets/UNSTATS/world.topojson"
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**2. Data Handling**`
)});
  main.variable(observer("countries")).define("countries", ["topojson","world"], function(topojson,world){return(
topojson.feature(world, world.objects.world)
)});
  main.variable(observer("gdpbyid")).define("gdpbyid", ["gdp"], function(gdp){return(
new Map(gdp.map(d => [d.ISO3, d.GDP2019]))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**3. Configuration of the map**`
)});
  main.variable(observer("projection")).define("projection", ["d3","width","height"], function(d3,width,height){return(
d3
  .geoGilbert()
  .scale(500)
  .translate([width / 2, height / 2 + 100])
  .precision(0.1)
)});
  main.variable(observer("height")).define("height", function(){return(
800
)});
  main.variable(observer("width")).define("width", function(){return(
1000
)});
  main.variable(observer("sphere")).define("sphere", function(){return(
{ type: "Sphere" }
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**4. Centroids & circles**`
)});
  main.variable(observer("Poly2Center")).define("Poly2Center", ["d3","path"], function(d3,path){return(
function(d) {
  if (d.geometry.type == "MultiPolygon") {
    var best = {};
    var bestArea = 0;
    d.geometry.coordinates.forEach(function(coords) {
      var poly = { type: 'Polygon', coordinates: coords };
      var area = d3.geoArea(poly);
      if (area > bestArea) {
        bestArea = area;
        best = poly;
      }
    });
    return path.centroid(best);
  } else {
    return path.centroid(d);
  }
}
)});
  main.variable(observer("centersbyid")).define("centersbyid", ["countries","Poly2Center"], function(countries,Poly2Center){return(
new Map(
  countries.features.map(d => [d.properties.ISO3, Poly2Center(d)])
)
)});
  main.variable(observer("radius")).define("radius", ["d3","gdp"], function(d3,gdp){return(
d3.scaleSqrt([0, d3.max(gdp.map(d => +d.GDP2019))], [0, 65])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`** 5. Enter, Exit, Update **`
)});
  main.variable(observer("transform")).define("transform", ["path"], function(path){return(
function transform(d, size) {
  const [x, y] = path.centroid(d);
  return `
    translate(${x},${y})
    scale(${Math.sqrt(size)})
    translate(${-x},${-y})
  `;
}
)});
  main.variable(observer("countriesEnter")).define("countriesEnter", ["path"], function(path){return(
function countriesEnter(enter, col) {
  enter.call(g =>
    g
      .append('path')
      .attr("d", path)
      .attr("fill-opacity", 1)
      //.attr("fill", "#C84742")
      .attr("fill", col)
      .attr("stroke", "white")
      .attr("stroke-width", 0.5)
  );
}
)});
  main.variable(observer("countriesExit")).define("countriesExit", ["transform"], function(transform){return(
function countriesExit(exit) {
  exit.call(g =>
    g
      .attr("transform", d => transform(d, 1))
      .attr("fill", "#C84742")
      .transition()
      .duration(750)
      .attr("stroke-opacity", 0)
      .attr("fill-opacity", 0)
      .attr("transform", d => transform(d, 0.1))
      .attr("r", 0)
  );
}
)});
  main.variable(observer("circlesEnter")).define("circlesEnter", ["centersbyid","radius","gdpbyid"], function(centersbyid,radius,gdpbyid){return(
function circlesEnter(enter, col2) {
  enter.call(g =>
    g
      .append('circle')
      .attr("fill", col2)
      .attr("fill-opacity", 0.8)
      .attr(
        "transform",
        d => `translate(${centersbyid.get(d.properties.ISO3)})`
      )
      .attr("r", d => radius(gdpbyid.get(d.properties.ISO3)))
  );
}
)});
  main.variable(observer("circlesExit")).define("circlesExit", function(){return(
function circlesExit(exit) {
  exit.call(g =>
    g
      .transition()
      .duration(750)
      .attr("r", 0)
  );
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**6. Texts & legend**`
)});
  main.variable(observer("source")).define("source", ["language"], function(language){return(
language
  ? "Sources: Forbes, 2021. UNSTATS, 2021. Cartography: Nicolas Lambert, 2021"
  : "Sources : Forbes, 2021. UNSTATS, 2021. Cartographie : Nicolas Lambert, 2021"
)});
  main.variable(observer("legcircles")).define("legcircles", ["legendCircle","d3","gdp","radius"], function(legendCircle,d3,gdp,radius){return(
legendCircle()
  .tickValues([
    d3.min(gdp, d => +d.GDP2019),
    1000000000000,
    5000000000000,
    12000000000000,
    d3.max(gdp, d => +d.GDP2019)
  ])
  .tickFormat(d => Math.round(d / 1000000000))
  .scale(radius)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Imports`
)});
  const child1 = runtime.module(define1);
  main.import("legendCircle", child1);
  const child2 = runtime.module(define2);
  main.import("Select", child2);
  main.import("Toggle", child2);
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require('topojson')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6", "d3-geo-projection@2")
)});
  return main;
}
