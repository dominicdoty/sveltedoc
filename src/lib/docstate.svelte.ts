type sectionEntry = { title: string; level: number };

type finalSectionEntry = {
  title: string;
  level: number;
  section_number: number[];
  section_string: string;
};

class SectionTracker {
  #sections: Map<string, finalSectionEntry> = $state(new Map());

  add(section: sectionEntry): finalSectionEntry {
    if (this.#sections.has(section.title)) {
      return this.#sections.get(section.title);
    }

    let new_section: finalSectionEntry;

    if (this.#sections.size == 0) {
      let section_number = Array(section.level).fill(1);
      section_number.push(1);

      new_section = {
        ...section,
        section_number: section_number,
        section_string: section_number.join("."),
      };
    } else {
      const last_key = Array.from(this.#sections.keys()).slice(-1)[0];
      const prev_sect = this.#sections.get(last_key);
      let section_number = prev_sect.section_number.slice(0, section.level + 1);
      section_number[section.level] += 1;
      section_number = Array.from(section_number);
      section_number = section_number.map((v) => (isNaN(v) ? 1 : v));

      new_section = {
        ...section,
        section_number: section_number,
        section_string: section_number.join("."),
      };
    }

    this.#sections.set(section.title, new_section);
    return new_section;
  }

  get_sections(): finalSectionEntry[] {
    return Array.from(this.#sections.values());
  }
}

export const Sections = new SectionTracker();

export default { Sections };
export type { finalSectionEntry };
