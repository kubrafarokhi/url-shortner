import React from 'react';

const AccessEvents = ({getAccessEvents,shortLinks}) => {
  return (
    <>
      <div>Recent Links:</div>
      <ul>
        {shortLinks.map((l) => (
          <li>
            {`${l.long_url} - `}
            <a href={l.short_url} target="_blank" rel="noopener noreferrer">
              {l.short_url}
            </a>
            {' - '}
            <Button onClick={() => getAccessEvents(l)} size="sm" outline>
              Show Log
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AccessEvents;
