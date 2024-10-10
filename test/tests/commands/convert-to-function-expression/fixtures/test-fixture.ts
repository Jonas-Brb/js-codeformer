function functionDeclaration(): void {
    console.log('Just a function declaration');
}

const arrowFunctionExpression = (): number => 5 + 6;

const arrowFunctionExpression1 = (): number => {
    console.log('foo');
    return 5 + 6;
};

class TestClass {
    methodSomething(): number {
        return 1234;
    }
}
