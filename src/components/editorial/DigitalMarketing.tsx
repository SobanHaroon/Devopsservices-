import { useEffect } from "react";
import { CAMPAIGNS } from "../../data/marketing";
import { updateCaseStudyMetaTags } from "../../lib/seo";
import {
  Button,
  Eyebrow,
  Heading,
  Link,
  LoopVideo,
  type Navigate,
} from "./Primitives";
export default function DigitalMarketing({
  onNavigate,
}: {
  onNavigate: Navigate;
}) {
  useEffect(() => {
    updateCaseStudyMetaTags(
      "Digital Marketing & Brand Films | DevOps Services",
      "Launch films, product reels and brand campaigns for Babay Dee Atta Chakki, Cielo Noir, DevOps Services and Muhammad Soban.",
      undefined,
      undefined,
      "/digital-marketing",
    );
  }, []);
  return (
    <>
      <section className="marketing-hero container">
        <Eyebrow>Digital marketing & content</Eyebrow>
        <div className="marketing-intro">
          <h1>
            Worth
            <br />
            <em>watching.</em>
          </h1>
          <div>
            <p>
              We turn what makes your business different into stories people can
              see, remember and act on.
            </p>
            <Button to="/#contact" onNavigate={onNavigate}>
              Grow your brand
            </Button>
          </div>
        </div>
        <div className="campaign-jump">
          <span>Explore the campaigns</span>
          {CAMPAIGNS.map((p, i) => (
            <Link
              key={p.id}
              to={"/digital-marketing#" + p.id}
              onNavigate={onNavigate}
            >
              <span>0{i + 1}</span>
              {p.name}
              <span>↓</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="growth-method section-space">
        <div className="container">
          <Heading label="How we grow your brand">
            One story.
            <br />
            <em>Every touchpoint.</em>
          </Heading>
          <div className="growth-method-grid">
            {[
              [
                "Position",
                "Find the message your audience should remember. We start with your offer, your customers and the way you want to be seen.",
              ],
              [
                "Create",
                "Turn that direction into product reels, launch films, social graphics and campaign landing pages.",
              ],
              [
                "Connect",
                "Give every piece a destination: a product, a website or an enquiry. Keep the visual language consistent from the feed to the page.",
              ],
              [
                "Refine",
                "Use your campaign feedback and available analytics to decide what to develop next. Adjust the work around what people respond to.",
              ],
            ].map(([title, copy], i) => (
              <article data-reveal key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {CAMPAIGNS.map((campaign, i) => (
        <section
          key={campaign.id}
          id={campaign.id}
          className={"campaign-section section-space campaign-" + campaign.id}
        >
          <div className="container">
            <div className="campaign-heading">
              <div>
                <Eyebrow>{"0" + (i + 1) + " / " + campaign.category}</Eyebrow>
                <h2 data-reveal>{campaign.name}</h2>
              </div>
              <div>
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
                <div className="deliverables">
                  {campaign.deliverables.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
                {campaign.link.startsWith("/") ? (
                  <Link
                    to={campaign.link}
                    onNavigate={onNavigate}
                    className="text-link"
                  >
                    {campaign.linkLabel} ↗
                  </Link>
                ) : (
                  <a
                    href={campaign.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link"
                  >
                    {campaign.linkLabel} ↗
                  </a>
                )}
              </div>
            </div>
            <div className={"campaign-reels count-" + campaign.reels.length}>
              {campaign.reels.map((reel) => (
                <figure key={reel.slug} data-reveal>
                  <div
                    className="reel-frame"
                    style={{ aspectRatio: reel.ratio }}
                  >
                    <LoopVideo
                      src={"/media/reels/" + reel.slug + ".mp4"}
                      poster={"/media/reels/" + reel.slug + ".webp"}
                      label={campaign.name + " — " + reel.title}
                    />
                  </div>
                  <figcaption>
                    <div>
                      <h3>{reel.title}</h3>
                      <p>{reel.format}</p>
                    </div>
                    <span>{reel.duration}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="center-cta section-space">
        <div className="container">
          <Eyebrow>Your next chapter</Eyebrow>
          <h2 data-reveal>
            Let’s give your brand
            <br />
            <em>something to say.</em>
          </h2>
          <p>
            One launch film, a monthly content partnership, or the website that
            connects it all. Start with a conversation.
          </p>
          <Button to="/#contact" onNavigate={onNavigate}>
            Start a project
          </Button>
        </div>
      </section>
    </>
  );
}
