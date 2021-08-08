const { assert } = require('chai');

const { FUNCTION_DECLARATION, METHOD_DEFINITION } = require("../../../modules/constants/ast-node-types");
const { getFunctionName } = require("../../../modules/function-utils/function-source");
const { buildNodePath } = require("../../../modules/node-path");
const { parse } = require("../../../modules/parser/parser");
const { buildSelectionLocation, buildEditorCoordinates } = require("../../utilities/editor-to-location-selection-builder");
const { readFileSource } = require("../../utilities/file-reader");

describe('function source utils', function () {
    describe('get function name', function () {
        it('gets name from a function declaration', function () {
            const sourceCode = readFileSource(__dirname, 'fixtures/function-source.js');
            const ast = parse(sourceCode);

            const selection = buildSelectionLocation({
                start: buildEditorCoordinates({
                    line: 8,
                    column: 1
                }),
                end: buildEditorCoordinates({
                    line: 8,
                    column: 1
                })
            });

            const selectionPath = buildNodePath(ast, selection);
            selectionPath.reverse();

            const functionNode = selectionPath.find(node => node.type === FUNCTION_DECLARATION);

            const functionName = getFunctionName(functionNode);

            assert.equal(functionName, 'namedTestFunction');
        });
    });

    it('gets name from a method defintion', function () {
        const sourceCode = readFileSource(__dirname, 'fixtures/function-source.js');
        const ast = parse(sourceCode);

        const selection = buildSelectionLocation({
            start: buildEditorCoordinates({
                line: 3,
                column: 1
            }),
            end: buildEditorCoordinates({
                line: 3,
                column: 1
            })
        });

        const selectionPath = buildNodePath(ast, selection);
        selectionPath.reverse();

        const functionNode = selectionPath.find(node => node.type === METHOD_DEFINITION);

        const functionName = getFunctionName(functionNode);

        assert.equal(functionName, 'testMethod');
    });
});