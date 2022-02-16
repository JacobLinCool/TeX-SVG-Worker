/**
 * @file router.ts
 * This file contains the route logic for the application.
 * The exported `router` will be used by the `fetch` function in `index.ts`.
 */

// #region Setup Router
import { Router } from "itty-router";
import { get_rewriter } from "./rewriter";
import append from "./headers";
const router = Router<Request>();
// #endregion

// #region Proxy
router.get("/proxy", async (req) => {
    const url = new URL(req.query?.url || "");
    const res = await fetch(url.href);

    const headers = append(res.headers, "cors");

    if (res.headers.get("Content-Type")?.includes("text/html")) {
        const rewriter = get_rewriter(url.origin, new URL(req.url).origin + "/proxy?url=" + url.origin);
        return new Response(rewriter.transform(res).body, { status: 200, headers });
    }

    return new Response(res.body, { status: 200, headers });
});
// #endregion

// #region GitHub Redirection
router.get("/github*", async () => {
    return Response.redirect("https://github.com/JacobLinCool", 301);
});
// #endregion

// #region Fallback
router.get("*", async (req) => {
    return new Response(JSON.stringify(req, null, 4), { status: 404, headers: append(new Headers(), "json") });
});
// #endregion

export default router;
