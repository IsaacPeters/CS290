function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
//         var item = function(x) { return 'item' + list[x]}(i);
        result.push( function(x) { return function() {console.log('item' + list[x] +' ' + list[x])} }(i) );
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([2,6,6]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();