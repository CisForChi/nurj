module.exports = function injectCitations(thesis) {
  for (var slice of thesis.getSliceZone('thesis.body').slices) {
    if (slice.sliceType == 'copy') {
      for (var v of slice.value.value) {
        if (v.data.copy !== undefined) {
          for (var copy of v.data.copy.value) {
            var re = /\[\d*\]/g
            copy.spans = []
            while ((match = re.exec(copy.text)) != null) {
              copy.spans.push({
                start: match.index,
                end: match.index + match[0].length,
                type: "hyperlink",
                data: {
                  type: "Link.web",
                  value: {
                    url: match[0]
                  }
                }
              })
            }
          }
        }
        if (v.fragments.copy !== undefined) {
          for (var copy of v.fragments.copy.blocks) {
            var re = /\[\d*\]/g
            copy.spans = []
            while ((match = re.exec(copy.text)) != null) {
              copy.spans.push({
                start: match.index,
                end: match.index + match[0].length,
                type: "hyperlink",
                data: {
                  type: "Link.web",
                  value: {
                    url: match[0]
                  }
                }
              })
            }
          }
        }
      }
    }
  }
}
