<script lang="ts">
  import { dev } from "$app/environment";
  import { getMediaSizes, toVercelSrcSet } from "$lib/share";
  import type { Breakpoints, WpImage } from "$lib/types";

  let className: string | null = null;
  export { className as class };
  export let image: WpImage;
  export let quality = 100;
  export let unoptimized = false;
  export let sizes: Breakpoints = {};

  const imageSizes = [96];

  $: mediaSizes = getMediaSizes(sizes);

  $: ({
    srcSet = null,
    title = null,
    altText = null,
    sourceUrl = "",
    mediaDetails: { height: imageHeight = null, width: imageWidth = null } = {}
  } = image || {});

  $: vercelSrcSet = toVercelSrcSet(imageSizes, quality, image);

  // dynamic srcset only for optimized (w/vercel)
  $: imageSrcSet = unoptimized || dev ? srcSet : vercelSrcSet;

  let element;
</script>

<img
  width={imageWidth}
  height={imageHeight}
  {title}
  srcset={imageSrcSet}
  src={sourceUrl}
  alt={altText ?? title}
  class={className}
  loading="eager"
  sizes={mediaSizes}
  bind:this={element}
  {...$$restProps}
/>
