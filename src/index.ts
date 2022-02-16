/**
 * @file index.ts
 * This file contains the main logic for the application.
 * The exported `fetch` function is the entry point for every request.
 * And the exported `scheduled` function is the entry point for the scheduled task.
 */

import router from "./router";

export default {
    async fetch(request: Request, environment: unknown, context: ExecutionContext): Promise<Response> {
        try {
            return await router.handle(request);
        } catch (err) {
            console.error(err);
            return new Response((<Error>err).message, { status: 500, headers: { "Content-Type": "text/plain" } });
        }
    },
    async scheduled(controller: ScheduledController, environment: unknown, context: ExecutionContext): Promise<void> {
        // await dosomething();
    },
};
``;
