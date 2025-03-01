<script lang="ts">
  import { Sections } from "./docstate.svelte";
  let { title, level }: { title: string; level: number } = $props();

  let h_class = $state("");
  $effect(() => {
    if (level == 0) {
      h_class = "text-xl";
    } else if (level == 1) {
      h_class = "text-lg";
    } else if (level == 2) {
      h_class = "text-md";
    } else if (level >= 3) {
      h_class = "text-sm";
    }
  });

  const section = Sections.add({ title, level });
</script>

<span>
  <h1 class="font-bold py-2 {h_class}">
    {section.section_string}
    {section.title}
  </h1>
</span>
