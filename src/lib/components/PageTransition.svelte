<script lang="ts">
  import { cubicIn, cubicOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  export let currentPath: string
  const duration = 300
  const delay = duration + 100
  const y = 10

  const transitionIn = { easing: cubicOut, y, duration, delay }
  const transitionOut = { easing: cubicIn, y: -y, duration }
</script>

  {#key currentPath}
    <div in:fly={transitionIn} out:fly={transitionOut}>
     <slot></slot>
    </div>
  {/key}

