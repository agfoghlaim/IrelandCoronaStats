import React from 'react';
import SectionWrapSimple from '../../../UI/Sections/SectionWrapSimple/sectionWrapSimple';
// import classes from './extraInfo.module.css';

const ExtraInfo = () => {
  return (
    <SectionWrapSimple>
      <p>
        All data taken from data.gov.ie, available{' '}
        <a
          href="https://opendata-geohive.hub.arcgis.com/datasets/d8eb52d56273413b84b0187a4e9117be_0/data?geometry=-7.694%2C53.288%2C-7.691%2C53.289"
          rel="noopener noreferrer"
          target="_blank"
        >
          here
        </a>
        . It is updated every evening, with the latest records for{' '}
        <em>Total Confirmed Cases</em>, <em>Confirmed Recovered</em> and{' '}
        <em>Total Confirmed Deaths</em> reporting the counts recorded at 1pm the
        same day.
      </p>
      <p>
        Other data is part of of the HSPC's{' '}
        <em>Daily Statistics Profile of Covid-19</em>. It is also updated each
        evening but dates back to 12am two days previously.{' '}
      </p>

      <p>
        Note that from April 10th 2020 not all confirmed cases are included in
        the <em>Daily Cases</em> or <em>Percentage Change</em> figures. Cases
        not included represent tests that were sent to Germany for analysis. All
        confirmed cases{' '}
        <strong>
          <em>are</em>
        </strong>{' '}
        included in <em>Total Confirmed Cases</em>.
      </p>
      <p>
        For example on April 17th the number of <em>New Cases</em> is 597 while
        the <em>Total Cases</em> number jumps by 709 to 13,980. This can be
        accounted for by the 112 positive test results returned from Germany.
        Though most of these extra cases seem to be old, they have not been
        backdated in the data released on data.gov.ie. A graph with tests
        backdated is available from gov.ie{' '}
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href="https://assets.gov.ie/73405/f1938dc1f761415b93db5b8009c91898.pdf"
        >
          here
        </a>{' '}
        (.pdf download) and all updates for April 2020 are available from gov.ie{' '}
        <a
          href="https://www.gov.ie/en/publication/20f2e0-updates-on-covid-19-coronavirus-since-january-2020/#april"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          here
        </a>
        .
      </p>
    </SectionWrapSimple>
  );
};

export default ExtraInfo;
