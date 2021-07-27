// https://observablehq.com/@neocartocnrs/vaccination-against-covid-19-in-france@2395
import define1 from "./450051d7f1174df8@252.js";
import define2 from "./e93997d5089d7165@2303.js";
import define3 from "./a4f599acbbef9a1e@218.js";
import define4 from "./a33468b95d0b15b0@703.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Vaccination against covid-19 in France`
)});
  main.variable(observer("viewof myage")).define("viewof myage", ["select","ages"], function(select,ages)
{
  const myage = select({
    title: "Quelle classe d'âge voulez-vous cartographier ?",
    options: ages,
    value: "80etplus"
  });
  return myage;
}
);
  main.variable(observer("myage")).define("myage", ["Generators", "viewof myage"], (G, _) => G.input(_));
  main.variable(observer("viewof pctvax")).define("viewof pctvax", ["slider"], function(slider){return(
slider({
  title: '<br/>Objectif de vaccination',
  description: '200% signifie 2 doses par personnes pour tout le monde',
  min: 50,
  max: 200,
  value: 200,
  step: 10,
  format: v => v + "%"
})
)});
  main.variable(observer("pctvax")).define("pctvax", ["Generators", "viewof pctvax"], (G, _) => G.input(_));
  main.variable(observer("viewof overlay")).define("viewof overlay", ["radio"], function(radio){return(
radio({
  title: "Écarter les cercles",
  options: [{ label: 'Oui', value: 'Y' }, { label: 'Non', value: 'N' }],
  value: 'N'
})
)});
  main.variable(observer("overlay")).define("overlay", ["Generators", "viewof overlay"], (G, _) => G.input(_));
  main.variable(observer("viewof label")).define("viewof label", ["radio"], function(radio){return(
radio({
  title: "Numéros des départements",
  options: [{ label: 'Afficher', value: 'Y' }, { label: 'Masquer', value: 'N' }],
  value: 'N'
})
)});
  main.variable(observer("label")).define("label", ["Generators", "viewof label"], (G, _) => G.input(_));
  main.variable(observer("map")).define("map", ["simulation","d3","width","height","graticule","path","land","format","data","myage","pctvax","countrycol","dpt","overlay","france","getcolor","ratiobyid","radius","label","legend","legcircles","datetodate","mydate","scaleBar","txtsource","agesbyid"], function(simulation,d3,width,height,graticule,path,land,format,data,myage,pctvax,countrycol,dpt,overlay,france,getcolor,ratiobyid,radius,label,legend,legcircles,datetodate,mydate,scaleBar,txtsource,agesbyid)
{
  for (let i = 0; i < 200; i++) {
    simulation.tick();
  }

  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style('background-color', "white");

  // Filters

  var defs = svg.append("defs");

  const pattern = defs
    .append("pattern")
    .attr("id", "hatch")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", 6)
    .attr("height", 6);

  const filter = defs
    .append('filter')
    .attr('id', 'border-blur')
    .append('feGaussianBlur')
    .attr('in', 'SourceGraphic')
    .attr('stdDeviation', 10)
    .attr('result', 'shadow');

  const filter2 = defs
    .append('filter')
    .attr('id', 'border-blur2')
    .append('feGaussianBlur')
    .attr('in', 'SourceGraphic')
    .attr('stdDeviation', 50)
    .attr('result', 'shadow');

  pattern
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 6)
    .attr("y1", 6)
    .attr("stroke", "#f4f4f4")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 0.4);

  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .style('fill', "#9ACBE3")
    .attr('filter', 'url(#border-blur2)');

  svg
    .append("rect")
    .attr("fill-opacity", 0.4)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr('fill', "url('#hatch')");

  // Graticule

  svg
    .append("g")
    .append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path)
    .attr("clip-path", "url(#clip)")
    .style('fill', "none")
    .style('stroke', "white")
    .style('stroke-width', .5)
    .style('stroke-opacity', .4)
    .style('stroke-dasharray', 0.5);

  // Boxes for remotes territories

  const delta = 12;

  svg
    .append("rect")
    .attr("x", 30)
    .attr("y", 480)
    .attr("width", 80)
    .attr("height", 80)
    .attr("stroke", "white")
    .style('fill', "#9ACBE3");

  svg
    .append("rect")
    .attr("x", 30)
    .attr("y", 480 + 80 + delta)
    .attr("width", 80)
    .attr("height", 80)
    .attr("stroke", "white")
    .style('fill', "#9ACBE3");

  svg
    .append("rect")
    .attr("x", 30)
    .attr("y", 480 + 80 + 80 + delta + delta)
    .attr("width", 80)
    .attr("height", 80)
    .attr("stroke", "white")
    .style('fill', "#9ACBE3");

  svg
    .append("rect")
    .attr("x", 670)
    .attr("y", 885)
    .attr("width", 80)
    .attr("height", 80)
    .attr("stroke", "white")
    .style('fill', "#9ACBE3");

  svg
    .append("rect")
    .attr("x", 670 + 80 + delta)
    .attr("y", 885)
    .attr("width", 80)
    .attr("height", 80)
    .attr("stroke", "white")
    .style('fill', "#9ACBE3");

  svg
    .append("path")
    .datum(land)
    .attr("d", path)
    .style("fill", "white")
    .attr("fill-opacity", .6)
    .attr('filter', 'url(#border-blur)');

  // Chart

  let infos = svg
    .append("g")
    .attr("id", "tooltip")
    .attr("font-family", "sans-serif")
    .attr("font-weight", "bold");

  let chart_x = 830;
  let chart_y = 155;
  let chart_height = 400;
  let rect_max = 270;
  let myval = 50;

  let fr_label = "France";
  let fr_pop = format(d3.sum(data, d => d["pop_" + myage]));
  let fr_doses = format(d3.sum(data, d => d["doses_" + myage]));
  let fr_tx =
    (100 * d3.sum(data, d => d["doses_" + myage])) /
    d3.sum(data, d => d["pop_" + myage]);
  let fr_ratio =
    Math.round(
      (1000 * d3.sum(data, d => d["doses_" + myage])) /
        d3.sum(data, d => d["pop_" + myage])
    ) /
      10 +
    "%";

  infos
    .append("rect")
    .attr("id", "info_rect")
    .attr("x", 870)
    .attr("width", 55)
    .attr("height", fr_tx * (rect_max / pctvax))
    .attr("y", 217 - fr_tx * (rect_max / pctvax) + rect_max)
    .attr("fill", "#647382");

  let seringue = svg
    .append("svg:image")
    .attr("x", chart_x)
    .attr("y", chart_y)
    .attr("height", chart_height)
    .attr(
      "xlink:href",
      "https://nlambert.gitpages.huma-num.fr/resources/images/sering_b.svg"
    );

  svg
    .append("line")
    .attr("x1", 920)
    .attr("x2", 956)
    .attr("y1", 102)
    .attr("y2", 102)
    .attr("stroke", countrycol)
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5);

  svg
    .append("line")
    .attr("x1", 956)
    .attr("x2", 956)
    .attr("y1", 102)
    .attr("y2", 140)
    .attr("stroke", countrycol)
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5);

  infos
    .append("text")
    .attr("id", "info_name")
    .attr("x", width - 60)
    .attr("y", 137)
    .attr("text-anchor", "end")
    .attr("fill", countrycol)
    .style("font-size", "35px")
    .text(fr_label);

  let yref = 580;

  infos
    .append("text")
    .attr("x", 895)
    .attr("y", yref)
    .attr("text-anchor", "middle")
    .attr("fill", countrycol)
    .style("font-size", "15px")
    .text("Nombre de personnes");

  infos
    .append("text")
    .attr("id", "info_pop")
    .attr("x", 895)
    .attr("y", yref + 27)
    .attr("text-anchor", "middle")
    .attr("fill", "#4a524d")
    .attr("fill-opacity", 0.8)
    .style("font-size", "20px")
    .text(fr_pop);

  infos
    .append("text")
    .attr("x", 895)
    .attr("y", yref + 50)
    .attr("text-anchor", "middle")
    .attr("fill", countrycol)
    .style("font-size", "15px")
    .text("Nombre de doses");

  infos
    .append("text")
    .attr("id", "info_doses")
    .attr("x", 895)
    .attr("y", yref + 27 + 50)
    .attr("text-anchor", "middle")
    .attr("fill", "#4a524d")
    .attr("fill-opacity", 0.8)
    .style("font-size", "20px")
    .text(fr_doses);

  infos
    .append("text")
    .attr("x", 895)
    .attr("y", yref + 100)
    .attr("text-anchor", "middle")
    .attr("fill", countrycol)
    .style("font-size", "15px")
    .text("Ratio");

  infos
    .append("text")
    .attr("id", "info_tx")
    .attr("x", 895)
    .attr("y", yref + 42 + 100)
    .attr("text-anchor", "middle")
    .attr("fill", "#4a524d")
    .attr("fill-opacity", 0.8)
    .style("font-size", "40px")
    .text(fr_ratio);

  // Basemap;

  svg
    .append("g")
    .attr("id", "map")
    .selectAll("path")
    .data(dpt.features)
    .join("path")
    .attr("class", "dpt")
    .attr("stroke", overlay == "N" ? "white" : countrycol)
    .attr("stroke-width", 0.5)
    .attr("fill", countrycol)
    .attr("fill-opacity", fr_doses == 0 ? 0.1 : 1)
    .attr("stroke-opacity", fr_doses == 0 ? 0 : 1)
    .attr("d", path);

  svg
    .append("path")
    .datum(france)
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "#75a8c9")
    .attr("stroke-width", 1);

  // Bubbles;

  if (fr_doses != 0) {
    svg
      .append("g")
      .attr("fill-opacity", 0.9)
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .selectAll("circle")
      .data(
        data
          .filter(d => d.coordx)
          .sort((a, b) =>
            d3.descending(a["doses_" + myage], b["doses_" + myage])
          )
      )

      .join("circle")
      .attr("id", d => d.id)
      .attr("fill", d => getcolor(ratiobyid.get(d.id)))
      .attr("cx", overlay == 'N' ? d => d.coordx : d => d.x)
      .attr("cy", overlay == 'N' ? d => d.coordy : d => d.y)
      .attr("r", d => radius(+d["doses_" + myage]))
      // Interactivity
      .on("touchmove mousemove", function(event, d) {
        let tx = (100 * d["doses_" + myage]) / d["pop_" + myage];

        d3.select(this)
          .style("cursor", "pointer")
          .attr("stroke", "red")
          .attr("stroke-width", 2);
        d3.select("#info_rect")
          .attr("height", tx * (rect_max / pctvax))
          .attr("y", 217 - tx * (rect_max / pctvax) + rect_max)
          .attr("fill", getcolor(tx));
        d3.select("#info_name").text(d.name);
        d3.select("#info_pop").text(format(d["pop_" + myage]));
        d3.select("#info_doses").text(format(d["doses_" + myage]));
        d3.select("#info_tx").text(
          Math.round(1000 * (d["doses_" + myage] / d["pop_" + myage])) / 10 +
            "%"
        );
      })
      .on("touchend mouseleave", function() {
        d3.select(this)
          .attr("stroke", "white")
          .attr("stroke-width", 0.5);
        d3.select("#info_rect")
          .attr("height", fr_tx * (rect_max / pctvax))
          .attr("y", 217 - fr_tx * (rect_max / pctvax) + rect_max)
          .attr("fill", "#647382");
        d3.select("#info_name").text(fr_label);
        d3.select("#info_pop").text(fr_pop);
        d3.select("#info_doses").text(fr_doses);
        d3.select("#info_tx").text(fr_ratio);
      });
  }

  //labels

  if (label == "Y") {
    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => (overlay == "N" ? d.coordx : d.x))
      .attr("y", d => (overlay == "N" ? d.coordy : d.y))
      .text(d => d.id)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-family", function(d, i) {
        return i < 5 ? "serif" : "sans-serif";
      })
      .attr("fill", "#4e524f")
      .style("font-size", "12px");
  }

  // Legend

  if (fr_doses != 0) {
    svg
      .append("text")
      .attr("x", 35)
      .attr("y", 905)
      .text("Nombre de doses / nombre de personnes (en %)")
      .attr("font-family", "sans-serif")
      .attr("font-weight", "bold")
      .attr("fill", "#4a524d")
      .style("font-size", "16px");

    svg
      .append("g")
      .attr("transform", "translate(35, 900)")
      .append(() =>
        legend({
          color: getcolor,
          width: 360,
          height: 60,
          tickFormat: ".1f"
        })
      );

    svg
      .append("text")
      .attr("x", 35)
      .attr("y", 780)
      .text("Nombre de doses")
      .attr("font-family", "sans-serif")
      .attr("font-weight", "bold")
      .attr("fill", "#4a524d")
      .style("font-size", "16px");

    svg
      .append("g")
      .attr("transform", `translate(35, 800)`)
      .call(legcircles);
  }

  // Title

  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", 80)
    .attr("fill", countrycol)
    .attr("fill-opacity", 0.3);

  svg
    .append("text")
    .text(
      "État de la vaccination dans votre département au " + datetodate(mydate)
    )
    .attr("x", width / 2)
    .attr("y", 50)
    .attr("font-family", "sans-serif")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("fill", "#4a524d")
    .style("font-size", "28px")
    .attr("fill-opacity", 1);

  // Staging

  svg
    .append("g")
    .attr("transform", `translate(-100, 0)`)
    .append("g")
    .call(scaleBar);

  var source = svg
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr('transform', 'translate(17,973) rotate(-90)')
    .text(txtsource)
    .attr("font-family", "sans-serif")
    .style("font-size", "11px")
    .style("font-style", "italic")
    .attr("fill-opacity", 1)
    .style('fill', "#616161");

  svg
    .append("text")
    .attr("x", 210)
    .attr("y", 120)
    .text("Classe d'âge")
    .attr("font-family", "sans-serif")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("fill", "#4a524d")
    .attr("fill-opacity", 0.8)
    .style("font-size", "16px");

  svg
    .append("rect")
    .attr("x", 82)
    .attr("y", 133)
    .attr("width", 260)
    .attr("height", 50)
    .attr("stroke", "#4a524d")
    .attr("stroke-opacity", 0.8)
    .attr("fill", "none");

  svg
    .append("text")
    .attr("x", 210)
    .attr("y", 170)
    .text(agesbyid.get(myage))
    .attr("font-family", "sans-serif")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("fill", "#4a524d")
    .attr("fill-opacity", 0.8)
    .style("font-size", "35px");

  // Signature

  svg
    .append("svg:image")
    .attr("x", 954)
    .attr("y", 960)
    .attr("width", 40)
    .attr(
      "xlink:href",
      "https://nlambert.gitpages.huma-num.fr/resources/images/signature_black.svg"
    );

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Texts`
)});
  main.variable(observer("txtlegend")).define("txtlegend", function(){return(
"Taux de vaccination dans les départements (%)"
)});
  main.variable(observer("txtsource")).define("txtsource", function(){return(
"Carte réalisée par Nicolas Lambert, 2021. Sources : Santé publique France (https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-personnes-vaccinees-contre-la-covid-19-1/)"
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Variables`
)});
  main.variable(observer("countrycol")).define("countrycol", function(){return(
"#a3b7cc"
)});
  main.variable(observer("mydate")).define("mydate", ["d3","vaccins"], function(d3,vaccins){return(
d3.max(vaccins, d => d.jour)
)});
  main.variable(observer("yellow")).define("yellow", function(){return(
"#fbd14b"
)});
  main.variable(observer("height")).define("height", function(){return(
980
)});
  main.variable(observer("width")).define("width", function(){return(
1000
)});
  main.variable(observer("colors")).define("colors", function(){return(
[
  '#a50026',
  '#d73027',
  '#f46d43',
  '#fdae61',
  '#fee08b',
  '#ffffbf',
  '#d9ef8b',
  '#a6d96a',
  '#66bd63',
  '#1a9850',
  '#006837'
]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Geometries`
)});
  main.variable(observer("features")).define("features", ["dpt","d3"], function(dpt,d3){return(
new Map(
  dpt.features
    .map(d => {
      d.properties.centroid = d3.geoCentroid(d);
      return d;
    })
    .map(d => [d.properties.DEP, d])
)
)});
  main.variable(observer("land")).define("land", ["topojson","countries"], function(topojson,countries){return(
topojson.merge(
  countries,
  countries.objects.CNTR_RG_10M_2020_4326.geometries
)
)});
  main.variable(observer("dpt")).define("dpt", ["topojson","departements"], function(topojson,departements){return(
topojson.feature(departements, departements.objects.DEPT)
)});
  main.variable(observer("departements")).define("departements", ["d3"], function(d3){return(
d3.json(
  "https://raw.githubusercontent.com/neocarto/resources/master/geometries/France/departements.json"
)
)});
  main.variable(observer("france")).define("france", ["topojson","departements"], function(topojson,departements){return(
topojson.merge(departements, departements.objects.DEPT.geometries)
)});
  main.variable(observer("countries")).define("countries", ["d3"], function(d3){return(
d3.json(
  "https://raw.githubusercontent.com/neocarto/resources/master/geometries/World/GISCO_CNTR_RG_10M_2020_4326.json"
)
)});
  main.variable(observer("outline")).define("outline", function(){return(
{ type: "Sphere" }
)});
  main.variable(observer("graticule")).define("graticule", ["d3"], function(d3){return(
d3.geoGraticule().step([1, 0.7])
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
)});
  main.variable(observer("projection")).define("projection", ["d3","width","height"], function(d3,width,height){return(
d3
  .geoConicConformal() // Lambert-93
  .center([2.454071, 46.279229]) // Center on France
  .scale(5000)
  .translate([width / 2 - 10, height / 2 + 50])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Data`
)});
  main.variable(observer("ages")).define("ages", function(){return(
[
  { label: "Tous les âges", value: "tot" },
  { label: "De 0 à 9 ans", value: "0_9" },
  { label: "De 10 à 24 ans", value: "10_24" },
  { label: "De 25 à 29 ans", value: "25_29" },
  { label: "De 30 à 39 ans", value: "30_39" },
  { label: "De 40 à 49 ans", value: "40_49" },
  { label: "De 50 à 59 ans", value: "50_59" },
  { label: "De 60 à 69 ans", value: "60_69" },
  { label: "De 70 à 74 ans", value: "70_74" },
  { label: "De 75 à 79 ans", value: "75_79" },
  { label: "80 ans et plus", value: "80etplus" }
]
)});
  main.variable(observer("agesbyid")).define("agesbyid", ["ages"], function(ages){return(
new Map(ages.map(d => [d.value, d.label]))
)});
  main.variable(observer("data")).define("data", ["population","getdoses","getcentroids"], function(population,getdoses,getcentroids){return(
population.map(d => ({
  id: d.id,
  name: d.name,
  pop_tot: +d.Total,
  pop_0_9: +d["De 0 à 9 ans"],
  pop_10_24: +d["De 10 à 24 ans"],
  pop_25_29: +d["De 25 à 29 ans"],
  pop_30_39: +d["De 30 à 39 ans"],
  pop_40_49: +d["De 40 à 49 ans"],
  pop_50_59: +d["De 50 à 59 ans"],
  pop_60_69: +d["De 60 à 69 ans"],
  pop_70_74: +d["De 70 à 74 ans"],
  pop_75_79: +d["De 75 à 79 ans"],
  pop_80etplus: +d["80 et plus"],
  doses_tot: getdoses(d.id, "0"),
  doses_0_9: getdoses(d.id, "9"),
  doses_10_24: getdoses(d.id, "17") + getdoses(d.id, "24"),
  doses_25_29: getdoses(d.id, "29"),
  doses_30_39: getdoses(d.id, "39"),
  doses_40_49: getdoses(d.id, "49"),
  doses_50_59: getdoses(d.id, "59"),
  doses_60_69: getdoses(d.id, "69"),
  doses_70_74: getdoses(d.id, "74"),
  doses_75_79: getdoses(d.id, "79"),
  doses_80etplus: getdoses(d.id, "80"),
  coordx: getcentroids.get(d.id)[0],
  coordy: getcentroids.get(d.id)[1]
}))
)});
  main.variable(observer("population")).define("population", ["d3"], function(d3){return(
d3.csv(
  "https://raw.githubusercontent.com/neocarto/resources/master/datasets/INSEE/popage2021.csv"
)
)});
  main.variable(observer("vaccins")).define("vaccins", ["d3"], function(d3)
{
  let psv = d3.dsvFormat(";");
  let url =
    "https://www.data.gouv.fr/fr/datasets/r/de4b356b-8cd9-4b9a-8878-459a62646107";
  try {
    let v = d3.csv(url);
    v[0].clage_vacsi;
    return v;
  } catch (e) {
    let v = d3.text(url).then((txt) => psv.parse(txt));
    return v;
  }
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Helpers`
)});
  main.variable(observer("getcentroids")).define("getcentroids", ["dpt","path"], function(dpt,path){return(
new Map(
  dpt.features
    .map(d => {
      return d;
    })
    .map(d => [d.properties.DEP, path.centroid(d)])
)
)});
  main.variable(observer("getcolor")).define("getcolor", ["d3","data","myage","colors"], function(d3,data,myage,colors){return(
d3
  .scaleQuantile()
  .domain(
    data.map(
      d => Math.round((10000 * d["doses_" + myage]) / d["pop_" + myage]) / 100
    )
  ) // pass the whole dataset to a scaleQuantile’s domain
  .range(colors)
)});
  main.variable(observer("format")).define("format", function(){return(
function(value) {
  let v = value;

  if (value >= 1000) {
    let str = String(value);
    let v1 = str.substring(0, str.length - 3);
    let v2 = str.substring(str.length - 3, str.length);
    v = v1 + " " + v2;
  }

  if (value >= 100000) {
    v = Math.round((100 * value) / 1000000) / 100 + " million";
  }
  if (value >= 2000000) {
    v = Math.round((100 * value) / 1000000) / 100 + " millions";
  }
  return v;
}
)});
  main.variable(observer("legcircles")).define("legcircles", ["legendCircle","d3","data","myage","radius"], function(legendCircle,d3,data,myage,radius){return(
legendCircle()
  .tickValues([
    d3.min(data, d => d["doses_" + myage]),
    d3.median(data, d => d["doses_" + myage]),
    d3.max(data, d => d["doses_" + myage])
  ])
  .scale(radius)
)});
  main.variable(observer("ratiobyid")).define("ratiobyid", ["data","myage"], function(data,myage){return(
new Map(
  data.map(d => [
    d.id,
    Math.round((10000 * d["doses_" + myage]) / d["pop_" + myage]) / 100
  ])
)
)});
  main.variable(observer("color")).define("color", ["d3","colors"], function(d3,colors){return(
d3.scaleThreshold([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], colors)
)});
  main.variable(observer("simulation")).define("simulation", ["d3","data","radius","myage"], function(d3,data,radius,myage){return(
d3
  .forceSimulation(data)
  .force("x", d3.forceX(d => d.coordx))
  .force("y", d3.forceY(d => d.coordy))
  .force(
    "collide",
    d3.forceCollide(d => 0.5 + radius(+d["doses_" + myage]) + 1)
  )
  .stop()
)});
  main.variable(observer("getdoses")).define("getdoses", ["vaccins"], function(vaccins){return(
function (dep, age) {
  let x = vaccins
    .filter((d) => d.dep == dep)
    .filter((d) => d.clage_vacsi == age);
  let v = x.map((d) => +d.n_tot_dose1 + +d.n_tot_complet);
  let value;
  v.length == 0 ? (value = 0) : (value = v[0]);
  return +value;
}
)});
  main.variable(observer("datetodate")).define("datetodate", function(){return(
function(dat) {
  let m = [
    "mois",
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
  ];

  let j1 = +dat.substr(8, 2);
  let j = j1 == 1 ? j1 + "er" : j1;
  let m1 = m[+dat.substr(5, 2)];
  let a1 = dat.substr(0, 4);

  return j + " " + m1 + " " + a1;
}
)});
  main.variable(observer("scaleBar")).define("scaleBar", ["d3","projection"], function(d3,projection){return(
d3
  .geoScaleBar()
  .projection(projection)
  .size([900, 860])
  .left(.9)
  .top(.99)
  .units(d3.geoScaleKilometers)
  .distance(100)
  .label("100 km")
  .labelAnchor("middle")
  .tickSize(null)
  .tickValues(null)
)});
  main.variable(observer("radius")).define("radius", ["d3","data","myage"], function(d3,data,myage){return(
d3.scaleSqrt([0, d3.max(data, d => +d["doses_" + myage])], [0, 30])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Depedencies`
)});
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  const child2 = runtime.module(define2);
  main.import("select", child2);
  main.import("radio", child2);
  main.import("slider", child2);
  const child3 = runtime.module(define3);
  main.import("legendCircle", child3);
  const child4 = runtime.module(define4);
  main.import("legend", child4);
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require('topojson')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6", "d3-geo-scale-bar@1.0.2")
)});
  return main;
}
