/**
 * @file rewriter.ts
 * This file exports the function for rewriting the HTML of the proxied page.
 */

export function get_rewriter(old_link: string, new_link: string): HTMLRewriter {
    class Rewriter {
        constructor(public attribute_name: string) {
            this.attribute_name = attribute_name;
        }
        element(element: Element): void {
            const attribute = element.getAttribute(this.attribute_name);
            if (attribute) {
                element.setAttribute(
                    this.attribute_name,
                    attribute
                        .replace(old_link, new_link)
                        .replace(/^\/(?!\/)/, new_link + "/")
                        .replace(/^(?!http)/, new_link + "/"),
                );
            }
        }
    }

    return new HTMLRewriter()
        .on("link", new Rewriter("href"))
        .on("a", new Rewriter("href"))
        .on("img", new Rewriter("src"))
        .on("script", new Rewriter("src"));
}
