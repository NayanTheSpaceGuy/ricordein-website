const HTMX_FRAGMENT_ROUTES = ["/partials"];

export const onRequest = async (context, next) => {
  if (
    !HTMX_FRAGMENT_ROUTES.find((route) => context.request.url.includes(route))
  ) {
    return next();
  }

  const response = await next();
  let html = await response.text();

  html = html.replace(/<style type\=\"text\/css\"(.*)<\/style>/s, "");
  html = html.replace(/<script(.*)<\/script>/gm, "");

  return new Response(html, {
    status: 200,
    headers: response.headers,
  });
};