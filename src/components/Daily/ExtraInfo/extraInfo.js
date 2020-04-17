import React from 'react';
import classes from './extraInfo.module.css';

const ExtraInfo = () => {
  return (
    <section
      className={classes.extraInfo}
      class="globalSectionWrap lightBlackBackground"
    >
      <p>
        <small>
          Note that from April 10th 2020 not all confirmed cases are included in
          the 'Daily Cases' or 'Percentage Change' figures. Cases not included
          represent tests that were sent to Germany for analysis. All confirmed
          cases{' '}
          <strong>
            <em>are</em>
          </strong>{' '}
          included in 'Total Confirmed Cases'.
        </small>
      </p>
      <p>
        <small>
          Though most of these extra cases seem to be old, it is not exactly
          clear when they should be backdated to in the 'Daily Cases' or
          'Percentage Change' data. See below for more information taken from
          gov.ie
        </small>
      </p>
      <p>
        <a
          style={{ fontSize: '0.8rem', fontWeight: '700' }}
          href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-10"
          rel="noopener noreferrer"
          target="_blank"
        >
          April 10th
        </a>
      </p>

      <blockquote>
        <small>
          "... Including test results which have been sent to Germany for
          testing (which may include tests from older cases) the total figure of
          those who have been diagnosed with COVID-19 in Ireland now stands at
          8,089."
        </small>
      </blockquote>

      <p>
        <a
          style={{ fontSize: '0.8rem', fontWeight: '700' }}
          href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-11"
          rel="noopener noreferrer"
          target="_blank"
        >
          April 11th
        </a>
      </p>
      <blockquote>
        <small>
          "... an additional 286 confirmed cases of COVID-19 reported by a
          laboratory in Germany (which reflect cases from weeks ago)"
        </small>
      </blockquote>

      <p>
        <a
          style={{ fontSize: '0.8rem', fontWeight: '700' }}
          href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-12"
          rel="noopener noreferrer"
          target="_blank"
        >
          April 12th
        </a>
      </p>
      <blockquote>
        <small>
          "... an additional 297 confirmed cases of COVID-19 reported by a
          laboratory in Germany (these represent samples taken weeks ago)"
        </small>
      </blockquote>

      <p>
        <a
          style={{ fontSize: '0.8rem', fontWeight: '700' }}
          href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-13"
          rel="noopener noreferrer"
          target="_blank"
        >
          April 13th
        </a>
      </p>
      <blockquote>
        <small>
          "... 465 confirmed cases of COVID-19 reported by a laboratory in
          Germany"
        </small>
      </blockquote>

      <p>
        <a
          style={{ fontSize: '0.8rem', fontWeight: '700' }}
          href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-14"
          rel="noopener noreferrer"
          target="_blank"
        >
          April 14th
        </a>
      </p>
      <blockquote>
        <small>
          "... an additional 284 confirmed cases of COVID-19 reported by a
          laboratory in Germany"
        </small>
      </blockquote>

      <p>
        <a
          style={{ fontSize: '0.8rem', fontWeight: '700' }}
          href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-15"
          rel="noopener noreferrer"
          target="_blank"
        >
          April 15th
        </a>
      </p>
      <blockquote>
        <small>
          "... 677 additional cases have been confirmed in Ireland as well as
          411 old tested in Germany (which are older cases)"
        </small>
      </blockquote>
      <p>
        <a
          style={{ fontSize: '0.8rem', fontWeight: '700' }}
          href="https://www.gov.ie/en/news/7e0924-latest-updates-on-covid-19-coronavirus/#april-16"
          rel="noopener noreferrer"
          target="_blank"
        >
          April 16th
        </a>
      </p>
      <blockquote>
        <small>
          {' '}
          ..."629 additional cases have been confirmed in Ireland as well as 95
          tested in Germany (which are older cases)"
        </small>
      </blockquote>
    </section>
  );
};

export default ExtraInfo;
