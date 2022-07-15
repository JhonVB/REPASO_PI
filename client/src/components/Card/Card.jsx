import React from "react";
import { Link } from "react-router-dom";
function Card({ name, species, origin, image, episodes, id }) {
  return (
    <div className="containerCard">
      <div className="contenidoCard">
        <Link to={`/character/${id}`}>{name}</Link>
        <div className="cardData">
          <img src={image} alt="Imagen" />
          <p>Species</p>
          <p>{species}</p>

          <p>Origin</p>
          <p>{origin}</p>
        </div>
        <div className="episode">
          <p>Episodes</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
