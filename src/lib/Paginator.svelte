<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import Page from "./Page.svelte";

  export let content: Snippet;

  let unPagedContent: HTMLDivElement;
  let pagedContent: HTMLDivElement;

  onMount(() => {
    const parser = new DOMParser();
    for (const node of unPagedContent.childNodes) {
      console.log(node);
    }
  });
</script>

<!-- This is where we render the content invisibly so we can grab it -->
<div class="page-width">
  <div bind:this={unPagedContent} class="page-content">
    {@render content()}
  </div>
</div>

<!-- This is where the content is re-rendered, inside <Page> objects -->
<div bind:this={pagedContent}></div>
