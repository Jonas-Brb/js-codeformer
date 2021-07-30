const { asyncPrepareActionSetup } = require('../../action-setup');
const { buildExtractionPath } = require('../../ExtractionPathBuilder');
const { getNewSourceEdit } = require('../../SourceEdit');
const { showErrorMessage } = require('../../messageService');
const { validateUserInput } = require('../../validatorService');
const { openInputBox, openSelectList } = require('../../inputService');
const { getSourceSelection } = require('../../source-utilities');

const {
    selectExtractionScopes,
    buildExtractionScopeList
} = require('../../extractionScopeService');

const {
    transformLocationPartToPosition,
    transformLocationToRange
} = require('../../textEditTransforms');

const {
    acceptableNodeTypes,
    buildMethodText,
    buildMethodCallText,
    terminalNodes,
    findAppropriateParameters,
    parseSelectedText,
    selectExtractionLocation
} = require('./extract-method');


function selectExtractionPoint(
    extractionScopeList,
    extractionPath
) {
    return openSelectList({
        values: extractionScopeList,
        title: 'Extract method to where?'
    })

        .then(function (selectedScope) {
            validateUserInput({
                value: selectedScope,
                validator: (selectedScope) => selectedScope !== null,
                message: 'Scope not selected; cannot extract method'
            });

            return selectExtractionScopes(extractionPath, selectedScope);
        });
}


function getMethodName() {
    return openInputBox({ title: 'New method name' })
        .then((methodName) =>
            validateUserInput({
                value: methodName,
                validator: (methodName) => methodName !== '',
                message: 'No method name entered; cannot extract method'
            })
        );
}


function buildEditLocations({
    extractionBlock,
    nodePath,
    actionSetup: { location: selectionLocation }
}) {
    const { start: extractionLocationStart } = selectExtractionLocation(nodePath, extractionBlock);

    return {
        extractionPosition: transformLocationPartToPosition(extractionLocationStart),
        replacementRange: transformLocationToRange(selectionLocation)
    }

}

function retrieveExtractionLocation(extractionPoint) {
    return extractionPoint.extractionScope[0];
}

function getEditedParameters(suggestedParameters) {
    return openInputBox({
        title: 'Edit method parameters',
        value: suggestedParameters.join(', ')
    })
        .then((parameterText) =>
            validateUserInput({
                value: parameterText,
                validator: () => true,
                message: 'Parameter edit canceled; cannot extract method'
            })
        );
}

function extractMethod() {
    let actionSetup = null;
    let sourceSelection = null;

    let nodePath = null;
    let extractionPath = null;
    let extractionScopeList = null;

    let extractionLocation = null;
    let newMethodName = null;
    let parameterText = null;

    let methodText = null;
    let methodCallText = null;

    return asyncPrepareActionSetup()
        .then(function (newActionSetup) {
            actionSetup = newActionSetup;
            sourceSelection = getSourceSelection(actionSetup.source, actionSetup.location);

            nodePath = actionSetup.selectionPath;
            extractionPath = buildExtractionPath(
                actionSetup.selectionPath,
                acceptableNodeTypes,
                terminalNodes
            );
            extractionScopeList = buildExtractionScopeList(extractionPath);
        })

        .then(() => selectExtractionPoint(
            extractionScopeList,
            extractionPath
        ))
        .then((extractionPoint) =>
            extractionLocation = retrieveExtractionLocation(extractionPoint))

        .then(() => getMethodName())
        .then((methodName) =>
            newMethodName = methodName)

        .then(() => parseSelectedText(actionSetup.source, actionSetup.location))
        .then((parsedSelection) => findAppropriateParameters(parsedSelection))
        .then((suggestedParameters) => getEditedParameters(suggestedParameters))
        .then((newParameterText) =>
            parameterText = newParameterText)

        .then(() => buildMethodText({
            destinationType: extractionLocation.type,
            methodName: newMethodName,
            methodBody: sourceSelection,
            parameters: parameterText.split(',').map(parameter => parameter.trim())
        }))
        .then((newMethodText) =>
            methodText = newMethodText)

        .then(() => buildMethodCallText({
            destinationType: extractionLocation.type,
            methodName: newMethodName,
            parameters: parameterText
        }))
        .then((newMethodCallText) =>
            methodCallText = newMethodCallText)

        .then(() =>
            buildEditLocations({
                extractionBlock: extractionLocation,
                nodePath,
                actionSetup
            }))

        .then(({ extractionPosition, replacementRange }) =>
            getNewSourceEdit()
                .addReplacementEdit(replacementRange, methodCallText)
                .addInsertEdit(extractionPosition, methodText + '\n')
                .applyEdit())

        .catch(function (error) {
            showErrorMessage(error.message);
        });
}


module.exports = {
    extractMethod
}