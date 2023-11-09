const getBuildInfo = () => {
  const now = new Date();
  const timeZone = 'UTC';
  const buildTime = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone,
  }).format(now);
  return {
    time: {
      raw: now.toISOString(),
      formatted: `${buildTime} ${timeZone}`,
    }
  };
};

module.exports = {
  // NOTE: `process.env.URL` is provided by Netlify, and may need to be adjusted pending your host
  title: "Randolph Ramble",
  description: "The Randolph Ramble is a 10 kilometer-long, rugged, self-supported trail race through the Great North Woods in the mountain town of Randolph, New Hampshire, at the base of the Northern Presidentials.",
  env: process.env.ELEVENTY_ENV,
  url: process.env.ELEVENTY_ENV === "production" ? "https://randolphramble.com" : "http://localhost:8080",
  og_img: "/images/randolph-6.jpg",
  last_updated: getBuildInfo().time.formatted,
  navigation: [
    {
      "title": "Course",
      "slug": "/course/"
    },
    {
      "title": "Race Info",
      "slug": "/important-info/"
    },
    {
      "title": "Registration",
      "slug": "/registration-schedule/"
    },
    {
      "title": "Sponsors",
      "slug": "/sponsors/"
    },
    {
      "title": "Results",
      "slug": "/results/"
    },
    {
      "title": "Contact",
      "slug": "/contact/"
    }
  ]
};