import CardHorizontal from "./CardHorizontal";
import CardVertical from "./CardVertical";

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
