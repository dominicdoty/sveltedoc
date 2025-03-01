
# About
This is an exploration of using HTML+CSS and browser "print to pdf" as a vehicle for creating formatted PDFs.

This has only been tested in Firefox.

View a rendered version here: [sveltedoc.pages.dev](https://sveltedoc.pages.dev/)

I've recently been using asciidoc to create formatted documents.
While it is overall an excellent tool, I've found it lacking in a few ways, namely:
 * Slow rendering times when "compiling" to a PDF
 * Difficulty doing detailed, manual formatting (e.g. for title pages or other specialty pages)
 * Differences between the common web based preview and the compiled PDF

LATEX counters some of these shortcomings, but is difficult in other ways.

I decided to explore the possibility of using HTML+CSS to create a web page that was formatted like a document, and could be printed to a PDF with identical formatting.
This is an attempt at this idea.

I chose to use Svelte since I'm familiar with it.
Hopefully the combination of `mdsvex` (markdown->svelte transformer) and Svelte components would prove a potent combination of simplicity for typical editing use cases, and the full power of HTML+CSS layout when needed.

I'm not convinced this is any better than LATEX or asciidoc, but it was an interesting exercise.

<br/>
<br/>
<br/>

## To Do
There are several outstanding issues in this demo:
 * Reactivity is broken
    * The site does not currently HMR automatically or correctly when editing the `content.md` file.
    * This is likely due to the hot mess of mixed Svelte 4 & 5 paradigms in here, and my own mistakes.
 * Document content is held in a single `content.md` file at the moment
    * This is something that could be solved by globbing all `*.md` files in the `doc` directory and rendering them in order of filenames.
    * This should make it easier to edit large, multipart documents.
 * The TitlePage and TableOfContents are both included in the `App.svelte` file
    * It would be more user friendly to put those into the `doc` folder and have a top level app that auto renders them and all `*.md` files there also.
 

 
 * Pagination problems 
   * pagination code is gross
   * Currently page breaks are automatically inserted based on height alone.
 * Figure/Table Numbers/Captions and Table of Figures/Tables
    * This is not yet implemented but should be possible by following the Section numbering model.
 * Cross referencing to sections/figures/tables is not implemeneted
    * Inter-page links (`href=#My Section`) work
    * No current way to add auto filled section numbers or the like in text crossrefs
 * PDF bookmarks
    * Not implemented, but seems possible by inspecting the generate PDF and adding them in post processing.
 