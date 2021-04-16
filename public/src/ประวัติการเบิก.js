$(document).ready(function () {
    var rowID;
    var requesthistory = [{
        "date": "02/01/2563",
        "time": "10:35 น.",
        "number": "63010001",
        "status": "ไม่อนุมัติ",
    }, {
        "date": "15/06/2563",
        "time": "12:25 น.",
        "number": "63010002",
        "status": "อนุมัติ",
    }, {
        "date": "19/08/2563",
        "time": "09:50 น.",
        "number": "63010003",
        "status": "อนุมัติ",
    }, {
        "date": "22/09/2563",
        "time": "08:23 น.",
        "number": "63010004",
        "status": "เสร็จสมบูรณ์",
    }, {
        "date": "02/10/2563",
        "time": "12:25 น.",
        "number": "63010005",
        "status": "ไม่อนุมัติ",
    }];
    var table = $("#requesthistoryTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        data: requesthistory,
        columns: [
            { data: "date", title: "วันที่" },
            { data: "time", title: "เวลา" },
            { data: "number", title: "เลขที่ใบเบิก" },
            { data: "status", title: "สถานะ" },
            { title: "รายละเอียด", orderable: false, defaultContent: "<a href='รายละเอียดประวัติการเบิก.html'>รายละเอียดเพิ่มเติม</a>" }
        ],
        columnDefs: [
            // make the last column align right, also target: "_all"
            { "className": "dt-center", "targets": 3 }
        ]
    });

    // Sidebar toggle behavior
    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });
})