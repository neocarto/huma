// https://observablehq.com/@neocartocnrs/france-seen-by-spilhaus@1191
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# France seen by Spilhaus`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The ***#WorldOceansDay*** is an initiative from the Rio Summit. It takes place every June 8th since 1992. So what better than this interactive map to remind us today of the central place of the oceans in our environment? 

**How to draw the World ?**

In their daily work, cartographers are faced with a tricky problem. How to represent a spherical world in three dimensions on a two-dimensional screen? To solve this question, which allows to make the immensity of the world visible at a glance (which is not possible on a globe), many mathematical processes have been used since antiquity, gathered under the name of cartographic projections (or projection systems). The existing methods are multiple. They are based on planes, cylinders or cones which, once unrolled, give particular shape to the planispheres (i.e. flat spheres) thus formed. As you can see, each of these transformations has a concrete impact on the shape of the map thus produced and inevitably leads to deformations. Some maps will therefore tend to faithfully respect the shape of the different countries, while others, on the contrary, will favor the surface ratios. This is the famous opposition between the Mercator map and the Gall-Peters map described [here](https://observablehq.com/@neocartocnrs/the-organization-of-cartographers-for-social-equality). In the end, there are a thousand and one ways to draw the world and the choice of a particular projection is always a function of the cartographer's communication intentions. Let's also note that these are almost always designed to privilege the representation of land. But other choices are possible.

**The Spilhaus World Ocean**

The map presented here was imagined in 1942 by the South African oceanographer Athelstan Frederick Spilhaus. Initially presented as a square, it pushes the countries to the edges of the map while a single massive ocean surface is enthroned in its center. The Pacific Ocean alone covers an area of more than 150 million km², which is as much as the entire land mass. The oceans also produce at least 50% of the planet's oxygen and are home to a considerable biodiversity representing half of the living species on our planet. Finally, unlike the continents, the oceans are all connected to each other to form a single world ocean on this map. The Spilhaus map therefore aims to put back in the center of the game these oceanic masses that are often cut off and relegated, insignificant, to the edges of the map as if they were a simple element of the stage.

**Another map of France**

Taking into account maritime spaces also means not considering our own territory only in its land dimension. Here on this map, all the French territories throughout the world are represented, in their terrestrial component but also maritime (exclusive economic zones and territorial waters). What do we see? First of all, that 94% of the French territory is composed of water against only 6% of dry land. It is the largest maritime area in the world. Moreover, this "decentered" and "distorted" map shows a France that is not located mainly in Europe. Indeed, 92% of its territory is located elsewhere in the world. One can see in this the trace of a not very glorious colonial past but also, why not, the fact that France is, in all its extent, a universal and mainly non-Western maritime power.

In summary, another way of looking at things that invites us to think differently about our place in the world.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The text in french is avaiable [here](https://www.humanite.fr/la-france-cest-94-deau-la-preuve-avec-notre-carte-interactive-709949)`
)});
  main.variable(observer("map")).define("map", ["d3","width","height","sphere","path","land","EEZ","description","transform","title","signature"], function(d3,width,height,sphere,path,land,EEZ,description,transform,title,signature)
{
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("width", "100%")
    .style("height", "auto");

  svg
    .append("g")
    .append("path")
    .datum(sphere)
    .attr("class", "graticuleOutline")
    .attr("d", path)
    .style('fill', "#9ACBE3");

  // Graticule

  svg
    .append("g")
    .append("path")
    .datum(d3.geoGraticule10())
    .attr("class", "graticule")
    .attr("d", path)
    .attr("clip-path", "url(#clip)")
    .style('fill', "none")
    .style('stroke', "white")
    .style('stroke-width', 0.7)
    .style('stroke-opacity', .9)
    .style('stroke-dasharray', 2);

  svg
    .append("path")
    .datum(land)
    .attr("fill", "white")
    .attr("d", path);

  // svg
  //   .append("g")
  //   .selectAll("path")
  //   .data(cables.features)
  //   .join("path")
  //   .attr("stroke", "#d977a6")
  //   .attr("stroke-width", 1.5)
  //   .attr("fill", "none")
  //   .attr("d", path);

  svg
    .append("g")
    .selectAll("path")
    .data(EEZ.features)
    .join("path")
    .attr("fill", "#f07dc2")
    .attr("fill-opacity", .5)
    .attr("d", path)
    .on("touchmove mousemove", function(event, d) {
      let infos = description.filter((dd) => dd.name == d.properties.name)[0];

      d3.select(this)
        .style("cursor", "pointer")
        .transition()
        .duration(400)
        .attr("fill-opacity", 0.8)
        .attr("transform", d => transform(d, 2));
      d3.select("#info")
        .transition()
        .attr("fill-opacity", 1);
      d3.select("#info_name").text(infos["namefr"]);
      d3.select("#info_desc1").text("Coordonnées : " + infos["coordonnées"]);
      d3.select("#info_desc2").text("Superficie : " + infos["superficie"]);
      d3.select("#info_desc3").text("Population : " + infos["population"]);
      d3.select("#info_desc4").text(infos["note"]);
    })

    .on("touchend mouseleave", function() {
      d3.select(this)
        .transition()
        .attr("fill-opacity", .5)
        .attr("transform", d => transform(d, 1));
      d3.select("#info")
        .transition()
        .attr("fill-opacity", 0);
    });

  // Mask

  var mask = svg.append("g");

  mask
    .append("rect")
    .attr("x", 365)
    .attr("y", 0)
    .attr("width", 250)
    .attr("height", 30)
    .attr("fill", "white");

  mask
    .append("rect")
    .attr("x", 310)
    .attr("y", 0)
    .attr("width", 30)
    .attr("height", 8)
    .attr("fill", "white");

  mask
    .append("rect")
    .attr("x", 0)
    .attr("y", 540)
    .attr("width", 15)
    .attr("height", 50)
    .attr("fill", "white");

  mask
    .append("rect")
    .attr("x", 689)
    .attr("y", height - 29)
    .attr("width", 100)
    .attr("height", 50)
    .attr("fill", "white");

  mask
    .append("rect")
    .attr("x", 666)
    .attr("y", height - 5)
    .attr("width", 10)
    .attr("height", 5)
    .attr("fill", "white");

  // Tooltip

  let info = svg
    .append("g")
    .attr("id", "info")
    .attr("font-family", "sans-serif")
    .attr("fill-opacity", 0);

  info
    .append("rect")
    .attr("x", 430)
    .attr("y", 40)
    .attr("height", 80)
    .attr("width", 2)
    .attr("fill", "#cccccc");

  info
    .append("rect")
    .attr("x", 420)
    .attr("y", 50)
    .attr("height", 2)
    .attr("width", 180)
    .attr("fill", "#cccccc");

  info
    .append("text")
    .attr("id", "info_name")
    .attr("x", 450)
    .attr("y", 100)
    .attr("fill", "#f07dc2")
    .attr("font-weight", "bold")
    .style("font-size", "35px");

  info
    .append("text")
    .attr("id", "info_desc1")
    .attr("x", 450)
    .attr("y", 130)
    .attr("fill", "#888c99")
    .style("font-size", "15px");

  info
    .append("text")
    .attr("id", "info_desc2")
    .attr("x", 450)
    .attr("y", 150)
    .attr("fill", "#888c99")
    .style("font-size", "15px");

  info
    .append("text")
    .attr("id", "info_desc3")
    .attr("x", 450)
    .attr("y", 170)
    .attr("fill", "#888c99")
    .style("font-size", "15px");

  info
    .append("text")
    .attr("id", "info_desc4")
    .attr("x", 450)
    .attr("y", 200)
    .attr("fill", "#888c99")
    .style("font-size", "15px");

  // Layout

  svg
    .append("text")
    .attr("x", 10)
    .attr("y", 990)
    .attr("fill", "#9ACBE3")
    .style("font-size", "17px")
    .text("D'après Athelstan Frederick Spilhaus, 1942.");

  svg
    .append("rect")
    .attr("x", 720)
    .attr("y", 957)
    .attr("height", 25)
    .attr("width", 35)
    .attr("fill", "#f07dc2")
    .attr("fill-opacity", .5);

  let a = 953;
  svg
    .append("text")
    .attr("x", 765)
    .attr("y", a + 15)
    .attr("fill", "#888c99")
    .style("font-size", "13px")
    .text("Surfaces terrestres, zones économiques");

  svg
    .append("text")
    .attr("x", 765)
    .attr("y", a + 25)
    .attr("fill", "#888c99")
    .style("font-size", "13px")
    .text("exclusives (ZEE) et eaux territoriales.");

  svg
    .append("g")
    .append("rect")
    .attr("x", 10)
    .attr("y", 468)
    .attr("height", 500)
    .attr("width", 8)
    .attr("fill", "#9ACBE3");

  svg
    .append("g")
    .selectAll('rect')
    .data(title)
    .join('rect')
    .attr("x", 0)
    .attr("y", (d, i) => 490 + i * 80)
    .attr("height", 60)
    .attr("width", d => 20 + d.length * 40)
    .attr("fill", "#9ACBE3");

  svg
    .append("g")
    .selectAll('text')
    .data(title)
    .join('text')
    .attr('transform', (d, i) => `translate(${20},${i * 80})`)
    .attr('dy', 540)
    .style('font-family', 'sans-serif')
    .text(d => d)
    .attr("font-family", "sans-serif")
    .attr("font-weight", "bold")
    .attr("fill", "white")
    .style("font-size", "55px")
    .attr("fill-opacity", 0.5);

  svg
    .append("path")
    .attr("d", signature)
    .attr("transform", "translate(375,920) scale(1.3) ")
    .attr("fill", "white")
    .attr("fill-opacity", 0.5);

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`**Data**`
)});
  main.variable(observer("EEZ")).define("EEZ", ["d3","topojson"], function(d3,topojson){return(
d3
  .json(
    "https://raw.githubusercontent.com/neocarto/resources/master/datasets/outremer/ZEE_France.topojson"
  )
  .then((r) => topojson.feature(r, r.objects.ZEE_France))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Textes**`
)});
  main.variable(observer("title")).define("title", function(){return(
"CECI\nEST\nUNE\nCARTE\nDE\nFRANCE".split("\n")
)});
  main.variable(observer("description")).define("description", function(){return(
[
  {
    name: "",
    namefr: "",
    gentilé: "",
    coordonnées: "",
    superficie: "",
    population: "",
    langues: "",
    note: "",
    url: ""
  },

  {
    name: "Mayotte",
    namefr: "Mayotte",
    coordonnées: "12°50′35″S, 45°08′18″E",
    superficie: "376 km²",
    population: "256 518 habitants"
  },
  {
    name: "Bassas da India",
    namefr: "Bassas da India",
    coordonnées: "21°29′10″S, 39°40′51″E",
    superficie: "0,2 km²",
    population: "Aucun habitant",
    note: "Territoire revendiqué aussi par Madagascar"
  },
  {
    name: "Matthew and Hunter Islands",
    namefr: "Île Matthew et île Hunter",
    coordonnées: "22°22′S, 171°43′E",
    superficie: "1.3 km²",
    population: "Aucun habitant"
  },
  {
    name: "Tromelin Island",
    namefr: "Île Tromelin",
    coordonnées: "15°53′31″S, 54°31′23″E",
    superficie: "1 km²",
    population: "3 habitants",
    note: "Territoire revendiqué aussi par Maurice"
  },
  {
    name: "French Guiana",
    namefr: "Guyane",
    coordonnées: "3°59′56″N, 53°00′00″O",
    superficie: "83 846 km²",
    population: "276 128 habitants"
  },
  {
    name: "Crozet Islands",
    namefr: "Archipel Crozet",
    coordonnées: "46°24′41″S, 51°45′22″E",
    superficie: "352 km²",
    population: "Aucun habitant"
  },
  {
    name: "New Caledonia",
    namefr: "Nouvelle-Calédonie",
    coordonnées: "21°15′S, 165°18′E",
    superficie: "18 575,5 km²",
    population: "271 407 habitants"
  },
  {
    name: "Wallis and Futuna",
    namefr: "Wallis-et-Futuna",
    coordonnées: "14°18′07″S, 178°06′34″O",
    superficie: "124,2 km²",
    population: "11 558 habitants"
  },
  {
    name: "Réunion",
    namefr: "La Réunion",
    coordonnées: "21°06′52″S, 55°31′57″E",
    superficie: "2 512 km²",
    population: "855 961 habitants"
  },
  {
    name: "Amsterdam and Saint Paul Islands",
    namefr: "Îles Saint-Paul et Nouvelle-Amsterdam",
    coordonnées: "38°16′10″S, 77°32′30″E",
    superficie: "66 km²",
    population: "25 habitants"
  },
  {
    name: "Guadeloupe",
    namefr: "Guadeloupe",
    coordonnées: "16°N, 62°O",
    superficie: "1 628,43 km²",
    population: "387 629 habitants"
  },
  {
    name: "Saint-Barthélemy",
    namefr: "Saint-Barthélemy ",
    coordonnées: "17°32′S, 149°34′O",
    superficie: "24 km²",
    population: "9 793 habitants"
  },
  {
    name: "French Polynesia",
    namefr: "Polynésie française",
    coordonnées: "17°32′S, 149°34′O",
    superficie: "4 167 km²",
    population: "290 218 habitants"
  },
  {
    name: "Martinique",
    namefr: "Martinique",
    coordonnées: "14°40′00″N, 61°00′00″O",
    superficie: "1 128 km²",
    population: "368 783 habitants"
  },
  {
    name: "France",
    namefr: "France métropolitaine",
    coordonnées: "46°00′N, 2°00′E",
    superficie: "552 000 km²",
    population: "64 513 242 habitants"
  },
  {
    name: "Europa Island",
    namefr: "Île Europa",
    coordonnées: "22°22′S, 40°22′E",
    superficie: "28 km²",
    population: "Aucun habitant",
    note: "Territoire renvendiqué aussi par Madagascar"
  },
  {
    name: "Collectivity of Saint Martin",
    namefr: "Saint-Martin",
    coordonnées: "18°04′31″N, 63°03′36″O",
    superficie: "53,2 km²",
    population: "34 065 habitants"
  },
  {
    name: "Kerguélen",
    namefr: "Îles Kerguelen",
    coordonnées: "49°20′00″S, 69°20′00″E",
    superficie: "7 215 km²",
    population: "120 habitants"
  },
  {
    name: "Juan de Nova Island",
    namefr: "Île Juan de Nova",
    coordonnées: "17°03′16″S, 42°43′30″E",
    superficie: "	4,80 km²",
    population: "Aucun habitant",
    note: "Territoire renvendiqué aussi par Madagascar"
  },
  {
    name: "Clipperton Island",
    namefr: "Île Clipperton",
    coordonnées: "10°18′14″N, 109°13′04″O",
    superficie: "1,7 km²",
    population: "Aucun habitant"
  },
  {
    name: "Saint-Pierre and Miquelon",
    namefr: "Saint-Pierre-et-Miquelon",
    coordonnées: "46°49′30″N, 56°16′30″O",
    superficie: "242 km²",
    population: "6 274 habitants"
  },
  {
    name: "Terre Adélie",
    namefr: "Terre Adélie",
    coordonnées: "Entre 136° et 142° de longitude E ; 90° et 67° de latitude S",
    superficie: "432 000 km²",
    population: "38 habitants"
  }
]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Athelstan Frederick Spilhaus Projection**`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`In 1942, the oceanographer and geophysicist Athelstan Frederick Spilhaus made a map where the oceans are at the center of the game... https://observablehq.com/@joewdavies/spilhaus-map`
)});
  main.variable(observer("projection")).define("projection", ["spilhausSquare","width","height","sphere"], function(spilhausSquare,width,height,sphere){return(
spilhausSquare().fitExtent([[0, 0], [width, height]], sphere)
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
)});
  main.variable(observer("spilhausSquare")).define("spilhausSquare", ["ellipticFactory","d3"], function(ellipticFactory,d3)
{
  const { abs, max, min, sin, cos, asin, acos, tan } = Math;

  const spilhausSquareRaw = function(lambda, phi) {
    let a, b, sm, sn, xy;
    const sp = tan(0.5 * phi);
    a = cos(asin(sp)) * sin(0.5 * lambda);
    sm = sp + a < 0;
    sn = sp - a < 0;
    b = acos(sp);
    a = acos(a);

    return ellipticFactory(a, b, sm, sn);
  };

  return () =>
    d3
      .geoProjection(spilhausSquareRaw)
      .rotate([-66.94970198, 49.56371678, 40.17823482]);
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`**Other stuffs for cartography**`
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  main.variable(observer("width")).define("width", function(){return(
1000
)});
  main.variable(observer("sphere")).define("sphere", function(){return(
{ type: "Sphere" }
)});
  main.variable(observer("graticule")).define("graticule", ["d3"], function(d3){return(
d3.geoGraticule10()
)});
  main.variable(observer("land")).define("land", ["topojson","world"], function(topojson,world){return(
topojson.feature(world, world.objects.land)
)});
  main.variable(observer("world")).define("world", ["d3"], function(d3){return(
d3.json(
  "https://raw.githubusercontent.com/neocarto/resources/master/geometries/World/ne_50m_admin_0_land.topojson"
)
)});
  main.variable(observer("transform")).define("transform", ["path"], function(path){return(
function transform(d, val) {
  const [x, y] = path.centroid(d);
  return `
    translate(${x},${y})
    scale(${val})
    translate(${-x},${-y})
  `;
}
)});
  main.variable(observer("signature")).define("signature", function(){return(
"M 49.710938 0 C 45.280658 -0.10068817 40.846014 0.20070526 36.507812 1.0078125 A 0.5 0.5 0 0 0 36.109375 1.5917969 A 0.5 0.5 0 0 0 36.691406 1.9921875 C 40.953205 1.1992947 45.319733 0.90068817 49.689453 1 A 0.5 0.5 0 0 0 50.199219 0.51171875 A 0.5 0.5 0 0 0 49.710938 0 z M 43.818359 1.1992188 A 0.5 0.5 0 0 0 43.759766 1.2011719 A 0.5 0.5 0 0 0 43.746094 1.203125 A 0.5 0.5 0 0 0 43.302734 1.7539062 C 43.601346 4.5409497 43.802127 7.4409499 44.103516 10.253906 A 0.5 0.5 0 0 0 44.652344 10.697266 A 0.5 0.5 0 0 0 45.097656 10.146484 C 44.799044 7.3594413 44.598263 4.4594409 44.296875 1.6464844 A 0.5 0.5 0 0 0 43.818359 1.1992188 z M 8.5703125 2.1015625 A 0.50005 0.50005 0 0 0 8.2460938 2.2460938 C 7.5577053 2.934482 6.7738634 4.1882853 6.0390625 5.5058594 C 5.3042616 6.8234334 4.6504693 8.1762227 4.3320312 9.0253906 A 0.5 0.5 0 0 0 4.625 9.6679688 A 0.5 0.5 0 0 0 5.2675781 9.375 C 5.5491401 8.624168 6.1969103 7.2765666 6.9121094 5.9941406 C 7.3884504 5.1400119 7.8257032 4.5843377 8.2714844 3.96875 C 8.9228567 7.441618 9.4243349 10.969843 9.6015625 14.425781 A 0.5 0.5 0 0 0 10.125 14.898438 A 0.5 0.5 0 0 0 10.599609 14.375 C 10.398322 10.449896 9.8951261 6.4257519 9.0898438 2.5 A 0.50005 0.50005 0 0 0 8.5703125 2.1015625 z M 0.88476562 2.9003906 A 0.5 0.5 0 0 0 0.40234375 3.3574219 C 0.19784703 5.7091342 0.09918043 10.996194 0 13.277344 A 0.50005 0.50005 0 0 0 0.578125 13.792969 C 2.4585477 13.49606 4.4593291 13.297232 6.3789062 12.994141 A 0.5 0.5 0 0 0 6.7929688 12.421875 A 0.5 0.5 0 0 0 6.2226562 12.005859 C 4.5372816 12.271971 2.75693 12.468243 1.0234375 12.722656 C 1.1186209 10.224305 1.2147999 5.555192 1.3984375 3.4433594 A 0.5 0.5 0 0 0 0.94335938 2.9023438 A 0.5 0.5 0 0 0 0.88476562 2.9003906 z M 16.912109 3 A 0.50005 0.50005 0 0 0 16.435547 3.3144531 C 15.746338 5.0374758 15.191994 6.8522039 14.710938 8.6660156 C 13.677091 7.4658067 12.983618 6.2822304 12.136719 4.7578125 A 0.50005 0.50005 0 0 0 11.207031 5.0820312 C 11.708512 8.0909178 12.308122 11.190527 12.806641 14.181641 A 0.50005 0.50005 0 0 0 13.800781 14.099609 C 13.800781 14.070473 13.789627 14.046528 13.789062 14.017578 L 13.792969 14.017578 C 13.789204 13.994991 13.785026 13.971816 13.78125 13.949219 C 13.763503 13.441862 13.680433 12.9549 13.589844 12.501953 A 0.5 0.5 0 0 0 13.490234 12.289062 A 0.5 0.5 0 0 0 13.488281 12.287109 C 13.221451 10.763415 12.957565 9.2458558 12.685547 7.7207031 C 13.19004 8.5106184 13.764398 9.2702581 14.546875 10.052734 A 0.50005 0.50005 0 0 0 15.386719 9.8164062 C 15.672124 8.6177056 16.131526 7.4509724 16.53125 6.2675781 C 16.666856 9.8044558 16.990686 13.361533 17.710938 16.802734 A 0.5 0.5 0 0 0 18.302734 17.189453 A 0.5 0.5 0 0 0 18.689453 16.597656 C 17.797697 12.337045 17.400391 7.869697 17.400391 3.5 A 0.50005 0.50005 0 0 0 16.912109 3 z M 32.771484 3.2011719 A 0.5 0.5 0 0 0 32.535156 3.2753906 C 31.733615 3.7763543 31.057917 4.3399084 30.339844 4.8027344 A 0.5 0.5 0 0 0 30.308594 4.8007812 A 0.5 0.5 0 0 0 29.804688 5.2324219 C 29.652385 6.3366167 29.594134 7.4540779 29.583984 8.5703125 C 28.933318 8.8541303 28.2646 9.1478882 27.808594 9.3378906 A 0.5 0.5 0 0 0 27.539062 9.9921875 A 0.5 0.5 0 0 0 28.191406 10.261719 C 28.553833 10.110708 29.08822 9.875646 29.574219 9.6640625 C 29.62336 11.168965 29.80205 12.662169 30.111328 14.105469 A 0.50005 0.50005 0 0 0 30.808594 14.453125 C 32.098259 13.857895 33.299041 13.358676 34.609375 12.753906 A 0.5 0.5 0 0 0 34.853516 12.089844 A 0.5 0.5 0 0 0 34.191406 11.845703 C 33.113205 12.343335 32.083399 12.7862 31.013672 13.267578 C 30.768468 11.948382 30.627132 10.591363 30.591797 9.2265625 C 31.425384 8.8647348 32.265313 8.5035756 32.878906 8.2675781 A 0.5 0.5 0 0 0 33.166016 7.6210938 A 0.5 0.5 0 0 0 32.707031 7.3007812 A 0.5 0.5 0 0 0 32.521484 7.3339844 C 31.991449 7.5378442 31.28742 7.8412988 30.601562 8.1367188 C 30.616268 7.3309828 30.664339 6.5267319 30.761719 5.7265625 A 0.5 0.5 0 0 0 30.765625 5.7246094 C 31.606913 5.1988042 32.305741 4.5972417 33.064453 4.1230469 A 0.5 0.5 0 0 0 33.224609 3.4355469 A 0.5 0.5 0 0 0 32.771484 3.2011719 z M 38.191406 3.71875 C 37.81186 3.6981815 37.431269 3.7727754 37.09375 3.9140625 C 36.418712 4.1966367 35.828349 4.8305923 35.902344 5.6445312 A 0.50005 0.50005 0 0 0 35.904297 5.6699219 C 36.304533 8.4715718 36.705469 11.173047 37.105469 13.873047 A 0.50005 0.50005 0 0 0 37.900391 14.199219 C 38.524391 13.731219 38.666913 12.915858 38.347656 12.277344 A 0.5 0.5 0 0 0 37.841797 12.003906 C 37.761176 11.458824 37.68022 10.899102 37.599609 10.351562 C 40.148578 12.136154 42.417456 14.277402 44.40625 16.808594 A 0.5 0.5 0 0 0 45.109375 16.892578 A 0.5 0.5 0 0 0 45.193359 16.191406 C 43.175143 13.622768 40.85606 11.434734 38.251953 9.5976562 C 38.312565 9.5470933 38.406356 9.4998944 38.453125 9.453125 A 0.50005 0.50005 0 0 0 38.480469 9.4257812 C 39.062604 8.7466237 39.836004 8.0212196 40.085938 7.0214844 C 40.319226 6.0883276 40.21673 4.8844296 39.326172 4.1210938 A 0.50005 0.50005 0 0 0 39.287109 4.0898438 C 38.950513 3.8542261 38.570952 3.7393185 38.191406 3.71875 z M 22.337891 3.9980469 C 21.760145 3.9980202 21.173931 4.1124588 20.615234 4.3359375 A 0.5 0.5 0 0 0 20.335938 4.9863281 A 0.5 0.5 0 0 0 20.986328 5.2636719 C 21.868935 4.9106293 22.835827 4.9192218 23.597656 5.2578125 C 24.343784 5.5894249 25 6.3416429 25 7.1992188 C 25 7.8880978 24.598373 8.4521488 24.0625 8.6875 C 23.975755 8.6939454 23.889581 8.691615 23.802734 8.7089844 A 0.5 0.5 0 0 0 23.582031 8.8144531 A 0.5 0.5 0 0 0 23.203125 9.3496094 A 0.5 0.5 0 0 0 23.75 9.796875 C 23.935733 9.7783017 24.111997 9.7308647 24.283203 9.671875 C 24.558601 9.6879312 24.860326 9.7916497 25.123047 9.9667969 C 25.480597 10.205164 25.743233 10.561867 25.810547 10.898438 C 25.971308 11.702241 25.655647 12.506147 24.984375 13.103516 C 24.296841 13.613432 23.309311 13.888744 22.449219 13.802734 A 0.5 0.5 0 0 0 21.902344 14.25 A 0.5 0.5 0 0 0 22.349609 14.796875 C 23.484251 14.910339 24.687609 14.584391 25.599609 13.900391 A 0.50005 0.50005 0 0 0 25.628906 13.876953 C 26.544346 13.075944 27.02873 11.889745 26.791016 10.701172 C 26.65833 10.037742 26.220184 9.496399 25.677734 9.1347656 C 25.574331 9.0658297 25.463255 9.0089431 25.351562 8.953125 C 25.755402 8.48738 26 7.8704308 26 7.1992188 C 26 5.8567945 25.057778 4.8121376 24.003906 4.34375 C 23.484821 4.1130454 22.915636 3.9980735 22.337891 3.9980469 z M 38.109375 4.7285156 C 38.321681 4.7400711 38.525866 4.8000408 38.689453 4.9082031 C 39.176706 5.3492657 39.279136 6.1236904 39.115234 6.7792969 C 38.966805 7.373014 38.347585 8.0419245 37.736328 8.7539062 C 37.664917 8.8233515 37.552507 8.9111627 37.478516 8.9453125 C 37.447011 8.9598531 37.445489 8.9637264 37.445312 8.9667969 A 0.50005 0.50005 0 0 0 37.394531 8.9414062 C 37.229327 7.8122027 37.063606 6.7106092 36.898438 5.5546875 C 36.872432 5.2686264 37.080507 5.0033633 37.480469 4.8359375 C 37.676641 4.7538188 37.897069 4.7169601 38.109375 4.7285156 z M 21.792969 5.1992188 A 0.5 0.5 0 0 0 21.722656 5.2070312 A 0.5 0.5 0 0 0 21.306641 5.7773438 C 21.607905 7.6853526 22.204522 11.177188 22.611328 13.007812 A 0.5 0.5 0 0 0 23.208984 13.388672 A 0.5 0.5 0 0 0 23.587891 12.791016 C 23.194696 11.021641 22.591704 7.5130849 22.292969 5.6210938 A 0.5 0.5 0 0 0 21.792969 5.1992188 z M 49.978516 14 A 0.5 0.5 0 0 0 49.5 14.521484 C 49.59242 16.647153 48.566957 18.795996 46.804688 20.095703 C 46.149735 20.562818 45.432841 20.900391 44.800781 20.900391 C 44.209115 20.900391 43.511054 20.483668 43.384766 19.978516 A 0.5 0.5 0 0 0 42.779297 19.615234 A 0.5 0.5 0 0 0 42.414062 20.220703 C 42.687774 21.31555 43.792448 21.900391 44.800781 21.900391 C 45.767448 21.900391 46.646639 21.437668 47.390625 20.90625 A 0.50005 0.50005 0 0 0 47.396484 20.902344 C 49.432828 19.40188 50.60754 16.951937 50.5 14.478516 A 0.5 0.5 0 0 0 49.978516 14 z M 2.6816406 15.800781 A 0.5 0.5 0 0 0 2.2011719 16.257812 C 2.1543219 16.820012 2.0709379 17.124791 1.9375 17.447266 C 1.8538373 17.64945 1.7007759 17.95593 1.5664062 18.228516 A 0.5 0.5 0 0 0 1.4003906 18.576172 C 1.406844 18.54164 1.4192416 18.493548 1.4023438 18.527344 C 1.3950221 18.541987 1.3861437 18.610982 1.3730469 18.636719 C 1.3615001 18.661779 1.3574889 18.667431 1.3457031 18.693359 L 1.3574219 18.695312 C 1.33207 18.756884 1.3007812 18.781162 1.3007812 18.900391 A 0.50005 0.50005 0 0 0 2.2558594 19.107422 C 2.4973566 18.576128 2.694766 18.23065 2.8613281 17.828125 C 3.0278902 17.4256 3.1460687 16.979597 3.1992188 16.341797 A 0.5 0.5 0 0 0 2.7421875 15.800781 A 0.5 0.5 0 0 0 2.6816406 15.800781 z "
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Helpers**`
)});
  main.variable(observer()).define(["md"], function(md){return(
md` The code below was written by @toja. See: https://observablehq.com/@toja/adams-world-in-a-square-i-ii#ellipticFactory`
)});
  main.variable(observer("ellipticFactory")).define("ellipticFactory", ["ellipticF"], function(ellipticF){return(
function (a, b, sm, sn) {
  let m = Math.asin(Math.sqrt(1 + Math.min(0, Math.cos(a + b))));
  if (sm) m = -m;

  let n = Math.asin(Math.sqrt(Math.abs(1 - Math.max(0, Math.cos(a - b)))));
  if (sn) n = -n;

  return [ellipticF(m, 0.5), ellipticF(n, 0.5)];
}
)});
  main.variable(observer("ellipticF")).define("ellipticF", function(){return(
function (phi, m) {
  const { abs, atan, ln, PI: pi, sin, sqrt } = Math;
  const C1 = 10e-4,
    C2 = 10e-10,
    TOL = 10e-6;
  const sp = sin(phi);

  let k = sqrt(1 - m),
    h = sp * sp;

  // "complete" elliptic integral
  if (h >= 1 || abs(phi) === pi / 2) {
    if (k <= TOL) return sp < 0 ? -Infinity : Infinity;
    (m = 1), (h = m), (m += k);
    while (abs(h - k) > C1 * m) {
      k = sqrt(h * k);
      (m /= 2), (h = m), (m += k);
    }
    return sp < 0 ? -pi / m : pi / m;
  }
  // "incomplete" elliptic integral
  else {
    if (k <= TOL) return ln((1 + sp) / (1 - sp)) / 2;
    let g, n, p, r, y;
    (m = 1), (n = 0), (g = m), (p = m * k), (m += k);
    y = sqrt((1 - h) / h);
    if (abs((y -= p / y)) <= 0) y = C2 * sqrt(p);
    while (abs(g - k) > C1 * g) {
      (k = 2 * sqrt(p)), (n += n);
      if (y < 0) n += 1;
      (p = m * k), (g = m), (m += k);
      if (abs((y -= p / y)) <= 0) y = C2 * sqrt(p);
    }
    if (y < 0) n += 1;
    r = (atan(m / y) + pi * n) / m;
    return sp < 0 ? -r : r;
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Imports**`
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6", "d3-geo-projection@2")
)});
  return main;
}
