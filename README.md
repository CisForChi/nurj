## nurj website

this is the app powering the nurj website. this project uses [prismic](https://prismic.io) as the CMS backend and pug templates to render files.

## get started
install [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). the recommended way of doing this is through [nvm](https://github.com/creationix/nvm).

once you have npm, type the following into your command line:
```
npm clone git@github.com:nurj/nurj.git
cd nurj
npm install
npm install nodemon -g
```

once you've done that, you can start the app by typing `nodemon` while inside the project directory. this will launch the app, and you can view it by going to `localhost:3000` in your web browser.

to recompile the stylesheets as you make changes, open another window, navigate into this project directory, and run `npm run watch-scss`

## miscellaneous tech stuff
Our domain is [thenurj.com](http://www.thenurj.com). Our website was previously hosted on Squarespace, and the legacy site is still available at [nurj.squarespace.com](https://nurj.squarespace.com). That site will continue to stay up as an archive in case we need to go back and retreive any information, but it will not and should not be updated.

Our domain is registered through Google Domains, and our account is accessible through the NURJ email.
