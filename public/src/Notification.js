$(document).ready(function () {
    var notification = [
        {
            "date" : "02/01/2563",
            "time" : "10:35 น. ",
            "number" : "64050001",
            "status": "ไม่อนุมัติ",

        },

        {
            "date" : "15/06/2563",
            "time" : "12:25 น. ",
            "number" : "64050010",
            "status": "อนุมัติ",

        },

        {
            "date" : "18/08/2563",
            "time" : "09:50 น. ",
            "number" : "64050015",
            "status": "อนุมัติ",

        }
    ]

    var table = $("#NotificationTab").DataTable({
        responsive : true,
        deferRender: true,

        data: notification,
        columns: [
            {data: "date" , title : "วันที่"},
            {data: "time" , title : "เวลา"},
            {data: "number" , title : "เลขที่ใบเบิก"},
            {data: "status" , title : "สถานะ"},
            {title: "รายละเอียด" , orderable: false, defaultContent: "<a href= '#' class = 'btn-detailNoti'>รายละเอียดเพิ่มเติม<a/>"}
        ]
    });

    $("NotificationTab tbody").on("click" , ".btn-detailNoti" , function(){

        const currentRow = $(this).parents("tr");
        const data = table.row(currentRow).data();

        if(data.status == "ไม่อนุมัติ"){
            window.location.replace("History(Unsuccess).html");
            
        }
        else{
            window.location.replace("History(success).html");
        }
    });

    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });
});

