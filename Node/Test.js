function deepEqual(inputA, inputB) {
    if ((typeof inputA == "object" && inputA != null) && (typeof inputB == "object" && inputB != null)) {
        for (var propA in inputA) {
            var bothHave = false;
            for (var propB in inputB) {
                if ((typeof inputA[propA] == "object" && inputA[propA] != null) && (typeof inputB[propB] == "object" && inputB[propB] != null)) {
                    if (deepEqual(inputA[propA], inputB[propB])) {
                        bothHave = true;
                        break;
                    }
                } else if (inputA[propA] === inputB[propB]) {
                    bothHave = true;
                    break;
                }
            }
            if (!bothHave) {
                return false;
            }
        }
    } else {
        if (inputA !== inputB) {
            return false;
        }
    }

    return true;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true