var event1 = false;

$(document).ready(function(){
    $(".parent2").hide();
    $(".parent3").hide();
    $(".parent3").slideToggle(3000);
    $(".parent2").slideToggle(3000);

    $("#btn1").click(function(){
        AddEdge();
    });

    $("#btn2").click(function(){
        MinimumEnclosingCost();
        clear();
    });
});

$(document).scroll(function(){
    if(window.pageYOffset > 400 && event1 == false){
        event1 = true;
        alert("옹");
    }
    else if(window.pageYOffset <= 400 && event1 == true) event1 = false;
});

var arr = [];

function AddEdge(){
    arr.push([ Number($("#xph").val()), Number($("#yph").val()), Number($("#zph").val()) ]);
    $(".arrList").append(`[${$("#xph").val()}, ${$("#yph").val()}, ${$("#zph").val()}]<br>`);

    $("#xph").val('');
    $("#yph").val('');
    $("#zph").val('');
}

function clear(){
    $(".arrList").remove();
    arr.clear();
}

function getDist(x1, y1, z1, x2, y2, z2){
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
}

function MinimumEnclosingCost(){
    var N = arr.length;
    var x = 0.0;
    var y = 0.0;
    var z = 0.0;

    arr.forEach(function(v){
        x += v[0];
        y += v[1];
        z += v[2];
    });

    x /= N;
    y /= N;
    z /= N;

    var learning = 0.1;
    var result = 0.0, temp = 0.0;
    
    for(var i=0;i<50000;++i){
        var tx = x, ty = y, tz = z;
        result = 0.0;
        var index = 0;
        var j = 0;

        arr.forEach(function(v){
            temp = getDist(tx, ty, tz, v[0], v[1], v[2]);
            if(temp > result){
                result = temp;
                index = j;
            }
            ++j;
        });

        x += (arr[index][0] - x) * learning;
        y += (arr[index][1] - y) * learning;
        z += (arr[index][2] - z) * learning;

        learning *= 0.995;
    }

    alert(`[x: ${x.toPrecision(5)}, y: ${y.toPrecision(5)}, z: ${z.toPrecision(5)}, r: ${result.toPrecision(10)}]`);
}