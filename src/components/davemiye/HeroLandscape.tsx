export default function HeroLandscape() {
  return (
    <div className="dm-hero-landscape" aria-hidden="true">
      <svg
        className="dm-hero-landscape-svg"
        viewBox="0 0 2048 671"
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
        focusable="false"
      >
        <defs>
          <clipPath id="dm-hero-landscape-clip" clipPathUnits="userSpaceOnUse">
            <rect width="2048" height="671" rx="16" ry="16" />
          </clipPath>
        </defs>
        <image
          className="dm-hero-landscape-image dm-hero-landscape-image--light"
          href="/images/hero-landscape-light.gif"
          x="0"
          y="0"
          width="2048"
          height="671"
          preserveAspectRatio="xMidYMid meet"
          clipPath="url(#dm-hero-landscape-clip)"
        />
        <image
          className="dm-hero-landscape-image dm-hero-landscape-image--dark"
          href="/images/hero-landscape-dark.gif"
          x="0"
          y="0"
          width="2048"
          height="671"
          preserveAspectRatio="xMidYMid meet"
          clipPath="url(#dm-hero-landscape-clip)"
        />
      </svg>
    </div>
  );
}
