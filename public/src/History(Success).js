$(document).ready(function () {
    var materials = [

        {
            "number" : "1",
            "id" : "101000246",
            "name": "ซองจดหมายขาว ขนาด DL",
            "draw": "10",
            "unit": "ด้าม",
            "amount": "5"
            
        },

        {
            "number" : "2",
            "id" : "101000249",
            "name": "ปากกาไวท์บอร์ด สีแดง",
            "draw": "8",
            "unit": "ด้าม",
            "amount": "4"
            
        },

        {
            "number" : "3",
            "id" : "101000255",
            "name": "ลวดเสียบกระดาษ (Paper Clip)",
            "draw": "2",
            "unit": "กล่อง",
            "amount": "1"
        },

        {
            "number" : "4",
            "id" : "101000359",
            "name": "ไม้บรรทัดเหล็ก 1 ฟุต",
            "draw": "1",
            "unit": "อัน",
            "amount": "0"
        },

        {
            "number" : "5",
            "id" : "101000675",
            "name": "ตรายาง - วันที่ตัวเลข",
            "draw": "1",
            "unit": "อัน",
            "amount": "0"
        },

        {
            "number" : "6",
            "id" : "101000062",
            "name": "หลอดไฟเครื่องฉายข้ามศรีษะ",
            "draw": "2",
            "unit": "หลอด",
            "amount": "1"
        }, 

        {
            "number" : "7",
            "id" : "101000277",
            "name": "ถ่านขนาด 9 V",
            "draw": "3",
            "unit": "ก้อน",
            "amount": "2"
        },
    ]

    var table = $("#materialTable").DataTable({
        responsive: true,
        deferRender: true,
        
        data: materials,
        columns:[
            {data: "number" , title: "ลำดับ"},
            {data: "id" , title: "รหัสวัสดุ"},
            {data: "name", title: "รายการ"},
            {data: "draw", title: "จำนวนเบิก"},
            {data: "unit" , title: "หน่วยนับ"},
            {data: "amount", title: "จำนวนจ่าย"}
        ]
    });

    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });


    $("#btnback").click(function () {
        window.history.back();
    });
});