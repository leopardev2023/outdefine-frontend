export const default_background_colors = [
  "bg-orange",
  "bg-odf",
  "bg-coral-red",
  "bg-blue2",
  "bg-purple",
  "bg-white",
];

export const default_banners = [
  {
    tile: "/app/common/banner/BANNER-TILE-1.png",
    image: "/app/common/banner/DEFAULT-BANNER-1.jpg",
  },
  {
    tile: "/app/common/banner/BANNER-TILE-2.png",
    image: "/app/common/banner/DEFAULT-BANNER-2.jpg",
  },
  {
    tile: "/app/common/banner/BANNER-TILE-3.png",
    image: "/app/common/banner/DEFAULT-BANNER-3.jpg",
  },
  {
    tile: "/app/common/banner/BANNER-TILE-4.png",
    image: "/app/common/banner/DEFAULT-BANNER-4.jpg",
  },
  {
    tile: "/app/common/banner/BANNER-TILE-5.png",
    image: "/app/common/banner/DEFAULT-BANNER-5.jpg",
  },
  {
    tile: "/app/common/banner/BANNER-TILE-6.png",
    image: "/app/common/banner/DEFAULT-BANNER-6.jpg",
  },
];

export const default_logos = [
  "/app/common/logo/DEFAULT-LOGO-1.png",
  "/app/common/logo/DEFAULT-LOGO-2.png",
  "/app/common/logo/DEFAULT-LOGO-3.png",
  "/app/common/logo/DEFAULT-LOGO-4.png",
  "/app/common/logo/DEFAULT-LOGO-5.png",
];

export const default_women_avatars = new Array(6)
  .fill(undefined)
  .map((_elem, index) => {
    return `/app/common/avatar/DEFAULT-WOMEN-${index + 1}.png`;
  });

export const default_men_avatars = new Array(6)
  .fill(undefined)
  .map((_elem, index) => `/app/common/avatar/DEFAULT-MAN-${index + 1}.png`);

export const default_avatars = [
  ...default_men_avatars,
  ...default_women_avatars,
];
