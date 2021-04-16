$(document).ready(function () {
    var rowID;
    var requesthistorydetail = [{
        "order": "1",
        "code": "101000246",
        "list": "ซองจดหมายขาว ขนาด DL",
        "number": "10",
        "unit": "ซอง",
        "amount": "0"
    },
    {
        "order": "2",
        "code": "101000249",
        "list": "ปากกาไวท์บอร์ด สีแดง",
        "number": "15",
        "unit": "ด้าม",
        "amount": "0"
    },
    {
        "order": "3",
        "code": "101000255",
        "list": "ลวดเสียบกระดาษ (Paper Clip)",
        "number": "20",
        "unit": "กล่อง",
        "amount": "0"
    },
    {
        "order": "4",
        "code": "101000359",
        "list": "ไม้บรรทัดเหล็ก 1 ฟุต",
        "number": "2",
        "unit": "อัน",
        "amount": "0"
    },
    {
        "order": "5",
        "code": "101000675",
        "list": "ตรายาง - วันที่ตัวเลข",
        "number": "1",
        "unit": "อัน",
        "amount": "0"
    },
    {
        "order": "6",
        "code": "102000062",
        "list": "หลอดไฟเครื่องฉายข้ามศรีษะ",
        "number": "2",
        "unit": "หลอด",
        "amount": "0"
    }];
    var table = $("#requesthistorydetailTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        data: requesthistorydetail,
        columns: [
            { data: "order", title: "ลำดับ" },
            { data: "code", title: "รหัสวัสดุ" },
            { data: "list", title: "รายการ" },
            { data: "number", title: "จำนวนเบิก" },
            { data: "unit", title: "หน่วยนับ" },
            { data: "amount", title: "จำนวนจ่าย" }],

        columnDefs: [
            // make the last column align right, also target: "_all"
            { "className": "dt-center", "targets": 5 }
        ]
    });

    $("#btnback").click(function () {
        window.history.back();
    });

    // Sidebar toggle behavior
    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });
})