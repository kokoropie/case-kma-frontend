// module.exports = {
//     async rewrites() {
//       return [
//         {
//           source: '/api/:path*',
//           destination: 'http://127.0.0.1:8000/:path*'
//         }
//       ]
//     }
//   }

module.exports = {

  // Can be safely removed in newer versions of Next.js
  future: {

    // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
    webpack5: true,   
  },

  webpack(config) {
    config.resolve.fallback = {

      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,  

      fs: false, // the solution
    };
    
    return config;
  },
};