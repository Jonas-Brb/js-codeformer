class Nesting {
    testMethod() {
        return {
            foo: function (a, b) {
                if (a === b) {
                    return []
                } else if(a < b) {
                    return [
                        a,
                        () => { return b; }
                    ];
                } else {
                    return null
                }
            }
        }
    }

    otherMethod() { }
}