import { useState } from "react";
import LoopingVideo from "./LoopingVideo";
export default function DesertScene({ caption }: { caption: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure className="desert-plate" data-enter="plate">
      <div className="desert-media">
        <img
          src="/media/desert/poster.webp"
          alt="A quiet purple desert beneath a night sky"
          width="1600"
          height="1194"
          fetchPriority="high"
        />
        <LoopingVideo
          poster="/media/desert/poster.webp"
          className={loaded ? "is-playing" : ""}
          onPlaying={() => setLoaded(true)}
          aria-hidden="true"
        >
          <source
            src="/media/desert/desert-mobile.mp4"
            media="(max-width: 767px)"
            type="video/mp4"
          />
          <source src="/media/desert/desert-desktop.mp4" type="video/mp4" />
        </LoopingVideo>
        <div className="desert-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="desert-coordinate" aria-hidden="true">
          IMAGINATION, WITHOUT LIMITS.
        </span>
      </div>
      <figcaption>
        <span>{caption}</span>
        <span>01 / ∞</span>
      </figcaption>
    </figure>
  );
}
