$(document).ready(() => {
    currentActive = ""
    brightness = 100
    Saturation = 100
    Inverstion = 0
    Grayscale = 0
    imageObjectfit = 0
    rotate = 0
    function applyFilter(){
        $('#image').css({WebkitFilter:"brightness("+brightness+"%) saturate("+Saturation+"%) invert("+Inverstion/100+") grayscale("+Grayscale+"%)"})
    }
    // Brightness on change
    $(document).on('change', '#brightness', function() {
        val = $(this).val()
        brightness = val 
        $('#brightnessPer').html(Math.round(val)+"%")
        applyFilter()
    })
    // Saturation on change
    $(document).on('change', '#Saturation', function() {
        val = $(this).val()
        Saturation = val
        $('#SaturationPer').html(Math.round(val)+"%")
        applyFilter()

    })
    // Inverstion on change
    $(document).on('change', '#Inverstion', function() {
        val = $(this).val()
        Inverstion = val
        $('#InverstionPer').html(val+"%")
        applyFilter()

    })
    // Grayscale on change
    $(document).on('change', '#Grayscale', function() {
        val = $(this).val()
        Grayscale = val 
        $('#GrayscalePer').html(val+"%")
        applyFilter()

    })

     // objectfit
     $("#rotateleft").click(function(){
         rotate += 90
        $('#image').css({"object-fit":"contain"})
        $('#image').css({"transform":"translate(-50%,-50%) rotate(-"+rotate+"deg);"})
    })
    $("#rotateright").click(function(){
        rotate += 90
        $('#image').css({"object-fit":"contain"})
        $('#image').css({"transform":"translate(-50%,-50%) rotate("+rotate+"deg)"})
    })
    // objectfit
    $("#imageObjectfit").click(function(){
        if(imageObjectfit == 0){
        $('#image').css({"object-fit":"cover"})
        imageObjectfit = 1
        }else if(imageObjectfit == 1){
            $('#image').css({"object-fit":"contain"})
            imageObjectfit = 0
        }
    })

   

    function OnButtonChange(){
        if(currentActive == '1'){
            $('#sliderItem1').attr('class','sliderItem')
            $('#sliderItem2').attr('class','sliderItemHide')
            $('#sliderItem3').attr('class','sliderItemHide')
            $('#sliderItem4').attr('class','sliderItemHide')
            Brightness()
        }else if(currentActive == '2'){
            $('#sliderItem1').attr('class','sliderItemHide')
            $('#sliderItem2').attr('class','sliderItem')
            $('#sliderItem3').attr('class','sliderItemHide')
            $('#sliderItem4').attr('class','sliderItemHide')
        }else if(currentActive == '3'){
            $('#sliderItem1').attr('class','sliderItemHide')
            $('#sliderItem2').attr('class','sliderItemHide')
            $('#sliderItem3').attr('class','sliderItem')
            $('#sliderItem4').attr('class','sliderItemHide')
        }else if(currentActive == '4'){
            $('#sliderItem1').attr('class','sliderItemHide')
            $('#sliderItem2').attr('class','sliderItemHide')
            $('#sliderItem3').attr('class','sliderItemHide')
            $('#sliderItem4').attr('class','sliderItem')
        }else{
            $('#sliderItem1').attr('class','sliderItem')
            $('#sliderItem2').attr('class','sliderItemHide')
            $('#sliderItem3').attr('class','sliderItemHide')
            $('#sliderItem4').attr('class','sliderItemHide')
        }
    }



    $('.filterButtonContainer button').click(function(){
        $('.filterButtonContainer button').attr('class','filterButton')
        $(this).attr('class','filterButtonActive')
        currentActive = $(this).attr('data')
        OnButtonChange()
    })

    $('#imgInp').change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $('#image').attr('src', event.target.result);
                $('.rightImageContainer').css({'background-image':'none'})
            }
            reader.readAsDataURL(file);
        }
    });


    const saveImage = () => {
        const previewImg = document.querySelector("#image");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = previewImg.naturalWidth;
        canvas.height = previewImg.naturalHeight;
        
        ctx.filter = "brightness("+brightness+"%) saturate("+Saturation+"%) invert("+Inverstion/100+") grayscale("+Grayscale+"%)";
        ctx.translate(canvas.width / 2, canvas.height / 2);
        if(rotate !== 0) {
            ctx.rotate(rotate * Math.PI / 180);
        }
        ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        
        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = canvas.toDataURL();
        link.click();
    }

    $("#save").click(function(){
        alert("Save")
        saveImage()
    })

});