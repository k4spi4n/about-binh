import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { DripText } from "./DripText";

// Section heading whose plain and accented halves drip in as one sweep,
// with a thin seam that draws outward underneath once the text has landed.
export const SectionTitle = ({ lead, accent, className }) => (
  <h2
    className={cn(
      "section-title text-3xl md:text-4xl font-bold text-center",
      className,
    )}
  >
    <DripText text={lead} whenVisible />{" "}
    <DripText
      text={accent}
      startIndex={Array.from(lead).length}
      className="text-primary text-primary-glow"
      whenVisible
    />
    <span className="section-seam" aria-hidden="true" />
  </h2>
);

SectionTitle.propTypes = {
  lead: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
  className: PropTypes.string,
};
