module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/podReads'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
 }
}
