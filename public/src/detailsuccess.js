$(document).ready(function () {
    var rowID;
    var material = [{
        "number": "1",
        "id": "101000246",
        "list": "ซองจดหมายขาว ขนาด DL",
        "numreq": "10",
        "unit": "ด้าม",
        "balance": "5",
        "amount": "7"
    }, {
        "number": "2",
        "id": "101000249",
        "list": "ปากกาไวท์บอร์ด สีแดง",
        "numreq": "10",
        "unit": "ด้าม",
        "balance": "5",
        "amount": "2"
    }, {
        "number": "3",
        "id": "101000255",
        "list": "ลวดเสียบกระดาษ (Paper Clip)",
        "numreq": "10",
        "unit": "ด้าม",
        "balance": "5",
        "amount": "6"
    }, {
        "number": "4",
        "id": "101000359",
        "list": "ไม้บรรทัดเหล็ก 1 ฟุต",
        "numreq": "10",
        "unit": "ด้าม",
        "balance": "5",
        "amount": "4"
    }, {
        "number": "5",
        "id": "101000675",
        "list": "ตรายาง - วันที่ตัวเลข",
        "numreq": "10",
        "unit": "ด้าม",
        "balance": "5",
        "amount": "3"
    }];
    var table = $("#materialTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        data: material,
        columns: [
            { data: "number", title: "ลำดับ" },
            { data: "id", title: "รหัสวัสดุ" },
            { data: "list", title: "รายการ" },
            { data: "numreq", title: "จำนวนเบิก" },
            { data: "unit", title: "หน่วยนับ" },
            { data: "balance", title: "จำนวนคงเหลือ" },
            { data: "amount", title: "จำนวนจ่าย" }
        ],
        columnDefs: [
            // make the last column align right, also target: "_all"
            { "className": "dt-center", "targets": 5 }
        ]
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
                        location.replace("adminmain.html");
                    }
                });
            };
        })
    });
});