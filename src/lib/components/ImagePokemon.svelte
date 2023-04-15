<script lang="ts">
  import { dev } from '$app/environment'
  import { toVercelRemappedSrcSet } from '$lib/share'
  import type { WpImage } from '$lib/types'

  let className: string | null = null
  export { className as class }
  export let image: WpImage
  export let quality = 70

  const imageSizes = [180, 180, 180, 256, 310, 384]
  const breakSizes = [384, 640, 768, 1024, 1280, 1536]

  $: ({
    srcSet = null,
    title = null,
    alt = null,
    sourceUrl = '',
    mediaDetails: { height: imageHeight = null, width: imageWidth = null } = {}
  } = image || {})
  $: vercelSrcSet = toVercelRemappedSrcSet(imageSizes, breakSizes, quality, image)

  // dynamic srcset only for optimized (w/vercel)
  $: imageSrcSet =  dev ? srcSet : vercelSrcSet

  let element
</script>

<img
  width={imageWidth}
  height={imageHeight}
  {title}
  srcset={imageSrcSet}
  src={sourceUrl}
  {alt}
  class={className}
  loading="eager"
  sizes="100vw"
  bind:this={element}
  {...$$restProps}
/>
