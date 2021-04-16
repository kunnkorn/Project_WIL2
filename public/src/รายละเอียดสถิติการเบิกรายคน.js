$(document).ready(function () {
    var rowID;
    var requesthistorydetail = [{
        "order": "1",
        "time": "17/05/2564 เวลา 10.25 น.",
        "code": "101000246",
        "list": "ซองจดหมายขาว ขนาด DL",
        "number": "10",
        "unit": "ซอง",

    },
    {
        "order": "2",
        "time": "17/05/2564 เวลา 15.30 น.",
        "code": "101000249",
        "list": "ปากกาไวท์บอร์ด สีแดง",
        "number": "15",
        "unit": "ด้าม",

    },
    {
        "order": "3",
        "time": "20/05/2564 เวลา 09.33 น.",
        "code": "101000255",
        "list": "ลวดเสียบกระดาษ (Paper Clip)",
        "number": "20",
        "unit": "กล่อง",

    },
    {
        "order": "4",
        "time": "21/05/2564 เวลา 10.34 น.",
        "code": "101000359",
        "list": "ไม้บรรทัดเหล็ก 1 ฟุต",
        "number": "2",
        "unit": "อัน",

    },
    {
        "order": "5",
        "time": "30/05/2564 เวลา 11.11 น.",
        "code": "101000675",
        "list": "ตรายาง - วันที่ตัวเลข",
        "number": "1",
        "unit": "อัน",

    }];
    var table = $("#requesthistorydetailTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        data: requesthistorydetail,
        columns: [
            { data: "order", title: "ลำดับ" },
            { data: "time", title: "วันที่/เวลา" },
            { data: "code", title: "รหัสวัสดุ" },
            { data: "list", title: "รายการ" },
            { data: "number", title: "จำนวนเบิก" },
            { data: "unit", title: "หน่วยนับ" }],

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