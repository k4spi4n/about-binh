import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Pill-shaped call-to-action tuned like a receiver: quiet at rest, two carrier
 * waves of different wavelength travel through dark glass beneath the label.
 * On hover the signal locks: the waves swell under the label, the rim
 * lights up and a soft glow spreads underneath.
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
    <span className="astral-wave" aria-hidden="true" />
    <span className="astral-label">{children}</span>
  </Tag>
);

AstralButton.propTypes = {
  as: PropTypes.elementType,
  icon: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
