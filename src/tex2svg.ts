import type { Config } from "./types";
import type { LiteElement } from "mathjax-full/js/adaptors/lite/Element";
import { mathjax } from "mathjax-full/js/mathjax";
import { TeX } from "mathjax-full/js/input/tex";
import { SVG } from "mathjax-full/js/output/svg";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";
import { AllPackages as packages } from "mathjax-full/js/input/tex/AllPackages";

const default_opts: Required<Config> = { width: 1280, ex: 8, em: 16, scale: 1, css: "", inline: false };

export function tex2svg(text: string, opts: Config = default_opts): string {
    const options = { ...default_opts, ...opts };

    const adaptor = liteAdaptor();
    RegisterHTMLHandler(adaptor);
    const svg = new SVG({ fontCache: "local" });
    const html = mathjax.document("", { InputJax: new TeX({ packages }), OutputJax: svg });
    const node = html.convert(text, {
        display: !options.inline,
        em: options.em,
        ex: options.ex,
        scale: options.scale,
        lineWidth: options.width,
    });

    const output = adaptor.outerHTML(node).replace(/<mjx-container.*?>(.*)<\/mjx-container>/gi, "$1");
    const css = adaptor
        .textContent(svg.styleSheet(html) as LiteElement)
        .replace(/(mjx-container)?\[jax="SVG"]( > svg)?/g, "svg")
        .replace(/\s/g, "");

    const result = options.css
        ? output.replace(/<\/svg>/g, `<style>${css}</style><style>${options.css}</style></svg>`)
        : output.replace(/<\/svg>/g, `<style>${css}</style></svg>`);

    return result;
}
