import { useLanguage } from "../../context/LanguageContext";
import { CHARACTER_NAMES, type CharacterName } from "../../data/team";
import LoopingVideo from "./LoopingVideo";

export default function TeamFilm({ character }: { character: CharacterName }) {
  const { language } = useLanguage();
  const label =
    language === "JP"
      ? "スタジオのひとコマ"
      : language === "FR"
        ? "Un moment au studio"
        : language === "DE"
          ? "Ein Moment im Studio"
          : "A moment in the studio";
  return (
    <figure className="team-film">
      <LoopingVideo
        src={`/media/characters/${character}-moment.mp4`}
        poster={`/media/characters/${character}-moment.webp`}
        aria-label={`${CHARACTER_NAMES[character]} — ${label}`}
      />
    </figure>
  );
}
