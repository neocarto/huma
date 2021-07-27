// https://observablehq.com/@neocartocnrs/vote-interne-pcf-7-8-et-9-mai-2020@1193
import define1 from "./a2e58f97fd5e8d7c@620.js";
import define2 from "./a4f599acbbef9a1e@218.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Vote interne PCF, 7, 8 et 9 mai 2021.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Les données sont accessibles [ici](https://github.com/neocarto/resources/blob/master/datasets/pcf/votepcf789mai2021.csv).`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# 1 - Nombre de votants`
)});
  main.variable(observer("map1")).define("map1", ["d3","width","height","template","departements","path","regions","data","callout","numStr","legendCircle","tot_votants","tot_inscrits"], function(d3,width,height,template,departements,path,regions,data,callout,numStr,legendCircle,tot_votants,tot_inscrits)
{
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("width", "100%")
    .style("height", "auto")
    .style("background-color", "white");

  svg.call(template);

  svg
    .append("g")
    .append("path")
    .datum(departements)
    .attr("d", path)
    .style("fill", "#d9d2c3")
    .style("stroke", "white")
    .attr("stroke-width", 0.5)
    .attr("stroke-opacity", 0.6)
    .attr("fill-opacity", 1);

  svg
    .append("g")
    .append("path")
    .datum(regions)
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill-opacity", 1);

  let radius = d3.scaleSqrt([0, d3.max(data, (d) => +d["votants"])], [0, 70]);

  svg
    .append("g")
    .attr("fill-opacity", 0.9)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1)
    .selectAll("circle")
    .data(data.sort((a, b) => d3.descending(a["votants"], b["votants"])))
    .join("circle")
    .attr("class", "bubbles")
    .attr("id", (d) => d.id)
    .attr("fill", "#85B750")
    .attr("cx", (d) => d.coords[0])
    .attr("cy", (d) => d.coords[1])
    .attr("r", (d) => radius(+d["votants"]));

  const tooltip = svg.append("g");

  svg
    .selectAll(".bubbles")
    .on("touchmove mousemove", function (event, d) {
      tooltip.call(
        callout,
        `${d.name}
${numStr(d.votants) + " votant.e.s"}
`
      );
      tooltip.attr("transform", `translate(${d3.pointer(event, this)})`);
      d3.select(this).attr("stroke", "black");
    })
    .on("touchend mouseleave", function () {
      tooltip.call(callout, null);
      d3.select(this).attr("stroke", "white");
    });

  let legcircles = legendCircle()
    .tickValues([
      d3.min(data, (d) => d["votants"]),
      500,
      d3.max(data, (d) => d["votants"])
    ])
    .scale(radius);

  svg.append("g").attr("transform", `translate(35, 100)`).call(legcircles);

  svg
    .append("text")
    .attr("x", 20)
    .attr("y", 45)
    .attr("text-anchor", "start")
    .style("font-family", "Roboto")
    .attr("font-size", "30pt")
    .attr("fill", "#474747")
    .text("Nombre de votant.e.s");

  svg
    .append("text")
    .attr("x", width - 20)
    .attr("y", 45)
    .attr("text-anchor", "end")
    .style("font-family", "Roboto")
    .attr("font-size", "30pt")
    .attr("fill", "#474747")
    .text(
      numStr(tot_votants) +
        " | " +
        Math.round((tot_votants / tot_inscrits) * 1000) / 10 +
        "%"
    );

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`# 2 - Vote sur l'option`
)});
  main.variable(observer("map2")).define("map2", ["d3","width","height","template","departements","path","regions","data","callout","numStr","legendCircle","nb_option1","nb_option2"], function(d3,width,height,template,departements,path,regions,data,callout,numStr,legendCircle,nb_option1,nb_option2)
{
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("width", "100%")
    .style("height", "auto")
    .style("background-color", "white");

  svg.call(template);

  svg
    .append("g")
    .append("path")
    .datum(departements)
    .attr("d", path)
    .style("fill", "#d9d2c3")
    .style("stroke", "white")
    .attr("stroke-width", 0.5)
    .attr("stroke-opacity", 0.6)
    .attr("fill-opacity", 1);

  svg
    .append("g")
    .append("path")
    .datum(regions)
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill-opacity", 1);

  let radius = d3.scaleSqrt([0, d3.max(data, (d) => +d["votants"])], [0, 70]);

  svg
    .append("g")
    .attr("fill-opacity", 0.9)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1)
    .selectAll("circle")
    .data(data.sort((a, b) => d3.descending(a["votants"], b["votants"])))
    .join("circle")
    .attr("class", "bubbles")
    .attr("id", (d) => d.id)
    .attr("fill", (d) => (d.v1_win == "option1" ? "#C84542" : "#0594A4"))
    .attr("cx", (d) => d.coords[0])
    .attr("cy", (d) => d.coords[1])
    .attr("r", (d) => radius(+d["votants"]));

  const tooltip = svg.append("g");

  svg
    .selectAll(".bubbles")
    .on("touchmove mousemove", function (event, d) {
      tooltip.call(
        callout,
        `${d.name}
${
  "Option 1 : " +
  numStr(d.v1_option1) +
  " voix (" +
  Math.round(d.v1_option1_pct) +
  "%)\nOption 2 : " +
  numStr(d.v1_option2) +
  " voix (" +
  Math.round(d.v1_option2_pct) +
  "%)"
}
`
      );
      tooltip.attr("transform", `translate(${d3.pointer(event, this)})`);
      d3.select(this).attr("stroke", "black");
    })
    .on("touchend mouseleave", function () {
      tooltip.call(callout, null);
      d3.select(this).attr("stroke", "white");
    });

  let legcircles = legendCircle()
    .tickValues([
      d3.min(data, (d) => d["votants"]),
      500,
      d3.max(data, (d) => d["votants"])
    ])
    .scale(radius);

  svg.append("g").attr("transform", `translate(35, 100)`).call(legcircles);

  svg
    .append("text")
    .attr("x", 20)
    .attr("y", 45)
    .attr("text-anchor", "start")
    .style("font-family", "Roboto")
    .attr("font-size", "30pt")
    .attr("fill", "#474747")
    .text("Option arrivée en tête");

  svg
    .append("text")
    .attr("x", 32)
    .attr("y", 270)
    .attr("text-anchor", "start")
    .style("font-family", "Roboto")
    .attr("font-size", "13pt")
    .attr("fill", "#474747")
    .text("Nombre de votant.e.s");

  svg
    .append("circle")
    .attr("cx", width - 60)
    .attr("cy", 120)
    .attr("r", 15)
    .attr("fill", "#C84542")
    .attr("stroke", "wite");

  svg
    .append("text")
    .attr("x", width - 85)
    .attr("y", 117)
    .attr("text-anchor", "end")
    .style("font-family", "Roboto")
    .attr("font-size", "16pt")
    .attr("fill", "#474747")
    .text("Option 1 (candidature autonome)");

  svg
    .append("text")
    .attr("x", width - 85)
    .attr("y", 140)
    .attr("text-anchor", "end")
    .style("font-family", "Roboto")
    .attr("font-size", "13pt")
    .attr("fill", "#474747")
    .text("dans " + nb_option1 + " départements");

  svg
    .append("circle")
    .attr("cx", width - 60)
    .attr("cy", 180)
    .attr("r", 15)
    .attr("fill", "#0594A4")
    .attr("stroke", "wite");

  svg
    .append("text")
    .attr("x", width - 85)
    .attr("y", 177)
    .attr("text-anchor", "end")
    .style("font-family", "Roboto")
    .attr("font-size", "16pt")
    .attr("fill", "#474747")
    .text("Option 2 (alternative)");

  svg
    .append("text")
    .attr("x", width - 85)
    .attr("y", 200)
    .attr("text-anchor", "end")
    .style("font-family", "Roboto")
    .attr("font-size", "13pt")
    .attr("fill", "#474747")
    .text("dans " + nb_option2 + " départements");

  return svg.node();
}
);
  main.variable(observer("viewof vote1")).define("viewof vote1", ["Radio"], function(Radio){return(
Radio(
  ["Option 1 (candidature communiste)", "Option 2 (alternative)", "Abstention"],
  {
    value: "Option 1 (candidature communiste)"
  }
)
)});
  main.variable(observer("vote1")).define("vote1", ["Generators", "viewof vote1"], (G, _) => G.input(_));
  main.variable(observer("viewof slider1")).define("viewof slider1", ["Range"], function(Range){return(
Range([5, 90], {
  value: 50,
  step: 1,
  label: "Choix supérier à (%)"
})
)});
  main.variable(observer("slider1")).define("slider1", ["Generators", "viewof slider1"], (G, _) => G.input(_));
  main.variable(observer("map3")).define("map3", ["d3","width","height","template","departements","path","regions","data","vote1","slider1","callout","numStr","legendCircle","tot_v1_exprmimés"], function(d3,width,height,template,departements,path,regions,data,vote1,slider1,callout,numStr,legendCircle,tot_v1_exprmimés)
{
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("width", "100%")
    .style("height", "auto")
    .style("background-color", "white");

  svg.call(template);

  svg
    .append("g")
    .append("path")
    .datum(departements)
    .attr("d", path)
    .style("fill", "#d9d2c3")
    .style("stroke", "white")
    .attr("stroke-width", 0.5)
    .attr("stroke-opacity", 0.6)
    .attr("fill-opacity", 1);

  svg
    .append("g")
    .append("path")
    .datum(regions)
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill-opacity", 1);

  let radius = d3.scaleSqrt([0, d3.max(data, (d) => +d["votants"])], [0, 70]);
  let stock;
  let ratio;
  let col;
  if (vote1 == "Option 1 (candidature communiste)") {
    stock = "v1_option1";
    ratio = "v1_option1_pct";
    col = "#C84542";
  }

  if (vote1 == "Option 2 (alternative)") {
    stock = "v1_option2";
    ratio = "v1_option2_pct";
    col = "#0594A4";
  }

  let nb = data.map((d) => d[ratio]).filter((d) => d >= slider1).length;

  svg
    .append("text")
    .attr("x", 20)
    .attr("y", 45)
    .attr("text-anchor", "start")
    .style("font-family", "Roboto")
    .attr("font-size", "30pt")
    .attr("fill", "#474747")
    .text(vote1);

  if (vote1 != "Abstention") {
    svg
      .append("g")
      .attr("fill-opacity", 0.9)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .selectAll("circle")
      .data(data.sort((a, b) => d3.descending(a[stock], b[stock])))
      .join("circle")
      .attr("class", "bubbles")
      .attr("id", (d) => d.id)
      .attr("fill", col)
      .attr("fill-opacity", (d) => (+d[ratio] >= slider1 ? 1 : 0.2))
      .attr("cx", (d) => d.coords[0])
      .attr("cy", (d) => d.coords[1])
      .attr("r", (d) => radius(+d[stock]));

    const tooltip = svg.append("g");

    svg
      .selectAll(".bubbles")
      .on("touchmove mousemove", function (event, d) {
        tooltip.call(
          callout,
          `${d.name}
${
  numStr(d[stock]) +
  " voix | " +
  Math.round((100 * d[stock]) / d.v1_exprimés) +
  "%"
}
`
        );
        tooltip.attr("transform", `translate(${d3.pointer(event, this)})`);
        d3.select(this).attr("stroke", "black");
      })
      .on("touchend mouseleave", function () {
        tooltip.call(callout, null);
        d3.select(this).attr("stroke", "white");
      });

    let legcircles = legendCircle()
      .tickValues([
        d3.min(data, (d) => d[stock]),
        500,
        d3.max(data, (d) => d[stock])
      ])
      .scale(radius);

    svg.append("g").attr("transform", `translate(35, 100)`).call(legcircles);

    let tot = d3.sum(data.map((d) => d[stock]));

    svg
      .append("text")
      .attr("x", width - 20)
      .attr("y", 45)
      .attr("text-anchor", "end")
      .style("font-family", "Roboto")
      .attr("font-size", "30pt")
      .attr("fill", "#474747")
      .text(
        numStr(tot) +
          " voix | " +
          Math.round((tot / tot_v1_exprmimés) * 1000) / 10 +
          "%"
      );

    svg
      .append("circle")
      .attr("cx", width - 60)
      .attr("cy", 120)
      .attr("r", 15)
      .attr("fill", col)
      .attr("stroke", "wite");

    svg
      .append("text")
      .attr("x", width - 85)
      .attr("y", 117)
      .attr("text-anchor", "end")
      .style("font-family", "Roboto")
      .attr("font-size", "16pt")
      .attr("fill", "#474747")
      .text("Choix supérieur à " + slider1 + "%");

    svg
      .append("text")
      .attr("x", width - 85)
      .attr("y", 140)
      .attr("text-anchor", "end")
      .style("font-family", "Roboto")
      .attr("font-size", "13pt")
      .attr("fill", "#474747")
      .text("dans " + nb + " départements");
  }

  // Abstention

  if (vote1 == "Abstention") {
    stock = "v1_abstention";
    col = "#a3a29e";

    svg
      .append("g")
      .attr("fill-opacity", 0.9)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .selectAll("circle")
      .data(data.sort((a, b) => d3.descending(a[stock], b[stock])))
      .join("circle")
      .attr("class", "bubbles")
      .attr("id", (d) => d.id)
      .attr("fill", col)
      .attr("cx", (d) => d.coords[0])
      .attr("cy", (d) => d.coords[1])
      .attr("r", (d) => radius(+d[stock]));

    const tooltip = svg.append("g");

    svg
      .selectAll(".bubbles")
      .on("touchmove mousemove", function (event, d) {
        tooltip.call(
          callout,
          `${d.name}
${numStr(d[stock]) + " adhérants"}`
        );
        tooltip.attr("transform", `translate(${d3.pointer(event, this)})`);
        d3.select(this).attr("stroke", "black");
      })
      .on("touchend mouseleave", function () {
        tooltip.call(callout, null);
        d3.select(this).attr("stroke", "white");
      });

    let legcircles = legendCircle()
      .tickValues([
        d3.min(data, (d) => d[stock]),
        500,
        d3.max(data, (d) => d[stock])
      ])
      .scale(radius);

    svg.append("g").attr("transform", `translate(35, 100)`).call(legcircles);

    let tot = d3.sum(data.map((d) => d[stock]));

    svg
      .append("text")
      .attr("x", width - 20)
      .attr("y", 45)
      .attr("text-anchor", "end")
      .style("font-family", "Roboto")
      .attr("font-size", "30pt")
      .attr("fill", "#474747")
      .text(numStr(tot) + " personnes");
  }

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`# 3 - Vote sur le candidat`
)});
  main.variable(observer("viewof vote2")).define("viewof vote2", ["Radio"], function(Radio){return(
Radio(
  ["Fabien Roussel", "Emmanuel Dang Tran", "Grégoire Munck", "Abstention"],
  {
    value: "Fabien Roussel"
  }
)
)});
  main.variable(observer("vote2")).define("vote2", ["Generators", "viewof vote2"], (G, _) => G.input(_));
  main.variable(observer("viewof slider2")).define("viewof slider2", ["Range"], function(Range){return(
Range([1, 90], {
  value: 50,
  step: 1,
  label: "Choix supérier à (%)"
})
)});
  main.variable(observer("slider2")).define("slider2", ["Generators", "viewof slider2"], (G, _) => G.input(_));
  main.variable(observer("map4")).define("map4", ["d3","width","height","template","departements","path","regions","data","vote2","slider2","callout","numStr","legendCircle","tot_v2_exprmimés"], function(d3,width,height,template,departements,path,regions,data,vote2,slider2,callout,numStr,legendCircle,tot_v2_exprmimés)
{
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("width", "100%")
    .style("height", "auto")
    .style("background-color", "white");

  svg.call(template);

  svg
    .append("g")
    .append("path")
    .datum(departements)
    .attr("d", path)
    .style("fill", "#d9d2c3")
    .style("stroke", "white")
    .attr("stroke-width", 0.5)
    .attr("stroke-opacity", 0.6)
    .attr("fill-opacity", 1);

  svg
    .append("g")
    .append("path")
    .datum(regions)
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill-opacity", 1);

  let radius = d3.scaleSqrt([0, d3.max(data, (d) => +d["votants"])], [0, 70]);
  let stock;
  let ratio;
  let col;

  if (vote2 == "Fabien Roussel") {
    stock = "v2_Roussel";
    ratio = "v2_Roussel_pct";
    col = "#FF7043";
  }

  if (vote2 == "Emmanuel Dang Tran") {
    stock = "v2_DangTran";
    ratio = "v2_DangTran_pct";
    col = "#FEAE01";
  }

  if (vote2 == "Grégoire Munck") {
    stock = "v2_Munck";
    ratio = "v2_Munck_pct";
    col = "#9EC649";
  }

  let nb = data.map((d) => d[ratio]).filter((d) => d >= slider2).length;

  svg
    .append("text")
    .attr("x", 20)
    .attr("y", 45)
    .attr("text-anchor", "start")
    .style("font-family", "Roboto")
    .attr("font-size", "30pt")
    .attr("fill", "#474747")
    .text(vote2);

  if (vote2 != "Abstention") {
    svg
      .append("g")
      .attr("fill-opacity", 0.9)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .selectAll("circle")
      .data(data.sort((a, b) => d3.descending(a[stock], b[stock])))
      .join("circle")
      .attr("class", "bubbles")
      .attr("id", (d) => d.id)
      .attr("fill", col)
      .attr("fill-opacity", (d) => (d[ratio] >= slider2 ? 1 : 0.2))
      .attr("cx", (d) => d.coords[0])
      .attr("cy", (d) => d.coords[1])
      .attr("r", (d) => radius(+d[stock]));

    const tooltip = svg.append("g");

    svg
      .selectAll(".bubbles")
      .on("touchmove mousemove", function (event, d) {
        tooltip.call(
          callout,
          `${d.name}
${
  numStr(d[stock]) +
  " voix | " +
  Math.round((100 * d[stock]) / d.v2_exprimés) +
  "%"
}
`
        );
        tooltip.attr("transform", `translate(${d3.pointer(event, this)})`);
        d3.select(this).attr("stroke", "black");
      })
      .on("touchend mouseleave", function () {
        tooltip.call(callout, null);
        d3.select(this).attr("stroke", "white");
      });

    let legcircles = legendCircle()
      .tickValues([
        d3.min(data, (d) => d[stock]),
        500,
        d3.max(data, (d) => d[stock])
      ])
      .scale(radius);

    svg.append("g").attr("transform", `translate(35, 100)`).call(legcircles);

    let tot = d3.sum(data.map((d) => d[stock]));

    svg
      .append("text")
      .attr("x", width - 20)
      .attr("y", 45)
      .attr("text-anchor", "end")
      .style("font-family", "Roboto")
      .attr("font-size", "30pt")
      .attr("fill", "#474747")
      .text(
        numStr(tot) +
          " voix | " +
          Math.round((tot / tot_v2_exprmimés) * 1000) / 10 +
          "%"
      );

    svg
      .append("circle")
      .attr("cx", width - 60)
      .attr("cy", 120)
      .attr("r", 15)
      .attr("fill", col)
      .attr("stroke", "wite");

    svg
      .append("text")
      .attr("x", width - 85)
      .attr("y", 117)
      .attr("text-anchor", "end")
      .style("font-family", "Roboto")
      .attr("font-size", "16pt")
      .attr("fill", "#474747")
      .text("Choix supérieur à " + slider2 + "%");

    svg
      .append("text")
      .attr("x", width - 85)
      .attr("y", 140)
      .attr("text-anchor", "end")
      .style("font-family", "Roboto")
      .attr("font-size", "13pt")
      .attr("fill", "#474747")
      .text("dans " + nb + " départements");
  }

  // Abstention

  if (vote2 == "Abstention") {
    stock = "v2_abstention";
    col = "#a3a29e";

    svg
      .append("g")
      .attr("fill-opacity", 0.9)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .selectAll("circle")
      .data(data.sort((a, b) => d3.descending(a[stock], b[stock])))
      .join("circle")
      .attr("class", "bubbles")
      .attr("id", (d) => d.id)
      .attr("fill", col)
      .attr("cx", (d) => d.coords[0])
      .attr("cy", (d) => d.coords[1])
      .attr("r", (d) => radius(+d[stock]));

    const tooltip = svg.append("g");

    svg
      .selectAll(".bubbles")
      .on("touchmove mousemove", function (event, d) {
        tooltip.call(
          callout,
          `${d.name}
${numStr(d[stock]) + " adhérants"}`
        );
        tooltip.attr("transform", `translate(${d3.pointer(event, this)})`);
        d3.select(this).attr("stroke", "black");
      })
      .on("touchend mouseleave", function () {
        tooltip.call(callout, null);
        d3.select(this).attr("stroke", "white");
      });

    let legcircles = legendCircle()
      .tickValues([
        d3.min(data, (d) => d[stock]),
        500,
        d3.max(data, (d) => d[stock])
      ])
      .scale(radius);

    svg.append("g").attr("transform", `translate(35, 100)`).call(legcircles);

    let tot = d3.sum(data.map((d) => d[stock]));

    svg
      .append("text")
      .attr("x", width - 20)
      .attr("y", 45)
      .attr("text-anchor", "end")
      .style("font-family", "Roboto")
      .attr("font-size", "30pt")
      .attr("fill", "#474747")
      .text(numStr(tot) + " personnes");
  }
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`# Appendix`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**1. Data Import & handling**`
)});
  main.variable(observer("departements")).define("departements", ["d3","topojson"], function(d3,topojson){return(
d3
  .json("https://raw.githubusercontent.com/neocarto/resources/master/geometries/France/departements_nodom.topojson")
  .then((r) => topojson.feature(r, r.objects.DEPT))
)});
  main.variable(observer("regions")).define("regions", ["d3","topojson"], function(d3,topojson){return(
d3
  .json(
    "https://raw.githubusercontent.com/neocarto/resources/master/geometries/France/regions.topojson"
  )
  .then((r) => topojson.feature(r, r.objects.regions))
)});
  main.variable(observer("land")).define("land", ["d3","topojson"], function(d3,topojson){return(
d3
  .json(
    "https://raw.githubusercontent.com/neocarto/resources/master/geometries/France/world_nodom.topojson"
  )
  .then((r) => topojson.feature(r, r.objects.world))
)});
  main.variable(observer("vote")).define("vote", ["d3"], function(d3){return(
d3.csv(
  "https://raw.githubusercontent.com/neocarto/resources/master/datasets/pcf/votepcf789mai2021.csv"
)
)});
  main.variable(observer("data")).define("data", ["vote","getcentroids"], function(vote,getcentroids){return(
vote.map((d) => ({
  id: d.id,
  name: d.name,
  coords: getcentroids.get(d.id),
  votants: +d.votants,
  inscrits: +d.inscrits,
  v1_exprimés: +d.v1_exprimés,
  v1_abstention: +d.v1_abstention,
  v1_option1: +d.v1_option1,
  v1_option1_pct: (+d.v1_option1 / +d.v1_exprimés) * 100,
  v1_option2: +d.v1_option2,
  v1_option2_pct: (+d.v1_option2 / +d.v1_exprimés) * 100,
  v1_win: +d.v1_option1 > +d.v1_option2 ? "option1" : "option2",
  v2_Roussel: +d.v2_Roussel,
  v2_Roussel_pct: (+d.v2_Roussel / +d.v2_exprimés) * 100,
  v2_DangTran: +d.v2_DangTran,
  v2_DangTran_pct: (+d.v2_DangTran / +d.v2_exprimés) * 100,
  v2_Munck: +d.v2_Munck,
  v2_Munck_pct: (+d.v2_Munck / +d.v2_exprimés) * 100,
  v2_exprimés: +d.v2_exprimés,
  v2_abstention: +d.v2_abstention
}))
)});
  main.variable(observer("tot_votants")).define("tot_votants", ["d3","data"], function(d3,data){return(
d3.sum(data.map((d) => d["votants"]))
)});
  main.variable(observer("tot_inscrits")).define("tot_inscrits", ["d3","data"], function(d3,data){return(
d3.sum(data.map((d) => d["inscrits"]))
)});
  main.variable(observer("tot_v1_exprmimés")).define("tot_v1_exprmimés", ["d3","data"], function(d3,data){return(
d3.sum(data.map((d) => d["v1_exprimés"]))
)});
  main.variable(observer("tot_v2_exprmimés")).define("tot_v2_exprmimés", ["d3","data"], function(d3,data){return(
d3.sum(data.map((d) => d["v2_exprimés"]))
)});
  main.variable(observer("nb_option1")).define("nb_option1", ["data"], function(data){return(
data.map((d) => d.v1_win).filter((d) => d == "option1").length
)});
  main.variable(observer("nb_option2")).define("nb_option2", ["data"], function(data){return(
data.map((d) => d.v1_win).filter((d) => d == "option2").length
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**2. Map Template**`
)});
  main.variable(observer("lambert93")).define("lambert93", function(){return(
"+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
)});
  main.variable(observer("height")).define("height", function(){return(
1090
)});
  main.variable(observer("width")).define("width", function(){return(
1100
)});
  main.variable(observer("projection")).define("projection", ["proj4d3","lambert93","width","height","departements"], function(proj4d3,lambert93,width,height,departements){return(
proj4d3(lambert93).fitExtent(
  [
    [30, 75],
    [width - 30, height - 30]
  ],
  departements
)
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
)});
  main.variable(observer("scaleBar")).define("scaleBar", ["d3","projection"], function(d3,projection){return(
d3
  .geoScaleBar()
  .projection(projection)
  .size([0, 0])
  .left(0.9)
  .top(0.99)
  .units(d3.geoScaleKilometers)
  .distance(100)
  .label("100 km")
  .labelAnchor("middle")
  .tickSize(null)
  .tickValues(null)
)});
  main.variable(observer("template")).define("template", ["width","height","land","path","departements","licence","author","note","scaleBar"], function(width,height,land,path,departements,licence,author,note,scaleBar){return(
(selection) => {
  var defs = selection.append("defs");

  const pattern = defs
    .append("pattern")
    .attr("id", "hatch")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", 6)
    .attr("height", 6);

  pattern
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 6)
    .attr("y1", 6)
    .attr("stroke", "#f4f4f4")
    .attr("stroke-width", 4)
    .attr("stroke-opacity", 0.9);

  const filter = defs
    .append("filter")
    .attr("id", "border-blur")
    .append("feGaussianBlur")
    .attr("in", "SourceGraphic")
    .attr("stdDeviation", 200)
    .attr("result", "shadow");

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
    .attr("dx", 5)
    .attr("dy", 5);

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

  selection
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .style("fill", "#9ACBE3")
    .attr("filter", "url(#border-blur)");

  selection
    .append("rect")
    .attr("fill-opacity", 0.4)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "url('#hatch')");

  selection
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", 65)
    .attr("fill", "white")
    .attr("fill-opacity", 0.5);

  selection
    .append("rect")
    .attr("x", 0)
    .attr("y", height - 50)
    .attr("width", width)
    .attr("height", 50)
    .attr("fill", "white")
    .attr("fill-opacity", 0.5);

  selection
    .append("g")
    .append("path")
    .datum(land)
    .attr("d", path)
    .style("fill", "white")
    .attr("fill-opacity", 0.4);

  selection
    .append("g")
    .append("path")
    .datum(departements)
    .attr("d", path)
    .style("fill", "black")
    .attr("fill-opacity", 0.2)
    .attr("filter", "url(#shadow)");

  selection
    .append("text")
    .attr("x", 15)
    .attr("y", height - 65)
    .attr("text-anchor", "start")
    .style("font-family", "Roboto")
    .attr("font-size", (d) => "10pt")
    .attr("fill", "#474747")
    .text(licence + " " + author);

  selection
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - 15)
    .attr("text-anchor", "middle")
    .style("font-family", "Roboto")
    .attr("font-size", (d) => "20pt")
    .attr("opacity", 0.5)
    .attr("fill", "#474747")
    .text(note);

  selection
    .append("g")
    .attr("transform", `translate(20, 1005)`)
    .append("g")
    .call(scaleBar);
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**3. Texts**`
)});
  main.variable(observer("licence")).define("licence", function(){return(
"CC BY 4.0"
)});
  main.variable(observer("title")).define("title", function(){return(
"Map of France"
)});
  main.variable(observer("author")).define("author", function(){return(
"Nicolas Lambert, 2021"
)});
  main.variable(observer("note")).define("note", function(){return(
"Vote des communistes des 7, 8 et 9 mai 2021."
)});
  main.variable(observer("style")).define("style", ["html"], function(html){return(
html`<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
</style>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Libraries & helpers**`
)});
  main.variable(observer("numStr")).define("numStr", function(){return(
(a, b) => {
  a = "" + a;
  b = b || " ";
  var c = "",
    d = 0;
  while (a.match(/^0[0-9]/)) {
    a = a.substr(1);
  }
  for (var i = a.length - 1; i >= 0; i--) {
    c = d != 0 && d % 3 == 0 ? a[i] + b + c : a[i] + c;
    d++;
  }
  return c;
}
)});
  const child1 = runtime.module(define1);
  main.import("Range", child1);
  main.import("Radio", child1);
  const child2 = runtime.module(define2);
  main.import("legendCircle", child2);
  main.variable(observer("getcentroids")).define("getcentroids", ["departements","path"], function(departements,path){return(
new Map(
  departements.features
    .map((d) => {
      return d;
    })
    .map((d) => [d.properties.DEP, path.centroid(d)])
)
)});
  main.variable(observer("coords2obj")).define("coords2obj", function(){return(
function coords2obj(bbox) {
  let [[x0, y0], [x1, y1]] = bbox;
  let obj = {
    type: "LineString",
    coordinates: [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]
  };
  return obj;
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
  main.variable(observer("proj4")).define("proj4", ["require"], function(require){return(
require("proj4")
)});
  main.variable(observer("proj4d3")).define("proj4d3", ["proj4","d3"], function(proj4,d3){return(
function proj4d3(proj4string) {
  const degrees = 180 / Math.PI,
    radians = 1 / degrees,
    raw = proj4(proj4string),
    p = function (lambda, phi) {
      return raw.forward([lambda * degrees, phi * degrees]);
    };
  p.invert = function (x, y) {
    return raw.inverse([x, y]).map(function (d) {
      return d * radians;
    });
  };
  const projection = d3.geoProjection(p).scale(1);
  projection.raw = raw;
  return projection;
}
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6", "d3-geo-scale-bar@1.0.2")
)});
  return main;
}
