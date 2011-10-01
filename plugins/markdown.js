/**
    @overview Translate doclet descriptions from MarkDown into HTML.
    @module plugins/markdown
    @author Michael Mathews <micmath@gmail.com>
 */

var mdParser = require('evilstreak/markdown');

/**
    Translate markdown syntax in a new doclet's description into HTML. Is run
    by JSDoc 3 whenever a "newDoclet" event fires.
 */
exports.newDoclet = function(e) {
    if (e.doclet.description) {
        e.doclet.description = mdParser.toHTML(e.doclet.description)
            .replace( /&amp;/g, "&" ) // because markdown escapes these
            .replace( /&lt;/g, "<" )
            .replace( /&gt;/g, ">" );
    }
    if (e.doclet.params) {
        for (i in e.doclet.params) {
            e.doclet.params[i].description = mdParser.toHTML(e.doclet.params[i].description)
              .replace( /^<p>/g, "" ) // remove initial <p>
              .replace( /<\/p>$/g, "" ) // remove trailing </p>
              .replace( /&amp;/g, "&" ) // because markdown escapes these
              .replace( /&lt;/g, "<" )
              .replace( /&gt;/g, ">" );
 
        }
    }
};
