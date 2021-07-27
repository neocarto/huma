// https://observablehq.com/@neocartocnrs/the-organization-of-cartographers-for-social-equality@1433
import define1 from "./a2e58f97fd5e8d7c@620.js";
import define2 from "./450051d7f1174df8@252.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# The Organization of Cartographers for Social Equality`
)});
  main.variable(observer("viewof language")).define("viewof language", ["Radio"], function(Radio){return(
Radio(["French", "English"], {
  value: "French",
  label: "Language"
})
)});
  main.variable(observer("language")).define("language", ["Generators", "viewof language"], (G, _) => G.input(_));
  main.variable(observer("viewof scrubber")).define("viewof scrubber", ["Scrubber","range","language","labels_fr","labels_en"], function(Scrubber,range,language,labels_fr,labels_en){return(
Scrubber(range, {
  delay: 5000,
  autoplay: true,
  loop: true,
  loopDelay: 8000,
  format: scrubber =>
    language == "French" ? labels_fr[scrubber] : labels_en[scrubber]
})
)});
  main.variable(observer("scrubber")).define("scrubber", ["Generators", "viewof scrubber"], (G, _) => G.input(_));
  main.variable(observer("map")).define("map", ["d3","width","height","path","equator","topojson","land","outline","projections","scrubber"], function(d3,width,height,path,equator,topojson,land,outline,projections,scrubber)
{
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("width", "100%")
    .style("height", "auto");

  var defs = svg.append("defs");

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
    .attr("stroke", "#404040")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 0.2);

  svg
    .append("rect")
    .attr("fill-opacity", 0.4)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr('fill', "url('#hatch')");

  // svg
  //   .append("rect")
  //   .attr("x", 0)
  //   .attr("y", 0)
  //   .attr("width", width)
  //   .attr("height", height)
  //   .attr('fill', projections.map(d => d.background2)[scrubber]);

  svg
    .append("g")
    .append("path")
    .datum(d3.geoGraticule10())
    .attr("d", path)
    //.attr("clip-path", "url(#clip)")
    .style('fill', "none")
    .style('stroke', "#7c8aa1")
    .style('stroke-width', .8)
    .style('stroke-opacity', .5)
    .style('stroke-dasharray', 2);

  svg
    .append("g")
    .append("path")
    .datum(equator)
    .attr("d", path)
    .style('fill', "none")
    .attr("stroke", "#4a524d")
    .style('stroke-width', 1);

  // svg
  //   .append("g")
  //   .append("path")
  //   .datum(test)
  //   .attr("d", path)
  //   .style('fill', "red");

  svg
    .append("path")
    .datum(topojson.feature(land, land.objects.land))
    .attr("d", path)
    .attr("fill", "#DD7034");

  // svg
  //   .append("path")
  //   .datum(topojson.feature(tissot, tissot.objects.tissot))
  //   .attr("d", path)
  //   .attr("fill", "white")
  //   .style('fill-opacity', .5);

  svg
    .append("path")
    .datum(outline)
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "#4a524d")
    .attr("stroke-opacity", projections.map(d => d.outline)[scrubber]);

  // svg
  //   .append("rect")
  //   .attr("x", 0)
  //   .attr("y", 0)
  //   .attr("width", width)
  //   .attr("height", 60)
  //   .attr("fill", "#C84742")
  //   .attr("fill-opacity", 0.4);

  // Title

  var title = projections.map(d => d.text)[scrubber].split("\n");

  var x = 30;
  var y = 30;
  var k = 14;

  for (let i = 0; i < title.length; i++) {
    let size = title[i].length + title[i].split(" ").length * k;

    svg
      .append("text")
      .attr("y", y + i * 37 + 25)
      .attr("x", x + 5)
      .attr("font-family", "sans-serif")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 10)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .style("font-size", "35px")
      .text(title[i]);

    svg
      .append("text")
      .attr("y", y + i * 37 + 25)
      .attr("x", x + 5)
      .attr("font-family", "sans-serif")
      .attr("fill", "#434445")
      .style("font-size", "35px")
      .text(title[i]);
  }

  // Description

  var txt = projections.map(d => d.desc)[scrubber].split("\n");
  var x = 30;
  var y = 110;
  var k = 6.8;

  for (let i = 0; i < txt.length; i++) {
    svg
      .append("text")
      .attr("y", y + i * 17 + 13)
      .attr("x", x + 5)
      .attr("font-family", "sans-serif")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 10)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .style("font-size", "14px")
      .text(txt[i]);

    svg
      .append("text")
      .attr("y", y + i * 17 + 13)
      .attr("x", x + 5)
      .attr("font-family", "sans-serif")
      .attr("fill", "#434445")
      .style("font-size", "14px")
      .text(txt[i]);
  }

  // Signature

  svg
    .append("svg:image")
    .attr("x", width - 57)
    .attr("y", height - 22)
    .attr("width", 55)
    .attr(
      "xlink:href",
      "https://nlambert.gitpages.huma-num.fr/resources/images/signature_black.svg"
    );

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`**<ins>A french version of the text below is available in the newspaper [l'Humanité](https://www.humanite.fr/comment-les-cartographes-caricaturent-la-planete-pour-representer-le-monde-700976).</ins>**`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Have you heard about the series "The West Wing" created by Aaron Sorkin and broadcast in the United States on NBC from 1999 to 2006 and in France from 2001? This humorous series, which has won numerous awards, depicts the life of a Democratic President of the United States played by Martin Sheen and his collaborators, who are based in the famous West Wing of the White House. 

