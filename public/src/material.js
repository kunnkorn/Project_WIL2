$(document).ready(function () {
    // Sidebar toggle behavior
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
    });
    var rowID;
    var material = [{
        "number": "1",
        "id": "101000001",
        "name": "กรรไกรตัดกระดาษ 6",
        "balance": "50",
        "unit": "อัน",
    }, {
        "number": "2",
        "id": "101000002",
        "name": "กรรไกรตัดกระดาษ 9",
        "balance": "50",
        "unit": "อัน",
    }, {
        "number": "3",
        "id": "101000003",
        "name": "กระดาษ POSTIT ขนาด 2*3",
        "balance": "110",
        "unit": "เล่ม",
    }];
    var table = $("#materialTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        data: material,
        columns: [
            { data: "number", title: "ลำดับ" },
            { data: "id", title: "รหัสวัสดุ" },
            { data: "name", title: "รายการ" },
            { data: "balance", title: "คงเหลือ" },
            { data: "unit", title: "หน่ายนับ" },
            { title: "เพิ่มจำนวน", orderable: false, defaultContent: " <button class='btn btn-warning my-1'>แก้ไข</button>" }
        ],
        columnDefs: [
            // make the last column align right, also target: "_all" 
            { "className": "dt-center", "targets": 5 }
        ]
    });

    //Add data
    var count = 3;
    $("#btnAdd").click(function () {
        $("#modeladd").modal("show");
        $("#btnSaveadd").on("click", function () {
            $("#modeladd").modal("hide");
            Swal.fire({
                title: 'คุณแน่ใจหรือไม่ที่ต้องการจะเพิ่มรายการวัสดุนี้?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ตกลง',
                cancelButtonText:'ยกเลิก',
            }).then((result) => {
                if (result.isConfirmed) {
                    if (checkindex == material.length) {
                        material.push({ "id": count, "name": name, "balance": balance, "unit": unit });
                        console.log(material);
        
                        table.row.add({
                            //"number":ลำดับ,
                            "number": count,
                            "id": id,
                            "name": name,
                            "balance": balance,
                            "unit": unit,
                        }).draw();
        
                        $("#addID").val("");
                        $("#addName").val("");
                        $("#addNum").val("");
                        $("#addUnit").val("");
        
        
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'เพิ่มรายการเสร็จสิ้นแล้ว',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            var checkindex = 0;
            count++;
            const id = $("#addID").val();
            const name = $("#addName").val();
            const balance = $("#addNum").val();
            const unit = $("#addUnit").val();
            for (let i = 0; i < material.length; i++) {
                if (id != material[i].id) {
                    checkindex++;
                } else {
                    alert("Have too much ID");
                    break;
                }
            }

            
        });
    });
    //Edit Table
    $("#materialTable tbody").on("click", ".btn-warning", function () {
        const currentRow = $(this).parents("tr")
        const data = table.row(currentRow).data();
        rowID = table.row(currentRow).index();
        $("#EditID").val(data.id);
        $("#EditName").val(data.name);
        $("#EditNum").val("0");
        $("#EditUnit").val(data.unit);
        //show model
        $("#modelEdit").modal("show");
    });
    //save Edit
    $("#btnSaveEdit").on("click", function (e) {

        const number = $("#EditNum").val();
        material[rowID].balance = number;
        let temp = table.row(rowID).data();
        temp.balance = number;
        table.row(rowID).data(temp).invalidate();
        $("#modelEdit").modal("hide");
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่ที่ต้องการจะแก้ไขรายการวัสดุนี้?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            cancelButtonText:'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'แก้ไขรายการเสร็จสิ้นแล้ว',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    });
});
