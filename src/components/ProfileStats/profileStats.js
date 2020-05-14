import React, { useState } from 'react';
import Layout from '../layout';
import Section from './Sections/section';
import { sections } from './sections-data';

import SectionWrapper from '../../UI/Sections/SectionWrapper/sectionWrapper';
import SelectGraphBtnGroup from '../../UI/Buttons/SelectGraphBtnGroup/selectGraphBtnGroup';

const ProfileStats = () => {
  const initAvailableGraphs = () => {
    return sections.map((s, i) => {
      return {
        name: s.name,
        sectionName: s.sectionName,
        description: s.description,
        selected: i === 0 ? true : false,
      };
    });
  };

  const [allAvailableGraphs, setAllAvailableGraphs] = useState(
    initAvailableGraphs()
  );

  const handleSelectGraph = (name) => {
    const newAvailGraphs = allAvailableGraphs.map((graph) => {
      return {
        ...graph,
        selected: graph.name === name ? true : false,
      };
    });
    setAllAvailableGraphs(newAvailGraphs);
  };

  const selectedGraphName = () =>
    allAvailableGraphs.filter((graph) => graph.selected)[0].name;

  return (
    <Layout>
      <SectionWrapper>
        <SelectGraphBtnGroup
          data={allAvailableGraphs}
          handleSelectGraph={handleSelectGraph}
        />

        {sections.map((section, i) => {
          return section.name === selectedGraphName() ? (
            <Section key={section.avail[0].name} section={section} />
          ) : null;
        })}
      </SectionWrapper>
      <SectionWrapper>
        <p>
          This data is part of a Daily Statistic Profile of Covid-19 made
          available by the Health Protection Surveillance Center. New data is
          released each evening and dates back to 12am two days previously.
        </p>
      </SectionWrapper>
    </Layout>
  );
};

export default ProfileStats;
