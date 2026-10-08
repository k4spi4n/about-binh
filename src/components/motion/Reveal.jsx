import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Brings content into focus as it scrolls into view: it rises a little,
 * sheds its blur and fades in. Wrap elements that already animate their own
 * transform on hover (e.g. .card-hover) instead of putting both on one node.
 */
export const Reveal = ({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...rest
}) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", shown && "is-in", className)}
      style={{ "--reveal-delay": `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Reveal.propTypes = {
  as: PropTypes.elementType,
  delay: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};
