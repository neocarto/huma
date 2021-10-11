// https://observablehq.com/@neocartocnrs/pandora-papers@738
import define1 from "./1ea380bf05fbf68c@327.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Pandora Papers`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**What a strange planet.**

What a weird planet we live on? A planet in which $11,300,000,000,000 (9,400 billion euros) is hidden in tax heavens. Money from tax cheating that is mixed with money from drugs and trafficking of all kinds. What a crazy amount. 2% of it would be enough to eradicate hunger in the world. A little less than 43% would be enough to curb global warming. And what a loss for our public services, our hospitals, social protection... Isn't this world ugly? What if we put it back to the right way?

**What a strange map.**

The map presented here is a cartogram area. The principle: the size of each country is proportional to a statistical data. Here, the surface of the countries corresponds to the number of effective beneficiaries revealed in the Pandora Papers. Projected on a sphere, a strange, deformed world is drawn. In short, a parallel world, which allows to narrate differently the geographical area.

This map was made with the [ScapeToad](http://scapetoad.choros.place/) software.`
)});
  main.variable(observer("viewof en")).define("viewof en", ["Inputs"], function(Inputs){return(
Inputs.toggle({ label: "English" })
)});
  main.variable(observer("en")).define("en", ["Generators", "viewof en"], (G, _) => G.input(_));
  main.variable(observer("map")).define("map", ["d3","width","height","offset","col1","col2","sphere","grid2","land","countries","col","path","signature","en","legend","callout","zoom","projection"], function(d3,width,height,offset,col1,col2,sphere,grid2,land,countries,col,path,signature,en,legend,callout,zoom,projection)
{
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("width", "100%")
    .style("height", "auto")
    .style("background-color", "white");

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
    .attr("fill", "url('#hatch')");

  const shadow = defs
    .append("filter")
    .attr("id", "shadow")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", "200%")
    .attr("height", "200%");

  shadow
    .append("feOffset")
    .attr("result", "offOut")
    .attr("in", "SourceAlpha")
    .attr("dx", 4)
    .attr("dy", 4);

  shadow
    .append("feGaussianBlur")
    .attr("result", "blurOut")
    .attr("in", "offOut")
    .attr("stdDeviation", 5);

  shadow
    .append("feBlend")
    .attr("in", "SourceGraphic")
    .attr("in2", "blurOut")
    .attr("mode", "normal");

  var radialGradient = defs
    .append("radialGradient")
    .attr("id", "radial-gradient");
  radialGradient
    .append("stop")
    .attr("offset", `${offset}%`)
    .attr("stop-color", col1);
  radialGradient.append("stop").attr("offset", "100%").attr("stop-color", col2);

  const waterlayer = svg
    .append("g")
    .append("path")
    .datum(sphere)
    .style("fill", "url(#radial-gradient)");

  const gridlayer = svg
    .append("g")
    .append("path")
    .datum(grid2)
    .attr("fill", "none")
    .style("stroke-width", 1.2)
    .style("stroke-opacity", 0.5)
    .style("stroke-dasharray", 2)
    .attr("stroke", "white");

  const landlayer = svg
    .append("g")
    .append("path")
    .datum(land)
    .attr("fill", "#17234a")
    .attr("fill-opacity", 0.4)
    .attr("stroke-linecap", "round")
    .attr("filter", "url(#shadow)");

  const country2layer = svg
    .append("g")
    .selectAll("path")
    .data(countries.features)
    .join("path")
    .attr("stroke", "white")
    .attr("stroke-linecap", "round")
    .attr("fill", col)
    .attr("class", "ctr")
    .attr("stroke-width", 0.4)
    .attr("d", path);

  // LAYOUT
  svg
    .append("path")
    .attr("d", signature)
    .attr("transform", `translate(${width - 82},${height - 45}) scale(1.3)`)
    .attr("fill", col);

  svg
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("transform", `translate(17,${height - 15}) rotate(-90)`)
    .attr("fill", col)
    .style("font-size", "2vw")
    .text(en ? "Source: ICIJ, 2021" : "Source : ICIJ, 2021");

  let h = height / 140;
  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", height - h)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", col);

  svg
    .append("rect")
    .attr("x", width - h)
    .attr("y", 0)
    .attr("width", h)
    .attr("height", 195)
    .attr("fill", col);

  svg
    .append("text")
    .attr("x", 45)
    .attr("id", "txt")
    .attr("y", height - height / 50)
    .attr("fill", "white")
    .style("font-size", "5vw")
    .attr("text-anchor", "start")
    .text("#PandoraPapers");

  let size = width / 2.3;
  let hrect = height / 20 + height / 50;
  svg
    .append("rect")
    .attr("x", 25)
    .attr("y", height - hrect)
    .attr("width", size)
    .attr("height", hrect)
    .attr("fill", col);

  svg
    .append("text")
    .attr("x", 45)
    .attr("y", height - height / 50)
    .attr("fill", "white")
    .style("font-size", "5vw")
    .attr("text-anchor", "start")
    .text("#PandoraPapers");

  svg
    .append("g")
    .selectAll("text")
    .data(legend)
    .join("text")
    .attr("transform", (d, i) => `translate(${width - 15},${i * 18})`)
    .attr("dy", 20)
    .style("font-family", "sans-serif")
    .text((d) => d)
    .attr("fill", "white")
    .attr("stroke", "white")
    .attr("stroke-width", 8)
    .attr("stroke-linejoin", "round")
    .attr("text-anchor", "end")
    .style("font-size", "1.8vw");

  svg
    .append("g")
    .selectAll("text")
    .data(legend)
    .join("text")
    .attr("transform", (d, i) => `translate(${width - 15},${i * 18})`)
    .attr("dy", 20)
    .style("font-family", "sans-serif")
    .text((d) => d)
    .attr("fill", col)
    .attr("text-anchor", "end")
    .style("font-size", "1.8vw");

  // Tooltip

  const tooltip = svg.append("g");

  svg
    .selectAll(".ctr")
    .on("touchmove mousemove", function (event, d) {
      tooltip.call(
        callout,
        `${d.properties.name}
${d.properties.companies} ${en ? "companies" : "entreprises"}
`
      );
      tooltip.attr("transform", `translate(${d3.pointer(event, this)})`);
      d3.select(this).attr("fill", "#ffd138");
      d3.select(this).attr("stroke-width", 1.5);
    })
    .on("touchend mouseleave", function () {
      tooltip.call(callout, null);
      d3.select(this).attr("stroke-width", 0.4);
      d3.select(this).attr("fill", col);
    });

  // Render

  function render() {
    waterlayer.attr("d", path);
    landlayer.attr("d", path);
    country2layer.attr("d", path);
    gridlayer.attr("d", path);
    //circleslayer.attr("transform", (d) => `translate(${projection(d.coords)})`);
  }

  return svg
    .call(zoom(projection).on("zoom.render end.render", render))
    .call(render)
    .node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`**Data import & handling**`
)});
  main.variable(observer("grid")).define("grid", ["d3"], function(d3){return(
d3.json(
  "https://raw.githubusercontent.com/neocarto/resources/master/datasets/PandoraPapers/grid.json"
)
)});
  main.variable(observer("grid2")).define("grid2", ["topojson","grid"], function(topojson,grid){return(
topojson.feature(grid, grid.objects[Object.keys(grid.objects)[0]])
)});
  main.variable(observer("cartogram")).define("cartogram", ["d3"], function(d3){return(
d3.json(
  "https://raw.githubusercontent.com/neocarto/resources/master/datasets/PandoraPapers/cartogram.json"
)
)});
  main.variable(observer("cartogram2")).define("cartogram2", ["cartogram"], function(cartogram)
{
  cartogram.objects.cartogram.geometries = cartogram.objects.cartogram.geometries.filter(
    (d) => d.properties.companies != 0
  );
  return cartogram;
}
);
  main.variable(observer("viewof minArea")).define("viewof minArea", ["Inputs"], function(Inputs){return(
Inputs.range([0.01, 1], {
  label: "Simplification",
  value: 0.1
})
)});
  main.variable(observer("minArea")).define("minArea", ["Generators", "viewof minArea"], (G, _) => G.input(_));
  main.variable(observer("cartogram_simplified")).define("cartogram_simplified", ["topojson","cartogram2","minArea"], function(topojson,cartogram2,minArea)
{
  let cartogram_simplified = topojson.presimplify(cartogram2);
  let min_weight = topojson.quantile(cartogram_simplified, minArea);
  cartogram_simplified = topojson.simplify(cartogram_simplified, min_weight);
  return cartogram_simplified;
}
);
  main.variable(observer("countries")).define("countries", ["topojson","cartogram_simplified"], function(topojson,cartogram_simplified){return(
topojson.feature(
  cartogram_simplified,
  cartogram_simplified.objects[Object.keys(cartogram_simplified.objects)[0]]
)
)});
  main.variable(observer("land")).define("land", ["topojson","cartogram_simplified"], function(topojson,cartogram_simplified){return(
topojson.merge(
  cartogram_simplified,
  cartogram_simplified.objects[Object.keys(cartogram_simplified.objects)[0]]
    .geometries
)
)});
  main.variable(observer()).define(["d3","width","grid2","countries","col"], function(d3,width,grid2,countries,col)
{
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, 480])
    .style("width", "100%")
    .style("height", "auto")
    .style("background-color", "white");

  const path = d3.geoPath(d3.geoPatterson());

  svg
    .append("path")
    .datum(grid2)
    .attr("fill", "none")
    .attr("stroke", "#CCCCCC")
    .attr("stroke-width", 0.4)
    .attr("d", path);

  svg
    .append("path")
    .datum(countries)
    .attr("fill", col)
    .attr("stroke", "white")
    .attr("stroke-width", 0.4)
    .attr("d", path);

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`**Config**`
)});
  main.variable(observer("projection")).define("projection", ["d3"], function(d3){return(
d3.geoOrthographic().rotate([20, 10]).clipAngle(90).precision(0.1)
)});
  main.variable(observer("sphere")).define("sphere", function(){return(
{ type: "Sphere" }
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
)});
  main.variable(observer("height")).define("height", ["d3","projection","width","sphere"], function(d3,projection,width,sphere)
{
  const [[x0, y0], [x1, y1]] = d3
    .geoPath(projection.fitWidth(width, sphere))
    .bounds(sphere);
  const dy = Math.ceil(y1 - y0),
    l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
  return dy;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`**Layout**`
)});
  main.variable(observer("signature")).define("signature", function(){return(
"M 49.710938 0 C 45.280658 -0.10068817 40.846014 0.20070526 36.507812 1.0078125 A 0.5 0.5 0 0 0 36.109375 1.5917969 A 0.5 0.5 0 0 0 36.691406 1.9921875 C 40.953205 1.1992947 45.319733 0.90068817 49.689453 1 A 0.5 0.5 0 0 0 50.199219 0.51171875 A 0.5 0.5 0 0 0 49.710938 0 z M 43.818359 1.1992188 A 0.5 0.5 0 0 0 43.759766 1.2011719 A 0.5 0.5 0 0 0 43.746094 1.203125 A 0.5 0.5 0 0 0 43.302734 1.7539062 C 43.601346 4.5409497 43.802127 7.4409499 44.103516 10.253906 A 0.5 0.5 0 0 0 44.652344 10.697266 A 0.5 0.5 0 0 0 45.097656 10.146484 C 44.799044 7.3594413 44.598263 4.4594409 44.296875 1.6464844 A 0.5 0.5 0 0 0 43.818359 1.1992188 z M 8.5703125 2.1015625 A 0.50005 0.50005 0 0 0 8.2460938 2.2460938 C 7.5577053 2.934482 6.7738634 4.1882853 6.0390625 5.5058594 C 5.3042616 6.8234334 4.6504693 8.1762227 4.3320312 9.0253906 A 0.5 0.5 0 0 0 4.625 9.6679688 A 0.5 0.5 0 0 0 5.2675781 9.375 C 5.5491401 8.624168 6.1969103 7.2765666 6.9121094 5.9941406 C 7.3884504 5.1400119 7.8257032 4.5843377 8.2714844 3.96875 C 8.9228567 7.441618 9.4243349 10.969843 9.6015625 14.425781 A 0.5 0.5 0 0 0 10.125 14.898438 A 0.5 0.5 0 0 0 10.599609 14.375 C 10.398322 10.449896 9.8951261 6.4257519 9.0898438 2.5 A 0.50005 0.50005 0 0 0 8.5703125 2.1015625 z M 0.88476562 2.9003906 A 0.5 0.5 0 0 0 0.40234375 3.3574219 C 0.19784703 5.7091342 0.09918043 10.996194 0 13.277344 A 0.50005 0.50005 0 0 0 0.578125 13.792969 C 2.4585477 13.49606 4.4593291 13.297232 6.3789062 12.994141 A 0.5 0.5 0 0 0 6.7929688 12.421875 A 0.5 0.5 0 0 0 6.2226562 12.005859 C 4.5372816 12.271971 2.75693 12.468243 1.0234375 12.722656 C 1.1186209 10.224305 1.2147999 5.555192 1.3984375 3.4433594 A 0.5 0.5 0 0 0 0.94335938 2.9023438 A 0.5 0.5 0 0 0 0.88476562 2.9003906 z M 16.912109 3 A 0.50005 0.50005 0 0 0 16.435547 3.3144531 C 15.746338 5.0374758 15.191994 6.8522039 14.710938 8.6660156 C 13.677091 7.4658067 12.983618 6.2822304 12.136719 4.7578125 A 0.50005 0.50005 0 0 0 11.207031 5.0820312 C 11.708512 8.0909178 12.308122 11.190527 12.806641 14.181641 A 0.50005 0.50005 0 0 0 13.800781 14.099609 C 13.800781 14.070473 13.789627 14.046528 13.789062 14.017578 L 13.792969 14.017578 C 13.789204 13.994991 13.785026 13.971816 13.78125 13.949219 C 13.763503 13.441862 13.680433 12.9549 13.589844 12.501953 A 0.5 0.5 0 0 0 13.490234 12.289062 A 0.5 0.5 0 0 0 13.488281 12.287109 C 13.221451 10.763415 12.957565 9.2458558 12.685547 7.7207031 C 13.19004 8.5106184 13.764398 9.2702581 14.546875 10.052734 A 0.50005 0.50005 0 0 0 15.386719 9.8164062 C 15.672124 8.6177056 16.131526 7.4509724 16.53125 6.2675781 C 16.666856 9.8044558 16.990686 13.361533 17.710938 16.802734 A 0.5 0.5 0 0 0 18.302734 17.189453 A 0.5 0.5 0 0 0 18.689453 16.597656 C 17.797697 12.337045 17.400391 7.869697 17.400391 3.5 A 0.50005 0.50005 0 0 0 16.912109 3 z M 32.771484 3.2011719 A 0.5 0.5 0 0 0 32.535156 3.2753906 C 31.733615 3.7763543 31.057917 4.3399084 30.339844 4.8027344 A 0.5 0.5 0 0 0 30.308594 4.8007812 A 0.5 0.5 0 0 0 29.804688 5.2324219 C 29.652385 6.3366167 29.594134 7.4540779 29.583984 8.5703125 C 28.933318 8.8541303 28.2646 9.1478882 27.808594 9.3378906 A 0.5 0.5 0 0 0 27.539062 9.9921875 A 0.5 0.5 0 0 0 28.191406 10.261719 C 28.553833 10.110708 29.08822 9.875646 29.574219 9.6640625 C 29.62336 11.168965 29.80205 12.662169 30.111328 14.105469 A 0.50005 0.50005 0 0 0 30.808594 14.453125 C 32.098259 13.857895 33.299041 13.358676 34.609375 12.753906 A 0.5 0.5 0 0 0 34.853516 12.089844 A 0.5 0.5 0 0 0 34.191406 11.845703 C 33.113205 12.343335 32.083399 12.7862 31.013672 13.267578 C 30.768468 11.948382 30.627132 10.591363 30.591797 9.2265625 C 31.425384 8.8647348 32.265313 8.5035756 32.878906 8.2675781 A 0.5 0.5 0 0 0 33.166016 7.6210938 A 0.5 0.5 0 0 0 32.707031 7.3007812 A 0.5 0.5 0 0 0 32.521484 7.3339844 C 31.991449 7.5378442 31.28742 7.8412988 30.601562 8.1367188 C 30.616268 7.3309828 30.664339 6.5267319 30.761719 5.7265625 A 0.5 0.5 0 0 0 30.765625 5.7246094 C 31.606913 5.1988042 32.305741 4.5972417 33.064453 4.1230469 A 0.5 0.5 0 0 0 33.224609 3.4355469 A 0.5 0.5 0 0 0 32.771484 3.2011719 z M 38.191406 3.71875 C 37.81186 3.6981815 37.431269 3.7727754 37.09375 3.9140625 C 36.418712 4.1966367 35.828349 4.8305923 35.902344 5.6445312 A 0.50005 0.50005 0 0 0 35.904297 5.6699219 C 36.304533 8.4715718 36.705469 11.173047 37.105469 13.873047 A 0.50005 0.50005 0 0 0 37.900391 14.199219 C 38.524391 13.731219 38.666913 12.915858 38.347656 12.277344 A 0.5 0.5 0 0 0 37.841797 12.003906 C 37.761176 11.458824 37.68022 10.899102 37.599609 10.351562 C 40.148578 12.136154 42.417456 14.277402 44.40625 16.808594 A 0.5 0.5 0 0 0 45.109375 16.892578 A 0.5 0.5 0 0 0 45.193359 16.191406 C 43.175143 13.622768 40.85606 11.434734 38.251953 9.5976562 C 38.312565 9.5470933 38.406356 9.4998944 38.453125 9.453125 A 0.50005 0.50005 0 0 0 38.480469 9.4257812 C 39.062604 8.7466237 39.836004 8.0212196 40.085938 7.0214844 C 40.319226 6.0883276 40.21673 4.8844296 39.326172 4.1210938 A 0.50005 0.50005 0 0 0 39.287109 4.0898438 C 38.950513 3.8542261 38.570952 3.7393185 38.191406 3.71875 z M 22.337891 3.9980469 C 21.760145 3.9980202 21.173931 4.1124588 20.615234 4.3359375 A 0.5 0.5 0 0 0 20.335938 4.9863281 A 0.5 0.5 0 0 0 20.986328 5.2636719 C 21.868935 4.9106293 22.835827 4.9192218 23.597656 5.2578125 C 24.343784 5.5894249 25 6.3416429 25 7.1992188 C 25 7.8880978 24.598373 8.4521488 24.0625 8.6875 C 23.975755 8.6939454 23.889581 8.691615 23.802734 8.7089844 A 0.5 0.5 0 0 0 23.582031 8.8144531 A 0.5 0.5 0 0 0 23.203125 9.3496094 A 0.5 0.5 0 0 0 23.75 9.796875 C 23.935733 9.7783017 24.111997 9.7308647 24.283203 9.671875 C 24.558601 9.6879312 24.860326 9.7916497 25.123047 9.9667969 C 25.480597 10.205164 25.743233 10.561867 25.810547 10.898438 C 25.971308 11.702241 25.655647 12.506147 24.984375 13.103516 C 24.296841 13.613432 23.309311 13.888744 22.449219 13.802734 A 0.5 0.5 0 0 0 21.902344 14.25 A 0.5 0.5 0 0 0 22.349609 14.796875 C 23.484251 14.910339 24.687609 14.584391 25.599609 13.900391 A 0.50005 0.50005 0 0 0 25.628906 13.876953 C 26.544346 13.075944 27.02873 11.889745 26.791016 10.701172 C 26.65833 10.037742 26.220184 9.496399 25.677734 9.1347656 C 25.574331 9.0658297 25.463255 9.0089431 25.351562 8.953125 C 25.755402 8.48738 26 7.8704308 26 7.1992188 C 26 5.8567945 25.057778 4.8121376 24.003906 4.34375 C 23.484821 4.1130454 22.915636 3.9980735 22.337891 3.9980469 z M 38.109375 4.7285156 C 38.321681 4.7400711 38.525866 4.8000408 38.689453 4.9082031 C 39.176706 5.3492657 39.279136 6.1236904 39.115234 6.7792969 C 38.966805 7.373014 38.347585 8.0419245 37.736328 8.7539062 C 37.664917 8.8233515 37.552507 8.9111627 37.478516 8.9453125 C 37.447011 8.9598531 37.445489 8.9637264 37.445312 8.9667969 A 0.50005 0.50005 0 0 0 37.394531 8.9414062 C 37.229327 7.8122027 37.063606 6.7106092 36.898438 5.5546875 C 36.872432 5.2686264 37.080507 5.0033633 37.480469 4.8359375 C 37.676641 4.7538188 37.897069 4.7169601 38.109375 4.7285156 z M 21.792969 5.1992188 A 0.5 0.5 0 0 0 21.722656 5.2070312 A 0.5 0.5 0 0 0 21.306641 5.7773438 C 21.607905 7.6853526 22.204522 11.177188 22.611328 13.007812 A 0.5 0.5 0 0 0 23.208984 13.388672 A 0.5 0.5 0 0 0 23.587891 12.791016 C 23.194696 11.021641 22.591704 7.5130849 22.292969 5.6210938 A 0.5 0.5 0 0 0 21.792969 5.1992188 z M 49.978516 14 A 0.5 0.5 0 0 0 49.5 14.521484 C 49.59242 16.647153 48.566957 18.795996 46.804688 20.095703 C 46.149735 20.562818 45.432841 20.900391 44.800781 20.900391 C 44.209115 20.900391 43.511054 20.483668 43.384766 19.978516 A 0.5 0.5 0 0 0 42.779297 19.615234 A 0.5 0.5 0 0 0 42.414062 20.220703 C 42.687774 21.31555 43.792448 21.900391 44.800781 21.900391 C 45.767448 21.900391 46.646639 21.437668 47.390625 20.90625 A 0.50005 0.50005 0 0 0 47.396484 20.902344 C 49.432828 19.40188 50.60754 16.951937 50.5 14.478516 A 0.5 0.5 0 0 0 49.978516 14 z M 2.6816406 15.800781 A 0.5 0.5 0 0 0 2.2011719 16.257812 C 2.1543219 16.820012 2.0709379 17.124791 1.9375 17.447266 C 1.8538373 17.64945 1.7007759 17.95593 1.5664062 18.228516 A 0.5 0.5 0 0 0 1.4003906 18.576172 C 1.406844 18.54164 1.4192416 18.493548 1.4023438 18.527344 C 1.3950221 18.541987 1.3861437 18.610982 1.3730469 18.636719 C 1.3615001 18.661779 1.3574889 18.667431 1.3457031 18.693359 L 1.3574219 18.695312 C 1.33207 18.756884 1.3007812 18.781162 1.3007812 18.900391 A 0.50005 0.50005 0 0 0 2.2558594 19.107422 C 2.4973566 18.576128 2.694766 18.23065 2.8613281 17.828125 C 3.0278902 17.4256 3.1460687 16.979597 3.1992188 16.341797 A 0.5 0.5 0 0 0 2.7421875 15.800781 A 0.5 0.5 0 0 0 2.6816406 15.800781 z "
)});
  main.variable(observer("txt")).define("txt", function(){return(
[
  "Sur cette carte, la surface\ndes pays est proportionnelle\nau nombre de\nbénéficiaires effectifs\nrévélés dans les\nPandora Papers.\nCela représente\n27 000\nentreprises\nau total.",
  "The area of the countries\nis proportional to the\nnumber of\nbeneficial owners\nrevealed in the\nPandora Papers.\nThis represents\n27,000\ncompanies\nin total."
]
)});
  main.variable(observer("legend")).define("legend", ["en","txt"], function(en,txt){return(
(en ? txt[1] : txt[0]).split("\n")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Colors**`
)});
  main.variable(observer("col")).define("col", function(){return(
"#C84842"
)});
  main.variable(observer("col1")).define("col1", function(){return(
"#b6e1f0"
)});
  main.variable(observer("col2")).define("col2", function(){return(
"#8fcce3"
)});
  main.variable(observer("offset")).define("offset", function(){return(
85
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Imports**`
)});
  main.variable(observer("largestPolygon")).define("largestPolygon", ["d3"], function(d3){return(
function (d) {
  var best = {};
  var bestArea = 0;
  d.geometry.coordinates.forEach(function (coords) {
    var poly = { type: "Polygon", coordinates: coords };
    var area = d3.geoArea(poly);
    if (area > bestArea) {
      bestArea = area;
      best = poly;
    }
  });
  return best;
}
)});
  main.variable(observer("callout")).define("callout", function(){return(
(g, value) => {
  if (!value) return g.style("display", "none");

  g.style("display", null)
    .style("pointer-events", "none")
    .style("font", "13px sans-serif");

  const path = g
    .selectAll("path")
    .data([null])
    .join("path")
    .attr("fill", "white")
    .attr("stroke", "black");

  const text = g
    .selectAll("text")
    .data([null])
    .join("text")
    .call((text) =>
      text
        .selectAll("tspan")
        .data((value + "").split(/\n/))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        .style("font-weight", (_, i) => (i ? null : "bold"))
        .text((d) => d)
    );

  const { x, y, width: w, height: h } = text.node().getBBox();

  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr(
    "d",
    `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
  );
}
)});
  main.variable(observer("turf")).define("turf", ["require"], function(require){return(
require("@turf/turf@6")
)});
  const child1 = runtime.module(define1);
  main.import("zoom", child1);
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@7", "d3-geo-projection@2")
)});
  return main;
}
