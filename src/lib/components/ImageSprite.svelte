<script lang="ts">
  import { dev } from '$app/environment'
  import { toVercelSrcSet } from '$lib/share'
  import type { WpImage } from '$lib/types'

  let className: string | null = null
  export { className as class }
  export let image: WpImage
  export let quality = 100

  const imageSizes = [96]

  $: ({
    srcSet = null,
    title = null,
    alt = null,
    sourceUrl = '',
    mediaDetails: { height: imageHeight = null, width: imageWidth = null } = {}
  } = image || {})

  $: vercelSrcSet = toVercelSrcSet(imageSizes, quality, image)

  // dynamic srcset only for optimized (w/vercel)
  $: imageSrcSet = dev ? srcSet : vercelSrcSet

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
