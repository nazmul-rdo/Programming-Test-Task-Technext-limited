import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { LaunchesContext } from '../App';

const Cards = () => {
  const { currentCards } = useContext(LaunchesContext);
  console.log(currentCards);

  return (
    <div>
      {currentCards.length === 0 ? (
        <p className='text-center mt-4'>Lodding...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
          {currentCards.map((launch) => (
            <Card key={uuidv4()} launch={launch} />
          ))}
        </div>
      )}
    </div>
  );
};

const Card = ({ launch }) => {
  const { mission_name, rocket, launch_date_utc, launch_success, links } = launch;

  const formattedDate = new Date(launch_date_utc).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="col">
      <div className="card d-flex flex-column justify-content-center align-items-center gap-4 p-4">
        <img src={links.mission_patch} className="card-img-top h-25 w-25" alt="Card Image" />
        <div className="card-body text-center">
          <p className="card-text">Launch Date: {formattedDate}</p>
          <h5 className="card-title">{mission_name}</h5>
          <p className="card-text">{rocket.rocket_name}</p>
        </div>
        <div className="text-center">
          <p className="status">Launch Status: </p>
          <button
            type="button"
            className={`btn ${launch_success ? 'btn-success' : 'btn-danger'}`}
          >
            {launch_success ? 'Success' : 'Failure'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;