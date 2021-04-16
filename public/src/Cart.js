$(document).ready(function () {
    $("#btn-requis").on("click", function () {
        $("#modelResult").modal("show");

        $("#btn-confirm").on("click", function () {

            Swal.fire({
                icon: 'warning',
                title: 'คุณแน่ใจใช่ไหม',
                text: 'คุณแน่ใจใช่ไหมที่จะเบิกสิ่งของที่คุณเลือกมาทั้งหมด',
                showCancelButton: true,
                confirmButtonColor: '57FF09',
                cancelButtonColor: 'FFF065',
                confirmButtonText: 'ใช่ฉันต้องการ',
                cancelButtonText: 'ไม่ฉันต้องการแก้ไข',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("../view/Index.html");
                }
            })
        })
    })

    let spawnitem = "";

    for (let i = 0; i < 10; i++) {
        spawnitem += "<div class='d-lg-flex my-4 justify-content-between align-items-center bg-white rounded cart shadow col-12 col-lg-10 mx-auto p-1'><div class='mr-1 float-left float-lg-none mt-5 mt-sm-4 pt-lg-0 pt-5'><input type='checkbox' id='' style='height: 25px; width: 25px;'></div><div class='mx-2 my-5 my-sm-4 my-md-3 text-center text-lg-none'>รหัสวัสดุ : 101000001</div><div class='mx-2 my-5 my-sm-4 my-md-3 text-center text-lg-none'>ชื่อรายการ : กรรไกรตัดกระดาษ6</div><div class='mx-auto my-3 col-5 m-lg-none'><input type='number' class='form-control'id='' placeholder='จำนวนเบิก'></div><div class='align-items-center text-center'><i class='fa fa-trash mb-1 text-danger'style='font-size: 25px;'></i></div></div>"
    }


    $("#listItem-area").html(spawnitem);





});

$(function () {
    // Sidebar toggle behavior
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
    });
});