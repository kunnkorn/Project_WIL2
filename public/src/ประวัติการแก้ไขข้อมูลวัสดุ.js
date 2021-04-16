$(document).ready(function () {
    var rowID;
    var historymaterial = [{
        "date": "17/05/2564",
        "time": "10:25 น.",
        "name": "นางสาว แอดมิน สมหญิง",
        "management": "เพิ่มจำนวน",
        "list": "ลวดเย็บกระดาษเบอร์ 1213",
        "number": "10",
        "unit": "กล่อง",
    },
    {
        "date": "17/05/2564",
        "time": "10:30 น.",
        "name": "นางสาว แอดมิน สมหญิง",
        "management": "ลดจำนวน",
        "list": "ลวดเย็บกระดาษเบอร์ 1213",
        "number": "2",
        "unit": "กล่อง",
    },
    {
        "date": "20/02/2564",
        "time": "09:33 น.",
        "name": "นางสาว แอดมิน สมหญิง",
        "management": "เพิ่มจำนวน",
        "list": "ลวดเย็บกระดาษเบอร์ 1213",
        "number": "5",
        "unit": "กล่อง",
    },
    {
        "date": "21/05/2564",
        "time": "10:34 น.",
        "name": "นางสาว แอดมิน สมหญิง",
        "management": "เพิ่มจำนวน",
        "list": "ลวดเย็บกระดาษเบอร์ 1213",
        "number": "3",
        "unit": "กล่อง",
    },
    {
        "date": "21/05/2564",
        "time": "11:10 น.",
        "name": "นางสาว แอดมิน สมหญิง",
        "management": "ลดจำนวน",
        "list": "คลิปหนีบกระดาษ เบอร์ 109/413",
        "number": "10",
        "unit": "ตัว",
    },];
    var table = $("#historymaterialTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        data: historymaterial,
        columns: [
            { data: "date", title: "วันที่" },
            { data: "time", title: "เวลา" },
            { data: "name", title: "ผู้แก้ไข" },
            { data: "management", title: "การจัดการ" },
            { data: "list", title: "รายการ" },
            { data: "number", title: "จำนวน" },
            { data: "unit", title: "หน่วยนับ" }],
        columnDefs: [
            // make the last column align right, also target: "_all"
            { "className": "dt-center", "targets": 6 }
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