What does this have to do with cartography? The fact is that in [episode 16 of season two](https://www.youtube.com/watch?v=OH1bZ0F3zVU), an open house is held at the White House to receive "anyone who wants to discuss things we don't really care about". This is how three academics from the Organization of Cartographers for Social Equality arrive. They were there to claim for legislation to make it compulsory in all public schools for geography teachers to use the Peters projection instead of the traditional Mercator. But what are they talking about?

### « The Earth is blue like an orange » (Paul Eluard)

[Since Ancient times](https://twitter.com/neocartocnrs/status/1328596268780810242/photo/1), all cartographers have had to face a thorny question: how to draw a three-dimensional World in two dimensions on a sheet of paper or a screen. In other words, how to go from the sphere to the plane? Experiment with an orange, peel it and try to lay its peel flat on the table in front of you. One thing is obvious, there are a thousand and one ways to proceed and whatever your technique, there will be breaks and deformations. In the end, the image of the orange laid flat on the table will be nothing but a deformed orange, far from the initial spherical object. So how do cartographers deal with this difficulty?

### The World by Mercator

In the 16th century, the cartographer Mercator proposed a very ingenious projection which had the advantage of reproducing the shape of the different countries and continents quite faithfully. Another advantage was that his map, which was intended for European sailors as a navigational tool, allowed them to follow the course by simply drawing a straight line on the map. On the other hand, to make this possible, this cartographic projection had the disadvantage of strongly exaggerating the surfaces of the countries as one got closer to the poles. For example, on this map, Greenland appears to be 15 times larger than Mexico when in reality the two countries are about the same size. Africa appears to be smaller than North America when in reality, with 1/5th of the planet's land mass, it is the largest continent after Asia. Another pitfall is that Germany is located in the middle of the map when in reality it is much further north. In the end, the Mercator map over-represents the countries of the North to the detriment of those of the South. For the famous cartographic experts of the TV series, the Mercator projection thus encourages "an imperialist European attitude for centuries and has created ethnic prejudices against the Third World". But other ways of drawing the World are possible.

### The Gall-Peters projection

In an effort to fight against this dominant cartographic discourse, a German cartographer named Arno Peters gave his name in the early 1970s to a projection that he then presented as superior to Mercator's. Even if it is not really an invention, since this way of representing the World had already been described in 1855 by James Gall (we will then speak rather of Gall-Peters projection), Peters took it out of its purely technical dimension to include it in an alter-globalization and militant approach. Indeed, this map has many advantages. Unlike Mercator's map, it draws a world where the surface of all the countries are meticulously preserved. On this map, Africa appears massive simply because Africa is huge in reality. More than 30 million km².  On the opposite, Europe seems very small and shrunk at the top of the map because in reality, it is the smallest continent after Australia. In the end, this projection gives back to the Southern countries the importance they deserve. According to White House experts, "as long as the representation of Third World countries is wrong, they will be underestimated".

### Why put North on top?

Also, why not also examine the position of the different countries on the map? Who to put in the center? Who to put at the top? Who to put at the bottom? If in Europe we are used to represent the world centered on Europe, know that the Americans and the Japanese do the same. Moreover, since the earth is round, why not also consider our way of always representing the North at the top of the map?  A sphere has neither top nor bottom. And this is precisely what the Australian geographer Stuart McArthur tried to remind us in 1979 when he proposed an "upside down" map where Australia reigns triumphantly at the top of the map. Let us recall in passing that throughout History, the orientation of maps to the North has not always been obvious. In the Middle Ages, for example, European [maps were oriented towards the East](https://en.wikipedia.org/wiki/T_and_O_map) ("vers l'orient" in french). To think that a map is "oriented" to the north is therefore a historical counter-sense. In the end, flipping the map over is a way to change its message.  As the members of the Organization of Cartographers for Social Equality say, "as long as Mercator's projection exaggerates the importance of Western countries, and as long as the northern hemisphere is at the top and the southern hemisphere is at the bottom, unfortunately people will tend to adopt a top-down attitude". 

### Thousands ways to draw the World

In summary, cartographic projections are a means of expression for cartographers allowing them to tell the World we live in. Distorting, in the manner of a caricature, makes it possible te exaggerate what is important (by placing it at the top and in the center) and minimize what is less important ([by relegating it to the edges or even beyond the limits of the map](https://www.youtube.com/watch?v=j0r0VJeD95w)). A simple basemap thus carries within it ideas, underlying choices to express a vision of the World. This vision can carry egalitarian values such as the [polar projection](https://www.youtube.com/watch?v=AC6QhqpXJ8c) or simply a geopolitical perspective such as the one invented by [Xao Xiaoguang](https://www.reddit.com/r/geography/comments/6r189n/a_classroom_map_in_seen_in_china_does_anyone_know/) in 2002. Choosing this or that way of drawing the World is always taking part. Nothing is insignificant in cartography. Be aware of it!`
)});
  main.variable(observer("range")).define("range", ["projections"], function(projections)
{
  var range = [];
  for (var i = 0; i < projections.length; i++) {
    range.push(i);
  }
  return range;
}
);
  main.variable(observer("labels_en")).define("labels_en", function(){return(
[
  "The World",
  "Mercator projection",
  "Gall-Peters projection",
  "Upside Down World"
]
)});
  main.variable(observer("labels_fr")).define("labels_fr", function(){return(
[
  "Le Monde",
  "Projection de Mercator",
  "Projection Gall-Peters",
  "Un monde inversé"
]
)});
  main.variable(observer("previous")).define("previous", ["scrubber","projections"], function(scrubber,projections)
{
  let x;
  //x = scrubber - 1;
  x = scrubber == 0 ? projections.length - 1 : scrubber - 1;
  return x;
}
);
  main.variable(observer("projections")).define("projections", ["language","d3","width","height"], function(language,d3,width,height){return(
[
  {
    label: "Globe",
    text:
      language == "French"
        ? "La Terre est bleue\ncomme une orange"
        : "The Earth is blue\nlike an orange",
    desc:
      language == "French"
        ? "La Terre est une sphère\nroulant dans l'espace d'une\ncirconférence de 40 000 km"
        : "The Earth is a sphere\ntravelling in space with a\ncircumference of 40,000 km",
    value: d3.geoOrthographicRaw,
    scale: 295,
    translate: [width / 2 + 100, height / 2],
    clip: 90,
    rotate: -23,
    outline: 1
  },
  {
    label: "Mercator",
    text:
      language == "French"
        ? "La vraie forme\ndes pays"
        : "The true shape\nof countries",
    desc:
      language == "French"
        ? "Sur la projection de Mercator,\nla forme des pays est fidèle à la réalité.\nMais leurs surfaces respectives sont\ncomplètement fausses."
        : "On the Mercator projection,\nthe shape of the countries is close\nto reality. But their respective surfaces\nare completely wrong.",
    value: d3.geoMercatorRaw,
    scale: 160,
    translate: [width / 2, height / 2 + 120],
    clip: 0,
    rotate: 0,
    outline: 0
  },
  {
    label: "Peters",
    text:
      language == "French"
        ? "La vraie taille\ndes pays"
        : "The real size\nof the countries",
    desc:
      language == "French"
        ? "Sur la projection de Gall-Peters,\nles pays sont déformés. Mais\nleur surface respective est\nfidèle à la réalité."
        : "On the Gall-Peters projection,\nthe countries are distorted.\nBut their respective surfaces\nare accurate.",
    value: d3.geoCylindricalEqualAreaRaw((38.58 / 180) * Math.PI),
    scale: 240,
    translate: [width / 2, height / 2],
    clip: 0,
    rotate: 0,
    outline: 0
  },
  {
    label: "Upside Down",
    text:
      language == "French"
        ? "Changez votre regard\nsur le Monde"
        : "Change the way you\nlook at the World",
    desc:
      language == "French"
        ? "En 1979, le géographe Stuart McArthur\npropose une carte du Monde inversée\npour redonner toute leur place\naux pays du Sud."
        : "In 1979, the geographer Stuart McArthur\ndesigned an inverted map of the world\nto show the countries of the South\nin their rightful place.",
    value: d3.geoPattersonRaw,
    scale: 200,
    translate: [width / 2, height / 2 - 50],
    clip: 0,
    rotate: -180,
    outline: 0
  }
]
)});
  main.variable(observer("path")).define("path", ["d3","update"], function(d3,update){return(
d3.geoPath(update)
)});
  main.variable(observer("update")).define("update", ["interpolateProjection","previous","scrubber","ease","projections"], function*(interpolateProjection,previous,scrubber,ease,projections)
{
  let proj;
  const interpolate = interpolateProjection(previous, scrubber);
  for (let j = 1, m = 45; true; ++j) {
    const t = Math.min(1, ease(j / m));
    proj = interpolate(t).rotate([
      performance.now() / 80,
      projections.map(d => d.rotate)[scrubber]
    ]);

    yield proj;
  }
}
);
  main.variable(observer("interpolateProjection")).define("interpolateProjection", ["projections","previous","scrubber","d3","lerp2","lerp1"], function(projections,previous,scrubber,d3,lerp2,lerp1){return(
function interpolateProjection(scrub0, scrub1) {
  let raw0 = projections.map(d => d.value)[previous];
  let raw1 = projections.map(d => d.value)[scrubber];
  let scale0 = projections.map(d => d.scale)[previous];
  let scale1 = projections.map(d => d.scale)[scrubber];
  let translate0 = projections.map(d => d.translate)[previous];
  let translate1 = projections.map(d => d.translate)[scrubber];
  let clip0 = projections.map(d => d.clip)[previous];
  let clip1 = projections.map(d => d.clip)[scrubber];

  return t =>
    d3
      .geoProjection((x, y) => lerp2(raw0(x, y), raw1(x, y), t))
      .scale(lerp1(scale0, scale1, t))
      .translate(lerp2(translate0, translate1, t))
      .precision(0.1)
      .clipAngle(clip1);
}
)});
  main.variable(observer("lerp1")).define("lerp1", function(){return(
function lerp1(x0, x1, t) {
  return (1 - t) * x0 + t * x1;
}
)});
  main.variable(observer("lerp2")).define("lerp2", function(){return(
function lerp2([x0, y0], [x1, y1], t) {
  return [(1 - t) * x0 + t * x1, (1 - t) * y0 + t * y1];
}
)});
  main.variable(observer("rotate")).define("rotate", ["d3"], function(d3){return(
d3.interpolate([10, -20], [0, 0])
)});
  main.variable(observer("ease")).define("ease", ["d3"], function(d3){return(
d3.easeCubicInOut
)});
  main.variable(observer("width")).define("width", function(){return(
1000
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("outline")).define("outline", function(){return(
{type: "Sphere"}
)});
  main.variable(observer("graticule")).define("graticule", ["d3"], function(d3){return(
d3.geoGraticule10()
)});
  main.variable(observer("land")).define("land", ["d3"], function(d3){return(
d3.json(
  "https://raw.githubusercontent.com/neocarto/resources/master/geometries/World/land.topojson"
)
)});
  main.variable(observer("tissot")).define("tissot", ["d3"], function(d3){return(
d3.json(
  "https://raw.githubusercontent.com/neocarto/resources/master/geometries/World/tissot.topojson"
)
)});
  main.variable(observer("equator")).define("equator", function(){return(
{
  type: "LineString",
  coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Appendix`
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require('topojson')
)});
  const child1 = runtime.module(define1);
  main.import("Radio", child1);
  const child2 = runtime.module(define2);
  main.import("Scrubber", child2);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6", "d3-geo@2", "d3-geo-projection@3", "d3-ease@2")
)});
  return main;
}
