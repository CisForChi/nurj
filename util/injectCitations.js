module.exports = function injectCitations(thesis, linkResolver) {
  var references = []
  if (thesis.get('thesis.references')) {
    var re = /<li>(.*?)<\/li>/g
    var html = thesis.get('thesis.references').asHtml(linkResolver)
    var m

    while ((m = re.exec(html)) !== null) {
      references.push(m[1])
    }
  }

  for (var slice of thesis.getSliceZone('thesis.body').slices) {
    if (slice.sliceType === 'copy') {
      for (var v of slice.value.value) {
        var groups = ['copy', 'quote']

        for (var group of groups) {
          if (v.data[group] !== undefined) {
            for (var copy of v.data[group].value) {
              var re = /\[(\d|,|\s)*\]/g
              if (copy.spans === undefined) {
                copy.spans = []
              }

              while ((match = re.exec(copy.text)) !== null) {
                let span = {
                  start: match.index,
                  end: match.index + match[0].length,
                  type: "hyperlink",
                  data: {
                    type: "Link.web",
                    value: {
                      url: match[0]
                    }
                  },
                  url: match[0]
                }

                if (copy.spans.find(x => x.url === match[0]) === undefined) {
                  copy.spans.push(span)
                }

                if (references.length > 0) {
                  var numRe = /\d+/g
                  var i
                  var cite = match[0]
                  if ((i = numRe.exec(cite)) !== null) {
                    if (v.data.citation == undefined) {
                      v.data.citation = {
                        type: "StructuredText",
                        value: []
                      }

                      v.fragments.citation = {
                        blocks: []
                      }
                    }

                    if (v.data.citation.value.find(x => parseInt(/^\d+/.exec(x.text)[0]) == i[0]) === undefined) {
                      v.fragments.citation.blocks.push({
                        type: "paragraph",
                        text: "" + parseInt(i[0]) + ". " + references[parseInt(i[0])-1],
                        spans: []
                      })

                      v.data.citation.value.push({
                        type: "paragraph",
                        text: "" + parseInt(i[0]) + ". " + references[parseInt(i[0])-1],
                        spans: []
                      })
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
