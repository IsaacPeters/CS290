function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

// Automobile.prototype.logMe = function (auto, doType=true) {
//     if (doType)
//         console.log (auto.year + " " + auto.make + " " + auto.model + " " + auto.type);
//     else {
//         console.log (auto.year + " " + auto.make + " " + auto.model);
//     }
// };

Automobile.prototype.logMe = function (doType=true) {
    if (doType)
        console.log (this.year + " " + this.make + " " + this.model + " " + this.type);
    else {
        console.log (this.year + " " + this.make + " " + this.model);
    }
};

Automobile.prototype.forEach = function (x) {
    x();
}

var typeMap = new Map();
//Roadster Pickup SUV Wagon is the order!
typeMap.set("Roadster", 3);
typeMap.set("Pickup", 2);
typeMap.set("SUV", 1);
typeMap.set("Wagon", 0);

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    if (auto1.year > auto2.year) {
        return -1;
    } else {
        return 1;
    }
    return 0;
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    if (auto1.make < auto2.make) {
        return -1;
    } else {
        return 1;
    }
    return 0;
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    if (typeMap.has(auto1.type) && typeMap.has(auto2.type)) {
        if (typeMap.get(auto1.type) > typeMap.get(auto2.type)) {
            return -1;
        } else {
            return 1;
        }
        return 0;
    }

    if (typeMap.has(auto1.type) && !typeMap.has(auto2.type)) {
        return -1;
    } else if (typeMap.has(auto2.type) && !typeMap.has(auto1.type)) {
        return 1;
    }
    return 0;
}

automobiles.sort(yearComparator);

console.log("\n*****\nThe cars sorted by year are: ");
//Print Automobile
for (i = 0; i < automobiles.length; i++) {
    automobiles[i].logMe(true);
}

automobiles.sort(makeComparator);
console.log("\nThe cars sorted by make are: ");
foreach(Automobile in automobiles) {
    this.logMe(false);
};

automobiles.sort(typeComparator);
console.log("\nThe cars sorted by type are: ");
//Print Automobile


/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */