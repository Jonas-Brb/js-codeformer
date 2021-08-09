const { first, last } = require("../core-utils");
const { getSourceSelection } = require("../source-utilities");


function getParametersLocation(parameterNodes) {
    const startLocation = first(parameterNodes).loc.start;
    const endLocation = last(parameterNodes).loc.end;

    return {
        start: startLocation,
        end: endLocation
    }
}

function getFunctionParametersString(functionNode, sourceText) {
    const functionHasValueNode = typeof functionNode.value !== 'undefined';
    const parameterNodes = functionHasValueNode
        ? functionNode.value.params
        : functionNode.params;

    if (parameterNodes.length > 0) {
        const parametersLocation = getParametersLocation(parameterNodes);

        return getSourceSelection(sourceText, parametersLocation);
    } else {
        return '';
    }
}

function getBodyNodeFromFunctionNode(functionNode) {
    return typeof functionNode.value !== 'undefined'
        ? functionNode.value.body
        : functionNode.body
}

function buildLocationFromBodyNodes(functionBodyNodes) {
    const firstLocation = first(functionBodyNodes).loc;
    const lastLocation = last(functionBodyNodes).loc;

    return {
        start: firstLocation.start,
        end: lastLocation.end
    };
}

function getBodyLocation(functionBody) {
    return Array.isArray(functionBody.body)
        ? buildLocationFromBodyNodes(functionBody.body)
        : functionBody.loc;
}

function getFunctionBody(functionNode, sourceText) {
    const functionBody = getBodyNodeFromFunctionNode(functionNode);
    const bodyLocation = getBodyLocation(functionBody);

    return getSourceSelection(sourceText, bodyLocation);
}

function getFunctionName(functionNode) {
    if (Boolean(functionNode.id)) {
        return functionNode.id.name;
    } else if (Boolean(functionNode.key)) {
        return functionNode.key.name;
    } else {
        return '';
    }
}

module.exports = {
    getFunctionBody,
    getFunctionName,
    getFunctionParametersString
};