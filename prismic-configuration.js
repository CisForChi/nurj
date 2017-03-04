module.exports = {

  apiEndpoint: 'https://nurj.prismic.io/api',

  // -- Access token if the Master is not open
  // accessToken: 'xxxxxx',

  // OAuth
  // clientId: 'xxxxxx',
  // clientSecret: 'xxxxxx',
  linkResolver: function(doc, ctx) {
    if (doc.type == 'blog') {
      return '/blog';
    }
    if (doc.type == 'thesis') {
      return '/thesis/' + encodeURIComponent(doc.uid);
    }
    return '/';
  }
};
