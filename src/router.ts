// #region Setup Router
import { Router } from "itty-router";
import append from "./headers";
import { tex2svg } from "./tex2svg";
const router = Router<Request>();
// #endregion

// #region Fallback
router.get("*", async (req) => {
    const { tex } = req.query as { tex: string };
    return new Response(tex2svg(tex), { status: 200, headers: append(new Headers(), "cors", "svg") });
});
// #endregion

export default router;
