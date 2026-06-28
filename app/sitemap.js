import { reviewSlugs } from "./reviews";

const baseUrl = "https://runningwatchapps.netlify.app";
const lastModified = new Date("2026-05-02T00:00:00+09:00");

export default function sitemap() {
  const staticRoutes = [
    {
      path: "/",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      path: "/guide/",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      path: "/compare/garmin-vs-applewatch/",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/compare/all/",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const reviewRoutes = reviewSlugs.map((slug) => ({
    path: `/review/${slug}/`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...reviewRoutes].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
