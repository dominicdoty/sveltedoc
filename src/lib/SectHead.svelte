<script lang="ts">
  import { onMount } from "svelte";
  import { Sections } from "$lib/docstate.svelte";
  import { type finalSectionEntry } from "$lib/docstate.svelte";

  let { level }: { level: number } = $props();

  let hClass: string = $derived.by(() => {
    if (level == 0) {
      return "text-xl";
    } else if (level == 1) {
      return "text-lg";
    } else if (level == 2) {
      return "text-md";
    } else if (level >= 3) {
      return "text-sm";
    } else {
      return "text-red-500";
    }
  });

  let titleSpan: HTMLSpanElement | undefined = $state();
  let section: finalSectionEntry = $state.raw({
    sectionId: null,
    title: "",
    level: 0,
    sectionNumber: [],
    sectionString: "",
  });

  let title: string = $derived.by(() => {
    if (titleSpan && titleSpan?.textContent) {
      return titleSpan.textContent;
    } else {
      return "";
    }
  });

  let sectionString: string = $derived(section.sectionString);

  onMount(() => {
    section = Sections.add(section.sectionId, { title, level });
  });

  // TODO: Probably need to add some kind of a tag that we can detect
  // in the exported PDF to allow us to generate section bookmarks in the PDF.
  // Also need to figure out a way to add/resolve section links.
  // This concept is probably expandable to figure captions/references/tables, etc.
</script>

<div
  id={title}
  data-sveltedoc-type="section"
  data-sveltedoc-section-id={section.sectionId}
>
  <h1 class="font-bold py-2 {hClass}">
    {sectionString}
    <span bind:this={titleSpan}>
      <slot />
      <!-- Not sure there's a way around this with mdsvex as is -->
    </span>
  </h1>
</div>
