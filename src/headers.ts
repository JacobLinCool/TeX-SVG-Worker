/**
 * @file headers.ts
 * This file exports the function for appending headers to the response (headers).
 */

const source = {
    cors: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
    },
    json: {
        "Content-Type": "application/json",
    },
    html: {
        "Content-Type": "text/html",
    },
    text: {
        "Content-Type": "text/plain",
    },
};

export default function (headers: Headers, type: keyof typeof source): Headers {
    const new_headers = new Headers(headers);
    for (const [key, value] of Object.entries(source[type])) {
        new_headers.set(key, value);
    }
    return new_headers;
}
