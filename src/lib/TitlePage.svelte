<script lang="ts">
  import Page from "$lib/Page.svelte";
</script>

<Page>
  {#snippet body()}
    <div class="h-full flex flex-col">
      <div class="text-center flex-none">
        <h1 class="text-2xl">Example Document</h1>
        <h2 class="text-md italic">Exploring HTML to PDF Document Creation</h2>
      </div>

      <div class="grow"></div>

      <div class="text-center flex-none">
        <p>Dominic Doty</p>
        <p>2/28/2025</p>
      </div>
    </div>
  {/snippet}
</Page>
