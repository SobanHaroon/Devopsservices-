import { useEffect, useRef, useState } from "react";
function Row({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false),
    [height, setHeight] = useState(0),
    content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!content.current) return;
    const measure = () => setHeight(content.current?.scrollHeight || 0);
    const ro = new ResizeObserver(measure);
    ro.observe(content.current);
    measure();
    return () => ro.disconnect();
  }, []);
  const id = "faq-" + index;
  return (
    <div className="ed-faq-row" data-enter="up">
      <h3>
        <button
          id={id + "-button"}
          aria-controls={id}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span>{q}</span>
          <span className={open ? "is-open" : ""} aria-hidden="true">
            +
          </span>
        </button>
      </h3>
      <div
        className="ed-faq-panel"
        id={id}
        role="region"
        aria-labelledby={id + "-button"}
        aria-hidden={!open}
        style={{ height: open ? height : 0, opacity: open ? 1 : 0 }}
      >
        <div ref={content}>
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}
export default function EditorialFaq({ items }: { items: string[][] }) {
  return (
    <div>
      {items.map(([q, a], i) => (
        <Row q={q} a={a} index={i} key={q} />
      ))}
    </div>
  );
}
