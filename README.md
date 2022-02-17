# TeX SVG Worker

A Cloudflare Worker that translates TeX to SVG.

## Usage

### Direct Image Link

```
GET https://tex.jacob.workers.dev/?tex=<TeX String>
```

**Example:** <https://tex.jacob.workers.dev/?tex=\int_0^\infty\frac{x^2}{1%2bx^2}dx>

![DEMO](https://tex.jacob.workers.dev/?tex=\int_0^\infty\frac{x^2}{1%2bx^2}dx&css=svg{background:white})

Add `&inline=true` to the end of the URL to get the "inline" version of the image.

### Use Post

```
POST https://tex.jacob.workers.dev/
```

**Body:**

```json
{
    "tex": "<TeX String>"
}
```

### JSON Batch Convert API

```
POST https://tex.jacob.workers.dev/json
```

**Body:**

```json
{
    "tex": [
        "<TeX String 1>",
        "<TeX String 2>",
        ...
    ],
    "key": true
}
```

`tex` is a list of TeX expressions.

`key` is a boolean value. If `true`, the response will be a JSON object with key-value pairs of TeX expression and their SVGs. If `false`, the response will be a JSON array of SVGs.

**`key` set to `true`:**

```json
{
    "<TeX String 1>": "<SVG String 1>",
    "<TeX String 2>": "<SVG String 2>",
    ...
}
```

**`key` set to `false`:**

```json
[
    "<SVG String 1>",
    "<SVG String 2>",
    ...
]
```

Other options:

- `inline`: display the inline version of the image.
- `css`: CSS string to be injected into the SVG.
