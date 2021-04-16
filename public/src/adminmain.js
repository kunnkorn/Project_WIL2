$(document).ready(function () {



    var rowID;
    var material = [{
        "number": "1",
        "date": "17/05/2564",
        "name": "นาย บันเทิง สุดสุด",
        "order": "64050001",
        "status": "รออนุมัติ"
    }, {
        "number": "2",
        "date": "19/05/2564",
        "name": "นางสาว สมหญิง มากมาก",
        "order": "64050010",
        "status": "รออนุมัติ"
    }, {
        "number": "3",
        "date": "21/05/2564",
        "name": "นาย อนุรักษ์ ผืนป่า",
        "order": "64050013",
        "status": "รออนุมัติ"
    }];
    var table = $("#materialTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        data: material,
        columns: [
            { data: "number", title: "ลำดับ" },
            { data: "date", title: "วันที่" },
            { data: "name", title: "ชื่อ-นามสกุล" },
            { data: "order", title: "เลขที่ใบเบิก" },
            { data: "status", title: "สถานะ" },
            { title: "รายละเอียด", orderable: false, defaultContent: "<a href='detailreq.html'>รายละเอียดเพิ่มเติม</a>" }
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
})