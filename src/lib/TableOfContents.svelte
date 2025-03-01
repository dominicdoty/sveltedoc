<script lang="ts">
  import Page from "$lib/Page.svelte";
  import TocRow from "$lib/TocRow.svelte";
  import { Sections, type finalSectionEntry } from "$lib/docstate.svelte";

  let sections: finalSectionEntry[] = $state([]);
  let pageNumbers: number[] = $state([]);
  $effect(() => {
    sections = Sections.sections.sections;
    pageNumbers = Sections.sections.pageNumbers;
  });
</script>

<Page>
  {#snippet body()}
    <div class="h-full flex flex-col">
      <div class="text-center">
        <h1 class="text-xl py-5">Table of Contents</h1>
      </div>

      <div class="grow">
        <ol class="list-none list-inside">
          {#if sections != undefined}
            {#each sections as { title, level, sectionString }, idx}
              <TocRow {title} {level} {sectionString} page={pageNumbers[idx]} />
            {/each}
          {/if}
        </ol>
      </div>
    </div>
  {/snippet}
</Page>
