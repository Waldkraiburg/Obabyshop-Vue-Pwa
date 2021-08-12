module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  },
  pwa: {
    name: "Obabyshop",
    themeColor: "#26827b",
    msTileColor: "#fff",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#26827b",
    manifestPath: 'manifest.json',
    
    pwa: {
      // configure the workbox plugin
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
          swSrc: './src/service-worker.js',
          exclude: [/_redirects/],
      }
  }
  },
};
