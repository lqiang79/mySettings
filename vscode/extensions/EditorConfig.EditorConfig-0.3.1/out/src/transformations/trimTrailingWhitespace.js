'use strict';
const vscode_1 = require('vscode');
/**
 * Transform the textdocument by trimming the trailing whitespace.
 */
function transform(editorconfig, editor, textDocument) {
    const editorTrimsWhitespace = vscode_1.workspace
        .getConfiguration('files')
        .get('trimTrailingWhitespace', false);
    if (editorTrimsWhitespace) {
        if (editorconfig.trim_trailing_whitespace === false) {
            vscode_1.window.showWarningMessage([
                'The trimTrailingWhitespace workspace or user setting is',
                'overriding the EditorConfig setting for this file.'
            ].join(' '));
        }
        return Promise.resolve([true]);
    }
    if (!editorconfig.trim_trailing_whitespace) {
        return Promise.resolve([true]);
    }
    const trimmingOperations = [];
    for (let i = 0; i < textDocument.lineCount; i++) {
        trimmingOperations.push(trimLineTrailingWhitespace(textDocument.lineAt(i)));
    }
    return Promise.all(trimmingOperations);
    function trimLineTrailingWhitespace(line) {
        const trimmedLine = trimTrailingWhitespace(line.text);
        if (trimmedLine === line.text) {
            return Promise.resolve(true);
        }
        return editor.edit(edit => {
            const whitespaceBegin = new vscode_1.Position(line.lineNumber, trimmedLine.length);
            const whitespaceEnd = new vscode_1.Position(line.lineNumber, line.text.length);
            const whitespace = new vscode_1.Range(whitespaceBegin, whitespaceEnd);
            edit.delete(whitespace);
        });
    }
}
exports.transform = transform;
function trimTrailingWhitespace(input) {
    return input.replace(/[\s\uFEFF\xA0]+$/g, '');
}
//# sourceMappingURL=trimTrailingWhitespace.js.map