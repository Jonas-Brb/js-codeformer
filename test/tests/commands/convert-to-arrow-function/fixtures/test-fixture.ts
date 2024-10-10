class MyTestClass {
    something(): {someProperty: 'someValue'} {
        console.log('This is a test');
        return {someProperty: 'someValue'};
    }
}

const somethingOrOther = function (): {someProperty: 'someValue'} {
    const a = 12345;
    console.log(a);
    return {someProperty: 'someValue'};
}

function someDeclaration(): {someProperty: 'someValue'} {
    console.log('yay');
    return {someProperty: 'someValue'};
}

const namedExpression = function namedExpression(): {someProperty: 'someValue'} {
    console.log('Oh noes!!');

    return {someProperty: 'someValue'};
}
