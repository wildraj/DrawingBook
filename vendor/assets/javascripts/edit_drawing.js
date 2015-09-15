$(function(){

    // Obtain a canvas drawing surface from fabric.js
    var canvas = new fabric.Canvas('edit-canvas', {
        isDrawingMode: true,
    });

    //use for edit
    fabric.Image.fromURL($('.edit-img').attr('src'), function(oImg) {
        canvas.add(oImg);
    });

    //Initially activate brush
    activateBrush();

    // If pencil is selected from the option box
    selectTool();

    // Helper Methods
    function activateBrush(){
        canvas.freeDrawingBrush.color = $('.drawing-color').val();
        canvas.freeDrawingBrush.width = parseInt($('.drawing-line-width').val(),10) || 1
        updateBrush();
    }


    function updateBrush(){
        $('.drawing-line-width').on('change', function(){
            canvas.freeDrawingBrush.width = parseInt($(this).val(), 10) || 1;
            $('.info').html($(this).val());
        });

        $('.drawing-color').on('change', function(){
            canvas.freeDrawingBrush.color = $(this).val();
        });
    }

    function selectTool(){
        $('.drawing-mode-selector').on('change',function(){
            if(this.value === 'Brush'){
                activateBrush();
            }
            else {
                console.log('white');
                canvas.freeDrawingBrush.color = 'white';
                canvas.freeDrawingBrush.width = parseInt($('.drawing-line-width').val(),10) || 1
            }
        });
    }

    // Add event listeners
    $('.clear').on("click", function() {
        canvas.clear();
    });


    var save = function(){
        var imageData = canvas.toDataURL(); //('image/png;base64;');
        uploadImage(imageData).done(function(imageRecord){
            alert('Saved image ' + imageRecord.title);
        }).fail(function(){
            console.error('failed to save image', arguments);
        });
    };

    function uploadImage(data) {
        var fd = new FormData();
        var user_id = window.location.href.split('/')[4];
        fd.append("image[data]", data);
        //Fetches the image id from url
        var image_id = window.location.href.split('/')[4];
        return $.ajax({
           url: "/users/"+user_id+"/images/"+image_id,
           type: "PUT",
           data: fd,
           processData: false,
           contentType: false,
        });
    };

    $('.save').on("click", function(event) {
        event.preventDefault();
        if (confirm("Are you sure you want to save your work?")){
            save();
        }
    });


});


