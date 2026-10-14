/** Prefixes files in public/ with the site's base path, so they load on a GitHub Pages project site. */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
