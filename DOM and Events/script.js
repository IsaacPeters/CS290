var table = buildTable();
var body = document.body;
body.appendChild(table);

var currentLocation = [0, 0];
document.getElementById("00").style.borderStyle = "dotted";

//create buttons
var left = document.createElement("button");
left.textContent = "left";
left.id = "leftButton";
left.addEventListener("click", function() {
    currentLocation = buttonPressed("left", currentLocation);
});
body.appendChild(left);

var right = document.createElement("button");
right.textContent = "right";
right.id = "rightButton";
right.addEventListener("click", function() {
    buttonPressed("right", currentLocation);
});
body.appendChild(right);

var up = document.createElement("button");
up.textContent = "up";
up.id = "upButton";
up.addEventListener("click", function() {
    buttonPressed("up", currentLocation);
});
body.appendChild(up);

var down = document.createElement("button");
down.textContent = "down";
down.id = "downButton";
down.addEventListener("click", function() {
    buttonPressed("down", currentLocation);
});
body.appendChild(down);

var mark = document.createElement("button");
mark.textContent = "mark cell";
mark.id = "markButton";
mark.addEventListener("click", function() {
    buttonPressed("mark", currentLocation);
});
body.appendChild(mark);

function buttonPressed(direction, location) {
    console.log();
    
    switch (direction) {
        case "left":
            if (location[0] > 0) {
                document.getElementById(location[0] + "" + location[1]).style.borderStyle = "solid";
                location[0]--;
                document.getElementById(location[0] + "" + location[1]).style.borderStyle = "dotted";
            }
            break;
        case "right":
            if (location[0] < 3) {
                document.getElementById(location[0] + "" + location[1]).style.borderStyle = "solid";
                location[0]++;
                document.getElementById(location[0] + "" + location[1]).style.borderStyle = "dotted";
            }
            break;
        case "up":
            if (location[1] > 0) {
                document.getElementById(location[0] + "" + location[1]).style.borderStyle = "solid";
                location[1]--;
                document.getElementById(location[0] + "" + location[1]).style.borderStyle = "dotted";
            }
            break;
        case "down":
            if (location[1] < 2) {
                document.getElementById(location[0] + "" + location[1]).style.borderStyle = "solid";
                location[1]++;
                document.getElementById(location[0] + "" + location[1]).style.borderStyle = "dotted";
            }
            break;
        case "mark":
            document.getElementById(location[0] + "" + location[1]).style.backgroundColor = "yellow";
            break;

    }

    return location;
}

//returns built table to add to 
function buildTable() {
    var table = document.createElement("table");
    table.appendChild(document.createElement("thead"));
    table.firstElementChild.appendChild(document.createElement("tr"));
    console.log(table);
    table = table.firstElementChild.firstElementChild;
    for (var i = 0; i < 4; i++) {
        var newItem = document.createElement("th");
        newItem.textContent = "Header " + (i + 1);
        newItem.id = "H" + (i);
        table.appendChild(newItem);
    }
    table = table.parentElement.parentElement;

    table.appendChild(document.createElement("tbody"));
    table = table.children[1];
    for (var i = 0; i < 3; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < 4; j++) {
            var newItem = document.createElement("td");
            newItem.textContent = (j + 1) + ", " + (i + 1);
            newItem.id = (j) + "" + (i);
            row.appendChild(newItem);
        }

        table.appendChild(row);
    }

    table = table.parentElement;

    table.style.borderStyle = "solid";

    //Styling the Table
    var tableBlocks = table.getElementsByTagName("th");
    for (var i = 0; i < tableBlocks.length; i++) {
        tableBlocks[i].style.borderStyle = "solid";
        tableBlocks[i].style.backgroundColor = "lightgreen";
    }

    tableBlocks = table.getElementsByTagName("td");
    for (var i = 0; i < tableBlocks.length; i++) {
        tableBlocks[i].style.borderStyle = "solid";
    }

    return table;
}