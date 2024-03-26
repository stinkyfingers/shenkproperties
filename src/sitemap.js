const { SitemapStream, streamToPromise } = require( 'sitemap' )
const { Readable } = require( 'stream' )

const hostname = 'https://www.shenkproperties.com';

const links = [
  { url: '/', changefreq: 'daily', priority: 1 },
  { url: '/properties', changefreq: 'monthly', priority: 0.8 },
  { url: '/application', changefreq: 'monthly', priority: 0.8 },
];

// Create a stream to write to
const stream = new SitemapStream( { hostname: 'https://...' } )

// Return a promise that resolves with your XML string
const data = streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
  data.toString()
)
const fs = require('fs');
data.then((resp) => {
  // Write sitemap to public directory
  fs.writeFileSync('./public/sitemap.xml', resp);
});


// node src/sitemap.js