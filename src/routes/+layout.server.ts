import { BYPASS_TOKEN } from '$env/static/private'

export const config = {
  isr: {
    // Random token that can be provided in the URL to bypass the cached version of the asset, by requesting the asset
    // with a __prerender_bypass=<token> cookie.
    //
    // Making a `GET` or `HEAD` request with `x-prerender-revalidate: <token>` will force the asset to be re-validated.
    bypassToken: BYPASS_TOKEN
  }
}
