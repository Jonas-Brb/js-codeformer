const { findSymbolToRename } = require("../../../../modules/commands/rename/rename");
const { buildNodePath } = require("../../../../modules/node-path");
const { buildLocationFromEditorCoordinates, buildEditorCoordinates } = require("../../../utilities/editor-to-location-selection-builder");
const { readFileSource } = require("../../../utilities/file-reader");
const { parse } = require('../../../../modules/parser/parser');

require('../../../utilities/approvals').configure();

describe('select literal or associated node for rename', function () {
    it('selects a simple variable name', function () {
        const selection = buildLocationFromEditorCoordinates({
            start: buildEditorCoordinates({ line: 4, column: 20 }),
            end: buildEditorCoordinates({ line: 4, column: 20 })
        });

        const fixtureText = readFileSource(__dirname, 'fixtures/identifier-selection-fixture.js');
        const parsedSource = parse(fixtureText)
        const selectionPath = buildNodePath(parsedSource, selection);

        const symbolToRename = findSymbolToRename(selectionPath);

        this.verifyAsJSON(symbolToRename);
    });

    it('selects a function name', function () {
        const selection = buildLocationFromEditorCoordinates({
            start: buildEditorCoordinates({ line: 3, column: 20 }),
            end: buildEditorCoordinates({ line: 3, column: 20 })
        });

        const fixtureText = readFileSource(__dirname, 'fixtures/identifier-selection-fixture.js');
        const parsedSource = parse(fixtureText)
        const selectionPath = buildNodePath(parsedSource, selection);

        const symbolToRename = findSymbolToRename(selectionPath);

        this.verifyAsJSON(symbolToRename);
    });
});