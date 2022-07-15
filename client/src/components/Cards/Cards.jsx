import React from "react";
import Card from "../Card/Card";
function Cards({ characters }) {
  return (
    <div>
      {characters.map((e) => {
        return (
          <Card
            key={e.id}
            id={e.id}
            name={e.name}
            origin={e.origin}
            image={e.image}
            species={e.species}
            episodes={e.episodes}
          />
        );
      })}
    </div>
  );
}

export default Cards;
