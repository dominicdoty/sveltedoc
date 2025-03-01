<script lang="ts">
  import Content from "$doc/Content.svelte";
  import Paginator from "$lib/Paginator.svelte";
  import TitlePage from "$lib/TitlePage.svelte";
  import TableOfContents from "$lib/TableOfContents.svelte";
</script>

<div class="w-min mx-auto">
  <TitlePage />
  <TableOfContents />
  <Paginator>
    {#snippet content()}
      <Content />
    {/snippet}
  </Paginator>
</div>

<div
  class="text-xs text-sm text-md text-lg text-xl text-2xl"
  id="cssmule"
></div>

<style lang="postcss">
  @reference "tailwindcss/theme";
</style>
