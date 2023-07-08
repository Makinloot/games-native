import CardHorizontal from "./cardHorizontal/CardHorizontal";
import CardVertical from "./cardVertical/CardVertical";

const Card = ({
  background_image,
  name,
  genres,
  vertical,
  released,
  platforms,
}) => {
  return vertical ? (
    <CardVertical
      background_image={background_image}
      name={name}
      platforms={platforms}
      released={released}
    />
  ) : (
    <CardHorizontal
      background_image={background_image}
      name={name}
      genres={genres}
    />
  );
};

export default Card;
