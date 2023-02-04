export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': [
            "'self'",
            'data:',
            'blob:',
            '*.amazonaws.com'
          ],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            '*.amazonaws.com'
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            '*.amazonaws.com'
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];


