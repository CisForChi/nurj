## How to add content to thenurj.com

The NURJ website uses [Prismic](https://prismic.io) to hold our content. It offers a nice editor that makes adding even somewhat complex content to the NURJ website fairly simple.

To begin, visit [nurj.prismic.io](https://nurj.prismic.io) and login with the proper email and password. If you don't know the password, as the EIC. Once you log in, you'll be taken to a screen that lists all the content currently published on thenurj.com. If you're just looking to publish a new thesis, feature, or page, this is all you'll need to modify. Feel free to explore the rest of the editor, but please **do not make changes outside of the content editor unless you're 100% sure of what you're doing.**

From this screen, if you hit "New" in the top right, you'll be able to add any of three content types: a `thesis`, a `feature`, or a `page`. These are separated because different content requires information structured in different ways.

You can jump to more specific instructions on how to create a new post by clicking the following:
- [Thesis](#thesis)
- [Feature](#feature)
- [Page](#page)

### <a name="thesis">Thesis</a>

The thesis contains a lot of fields, and can be a little more complex than your typical blog post. They are:

- `uid`* (unique identifier; you can just paste the title of the thesis here)
- `title`*
- `subtitle`*
- `advisors`
- `published`* (where the thesis was originally published, e.g. "NURJ 2013-14" if it was published in the 2013-14 issue, or "NURJ Online" if it was first published online)
- `type` (e.g. Honors Thesis)
- `department`
- `publish-date`* (the date we published this thesis; if you don't know this you can just say May 1 of the year it was submitted)
- `hero-image` (the big cover image for this thesis)
  - `attribution`
  - `caption`
- `body`
  - `copy` (the actual text of the thesis)
  - `citation` (any superscript citations, e.g. 1. Meehan, Bit. "How to do NURJ Citations...")
  - `quote` (an extended quote which is a part of the actual thesis; note that this is different from a `pullquote`)
- `subhead` (a heading separating parts of the thesis)
- `pullquote` (an excerpt of the thesis pulled out to break up text; this is *not* actually part of the thesis)
- `image-with-caption`
  - `figure` (the actual image itself)
  - `caption` (a caption for the figure, provided by the author)
  - `attribution` (the credit for the figure)
- `byline` (information about the author)
  - `headshot` (a picture of the author)
  - `author`* (the author's name)
  - `bio` (a description of the author)
  - `acknowledgements` (list of acknowledgements provided by the author)
- `bibliography` (a way to cite sources if the author didn't do it inline)

\* this field is required

Filling out this information should be pretty straightforward. One small thing to keep in mind is to be aware of the order in which you add things to the `body`, because a `quote` will always appear after any `copy` in the same group.

*Note:* for inline citations, you don't have to do anything special in the body to turn a [1] into the correct superscript. Just make sure that the citation is formatted exactly like that, with:
- a starting square bracket `[`
- any number
- an ending square bracket `]`

A citation done in a different format may not show up correctly.

### <a name="feature">Feature</a>

Features are simpler than theses, and only have:

- `uid`* (unique identifier; this should be the feature subject's name)
- `subject`* (full name of the person being features)
- `published`* (where this feature was originally published, e.g. "NURJ 2014-15" or "NURJ Online")
- `subtitle`
- `publish-date`*
- `author`* (who wrote the feature)
- `hero-image` (the big cover image for this thesis)
  - `image`
  - `attribution`
  - `caption`
- `body`
  - `copy` (feature text that isn't a question or an answer)
  - `question` (question asked of the feature subject)
  - `answer` (feature subject's answer)
- `pullquote` (an excerpt of the feature pulled out to break up text; this is *not* actually part of the feature)
- `image-with-caption`
  - `figure` (the actual image itself)
  - `attribution`
  - `caption`

### <a name="page">Page</a>

Pages are pretty simple, so they don't have a lot of fields. They are:

- `uid`* (unique identifier; this should just be what the page is about)
- `image`
- `title`*
- `description`

Pages are used for general things around the site. For example, we have an About page at `thenurj.com/about` which just provides more information on what the NURJ is.
