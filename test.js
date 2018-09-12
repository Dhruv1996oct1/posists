var readLine = require('readline-sync');
var sha1 = require('sha1');

var list = [];

function structureOfNode() {
    structure_of_node = {
        timestamp: null,
        data: null,
        ownerId: null,
        value: null,
        ownerName: null,
        nodeNumber: null,
        nodeId: null,
        referenceNodeId: null,
        childReferenceNodeId: null,
        genesisReferenceNodeId: null,
        hashValue: null
    }
    return structure_of_node;
}

function createGenesisNode(obj) {
    list.push(obj);
}

function inputForGenesisNode() {
    console.log("Enter Genesis node properties");
    let obj = new structureOfNode();
    obj.timestamp = new Date();
    obj.ownerId = readLine.question("owenerId : ");
    obj.value = eval(readLine.question("value : "));
    obj.ownerName = readLine.question("owner Name :");
    obj.data = obj.ownerId + obj.value + obj.ownerName + sha1(obj.ownerId + obj.value + obj.ownerName);
    obj.nodeNumber = 1;
    obj.nodeId = generateId();
    obj.referenceNodeId = generateId();
    obj.childReferenceNodeId = [];
    obj.genesisReferenceNodeId = obj.referenceNodeId;
    createGenesisNode(obj);
}

function createChildNode() {
    let ch = "yes";
    while (ch == "yes") {
        let found = false;
        console.log("\n");
        parent = readLine.question("Enter the parent owner name : ");

        var obj = setChildObject();
        try {
            if (obj) {
                list.forEach((par) => {
                    if (par.ownerName == parent) {
                        if (par.childReferenceNodeId.length == 0) {
                            if (par.value > obj.value) {
                                par.childReferenceNodeId.push(obj.nodeId);
                                list.push(obj);
                                console.log("\n");
                                console.log("child added");
                                console.log("\n");
                                return;
                            }
                            else {
                                console.log("Can not enter child as its value is greater than it's parent");
                                return;
                            }
                        }
                        else {
                            let sum = 0;
                            par.childReferenceNodeId.forEach((child) => {
                                let item = list.find((c) => {
                                    return c.nodeId == child;
                                });
                                sum += item.value;
                            });
                            sum += obj.value;
                            if (sum > par.value) {
                                console.log("Can not enter child as its value is greater than it's parent");
                                return;;
                            }
                            else {
                                par.childReferenceNodeId.push(obj.nodeId);
                                list.push(obj);
                                console.log("\n");
                                console.log("child added");
                                console.log("\n");
                                return;
                            }
                        }
                        found = !found;
                    }
                });
            }
        }
        catch (err) {
            console.log(err);
        }
        console.log("\n");
        ch = readLine.question("Want to add more (yes|no) : ");
    }
    console.log(list);
}

function setChildObject() {
    let obj = new structureOfNode();
    obj.timestamp = new Date();
    obj.ownerId = readLine.question("owenerId : ");
    obj.value = readLine.question("value : ");
    obj.ownerName = readLine.question("owner Name :");
    obj.data = obj.ownerId + obj.value + obj.ownerName + sha1(obj.ownerId + obj.value + obj.ownerName);;
    obj.nodeNumber = 1;
    obj.nodeId = generateId();
    obj.referenceNodeId = generateId();
    obj.childReferenceNodeId = [];
    obj.genesisReferenceNodeId = obj.referenceNodeId;

    return obj;
}

function generateId() {
    var id = function () {
        return Math.floor(Math.random() * 100000) + 15000;
    }
    return id();
}


function initiate() {
    inputForGenesisNode();
    createChildNode();

    let ch = readLine.question("Want to edit a node ? (yes/no) :");

    while (ch == "yes") {
        let name = readLine.question("Enter owner name which you want to edit : ");
        list.forEach((item) => {
            if (item.ownerName == name) {
                let value = readLine.question("Enter new value :");
                item.value = value;
                console.log("value changed");
            }
        });
        ch = readLine.question("Want to edit a node ? (yes/no) :");
    }

    console.log(list);

}

initiate();





