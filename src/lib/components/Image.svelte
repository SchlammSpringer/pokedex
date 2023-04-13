<script lang="ts">
  import { dev } from '$app/environment'
  import { toVercelSrcSet } from '$lib/share'
  import type { WpImage } from '$lib/types'

  let className: string | null = null
  export { className as class }
  export let image: WpImage
  export let showTitle = false
  export let quality = 70
  export let unoptimized = false

  const imageSizes = [384, 640, 768, 1024, 1280, 1536]

  $: ({
    srcSet = null,
    title = null,
    altText = null,
    sourceUrl = '',
    mediaDetails: { height: imageHeight = null, width: imageWidth = null } = {}
  } = image || {})

  $: vercelSrcSet = toVercelSrcSet(imageSizes, quality, image)

  // dynamic srcset only for optimized (w/vercel)
  $: imageSrcSet = unoptimized || dev ? srcSet : vercelSrcSet

  let element
</script>

<img
  width={imageWidth}
  height={imageHeight}
  title={showTitle ? title : null}
  srcset={imageSrcSet}
  src={sourceUrl}
  alt={altText ?? title}
  class={className}
  loading="eager"
  sizes="100vw"
  bind:this={element}
  {...$$restProps}
/>
