const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

async function generateSitemap(hostname, newsList) {
  const smStream = new SitemapStream({ hostname });
  
  // صفحات ثابت
  smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  smStream.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });
  smStream.write({ url: '/contact', changefreq: 'monthly', priority: 0.7 });

  // صفحات داینامیک از دیتابیس
  newsList.forEach(news => {
    smStream.write({
      url: `/news/${news.shortId}`,
      changefreq: 'daily',
      priority: 0.9,
      lastmod: news.updatedAt,
    });
  });

  smStream.end();
  return await streamToPromise(smStream);
}

module.exports = { generateSitemap };
