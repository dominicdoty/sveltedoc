import { Sections } from "$lib/docstate.svelte";

const hideOriginalId = (el: Element) => {
  let id = el.getAttribute("id");

  if (id) {
    if (!el.getAttribute("data-sveltedoc-og-id")) {
      el.setAttribute("data-sveltedoc-og-id", id);
    }
    el.removeAttribute("id");
  }
};

const unhideOriginalId = (el: Element) => {
  let id = el.getAttribute("data-sveltedoc-og-id");
  if (id) {
    el.setAttribute("id", id);
  }
};

class SveltedocPage {
  pageIdx: number;
  header: HTMLDivElement;
  body: HTMLDivElement;
  bodyHeight: number;
  footer: HTMLDivElement;

  constructor(pageIdx: number, parent: Element) {
    // Create a new page
    let newPage = document.createElement("div");
    let newPageContent = document.createElement("div");
    let newPageHeader = document.createElement("div");
    let newPageBodyFlex = document.createElement("div");
    let newPageBody = document.createElement("div");
    let newPageFooter = document.createElement("div");
    newPage.appendChild(newPageContent);
    newPageContent.appendChild(newPageHeader);
    newPageContent.appendChild(newPageBodyFlex);
    newPageBodyFlex.appendChild(newPageBody);
    newPageContent.appendChild(newPageFooter);
    parent.appendChild(newPage);

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

    ["grow"].forEach((c) => newPageBodyFlex.classList.add(c));

    ["prose", "text-sm"].forEach((c) => newPageBody.classList.add(c));
    newPageBody.setAttribute("data-sveltedoc-type", "page-body");

    ["footer", "flex-none"].forEach((c) => newPageFooter.classList.add(c));
    newPageFooter.setAttribute("data-sveltedoc-type", "page-footer");

    this.pageIdx = pageIdx;
    this.header = newPageHeader;
    this.body = newPageBody;
    this.bodyHeight = newPageBodyFlex.clientHeight;
    this.footer = newPageFooter;
  }

  appendChild(child: Element): boolean {
    hideOriginalId(child);
    let cloneChild: Element = child.cloneNode(true);
    unhideOriginalId(cloneChild);

    // Test fit
    this.body.appendChild(cloneChild);
    if (this.body.clientHeight > this.bodyHeight) {
      this.body.removeChild(cloneChild);
      return false;
    }

    // Set page number for TOC
    if (cloneChild.getAttribute("data-sveltedoc-type") == "section") {
      const id = Number(cloneChild.getAttribute("data-sveltedoc-section-id"));
      Sections.setSectionPageNumber(id, this.pageIdx + 1);
    }

    return true;
  }

  clear() {
    this.header.innerHTML = "";
    this.body.innerHTML = "";
    // Probably shouldn't hard code page number styling here
    this.footer.innerHTML =
      '<div class="text-center text-sm italic">' +
      (this.pageIdx + 1) +
      "</div>";
  }
}

export class PageWorker {
  #pages: SveltedocPage[] = [];
  #src: Element;
  #dest: Element;
  #currentPage: number;

  constructor(sourceElement: Element, destElement: Element) {
    this.#src = sourceElement;
    this.#dest = destElement;
    this.#currentPage = 0;
  }

  #getNextPage() {
    if (this.#currentPage + 1 > this.#pages.length) {
      this.#pages.push(new SveltedocPage(this.#currentPage, this.#dest));
    }

    const page = this.#pages[this.#currentPage];
    page.clear();
    this.#currentPage += 1;
    return page;
  }

  doPagination() {
    let page = this.#getNextPage();

    for (const child of this.#src.children) {
      let appendChild = child;

      if (child.clientHeight > page.bodyHeight) {
        // Too big for any page. Add a block to show for now
        console.log(
          `Too Big for a page ${child.clientHeight} vs ${page.bodyHeight}`
        );

        let tooBig = document.createElement("div");
        ["bg-red-500", "text-base"].forEach((c) => tooBig.classList.add(c));
        tooBig.textContent = "TOO BIG: " + child.textContent?.slice(0, 20);
        appendChild = tooBig;
      }

      if (!page.appendChild(appendChild)) {
        page = this.#getNextPage();
        if (!page.appendChild(appendChild)) {
          console.error("Too big twice?");
        }
      }
    }
  }
}
