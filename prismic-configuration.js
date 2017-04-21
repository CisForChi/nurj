module.exports = {
  apiEndpoint: 'https://nurj.prismic.io/api',

  // -- Access token if the Master is not open
  // accessToken: 'xxxxxx',

  // OAuth
  // clientId: 'xxxxxx',
  // clientSecret: 'xxxxxx',
  linkResolver: function(doc, ctx) {
    if (doc.type == 'thesis') {
      return '/theses/' + encodeURIComponent(doc.uid);
    }

    if (doc.type == 'feature') {
      return '/features/' + encodeURIComponent(doc.uid);
    }

    if (doc.type == 'issue') {
      return '/issues/' + encodeURIComponent(doc.uid);
    }
    return '/';
  }
};
