module.exports = {
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/andythebreaker\.github\.io\/.*/,
            handler: 'cacheFirst',
        }
    ],
};