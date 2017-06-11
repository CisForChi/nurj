module.exports = function injectCitations(thesis) {
  for (var slice of thesis.getSliceZone('thesis.body').slices) {
    if (slice.sliceType == 'copy') {
      for (var v of slice.value.value) {
        var groups = ['copy', 'quote']

        for (var group of groups) {
          if (v.data[group] !== undefined) {
            for (var copy of v.data[group].value) {
              var re = /\[(\d|,|\s)*\]/g
              if (copy.spans == undefined) {
                copy.spans = []
              }

              while ((match = re.exec(copy.text)) != null) {
                let span = {
                  start: match.index,
                  end: match.index + match[0].length,
                  type: "hyperlink",
                  data: {
                    type: "Link.web",
                    value: {
                      url: match[0]
                    }
                  }
                }

                if (copy.spans.find(x => x.url === match[0]) === undefined) {
                  copy.spans.push(span)
                }
              }
            }
          }
        }
      }
    }
  }
}
