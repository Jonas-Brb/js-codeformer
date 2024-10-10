const functionExpression = function (): void {
    console.log('boo');
};

const arrowFunctionExpression = (): number => 1 + 2;

const multilineArrowFunctionExpression = (): void => {
    console.log('yay');
    console.log('something');
};

const namedFunctionExpression = function notTheSameAsTheVarName (): void {
    console.log('boo');
};

const declarator1 = 'foo',
declarator2 = function notTheSameAsTheVarName (): void {
    console.log('boo');
};
