$(function(){

    // Obtain a canvas drawing surface from fabric.js
    var image_id = 0;
    var canvas = new fabric.Canvas('new-canvas', {
        isDrawingMode: true,
    });

    // use for edit
    // fabric.Image.fromURL(drawingbook.image_path, function(oImg) {
    //     canvas.add(oImg);
    // });

    //Initially activate brush
    activateBrush();

    // If pencil is selected from the option box
    selectTool();

    // Helper Methods
    function activateBrush(){
        canvas.freeDrawingBrush.color = $('.drawing-color').val();
        canvas.freeDrawingBrush.width = parseInt($('.drawing-line-width').val(),10) || 1
        //reset image_id if a new image is created
        updateBrush();
        image_id = 0;
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


    var saveOrCreate = function(){
        var imageData = canvas.toDataURL(); //('image/png;base64;');
        uploadImage(imageData).done(function(imageRecord){
            alert('Saved image ' + imageRecord.title);
            image_id = imageRecord.id;
            //console.log(image_id);
        }).fail(function(){
            console.error('failed to save image', arguments);
        });
    };

    function uploadImage(data) {
        var fd = new FormData();
        var user_id = window.location.href.split('/')[4];
        if (image_id === 0){

            var title = prompt('Enter the title of your work.');
            var url = "/users/"+user_id+"/images";
            var type = "POST";
            fd.append("image[title]", title);
        }
        else{
            var url = "/users/"+user_id+"/images/"+image_id;
            var type = "PUT";
        }
        fd.append("image[data]", data);
        return $.ajax({
           url: url,
           type: type,
           data: fd,
           processData: false,
           contentType: false,
        });
    };

    $('.save-or-create').on("click", function(event) {
        event.preventDefault();
        if (confirm("Are you sure you want to save your work?")){
            saveOrCreate();
        }
    });


});


