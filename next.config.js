/**
 * @link https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

module.exports = {
    serverRuntimeConfig: {
        // Will only be available on the server side
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        APP_URL: process.env.APP_URL || "http://localhost:3000",
        WS_URL: process.env.WS_URL || "ws://localhost:3000"
    }
};
