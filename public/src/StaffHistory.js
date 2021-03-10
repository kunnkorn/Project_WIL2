$(document).ready(function () {
    var rowID;
    var history = [
        {
            "date" : "02/01/2563",
            "time" : "10:35 น.",
            "requisition" : "64050001",
            "status" : "รออนุมัติ",
        },

        {
            "date": "15/06/2563",
            "time": "12:25 น.",
            "requisition": "64050010",
            "status": "รออนุมัติ"
        },

        {
            "date": "19/08/2563",
            "time": "09:50 น.",
            "requisition": "64050015",
            "status": "อนุมัติ"
        },

        {
            "date": "22/09/2563",
            "time": "08:23 น.",
            "requisition": "64050020",
            "status": "เสร็จสมบูรณ์"
        },

        {
            "date": "02/10/2563",
            "time": "09:50 น.",
            "requisition": "64050025",
            "status": "เสร็จสมบูรณ์"
        },

        {
            "date": "09/10/2563",
            "time": "08:23 น.",
            "requisition": "64050028",
            "status": "ไม่อนุมัติ"
        },

        {
            "date": "26/12/2563",
            "time": "12:25 น.",
            "requisition": "64050034",
            "status": "อนุมัติ"
        },

        {
            "date": "02/01/2563",
            "time": "10:35 น.",
            "requisition": "64050044",
            "status": "อนุมัติ"
        },

        {
            "date": "11/01/2563",
            "time": "12:25 น.",
            "requisition": "64050050",
            "status": "ไม่อนุมัติ"
        }
    ]

    var table = $("#HistoryTable").DataTable({
        responsive : true,
        deferRender: true,

        data: history,
        columns: [
            {data: "date" , title: "วันที่"},
            {data: "time" , title: "เวลา"},
            {data: "requisition" , title: "เลขที่ใบเบิก"},
            {data: "status" , title: "สถานะ"},
            {title: "รายละเอียด" , orderable: false, defaultContent: "<a href= '#' class = 'btn-detail'>รายละเอียดเพิ่มเติม<a/>"}
            
        ],
        
    });

    $("#HistoryTable tbody").on("click" , ".btn-detail" , function(){
        
        const currentRow = $(this).parents("tr");
        const data = table.row(currentRow).data();

        if(data.status == "ไม่อนุมัติ"){
            alert("No")
        }
        else{
            alert("Yes")
        }
    })

});