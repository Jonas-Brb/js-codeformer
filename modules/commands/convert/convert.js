const actions = require('../../../actions');
const { groups: { CONVERSIONS } } = require('../../../groups');

function getActionTitles() {
    const actionTitles = actions
        .filter(action => action.group === CONVERSIONS)
        .map(action => action.title);

    actionTitles.sort();

    return actionTitles;
}

function findCommandIdByTitle(actionTitle) {
    return actions
        .filter(action =>
            action.title === actionTitle)[0].commandId;
}

module.exports = {
    getActionTitles,
    findCommandIdByTitle
}