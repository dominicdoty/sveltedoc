type sectionEntry = { title: string; level: number };

type finalSectionEntry = {
  sectionId: number | null;
  title: string;
  level: number;
  sectionNumber: number[];
  sectionString: string;
};

class SectionTracker {
  #sections: finalSectionEntry[] = $state([]);
  #sectionPageNumbers: number[] = $state([]);
  #qty = 0; // Used to count sectionId's

  add(sectionId: number | null, section: sectionEntry): finalSectionEntry {
    if (sectionId) {
      console.log("repeat");
      return this.#sections[sectionId];
    }

    let section_number: number[];

    if (this.#sections.length == 0) {
      section_number = Array(section.level).fill(1);
      section_number.push(1);
    } else {
      const prev_sect = this.#sections.slice(-1)[0];
      section_number = prev_sect.sectionNumber.slice(0, section.level + 1);
      section_number[section.level] += 1;
      section_number = Array.from(section_number);
      section_number = section_number.map((v) => (isNaN(v) ? 1 : v));
    }

    let new_section: finalSectionEntry = {
      ...section,
      sectionId: this.#qty,
      sectionNumber: section_number,
      sectionString: section_number.join("."),
    };

    this.#sections.push(new_section);
    this.#sectionPageNumbers.push(0);
    this.#qty += 1;
    return new_section;
  }

  setSectionPageNumber(sectionIdx: number, pageNumber: number) {
    this.#sectionPageNumbers[sectionIdx] = pageNumber;
  }

  sections = $derived({
    sections: Sections.#sections,
    pageNumbers: this.#sectionPageNumbers,
  });
}

export const Sections = new SectionTracker();

export default { Sections };
export type { finalSectionEntry };
