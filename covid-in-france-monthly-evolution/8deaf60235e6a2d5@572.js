// https://observablehq.com/@neocartocnrs/covid-in-france-monthly-evolution@572
import define1 from "./6e9136605e7676b5@248.js";
import define2 from "./e93997d5089d7165@2303.js";
import define3 from "./450051d7f1174df8@252.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Covid in France (monthly evolution)`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`NB: the code below is not used to build the maps but only to display them as png images. Maps are hosted on my [gihub account](https://github.com/neocarto/covidbymonths). Maps are generated with [R language](https://www.r-project.org/). See an example of code [here](https://github.com/neocarto/covidbymonths/blob/main/src/src_bymonth_dc.R).`
)});
  main.variable(observer("viewof c")).define("viewof c", ["select"], function(select)
{
  const c = select({
    options: [
      { label: "Décès", value: "dc" },
      { label: "Hospitalisations", value: "hosp" },
      { label: "Radiations", value: "rad" },
      { label: "Réanimations", value: "rea" }
    ],
    value: "Décès"
  });
  return c;
}
);
  main.variable(observer("c")).define("c", ["Generators", "viewof c"], (G, _) => G.input(_));
  main.variable(observer("viewof a")).define("viewof a", ["select"], function(select)
{
  const a = select({
    options: [
      { label: "En nombre de personnes", value: "absolute" },
      { label: "En pourcentage de la population", value: "relative" }
    ],
    value: "absolute"
  });
  return a;
}
);
  main.variable(observer("a")).define("a", ["Generators", "viewof a"], (G, _) => G.input(_));
  main.variable(observer("viewof b")).define("viewof b", ["Scrubber","d3","dates","labels"], function(Scrubber,d3,dates,labels){return(
Scrubber(d3.reverse(dates.map(d => d.value)), {
  delay: 2000,
  loopDelay: 2500,
  format: date => labels.get(date)
})
)});
  main.variable(observer("b")).define("b", ["Generators", "viewof b"], (G, _) => G.input(_));
  main.variable(observer("url")).define("url", ["maps","a","c","b"], function(maps,a,c,b){return(
maps.get(
  "https://raw.githubusercontent.com/neocarto/covidbymonths/main/maps/" +
    a +
    "/" +
    c +
    "/" +
    c +
    "_" +
    b
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Appendix`
)});
  main.variable(observer("images")).define("images", ["d3"], function(d3){return(
d3.csv(
  "https://raw.githubusercontent.com/neocarto/covidbymonths/main/maps/url.csv"
)
)});
  main.variable(observer("urls")).define("urls", ["images","c","a"], function(images,c,a)
{
  let urls = images
    .filter(d => d.var == c)
    .filter(d => d.type == a)
    .map(d => d.url);
  return urls;
}
);
  main.variable(observer("maps")).define("maps", ["preload","urls"], async function(preload,urls){return(
await preload(urls)
)});
  main.variable(observer("databyid")).define("databyid", ["d3","dates"], function(d3,dates){return(
d3.map(dates, d => d.value, d => d.label)
)});
  main.variable(observer("dates")).define("dates", ["d3"], function(d3){return(
d3.csv(
  "https://raw.githubusercontent.com/neocarto/covidbymonths/main/maps/dates.csv"
)
)});
  main.variable(observer("labels")).define("labels", ["dates"], function(dates){return(
new Map(dates.map(d => [d.value, d.label]))
)});
  const child1 = runtime.module(define1);
  main.import("preload", child1);
  const child2 = runtime.module(define2);
  main.import("select", child2);
  main.import("radio", child2);
  const child3 = runtime.module(define3);
  main.import("Scrubber", child3);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
