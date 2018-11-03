module.exports = {
    host: process.env.HOST_NAME,
    port: process.env.PORT || 3000,
    secret: process.env.SECRET_KEY || 'default secret',
    connectStr: process.env.DB_CONNECT_STRING,
    mode: process.env || 'production',
};