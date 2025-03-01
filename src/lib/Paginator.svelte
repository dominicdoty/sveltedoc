<script lang="ts">
  import { type Snippet } from "svelte";
  import { Sections } from "./docstate.svelte";

  let { content }: { content: Snippet } = $props();

  // TODO: This whole thing turned into a hackfest but it sorta works!

  let unPagedContent: HTMLDivElement;
  let pagedContent: HTMLDivElement;

  let pages: {
    header: HTMLDivElement;
    body: HTMLDivElement;
    footer: HTMLDivElement;
  }[] = [];

  const createPage = () => {
    // Create a new page
    let newPage = document.createElement("div");
    let newPageContent = document.createElement("div");
    let newPageHeader = document.createElement("div");
    let newPageBody = document.createElement("div");
    let newPageFooter = document.createElement("div");
    newPage.appendChild(newPageContent);
    newPageContent.appendChild(newPageHeader);
    newPageContent.appendChild(newPageBody);
    newPageContent.appendChild(newPageFooter);
    pagedContent.appendChild(newPage);

    // Style new page
    [
      "page-height",
      "page-width",
      "page-break",
      "not-print:border-[1px]",
      "border-gray-300",
      "not-print:shadow-xl",
      "not-print:m-5",
    ].forEach((c) => newPage.classList.add(c));

    newPage.setAttribute("data-sveltedoc-type", "page");

    ["h-full", "w-full", "flex", "flex-col", "page-content"].forEach((c) =>
      newPageContent.classList.add(c)
    );
    newPageContent.setAttribute("data-sveltedoc-type", "page-content");

    ["header", "flex-none"].forEach((c) => newPageHeader.classList.add(c));
    newPageHeader.setAttribute("data-sveltedoc-type", "page-header");

    ["grow", "prose", "text-sm"].forEach((c) => newPageBody.classList.add(c));
    newPageBody.setAttribute("data-sveltedoc-type", "page-body");

    ["footer", "flex-none"].forEach((c) => newPageFooter.classList.add(c));
    newPageFooter.setAttribute("data-sveltedoc-type", "page-footer");

    pages.push({
      header: newPageHeader,
      body: newPageBody,
      footer: newPageFooter,
    });
  };

  const getPage = (pageIdx: number) => {
    while (pageIdx + 1 > pages.length) {
      createPage();
    }

    let { header, body, footer } = pages[pageIdx];
    header.innerHTML = "";
    body.innerHTML = "";
    footer.innerHTML = `<div class="text-center text-sm italic">${pageIdx + 1}</div>`;

    return { header, body, footer };
  };

  const doPagination = () => {
    let pageIdx = 0;
    let remainingHeight = 0;

    let { body: newPageBody } = getPage(pageIdx);
    remainingHeight = newPageBody.clientHeight;
    pageIdx++;

    for (const child of unPagedContent.children) {
      if (child.getAttribute("data-sveltedoc-type") == "section") {
        const id = Number(child.getAttribute("data-sveltedoc-section-id"));
        Sections.setSectionPageNumber(id, pageIdx);
      }

      // Move id to hidden attr to make links work
      if (
        child.getAttribute("id") &&
        !child.getAttribute("data-sveltedoc-og-id")
      ) {
        child.setAttribute("data-sveltedoc-og-id", child.getAttribute("id"));
        child.removeAttribute("id");
      }

      let clientHeight = child.clientHeight;
      let cloneChild = child.cloneNode(true);

      // Add the id to the clone (this is bad typing wise with the Node but it works)
      if (cloneChild.getAttribute("data-sveltedoc-og-id")) {
        cloneChild.setAttribute(
          "id",
          cloneChild.getAttribute("data-sveltedoc-og-id")
        );
      }

      if (clientHeight > newPageBody.clientHeight) {
        // Too big for any page. Add a block to show for now
        console.log("too big");

        let tooBig = document.createElement("div");
        ["bg-red-500", "text-xl"].forEach((c) => tooBig.classList.add(c));
        tooBig.textContent = "TOO BIG: " + child.textContent?.slice(0, 20);

        newPageBody.appendChild(tooBig);
        remainingHeight -= tooBig.clientHeight;
      } else if (remainingHeight - clientHeight > 0) {
        // Fits, add to current page
        newPageBody.appendChild(cloneChild);
        remainingHeight -= clientHeight;
      } else {
        // Need a new page
        ({ body: newPageBody } = getPage(pageIdx));
        remainingHeight = newPageBody.clientHeight;
        pageIdx++;

        newPageBody.appendChild(cloneChild);
        remainingHeight -= clientHeight;
      }
    }
  };

  setTimeout(doPagination, 10);
</script>

<!-- This is where we render the content invisibly so we can grab it -->
<div class="page-width page-height overflow-clip invisible absolute">
  <div bind:this={unPagedContent} class="page-content">
    {@render content()}
  </div>
</div>

<!-- This is where the content is re-rendered, inside <Page> objects -->
<div bind:this={pagedContent}></div>
