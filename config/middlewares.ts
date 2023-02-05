const BUCKET = process.env.AWS_BUCKET;
const BUCKET_URL = `https://${BUCKET}.s3.amazonaws.com`;

export default [
  'strapi::errors',
    {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            BUCKET_URL],
          'media-src': ["'self'", 'data:', 'blob:', 'dl.airtable.com', BUCKET_URL],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];


