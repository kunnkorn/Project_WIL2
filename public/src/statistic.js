$(document).ready(function () {

    //statistic
    var colors = ['#5832CE', '#F90904', '#E4D131'];

    var chBar = document.getElementById("chBar");
    var chartData = {
        labels: ['วัสดุสำนักงาน', ' วัสดุไฟฟ้าวิทยุ', 'วัสดุคอมพิวเตอร์', 'วัสดุงานบ้านงานครัว', 'วัสดุเครื่องแต่งกาย', 'วัสดุของที่ระลึก'],
        datasets: [{
            lable: ['อนุมัติ'],
            data: [589, 445, 483, 503, 689, 692, 634],
            backgroundColor: colors[0]
        },
        {
            lable: 'ไม่อนุมัติ',
            data: [209, 245, 383, 403, 589, 692, 580],
            backgroundColor: colors[1]
        },
        {
            lable: 'อนุมัติแต่ไม่ครบ',
            data: [489, 135, 483, 290, 189, 603, 600],
            backgroundColor: colors[2]
        },
        ]
    };

    if (chBar) {
        new Chart(chBar, {
            type: 'bar',
            data: chartData,
            responsive: true,
            options: {
                scales: {
                    xAxes: [{
                        barPercentage: 1,
                        categoryPercentage: 0.5
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                },
                legend: {
                    display: true,
                    position: 'bottom'

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

    //model export file
    $("#export").on("click", function () {
        $("#modelExport").modal("show");
    });
    $("#exportConfirm").on("click", function (e) {
        $("#modelExport").modal("hide");
        Swal.fire({
            icon: 'success',
            title: 'นำออกข้อมูลเสร็จสิ้น',
            showConfirmButton: false,
            timer: 1500
        })


    });



    // Sidebar toggle behavior
    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });
})