<script lang="ts">
  import Page from "$lib/Page.svelte";
  import TocRow from "$lib/TocRow.svelte";

  import { Sections } from "$lib/docstate.svelte";
  import { type finalSectionEntry } from "$lib/docstate.svelte";

  let sections: finalSectionEntry[] = $state([]);

  $effect(() => {
    sections = Sections.get_sections();
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
          {#each sections as { title, level, section_string }}
            <TocRow {title} {level} sectionString={section_string} page={2} />
          {/each}
        </ol>
      </div>
    </div>
  {/snippet}
</Page>
