const { asyncPrepareActionSetup } = require("../../action-setup");
const { getNewSourceEdit } = require("../../edit-utils/SourceEdit");
const { transformLocationToRange } = require("../../edit-utils/textEditTransforms");
const { showErrorMessage } = require("../../ui-services/messageService");
const { validateUserInput } = require("../../validatorService");
const { isValidVariableDeclaration, findVariableDeclaration, buildFunctionString } = require("./convert-to-function-declaration");

function convertToFunctionDeclaration() {
    let actionSetup = null;
    let variableDeclaration = null;

    return asyncPrepareActionSetup()
        .then((newActionSetup) => actionSetup = newActionSetup)

    .then(() => findVariableDeclaration(actionSetup.selectionPath))
    .then((newVariableDeclaration) => variableDeclaration = newVariableDeclaration)

    .then(() => validateUserInput({
        value: variableDeclaration,
        validator: isValidVariableDeclaration,
        message: 'Selection must be a variable declaration, and must be assigned a function; cannot convert to function declaration'
    }))

    .then(() => buildFunctionString(variableDeclaration, actionSetup.source))

    .then((functionString) => {
        const replacementRange = transformLocationToRange(variableDeclaration.loc);

        return getNewSourceEdit()
            .addReplacementEdit(replacementRange, functionString)
            .applyEdit();
    })

    .catch(function(error){
        showErrorMessage(error.message);
    });
}

module.exports = {
    convertToFunctionDeclaration
};