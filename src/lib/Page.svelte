<script lang="ts">
  import type { Snippet } from "svelte";

  export let header: Snippet | undefined = undefined;
  export let body: Snippet | undefined = undefined;
  export let footer: Snippet | undefined = undefined;
</script>

<div
  class="page-height page-width page-break not-print:border-[1px] border-gray-300 not-print:shadow-xl not-print:m-5"
>
  <div class="h-full w-full page-content">
    <div class="h-full w-full flex flex-col">
      <div class="header flex-none">
        {#if header}
          {@render header()}
        {/if}
      </div>

      <div class="grow">
        {#if body}
          {@render body()}
        {/if}
      </div>

      <div class="footer flex-none">
        {#if footer}
          {@render footer()}
        {/if}
      </div>
    </div>
  </div>
</div>
