'use strict';
const vscode_1 = require('vscode');
const lineEndings = {
    cr: '\r',
    crlf: '\r\n'
};
/**
 * Transform the textdocument by inserting a final newline.
 */
function transform(editorconfig, editor, textDocument) {
    const lineCount = textDocument.lineCount;
    if (!editorconfig.insert_final_newline || lineCount === 0) {
        return Promise.resolve();
    }
    const lastLine = textDocument.lineAt(lineCount - 1);
    const lastLineLength = lastLine.text.length;
    if (lastLineLength === 0) {
        return Promise.resolve();
    }
    return editor.edit(edit => {
        const pos = new vscode_1.Position(lastLine.lineNumber, lastLineLength);
        return edit.insert(pos, newline(editorconfig));
    });
}
exports.transform = transform;
function newline(editorconfig) {
    if (!editorconfig.end_of_line) {
        return '\n';
    }
    return lineEndings[editorconfig.end_of_line.toLowerCase()] || '\n';
}
//# sourceMappingURL=insertFinalNewline.js.map