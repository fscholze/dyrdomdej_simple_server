export default ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'dyrdomdej'),
      user: env('DATABASE_USERNAME', 'dyrdoadmin'),
      password: env('DATABASE_PASSWORD', 'mep$hoxagog+6jemkmap1l3v4c'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});