// Slow-drifting nebula fog behind the starfield. The far bank fades from
// fuchsia to cyan and a "dawn" glow rises as --scroll-p (set by
// ScrollProgressBar) goes from 0 at the top of the page to 1 at the bottom.
export const Atmosphere = () => (
  <div className="atmo" aria-hidden="true">
    <i className="atmo-fog atmo-fog--a" />
    <i className="atmo-fog atmo-fog--b" />
    <i className="atmo-fog atmo-fog--c" />
    <i className="atmo-dawn" />
  </div>
);
