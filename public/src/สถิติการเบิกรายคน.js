$(document).ready(function () {
    var rowID;
    var statistics = [{
        "number": "1",
        "name": "นาย บันเทิง จัดจัด",
        "numberoftime": "50",
    }, {
        "number": "2",
        "name": "นางสาว สมหญิง อิอิ",
        "numberoftime": "48",
    }, {
        "number": "3",
        "name": "นาย บันเทิง จริงนะ",
        "numberoftime": "45",
    }, {
        "number": "4",
        "name": "นางสาว สมหญิง อะไรนะ",
        "numberoftime": "30",
    }, {
        "number": "5",
        "name": "นาย พรเพ็ง อารมณ์ดี",
        "numberoftime": "29",
    }, {
        "number": "6",
        "name": "นาย ลีลิน ดีจริงจริง",
        "numberoftime": "18",
    }, {
        "number": "7",
        "name": "นางสาว สวย สายสมร",
        "numberoftime": "15",
    }, {
        "number": "8",
        "name": "นางสาว สมใจ อยาก",
        "numberoftime": "12",
    }, {
        "number": "9",
        "name": "นาย สมาย ใจร่ม",
        "numberoftime": "10",
    }, {
        "number": "10",
        "name": "นางสาว อารมณ์ ดีมาก",
        "numberoftime": "5",
    }];
    var table = $("#disbursementstatisticsTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        data: statistics,
        columns: [
            { data: "number", title: "ลำดับ" },
            { data: "name", title: "รายชื่อ" },
            { data: "numberoftime", title: "จำนวนครั้งที่เบิก/เดือน" },
            { title: "รายละเอียด", orderable: false, defaultContent: "<a href='รายละเอียดสถิติการเบิกรายคน.html'>รายละเอียดเพิ่มเติม</a>" }
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