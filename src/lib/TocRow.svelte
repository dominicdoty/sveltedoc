<script lang="ts">
  let {
    title,
    level,
    sectionString,
    page,
  }: { title: string; level: number; sectionString: string; page: number } =
    $props();
</script>

<li>
  <a href="#{title}">
    <div class="flex gap-2 align-middle">
      <div style="padding-left: {level}rem;">{sectionString}</div>
      <div>{title}</div>
      <div class="grow text-xs border-b-[1px] mb-1.5"></div>
      <div>{page}</div>
    </div>
  </a>
</li>
