/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_AUTH_URL + "/api" || "http://localhost:3000",
  generateRobotsTxt: true, // (optional)
  // ...other options
};
