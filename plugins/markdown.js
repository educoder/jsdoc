/**
    @overview Translate doclet descriptions from MarkDown into HTML.
    @module plugins/markdown
    @author Michael Mathews <micmath@gmail.com>
 */

var mdParser = require('evilstreak/markdown');

function stripDefaultParagraph(html) {
    return html.replace( /^<p>/g, "" ) // remove initial <p>
               .replace( /<\/p>$/g, "" ) // remove trailing </p>
}

function unescapeEntities(html) {
    return html.replace( /&amp;/g, "&" ) // because markdown escapes these
               .replace( /&lt;/g, "<" )
               .replace( /&gt;/g, ">" );
}

/**
    Translate markdown syntax in a new doclet's description into HTML. Is run
    by JSDoc 3 whenever a "newDoclet" event fires.
 */
exports.newDoclet = function(e) {
    if (e.doclet.description) {
        html = mdParser.toHTML(e.doclet.description)
        e.doclet.description = unescapeEntities(html)
     }
    if (e.doclet.params) {
        for (i in e.doclet.params) {
            html = mdParser.toHTML(e.doclet.params[i].description)
            html = unescapeEntities(stripDefaultParagraph(html))
            e.doclet.params[i].description = html
        }
    }
    if (e.doclet.returns) {
        for (i in e.doclet.returns) {
            html = mdParser.toHTML(e.doclet.returns[i].description)
            html = unescapeEntities(stripDefaultParagraph(html))
            e.doclet.returns[i].description = html
        }
    }
};
