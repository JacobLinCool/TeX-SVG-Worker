import type { Recipe, Recipes } from "./types";
import { Router } from "itty-router";
import append from "./headers";
import { tex2svg } from "./tex2svg";
const router = Router<Request>();

router.get("/", async (req) => {
    const recipe = req.query as unknown as Recipe;
    if (recipe.tex) {
        console.time("Convert");
        const svg = tex2svg(recipe.tex, recipe);
        console.timeEnd("Convert");
        return new Response(svg, { status: 200, headers: append(new Headers(), "cors", "svg", "cache.1y") });
    } else {
        return Response.redirect("https://github.com/JacobLinCool/TeX-SVG-Worker", 301);
    }
});

router.post("/", async (req) => {
    try {
        const recipe = (await req.json?.()) as Recipe;
        if (recipe.tex) {
            console.time("Convert");
            const svg = tex2svg(recipe.tex, recipe);
            console.timeEnd("Convert");
            return new Response(svg, { status: 200, headers: append(new Headers(), "cors", "svg", "cache.1y") });
        } else {
            throw new Error("No TeX (tex) provided");
        }
    } catch (e) {
        return new Response((e as Error).toString(), { status: 400, headers: append(new Headers(), "cors") });
    }
});

router.post("/json", async (req) => {
    try {
        const recipes = (await req.json?.()) as Recipes;
        if (recipes.tex) {
            if (typeof recipes.tex === "string") {
                recipes.tex = [recipes.tex];
            }

            console.time(`Batch Convert (${recipes.tex.length})`);
            const svgs = recipes.tex.reduce((acc, tex) => {
                acc[tex] = tex2svg(tex, recipes);
                return acc;
            }, {} as Record<string, string>);
            console.timeEnd(`Batch Convert (${recipes.tex.length})`);

            const result = JSON.stringify(recipes.key ? svgs : Object.values(svgs));

            return new Response(result, { status: 200, headers: append(new Headers(), "cors", "json", "cache.1y") });
        } else {
            throw new Error("No TeX (tex) provided");
        }
    } catch (e) {
        return new Response((e as Error).toString(), { status: 400, headers: append(new Headers(), "cors") });
    }
});

router.all("*", async () => {
    // redirect to GitHub Repository
    return Response.redirect("https://github.com/JacobLinCool/TeX-SVG-Worker", 301);
});

export default router;
