import { contentData } from '@data/content';
import { calculateAge, calculateYearsOfExperience } from '@utils/dateUtils';
import { buildSections, checkSectionAvailability } from '@utils/sectionBuilder';
import { useMemo } from 'react';

export const useHomeData = () => {
  const { contact, projects, technologies } = contentData;

  const age = useMemo(() => calculateAge(contact.birthDate), [contact.birthDate]);
  const yearsOfExperience = useMemo(() =>
    calculateYearsOfExperience(contact.firstJobDate),
    [contact.firstJobDate]
  );

  const sectionChecks = useMemo(() =>
    checkSectionAvailability(contentData),
    []
  );

  const sections = useMemo(() =>
    buildSections(contentData, sectionChecks),
    [sectionChecks]
  );

  const firstSection = useMemo(() =>
    sections.find(section => section.id !== 'home'),
    [sections]
  );

  return {
    contact,
    projects,
    technologies,
    age,
    yearsOfExperience,
    sectionChecks,
    sections,
    firstSection,
  };
};
