$(document).ready(function () {

    $(document).ready(function () {
        var rowID;
        var material = [{
            "number": "1",
            "id": "101000001",
            "name": "กรรไกรตัดกระดาษ 6",
            "amount": "20",
            "approve": "20",
            "disapprove": "0",
            "notcomplete": "0",
            "unit": "อัน",
        }, {
            "number": "2",
            "id": "101000002",
            "name": "กรรไกรตัดกระดาษ 9",
            "amount": "40",
            "approve": "28",
            "disapprove": "4",
            "notcomplete": "8",
            "unit": "อัน",
        }, {
            "number": "3",
            "id": "101000003",
            "name": "กระดาษ POSTIT ขนาด 2*3",
            "amount": "110",
            "approve": "100",
            "disapprove": "5",
            "notcomplete": "5",
            "unit": "เล่ม",
        }];
        var table = $("#materialTable").DataTable({
            responsive: true,       //for responsive column display
            deferRender: true,      //if large data, use this option

            data: material,
            columns: [
                { data: "number", title: "ลำดับ" },
                { data: "id", title: "รหัสวัสดุ" },
                { data: "name", title: "รายการ" },
                { data: "amount", title: "จำนวนที่เบิกรายเดือน" },
                { data: "approve", title: "อนุมัติ" },
                { data: "disapprove", title: "ไม่อนุมัติ" },
                { data: "notcomplete", title: "อนุมัติแต่ไม่ครบ" },
                { data: "unit", title: "หน่ายนับ" }
            ],
            columnDefs: [
                // make the last column align right, also target: "_all" 
                { "className": "dt-center", "targets": 7 }
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


    var colors = ['#5832CE', '#F90904', '#E4D131'];

    var chBar = document.getElementById("chBar");
    var chartData = {
        labels: ['วัสดุสำนักงาน', ' วัสดุไฟฟ้าวิทยุ', 'วัสดุคอมพิวเตอร์', 'วัสดุงานบ้านงานครัว', 'วัสดุเครื่องแต่งกาย', 'วัสดุของที่ระลึก'],
        datasets: [{
            label: ['อนุมัติ'],
            data: [589, 445, 483, 503, 689, 692, 634],
            backgroundColor: colors[0]
        },
        {
            label: 'ไม่อนุมัติ',
            data: [209, 245, 383, 403, 589, 692, 580],
            backgroundColor: colors[1]
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


});