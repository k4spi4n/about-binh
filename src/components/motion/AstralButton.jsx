import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Pill-shaped call-to-action with a cosmic idle state: a comet circles the
 * rim, a soft halo follows it, faint stars twinkle inside and a sparkle
 * glints now and then. On hover it fills with a drifting nebula, the stars
 * streak past as if at warp, and sparkles burst from the edges.
 *
 * Renders an <a> by default; pass `as="button"` for form buttons. All other
 * props (href, onClick, type, disabled, aria-*) go straight through.
 */
export const AstralButton = ({
  as: Tag = "a",
  icon = false,
  className,
  children,
  ...rest
}) => (
  <Tag
    className={cn("astral-btn", icon && "astral-btn--icon", className)}
    {...rest}
  >
    <span className="astral-nebula" aria-hidden="true" />
    <span className="astral-stars" aria-hidden="true" />
    <span className="astral-spark astral-spark--a" aria-hidden="true" />
    <span className="astral-spark astral-spark--b" aria-hidden="true" />
    <span className="astral-spark astral-spark--c" aria-hidden="true" />
    <span className="astral-label">{children}</span>
  </Tag>
);

AstralButton.propTypes = {
  as: PropTypes.elementType,
  icon: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
