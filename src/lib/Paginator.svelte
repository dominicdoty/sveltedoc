<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { PageWorker } from "$lib/pageWorker";

  let { content }: { content: Snippet } = $props();

  let unPagedContent: HTMLDivElement;
  let pagedContent: HTMLDivElement;

  // Reactivity is totally broken here but that's probably fixable

  onMount(() => {
    const pw = new PageWorker(unPagedContent, pagedContent);
    setTimeout(() => pw.doPagination(), 100);
  });
</script>

<!-- This is where we render the content invisibly so we can grab it -->
<div class="page-width page-height overflow-clip invisible absolute">
  <div bind:this={unPagedContent} class="page-content">
    {@render content()}
  </div>
</div>

<!-- This is where the content is re-rendered, inside <Page> objects -->
<div bind:this={pagedContent}></div>
