function rotateCard(btn) {
    var $card = $(btn).closest('.card-container');
    console.log($card);
    if ($card.hasClass('hover')) {
        $card.removeClass('hover');
    } else {
        $card.addClass('hover');
    }
}


$(document).ready(function() {

    var spawncard = "";
    for(let i=0;i<10;i++){
        spawncard += "<div class='col-xl-3 col-lg-5 col-md-6 col-sm-7' style='height: 450px;'><div class='card-container manual-flip'><div class='card' style='border: none;'><div class='front text-center'><img class='card-img-top' src='https://api.iconify.design/ion:person-circle.svg'style='width: 50%;'><div class='card-body'><h5>นางสาว สมหญิง มากมาก</h5><h5>ตำแหน่ง : อาจารย์ชำนาญการพิเศษ</h5><h5 class='mb-3'>เมลล์ : somying.mak@mfu.ac.th</h5><button class='btn btn-primary col-5 mb-3 shadow' onclick='rotateCard(this)'>จัดการ</button></div></div><div class='back text-center'><div class='content'><div class='main'><h5 class='text-center mx-3 mt-5 pt-2'>นางสาว สมหญิง มากมาก</h5><div class='col-12 text-center my-5'><button class='btn btn-success px-sm-4'>เปิดสิทธิ์</button></div><div class='col-12 text-center my-5'><button class='btn btn-warning px-sm-4'>ระงับสิทธิ์</button></div><div class='col-12 text-center mb-5'><button class='btn btn-danger px-sm-5'>ลบ</button></div><button class='btn btn-simple' rel='tooltip' title='Flip Card'onclick='rotateCard(this)' id='hidebtn'><span class='iconify'data-inline='false' data-icon='ri:arrow-go-back-line'></span></button></div></div></div></div></div></div>";
    }
    
    $("#card-area").html(spawncard);
});


