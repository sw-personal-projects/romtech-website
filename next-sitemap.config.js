/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://romtech.bt',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [
    '/auth/signin',
    '/dashboard',
    '/dashboard/**'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth/', '/dashboard/']
      }
    ],
    additionalSitemaps: [
      'https://romtech.bt/sitemap.xml'
    ]
  }
};
