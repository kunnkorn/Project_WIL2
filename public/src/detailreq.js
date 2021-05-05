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
    var arraymaterial;
    $("#badge_req").text(sessionStorage.noti);

    $.ajax({
        type: 'POST',
        url: '/datamaterial',
        data: { requi_id: sessionStorage.number },
        success: (response) => {
            countitem = response.length;
            arraymaterial = response;
            let spawneditnum = "";
            for (let i = 0; i < response.length; i++) {
                let lengthnumber = response[i].material_number;
                let maxl = lengthnumber.toString().length;
                spawneditnum += "<p>" + response[i].material_name + " <input type='number' id='" + i + "' class='form-control float-right mb-3' placeholder='คงเหลือ " + response[i].material_number + "' oninput='javascript: if (this.value > " + response[i].material_number + ") this.value = " + response[i].material_number + " ; if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)' maxlength='" + maxl + "'></input></p>"
            }
            $("#editnumber").html(spawneditnum);
            let number = 1;
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
                    { title: "จำนวนจ่าย", defaultContent: 0 }
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
        data: { requi_id: sessionStorage.number },
        success: (response) => {
            console.log(response + sessionStorage.number)
            if (response == "") {
                
            }
            else {
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
                $("#modifysave").click(function () {
                    Swal.fire({
                        //title: 'แน่ใจใช่หรือไม่?',
                        text: "กรุณาตรวจสอบข้อมูลให้แน่ใจก่อนกดยืนยัน",
                        icon: 'warning',
                        confirmButtonText: 'ยืนยัน',
                        cancelButtonText: 'ยกเลิก',
                        showCancelButton: true,
                        confirmButtonColor: '#6FD83D',
                        cancelButtonColor: '#FF4B4B',

                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire('แก้ไขเสร็จสิ้น!', '', 'success').then((result) => {
                                if (result.isConfirmed) {
                                    let checkinput = 0;
                                    $("#modifymodal").modal('hide');
                                    for (let i = 0; i < arraymaterial.length; i++) {
                                        let numberedit = $(("#" + i)).val();
                                        if (numberedit == "" || numberedit < 0) {
                                            arraymaterial[i].amount_of_divide = 0;
                                        } else {
                                            checkinput += numberedit;
                                            arraymaterial[i].amount_of_divide = numberedit;
                                        }
                                        if (checkinput == 0) {
                                            $('#approve').prop('disabled', true);
                                        } else {
                                            $('#approve').prop('disabled', false);
                                        }
                                        $(("#") + i).val("");
                                    }
                                    table.clear();
                                    table = $("#materialTable").dataTable().fnDestroy();
                                    $("#materialTable").empty();
                                    let number = 1;
                                    table = $("#materialTable").DataTable({
                                        responsive: true,       //for responsive column display
                                        deferRender: true,      //if large data, use this option
                                        data: arraymaterial,
                                        columns: [
                                            { title: "ลำดับ", defaultContent: "" },
                                            { data: "material_id", title: "รหัสวัสดุ" },
                                            { data: "material_name", title: "รายการ" },
                                            { data: "amount_of_requisition", title: "จำนวนเบิก" },
                                            { data: "unit", title: "หน่วยนับ" },
                                            { data: "material_number", title: "จำนวนคงเหลือ" },
                                            { data: "amount_if_divide", title: "จำนวนจ่าย" }
                                        ],
                                        "columnDefs": [{
                                            "targets": 0,
                                            "createdCell": function (td, cellData, rowData, row, col) {
                                                $(td).text(number);
                                                number++;
                                            }
                                        }],


                                    });


                                }
                            });
                        };
                    });

                });
            }
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

    $('#approve').prop('disabled', true);

    //ปุ่มอนุมัติ
    $("#approve").click(function () {
        let form_data = table.data();
        //alert( "test" );
        Swal.fire({
            title: 'แน่ใจใช่หรือไม่?',
            text: "ท่านแน่ใจใช่หรือไม่ว่าจะอนุมัติใบเบิกนี้",
            icon: 'warning',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            showCancelButton: true,
            confirmButtonColor: '#6FD83D',
            cancelButtonColor: '#FF4B4B',

        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('อนุมัติเสร็จสิ้น!', '', 'success').then((result) => {
                    if (result.isConfirmed) {
                        for (let i = 0; i < form_data.length; i++) {
                            $.ajax({
                                type: 'POST',
                                url: '/updateAmountM',
                                data: { requisition_id: form_data[i].requisition_id, material_id: form_data[i].material_id, number_of_requisition: form_data[i].amount_of_divide },
                                success: (response) => {
                                    $.ajax({
                                        type: 'POST',
                                        url: '/approve',
                                        data: { idreq: form_data[i].requisition_id },
                                        success: (response) => {
                                            sessionStorage.clear();
                                            window.location.replace(response);
                                        }, error: (xhr) => {
                                            alert(xhr.responseText);
                                        }
                                    })
                                }, error: (xhr) => {
                                    alert(xhr.responseText);
                                }
                            })
                        }

                    }
                });
            };

        });
    });


    $("#disapproveysave").prop('disabled', true);
    $("#txtdis-area").keyup(function () {
        let txtdis = $("#txtdis-area").val();
        if (txtdis == "") {
            $("#disapproveysave").prop('disabled', true);
        } else {
            $("#disapproveysave").prop('disabled', false);
        }
    })

    $("#btnback").click(function () {
        sessionStorage.clear();
        window.location.href = '/requisition';
    });


    //ปุ่มไม่อนุมัติ
    $("#disapproveysave").click(function () {
        let txtdis = $("#txtdis-area").val();
        Swal.fire({
            //title: 'แน่ใจใช่หรือไม่?',
            text: "กรุณาตรวจสอบข้อมูลให้แน่ใจก่อนกดยืนยัน",
            icon: 'warning',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            showCancelButton: true,
            confirmButtonColor: '#6FD83D',
            cancelButtonColor: '#FF4B4B',

        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('ไม่อนุมัติเสร็จสิ้น!', '', 'success').then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: 'POST',
                            url: '/unapprove',
                            data: { requisition_id: sessionStorage.number, txtcomment: txtdis },
                            success: (response) => {
                                sessionStorage.clear();
                                window.location.replace(response);
                            }, error: (xhr) => {
                                alert(xhr.responseText);
                            }

                        });
                    }
                });
            };
        });

    });

});