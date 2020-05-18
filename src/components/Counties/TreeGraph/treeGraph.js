import React, { useRef, useMemo } from 'react';
import { useStore } from '../../../Store/store';
import CountyTiles from './countyTiles';
import BoringButton from '../../../UI/Buttons/boringButton';
import ErrorComp from '../../../UI/error';

const dimensions = {
  margin: {
    left: 70,
    right: 60,
    top: 60,
    bottom: 60,
  },
  width: 1000,
  height: 600,
};
const { width, height } = dimensions;
const animationConfig = {
  duration: 250,
  tension: 210,
  friction: 20,
  clamp: true,
};

const TreeGraph = ({
  showProvinces,
  handleSelectOneCounty,
  setShowProvinces,
  isLoading,
  isError,
}) => {
  const storeSections = useStore()[0].sections[0];
  const attribute = storeSections.selectedAttributeName;

  // get colour corresponding to selected attribute (need it for countyTile colour)
  const selectedAttributeColor = useMemo(() => {
    return storeSections.avail.filter((data) => data.selected)[0].color;
  }, [storeSections.avail]);

  const svgRef = useRef();

  return (
    <>
      <BoringButton
        onClick={() => setShowProvinces(!showProvinces)}
        overRideStyle={{
          background: `${
            showProvinces ? 'var(--lightBlack)' : 'var(--covidGreen)'
          }`,
          color: `${showProvinces ? 'var(--covidGreen)' : 'var(--lightBlack)'}`,
          borderRadius: ' 0.4rem',
          border: 'none',
          fontWeight: '800',
          letterSpacing: '0.1rem',
          textTransform: 'uppercase',
          fontSize: '0.6rem',
          padding: '0.5rem 1rem',
          outline: 'none',
          minWidth: '5rem',
          display: 'grid',
          alignSelf: 'center',
          justifySelf: 'center',
          cursor: 'pointer',
        }}
      >
        {showProvinces ? 'Hide Provinces' : 'Show  Provinces'}
      </BoringButton>
      {isError ? (
        <ErrorComp msg="Could not load data for graph." />
      ) : (
        <svg
          style={{ maxWidth: '100%' }}
          viewBox={`0 0 ${width} ${height}`}
          ref={svgRef}
          width={width}
        >
          <CountyTiles
            graphData={storeSections.allCountiesLatestData}
            attribute={attribute}
            showProvinces={showProvinces}
            handleSelectOneCounty={handleSelectOneCounty}
            selectedAttributeColor={selectedAttributeColor}
            selectedCountyName={storeSections.allStatsAboutSelectedCounty.name}
          />
        </svg>
      )}
    </>
  );
};

export default TreeGraph;
