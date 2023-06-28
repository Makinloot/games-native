import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function filterGamePlatforms(platforms) {
  const filterPlatforms = platforms
    .map((platform) => {
      const { slug } = platform.platform;
      let name = "";
      if (slug === "pc") name = "microsoft-windows";
      else if (slug.includes("xbox")) name = "microsoft-xbox";
      else if (slug.includes("playstation" || slug.includes("psp")))
        name = "sony-playstation";
      else if (
        slug === "ios" ||
        slug === "macos" ||
        slug === "macintosh" ||
        slug.includes("apple")
      )
        name = "apple";
      else if (slug === "android") name = "android";
      else if (slug.includes("nintendo")) name = "nintendo-game-boy";
      else if (slug === "wii" || slug === "wii-u") name = "nintendo-wii";
      else if (slug.includes("linux")) name = "linux";
      return <MaterialCommunityIcons name={name} size={22} color="white" />;
    })
    .splice(0, 6);
  return filterPlatforms;
}
