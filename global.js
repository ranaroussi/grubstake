function fillRange(ele) {
    var id = ele.attr('id');
    var width = ele.width();
    var value = parseFloat(ele.val(), 2);
    var min = parseInt(ele.attr('min'), 0) || 0;
    var max = parseInt(ele.attr('max'), 0) || 0;

    if (ele.attr("step").indexOf(".") !== -1) {
        $('output[for="'+ ele.attr('id') +'"]').html(value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    } else {
        $('output[for="'+ ele.attr('id') +'"]').html(value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }

    var loc = value/(max-min);
        loc = (loc > 1) ? 1 : loc;
    var slider_width = loc * width;

    ele.removeClass("rounded");
    if (loc > 0 && loc < .2) {
        ele.addClass("rounded");
        slider_width  += 10;
    } else if (loc > .4) {
        slider_width  -= 10;
        if (loc > .7) ele.addClass("rounded");
    }
    $("style#"+id).remove();
    $("body").append('<style id="'+id+'"> input[type="range"]#'+id+':before{width:'+slider_width+'px;} </style>');
}

function calcTotal() {
    var monthly = $('input[name="monthly"]').val();
    var apr = $('input[name="apr"]').val()/100;
    var need = monthly*12/apr + (monthly*12);
    $("output#need span").html(need.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}

$(document).ready(function() {
    $('input[type="range"].widget').each(function(index){
        var id = $(this).attr('id');
        if (!id) {
            $(this).attr('id', $(this).attr('name') || 'range_'+index);
        }
        var output = $('output[for="'+ $(this).attr('id') +'"]');
        if (output.length == 0) {
            $(this).after($('<output for="'+ $(this).attr('id') +'"></output>'));
        }

        var slider = $('<div class="slider" id="'+ $(this).attr('id') +'"></div>');
        $(this).before(slider);

        $(this).appendTo(slider);
        $('output[for="'+ $(this).attr('id') +'"]').appendTo(slider);

        fillRange($(this));

    }).on("input", function(){
        fillRange($(this))
    });

    calcTotal();

    $('input[type="range"].widget').on("input", calcTotal);
});