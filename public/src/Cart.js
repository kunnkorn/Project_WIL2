$(document).ready(function () {
    $("#btn-requis").on("click" , function(){
        $("#modelResult").modal("show");

        $("#btn-confirm").on("click" , function(){

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
                 if(result.isConfirmed){
                     window.location.replace("../view/Index.html");
                 }
            })
        })
    })

    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });
});