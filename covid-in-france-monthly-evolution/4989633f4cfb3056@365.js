// https://observablehq.com/@fil/selectflat@365
import define1 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# selectFlat input

A fast selector to explore a discrete parameter space. The value changes on mouseover, and sticks when you click.`
)});
  main.variable(observer()).define(["value"], function(value){return(
value
)});
  main.variable(observer("viewof value")).define("viewof value", ["selectFlat"], function(selectFlat){return(
selectFlat({
  options: ["A", "B", "C", "D"],
  value: "B",
  output: false,
  description: "your choice"
})
)});
  main.variable(observer("value")).define("value", ["Generators", "viewof value"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`Usage:
~~~{js}
import {selectFlat} from "@fil/selectflat"
viewof value = selectFlat({options})
~~~

The options are the same as those of a normal *select* input, with the addition of (bool)&nbsp;*output* to show or hide the value next to the description.

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Can be useful when you want to quickly explore a discrete parameter space.`
)});
  main.variable(observer("viewof a")).define("viewof a", ["selectFlat"], function(selectFlat){return(
selectFlat({
  options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  value: 7,
  output: true,
  description: "a"
})
)});
  main.variable(observer("a")).define("a", ["Generators", "viewof a"], (G, _) => G.input(_));
  main.variable(observer("viewof b")).define("viewof b", ["selectFlat"], function(selectFlat){return(
selectFlat({
  options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  value: 8,
  output: true,
  description: "b"
})
)});
  main.variable(observer("b")).define("b", ["Generators", "viewof b"], (G, _) => G.input(_));
  main.variable(observer("viewof c")).define("viewof c", ["selectFlat"], function(selectFlat){return(
selectFlat({
  options: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    { value: 8, disabled: true },
    { value: 9, disabled: true }
  ],
  value: 1,
  output: true,
  description: "c"
})
)});
  main.variable(observer("c")).define("c", ["Generators", "viewof c"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","a","b","c"], function(html,a,b,c){return(
html`${[a, b, c].filter(d => d > 1).join(' &times; ') || "1"} = ${a * b * c}`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Multiple values selection is also available, result will be an array:`
)});
  main.variable(observer("viewof multipleSelect")).define("viewof multipleSelect", ["selectFlat"], function(selectFlat){return(
selectFlat({
  options: ["A", "B", "C", "D"],
  value: "B",
  output: true,
  multiple: true,
  description: "multiple selection"
})
)});
  main.variable(observer("multipleSelect")).define("multipleSelect", ["Generators", "viewof multipleSelect"], (G, _) => G.input(_));
  main.variable(observer()).define(["multipleSelect"], function(multipleSelect){return(
multipleSelect
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## TODO

- doesn't work on Safari.
- show the value (output) as "description = {output}"
- is it possible to avoid the size=2 hack?

_suggestions welcome_
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
_boring zone_`
)});
  main.variable(observer("selectFlatStyle")).define("selectFlatStyle", ["html"], function(html){return(
function selectFlatStyle(id, show_ouput = false) {
  return html`
<style>
#${id} option {
  height:1em; width: 1em; display: inline-block; overflow: hidden; background: #f4f4f4; margin-right:1px; border: 0.5px solid black;
  color: transparent!important;
}
#${id} option.hovered { background: orange }
#${id} option.hovered:disabled { background: #CCC }
#${id} select {
  overflow: hidden; height: 1.5em; border: 0!important;outline: none;
}
#${id} output {
  display: ${show_ouput ? "inline-block" : "none"};
}
</style>`;
}
)});
  const child1 = runtime.module(define1);
  main.import("input", child1);
  main.variable(observer("selectFlat")).define("selectFlat", ["DOM","input","html","selectFlatStyle","d3"], function(DOM,input,html,selectFlatStyle,d3){return(
function selectFlat(config = {}) {
  let {
    value: formValue,
    title,
    description,
    submit,
    multiple,
    size,
    output,
    options
  } = Array.isArray(config) ? { options: config } : config;
  options = options.map(o =>
    typeof o === "object" ? o : { value: o, label: o }
  );

  var currentValue = null;

  const id = DOM.uid().id;

  const form = input({
    type: "select",
    title,
    description: `${
      description ? (output ? `${description}: ` : description) : ""
    }<span>`,
    submit,
    getValue: input => {
      if (currentValue !== null) return currentValue;

      const selected = Array.prototype.filter
        .call(input.options, i => i.selected)
        .map(i => i.value);
      return multiple ? selected : selected[0];
    },
    form: html`
      <form class=selectBox id=${id}>
        <select name="input" ${
          multiple ? `multiple size="${size || options.length}"` : ""
        }>
          ${options.map(({ value, label, disabled = false }) =>
            Object.assign(html`<option>`, {
              value,
              selected: Array.isArray(formValue)
                ? formValue.includes(value)
                : formValue === value,
              disabled,
              textContent: label
            })
          )}
        </select>
  ${selectFlatStyle(id, output)}
      </form>
    `
  });

  form.output.style = "";
  d3.select(form)
    .select("span")
    .node()
    .appendChild(form.output);

  const s = form.getElementsByTagName("select")[0];

  s.size = 2;

  d3.select(s)
    .on("mouseleave", function() {
      currentValue = null;
      form.dispatchEvent(new CustomEvent("input"));
    })
    .selectAll("option")
    .on("mouseenter", function() {
      d3.select(this).classed("hovered", true);
      currentValue = this.disabled ? null : multiple ? [this.value] : this.value;
      form.dispatchEvent(new CustomEvent("input"));
    })
    .on("mouseleave", function() {
      d3.select(this).classed("hovered", false);
    });

  return form;
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3-selection@1")
)});
  return main;
}
