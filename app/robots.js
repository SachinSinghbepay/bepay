export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/blogDashboard/'],
    },
    sitemap: 'https://www.bepay.money/sitemap.xml',
  }
}
