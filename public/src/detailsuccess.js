function init() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '565819629218-hrjqptqk34lk5sq2599tasa7gc2tho24.apps.googleusercontent.com'
        });
    });
}

function signout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        sessionStorage.clear();
        window.location.replace('/logout');
    });
}


$(document).ready(function () {
    var rowID;
    var table;
    var countitem = 0;
    $("#badge_req").text(sessionStorage.noti);

    $.ajax({
        type: 'POST',
        url: '/datamaterial',
        data: { idreq: sessionStorage.number },
        success: (response) => {
            let number = 1;
            countitem = response.length;
            table = $("#materialTable").DataTable({
                responsive: true,       //for responsive column display
                deferRender: true,      //if large data, use this option
                data: response,
                columns: [
                    { title: "ลำดับ", defaultContent: "" },
                    { data: "material_id", title: "รหัสวัสดุ" },
                    { data: "material_name", title: "รายการ" },
                    { data: "amount_of_requisition", title: "จำนวนเบิก" },
                    { data: "unit", title: "หน่วยนับ" },
                    { data: "material_number", title: "จำนวนคงเหลือ" },
                    { data: "amount_of_divide", title: "จำนวนจ่าย" }
                ],
                "columnDefs": [{
                    "targets": 0,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).text(number);
                        number++;
                    }
                }]
            });


        }, error: (xhr) => {
            alert(xhr.responseText);
        }
    });

    $.ajax({
        type: 'POST',
        url: '/datareq',
        data: { idreq: sessionStorage.number },
        success: (response) => {
            let d = new Date(response[0].date_requisition);
            let year = d.getFullYear();
            let month = d.getMonth();
            let date = d.getDate();
            if (response[0].annotation == null) {
                response[0].annotation = "ไม่มีข้อความ";
            }
            response[0].date_requisition = date + "-" + month + "-" + year;
            let spawninfouser = "<div class='col-6'><p>เลขที่เบิกวัสดุ : " + response[0].requisition_id + "</p><p>ชื่อผู้เบิก : " + response[0].name + "</p><p>วันที่ : " + response[0].date_requisition + " เวลา : " + response[0].time_requisition + " น</p><p>หมายเหตุ : " + response[0].annotation + "</p></div><div class='col-6 text-center'><span class='iconify' data-icon='carbon:collapse-all' data-inline='false' style='color: #ffb01d;'data-width='100px' data-height='100px'></span><br> <text>ทั้งหมด<span class='iconify'  data-inline='false'data-width='30px' data-height='30px'>" + countitem + "</span></text></div>";
            $("#detail").html(spawninfouser);
        }, error: (xhr) => {
            alert(xhr.responseText);
        }
    });

    // Sidebar toggle behavior
    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });

    $("#success").click(function () {
        //alert("test");
        Swal.fire({
            title: 'แน่ใจใช่หรือไม่?',
            text: "ท่านแน่ใจใช่หรือไม่ว่ามีคนมารับของเรียบร้อยแล้ว",
            icon: 'warning',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            showCancelButton: true,
            confirmButtonColor: '#6FD83D',
            cancelButtonColor: '#FF4B4B',

        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('การยืนยันเสร็จสิ้น!', '', 'success').then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: 'POST',
                            url: '/complete',
                            data: { requisition_id: sessionStorage.number },
                            success: (response) => {
                                sessionStorage.clear();
                                window.location.replace(response);
                            }, error: (xhr) => {
                                alert(xhr.responseText);
                            }
                        })
                    }
                });
            };
        })
    });


    $("#btnback").click(function () {
        sessionStorage.clear();
        window.location.href = '/requisition';
    });
});