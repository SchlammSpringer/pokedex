<script lang="ts">

  import { dev } from "$app/environment";
  import { getMediaSizes, toVercelRemappedSrcSet } from "$lib/share";
  import type { Breakpoints, WpImage } from "$lib/types";

  let className: string | null = null;
  export { className as class };
  export let image: WpImage;
  export let quality = 70;
  export let unoptimized = false;
  export let sizes: Breakpoints = {};

  const imageSizes = [180, 180, 180, 256, 384, 475];
  const breakSizes = [384, 640, 768, 1024, 1280, 1536];

  $: mediaSizes = getMediaSizes(sizes);

  $: ({
    srcSet = null,
    title = null,
    altText = null,
    sourceUrl = "",
    mediaDetails: { height: imageHeight = null, width: imageWidth = null } = {}
  } = image || {});
  $: vercelSrcSet = toVercelRemappedSrcSet(imageSizes, breakSizes, quality, image);

  // dynamic srcset only for optimized (w/vercel)
  $: imageSrcSet = unoptimized || dev ? srcSet : vercelSrcSet

  let element
</script>

<img
  width={imageWidth}
  height={imageHeight}
  title={title}
  srcset={imageSrcSet}
  src={sourceUrl}
  alt={altText ?? title}
  class={className}
  loading="eager"
  sizes={mediaSizes}
  bind:this={element}
  {...$$restProps}
/>
