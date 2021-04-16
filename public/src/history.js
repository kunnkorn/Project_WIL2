$(document).ready(function () {



    var rowID;
    var material = [{
        "date": "17/05/2564",
        "name": "นาย บันเทิง สุดสุด",
        "status": "ไม่อนุมัติ"
    }, {
        "date": "19/05/2564",
        "name": "นางสาว สมหญิง มากมาก",
        "status": "เสร็จสมบูรณ์"
    }, {
        "date": "21/05/2564",
        "name": "นาย อนุรักษ์ ผืนป่า",
        "status": "ไม่อนุมัติ"
    }];
    var table = $("#materialTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        data: material,
        columns: [
            { data: "date", title: "วันที่" },
            { data: "name", title: "ชื่อผู้เบิก" },
            { data: "status", title: "สถานะ" },
            { title: "รายละเอียด", orderable: false, defaultContent: "<a href='detailhis.html'>รายละเอียดเพิ่มเติม</a>" }
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