$(document).ready(function () {
    var colors = ['#5832CE', '#F90904', '#E4D131'];
    //bar chart
    var chBar = document.getElementById("chBar");
    if (chBar) {
        new Chart(chBar, {
            type: 'bar',
            data: {
                lables: ["วัสดุสำนักงาน", "วัสดุไฟฟ้าวิทยุ", "วัสดุคอมพิวเตอร์", "วัสดุงานบ้านงานครัว", "วัสดุเครื่องแต่งกาย", "วัสดุของที่ระลึก"],
                datasets: [{
                    data: [230, 123, 25, 96, 45, 124],
                    backgroundColor: colors[0]
                },
                {
                    data: [45, 32, 77, 10, 7, 5],
                    backgroundColor: colors[1]
                }, {
                    data: [41, 75, 84, 98, 36, 74],
                    backgroundColor: colors[2]
                }]
            },
            option: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        barPercentage: 0.4,
                        categoryPercentage: 0.5
                    }]
                }
            }
        });
    }




    //statistic
    var materialStatistic = [{
        "number": "1",
        "id": "101000001",
        "name": "กรรไกรตัดกระดาษ 6",
        "amountMonth": "1658",
        "complete": "748",
        "notcomplete": "610",
        "half": "300",
        "unit": "อัน",
    }, {
        "number": "2",
        "id": "101000002",
        "name": "กรรไกรตัดกระดาษ 9",
        "amountMonth": "1200",
        "complete": "648",
        "notcomplete": "502",
        "half": "50",
        "unit": "อัน",
    }, {
        "number": "3",
        "id": "101000003",
        "name": "กระดาษ POSTIT ขนาด 2*3",
        "amountMonth": "900",
        "complete": "750",
        "notcomplete": "138",
        "half": "12",
        "unit": "เล่ม",
    }];

    var table = $("#materialTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        data: materialStatistic,
        columns: [
            { data: "number", title: "ลำดับ" },
            { data: "id", title: "รหัสวัสดุ" },
            { data: "name", title: "รายการ" },
            { data: "amountMonth", title: "จำนวนที่เบิกรายเดือน" },
            { data: "complete", title: "อนุมัติ" },
            { data: "notcomplete", title: "ไม่อนุมัติ" },
            { data: "half", title: "อนุมัติแต่ไม่ครบ" },
            { data: "unit", title: "หน่ายนับ" },

        ],
        columnDefs: [
            // make the last column align right, also target: "_all"
            { "className": "dt-center", "targets": 5 }
        ]
    });

    //export file
    $("#export").on("click", function () {
        $("#modelExport").modal();
    });



    // Sidebar toggle behavior
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
    });
})