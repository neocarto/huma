// https://observablehq.com/@severo/preload-a-list-of-images@248
import define1 from "./4989633f4cfb3056@365.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Preload a list of images

<code>preload</code> is an asynchrounous function that downloads and caches a list of images into an index (a Map object). It's useful in interactive animations to have a change in image source reflected instantaneously.

~~~javascript 
import {preload} from '@severo/preload-a-list-of-images'
images = await preload(urls, options)
~~~


Parameters:

- <code>urls</code> (*required*): an array of images URLs
- <code>options</code>: an object
  - <code>ignoreExceptions</code>: boolean, defaults to false. If true, catch the exceptions and return <code>undefined</code> instead of HTMLImageElement objects.
  - <code>throttle</code>: boolean, default to false. If true, rate-limits the image requests using [throttled-queue](see https://www.npmjs.com/package/throttled-queue)
  - <code>throttleNumber</code>: number, defaults to 1. Maximum number of requests per period of time.
  - <code>throttlePeriod</code>: number, defaults to 1000. Period of time in ms.
  - <code>throttleEquallySpaced</code>: boolean, defaults to false.  If true, equally spaces the requests to avoid requests bursts.

Returns:

- a Map which keys are the urls and values are HTMLImageElement objects

## Example
`
)});
  main.variable(observer()).define(["images","idx"], function(images,idx){return(
images.get(idx)
)});
  main.variable(observer("viewof idx")).define("viewof idx", ["selectFlat","urls"], function(selectFlat,urls){return(
selectFlat({
  options: urls,
  value: urls[0],
  output: true,
  description: "your choice"
})
)});
  main.variable(observer("idx")).define("idx", ["Generators", "viewof idx"], (G, _) => G.input(_));
  main.variable(observer("images")).define("images", ["preload","urls"], async function(preload,urls){return(
await preload(urls)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Example: caught exceptions`
)});
  main.variable(observer()).define(["faultyImgs","faultyIdx","html"], function(faultyImgs,faultyIdx,html){return(
faultyImgs.get(faultyIdx) || html`<img width=64 height=64 />`
)});
  main.variable(observer("viewof faultyIdx")).define("viewof faultyIdx", ["selectFlat","faultyUrls"], function(selectFlat,faultyUrls){return(
selectFlat({
  options: faultyUrls,
  value: faultyUrls[0],
  output: true,
  description: "your choice"
})
)});
  main.variable(observer("faultyIdx")).define("faultyIdx", ["Generators", "viewof faultyIdx"], (G, _) => G.input(_));
  main.variable(observer("faultyImgs")).define("faultyImgs", ["preload","faultyUrls"], async function(preload,faultyUrls){return(
await preload(faultyUrls, { ignoreExceptions: true })
)});
  main.variable(observer("faultyUrls")).define("faultyUrls", ["urls"], function(urls)
{
  const shuffle = str =>
    str
      .split('')
      .sort(function() {
        return 0.5 - Math.random();
      })
      .join('');
  return urls.map(url => (Math.random() > 0.2 ? url : shuffle(url)));
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Example: duplicates

Note that the index Map (<code>duplicateImages</code>) only contains 2 entries.`
)});
  main.variable(observer()).define(["duplicateImages","duplicateIdx"], function(duplicateImages,duplicateIdx){return(
duplicateImages.get(duplicateIdx)
)});
  main.variable(observer("viewof duplicateIdx")).define("viewof duplicateIdx", ["selectFlat","duplicateUrls"], function(selectFlat,duplicateUrls){return(
selectFlat({
  options: duplicateUrls,
  value: duplicateUrls[0],
  output: true,
  description: "your choice"
})
)});
  main.variable(observer("duplicateIdx")).define("duplicateIdx", ["Generators", "viewof duplicateIdx"], (G, _) => G.input(_));
  main.variable(observer("duplicateImages")).define("duplicateImages", ["preload","duplicateUrls"], async function(preload,duplicateUrls){return(
await preload(duplicateUrls)
)});
  main.variable(observer("duplicateUrls")).define("duplicateUrls", ["urls"], function(urls){return(
urls.map((_, i) => (i % 2 ? urls[0] : urls[1]))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Example: throttle

Image requests are limited to 2 requests every 500ms, equally spaced in time.`
)});
  main.variable(observer()).define(["throttleImgs","throttleIdx"], function(throttleImgs,throttleIdx){return(
throttleImgs.get(throttleIdx)
)});
  main.variable(observer("viewof throttleIdx")).define("viewof throttleIdx", ["selectFlat","urls"], function(selectFlat,urls){return(
selectFlat({
  options: urls,
  value: urls[0],
  output: true,
  description: "your choice"
})
)});
  main.variable(observer("throttleIdx")).define("throttleIdx", ["Generators", "viewof throttleIdx"], (G, _) => G.input(_));
  main.variable(observer("throttleImgs")).define("throttleImgs", ["preload","urls"], async function(preload,urls){return(
await preload(urls, {
  throttle: true,
  throttleNumber: 2,
  throttlePeriod: 500,
  throttleEquallySpaced: true
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Credits

Developed for the [LIRIS M2i project](https://projet.liris.cnrs.fr/mi2/) by Sylvain Lesage.

selectFlat input control by Philippe Rivière.

Emojis by GitHub.

---
`
)});
  main.variable(observer("preload")).define("preload", ["throttledQueue","fetchImage"], function(throttledQueue,fetchImage){return(
async (
  urls,
  {
    ignoreExceptions = false,
    throttle = false,
    throttleNumber = 1,
    throttlePeriod = 1000,
    throttleEquallySpaced = false
  } = {
    ignoreExceptions: false,
    throttle: false,
    throttleNumber: 1,
    throttlePeriod: 1000,
    throttleEquallySpaced: false
  }
) => {
  const f = throttle
    ? throttledQueue(throttleNumber, throttlePeriod, throttleEquallySpaced)
    : fn => fn();
  return Promise.all(
    [...new Set(urls)].map(
      src =>
        new Promise((resolve, reject) =>
          f(() =>
            fetchImage(src)
              .then(img => resolve([src, img]))
              .catch(e => {
                if (ignoreExceptions) {
                  resolve([src, undefined]);
                } else {
                  reject(e);
                }
              })
          )
        )
    )
  ).then(imgs => new Map(imgs));
}
)});
  main.variable(observer("fetchImage")).define("fetchImage", function(){return(
src => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  return img.decode().then(() => img);
}
)});
  main.variable(observer("urls")).define("urls", ["d3"], function(d3){return(
d3
  .json("https://api.github.com/emojis")
  .then(d => Object.values(d).slice(0, 20))
)});
  const child1 = runtime.module(define1);
  main.import("selectFlat", child1);
  main.variable(observer("throttledQueue")).define("throttledQueue", ["require"], function(require){return(
require('throttled-queue')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  return main;
}
