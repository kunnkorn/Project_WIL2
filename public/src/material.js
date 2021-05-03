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
    $("#badge_req").text(sessionStorage.noti);
    // Sidebar toggle behavior
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
    });
    var rowID;
    var table;
    $.ajax({
        type: 'GET',
        url: '/getcategory',
        success: (response) => {
            let spawndropdown = "";
            for (let i = 0; i < response.length; i++) {
                spawndropdown += "<option value='" + response[i].category_id + "'>" + response[i].category_name + "</option>";
            }
            let catdropdown = "<option value='" + 8 + "'>ทั้งหมด</option>";
            catdropdown += spawndropdown;
            $("#category").html(catdropdown);
            $("#addCategory").html(spawndropdown);

        }, error: (xhr) => {
            alert(xhr.responseText);
        }
    })

    $("#category").change(function () {
        let cate_id = $(this).val();
        $.ajax({
            type: 'POST',
            url: '/getsomecategory',
            data: { category_id: cate_id },
            success: (response) => {
                let number = 1;
                table.clear();
                table = $("#materialTable").dataTable().fnDestroy();
                $("#materialTable").empty();
                table = $("#materialTable").DataTable({
                    responsive: true,       //for responsive column display
                    deferRender: true,      //if large data, use this option
                    data: response,
                    columns: [
                        { title: "ลำดับ", defaultContent: "" },
                        { data: "material_id", title: "รหัสวัสดุ" },
                        { data: "material_name", title: "รายการ" },
                        { data: "material_number", title: "คงเหลือ" },
                        { data: "unit", title: "หน่ายนับ" },
                        { title: "เพิ่มจำนวน", orderable: false, defaultContent: " <button class='btn btn-warning my-1'>แก้ไข</button>" }
                    ],
                    "columnDefs": [{
                        "targets": 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).text(number);
                            number++;
                        }
                    }]


                });
                $("#materialTable tbody").on("click", ".btn-warning", function () {
                    const currentRow = $(this).parents("tr")
                    const data = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    $("#EditID").val(data.material_id);
                    $("#EditName").val(data.material_name);
                    $("#EditNum").val(0);
                    $("#EditUnit").val(data.unit);
                    //show model
                    $("#modelEdit").modal("show");
                });
            }, error: (xhr) => {
                alert(xhr.responseText);
            }
        })
    })

    $.ajax({
        type: 'GET',
        url: '/getAllDatamaterial',
        success: (response) => {
            let number = 1;
            table = $("#materialTable").DataTable({
                responsive: true,       //for responsive column display
                deferRender: true,      //if large data, use this option
                data: response,
                columns: [
                    { title: "ลำดับ", defaultContent: "" },
                    { data: "material_id", title: "รหัสวัสดุ" },
                    { data: "material_name", title: "รายการ" },
                    { data: "material_number", title: "คงเหลือ" },
                    { data: "unit", title: "หน่ายนับ" },
                    { title: "เพิ่มจำนวน", orderable: false, defaultContent: " <button class='btn btn-warning my-1'>แก้ไข</button>" }
                ],
                "columnDefs": [{
                    "targets": 0,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).text(number);
                        number++;
                    }
                }]


            });
            $("#materialTable tbody").on("click", ".btn-warning", function () {
                const currentRow = $(this).parents("tr")
                const data = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                $("#EditID").val(data.material_id);
                $("#EditName").val(data.material_name);
                $("#EditNum").val(0);
                $("#EditUnit").val(data.unit);
                //show model
                $("#modelEdit").modal("show");
            });
        }, error: (xhr) => {
            alert(xhr.responseText);
        }
    })

    $("#formaddmat").submit(function (e) {
        e.preventDefault();

        let cate_mat = $("#addCategory").val();
        let mat_id = $("#addID").val();
        let mat_name = $("#addName").val();
        let mat_number = $("#addNum").val();
        let mat_unit = $("#addUnit").val();
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่ที่ต้องการจะเพิ่มรายการวัสดุนี้?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'POST',
                    url: '/addmaterial',
                    data: { material_id: mat_id, material_name: mat_name, material_number: mat_number, unit: mat_unit, category_id: cate_mat },
                    success: (response) => {
                        $("#addID").val("");
                        $("#addName").val("");
                        $("#addNum").val("");
                        $("#addUnit").val("");
                        Swal.fire({
                            icon: 'success',
                            title: 'เพิ่มรายการเสร็จสิ้นแล้ว',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        table.clear();
                        table = $("#materialTable").dataTable().fnDestroy();
                        $("#materialTable").empty();
                        $("#modeladd").modal('hide');
                        $.ajax({
                            type: 'GET',
                            url: '/getAllDatamaterial',
                            success: (response) => {
                                let number = 1;
                                table = $("#materialTable").DataTable({
                                    responsive: true,       //for responsive column display
                                    deferRender: true,      //if large data, use this option
                                    data: response,
                                    columns: [
                                        { title: "ลำดับ", defaultContent: "" },
                                        { data: "material_id", title: "รหัสวัสดุ" },
                                        { data: "material_name", title: "รายการ" },
                                        { data: "material_number", title: "คงเหลือ" },
                                        { data: "unit", title: "หน่ายนับ" },
                                        { title: "เพิ่มจำนวน", orderable: false, defaultContent: " <button class='btn btn-warning my-1'>แก้ไข</button>" }
                                    ],
                                    "columnDefs": [{
                                        "targets": 0,
                                        "createdCell": function (td, cellData, rowData, row, col) {
                                            $(td).text(number);
                                            number++;
                                        }
                                    }]


                                });
                                $("#materialTable tbody").on("click", ".btn-warning", function () {
                                    const currentRow = $(this).parents("tr")
                                    const data = table.row(currentRow).data();
                                    rowID = table.row(currentRow).index();
                                    checknumber = data.material_number;
                                    $("#EditID").val(data.material_id);
                                    $("#EditName").val(data.material_name);
                                    $("#EditNum").val(0);
                                    $("#EditUnit").val(data.unit);
                                    //show model
                                    $("#modelEdit").modal("show");
                                });
                            }, error: (xhr) => {
                                alert(xhr.responseText);
                            }
                        })
                    }, error: (xhr) => {
                        alert(xhr.responseText);
                    }
                })
            }
        })

    })

    $("#formeditmat").submit(function (e) {
        e.preventDefault();

        let editid = $("#EditID").val();
        let editname = $("#EditName").val();
        let editnum = $("#EditNum").val();
        let editunit = $("#EditUnit").val();
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่ที่ต้องการจะแก้ไขรายการวัสดุนี้?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'POST',
                    url: '/editmaterial',
                    data: { material_name: editname, plusnumber: editnum, unit: editunit, material_id: editid },
                    success: (response) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'แก้ไขรายการเสร็จสิ้นแล้ว',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        table.clear();
                        table = $("#materialTable").dataTable().fnDestroy();
                        $("#materialTable").empty();
                        $("#modelEdit").modal('hide');
                        $.ajax({
                            type: 'GET',
                            url: '/getAllDatamaterial',
                            success: (response) => {
                                let number = 1;
                                table = $("#materialTable").DataTable({
                                    responsive: true,       //for responsive column display
                                    deferRender: true,      //if large data, use this option
                                    data: response,
                                    columns: [
                                        { title: "ลำดับ", defaultContent: "" },
                                        { data: "material_id", title: "รหัสวัสดุ" },
                                        { data: "material_name", title: "รายการ" },
                                        { data: "material_number", title: "คงเหลือ" },
                                        { data: "unit", title: "หน่ายนับ" },
                                        { title: "เพิ่มจำนวน", orderable: false, defaultContent: " <button class='btn btn-warning my-1'>แก้ไข</button>" }
                                    ],
                                    "columnDefs": [{
                                        "targets": 0,
                                        "createdCell": function (td, cellData, rowData, row, col) {
                                            $(td).text(number);
                                            number++;
                                        }
                                    }]


                                });
                                $("#materialTable tbody").on("click", ".btn-warning", function () {
                                    const currentRow = $(this).parents("tr")
                                    const data = table.row(currentRow).data();
                                    rowID = table.row(currentRow).index();
                                    checknumber = data.material_number;
                                    $("#EditID").val(data.material_id);
                                    $("#EditName").val(data.material_name);
                                    $("#EditNum").val(0);
                                    $("#EditUnit").val(data.unit);
                                    //show model
                                    $("#modelEdit").modal("show");
                                });
                            }, error: (xhr) => {
                                alert(xhr.responseText);
                            }
                        })
                    }, error: (xhr) => {
                        alert(xhr.responseText);
                    }
                });
            }
        })


    });


    $('#btnSaveEdit').prop('disabled', true);

    $("#EditNum").keyup(function () {
        let editnum = $("#EditNum").val();
        if (editnum < 0 || editnum == "") {
            $('#btnSaveEdit').prop('disabled', true);
        } else {
            $('#btnSaveEdit').prop('disabled', false);
        }
    })

    let selectedFile;
    let data = [{
        "name": "jayanth",
        "data": "scd",
        "abc": "sdef"
    }]

    // console.log(window.XLSX);
    $('#input').on("change", (event) => {
        selectedFile = event.target.files[0];
        XLSX.utils.json_to_sheet(data, 'out.xlsx');
        if (selectedFile) {
            // $("#modalimport").modal('show');
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(selectedFile);
            fileReader.onload = (event) => {
                let data = event.target.result;
                let workbook = XLSX.read(data, { type: "binary" });
                // console.log(workbook);
                workbook.SheetNames.forEach(sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                    console.log(rowObject);
                    // console.log(rowObject.length);
                    console.log(rowObject[0]["วัสดุคงคลัง มหาวิทยาลัยแม่ฟ้าหลวง"]);
                    for (let i = 2; i < rowObject.length; i++) {

                        // console.log(rowObject[i].__EMPTY + " " + rowObject[i].__EMPTY_1 + " " + rowObject[i].__EMPTY_2);
                        // $("#processbar").attr('aria-valuenow', '100');
                        // let p = (i/rowObject.length) * 100;
                        // console.log(p);
                        // let w = p+"%";
                        // $("#processbar").css("width",w);
                        // var delay = 1000;
                        // $("#processbar").each(function (i) {
                        //     $(this).delay(delay * i).animate({
                        //         width: $(this).attr('aria-valuenow') + '%'
                        //     }, delay);

                        //     $(this).prop('Counter', 0).animate({
                        //         Counter: $(this).text()
                        //     }, {
                        //         duration: delay,
                        //         // easing: 'swing',
                        //         step: function (now) {
                        //             $(this).text(Math.ceil(now) + '%');
                        //         }
                        //     });
                        // });
                        // console.log(rowObject[0]["วัสดุคงคลัง มหาวิทยาลัยแม่ฟ้าหลวง"]);
                        console.log(i);
                        if (rowObject[0]["วัสดุคงคลัง มหาวิทยาลัยแม่ฟ้าหลวง"] == "วัสดุสำนักงาน") {
                                $.ajax({
                                    type: 'POST',
                                    url: '/importmaterial',
                                    data: { material_id: rowObject[i].__EMPTY, material_name: rowObject[i].__EMPTY_1, material_unit: rowObject[i].__EMPTY_2, category_id: 1 }
                                })
                            
                        } else if (rowObject[0]["วัสดุคงคลัง มหาวิทยาลัยแม่ฟ้าหลวง"] == "วัสดุไฟฟ้าและวิทยุ") {
                                $.ajax({
                                    type: 'POST',
                                    url: '/importmaterial',
                                    data: { material_id: rowObject[i].__EMPTY, material_name: rowObject[i].__EMPTY_1, material_unit: rowObject[i].__EMPTY_2, category_id: 2 }
                                })
                        } else if (rowObject[0]["วัสดุคงคลัง มหาวิทยาลัยแม่ฟ้าหลวง"] == "วัสดุคอมพิวเตอร์") {
                                $.ajax({
                                    type: 'POST',
                                    url: '/importmaterial',
                                    data: { material_id: rowObject[i].__EMPTY, material_name: rowObject[i].__EMPTY_1, material_unit: rowObject[i].__EMPTY_2, category_id: 3 }
                                })
                        } else if (rowObject[0]["วัสดุคงคลัง มหาวิทยาลัยแม่ฟ้าหลวง"] == "วัสดุโฆษณาและเผยแพร่") {
                                $.ajax({
                                    type: 'POST',
                                    url: '/importmaterial',
                                    data: { material_id: rowObject[i].__EMPTY, material_name: rowObject[i].__EMPTY_1, material_unit: rowObject[i].__EMPTY_2, category_id: 4 }
                                })
                        } else if (rowObject[0]["วัสดุคงคลัง มหาวิทยาลัยแม่ฟ้าหลวง"] == "วัสดุงานบ้านงานครัว") {
                                $.ajax({
                                    type: 'POST',
                                    url: '/importmaterial',
                                    data: { material_id: rowObject[i].__EMPTY, material_name: rowObject[i].__EMPTY_1, material_unit: rowObject[i].__EMPTY_2, category_id: 5 }
                                })
                        } else if (rowObject[0]["วัสดุคงคลัง มหาวิทยาลัยแม่ฟ้าหลวง"] == "วัสดุเครื่องแต่งกาย") {
                                $.ajax({
                                    type: 'POST',
                                    url: '/importmaterial',
                                    data: { material_id: rowObject[i].__EMPTY, material_name: rowObject[i].__EMPTY_1, material_unit: rowObject[i].__EMPTY_2, category_id: 6 }
                                })
                        } else if (rowObject[0]["วัสดุคงคลัง มหาวิทยาลัยแม่ฟ้าหลวง"] == "วัสดุของที่ระลึก") {
                                $.ajax({
                                    type: 'POST',
                                    url: '/importmaterial',
                                    data: { material_id: rowObject[i].__EMPTY, material_name: rowObject[i].__EMPTY_1, material_unit: rowObject[i].__EMPTY_2, category_id: 7 }
                                })
                        }

                    }
                    // document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject, undefined, 4)
                });
                
            }
            // location.reload();
        }
        
    })


});
