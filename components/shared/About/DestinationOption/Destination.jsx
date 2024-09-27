import React from 'react';
import DestinationCard from './DestinatonCard';
import SectionTag from '../../SectionTag';

const Destination = ({ DetailAboutDummy }) => {
  return (
    <div className='container'>
      <SectionTag name={"Destination Option"} />
      <DestinationCard DetailAboutDummy={DetailAboutDummy}/>
    </div>
  );
};

export default Destination;