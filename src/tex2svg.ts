import TeXToSVG from "tex-to-svg";

export function tex2svg(tex: string): string {
    return TeXToSVG(tex);
}
