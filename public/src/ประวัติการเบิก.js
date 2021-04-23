function init() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '565819629218-hrjqptqk34lk5sq2599tasa7gc2tho24.apps.googleusercontent.com'
        })
    })
}

$(document).ready(function () {

    $("#static").on("click", function () {
        window.location.replace('/staticvisor')
    })

    $("#perman").on("click", function () {
        window.location.replace('/individualstatistics')
    })

    $("#material").on("click", function () {
        window.location.replace('/meterialvisor')
    })

    $("#hisvisor").on("click", function () {
        window.location.replace('/hiswithdrawmat')
    })

    $("#hisedit").on("click", function () {
        window.location.replace('/hiseditmaterial')
    })

    // Logout
    $("#logout").on("click", function () {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            window.location.replace('/logout');
        })
    })

    var rowID;

    var table = $("#requesthistoryTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        ajax: ({
            type: 'GET',
            url: '/hisvisor',
            dataSrc: (data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status_requisition == 1) {
                        data[i].status_requisition = 'รออนุมัติ'

                    }
                    else if (data[i].status_requisition == 2) {
                        data[i].status_requisition = 'อนุมัติ'

                    }
                    else if (data[i].status_requisition == 3) {
                        data[i].status_requisition = 'ไม่อนุมัติ'

                    }
                    else if (data[i].status_requisition == 4) {
                        data[i].status_requisition = 'เสร็จสมบูรณ์ '

                    }

                    let d = new Date(data[i].date_requisition);
                    let year = d.getFullYear();
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    data[i].date_requisition = date + '-' + month + '-' + year
                }

                return data
            }
        }),

        columns: [
            { data: "date_requisition", title: "วันที่" },
            { data: "time_requisition", title: "เวลา" },
            { data: "requisition_id", title: "เลขที่ใบเบิก" },
            { data: "status_requisition", title: "สถานะ" },
            { title: "รายละเอียด", orderable: false, defaultContent: "<a href='#' class = 'btn-detail'>รายละเอียดเพิ่มเติม</a>" }
        ],
        "columnDefs": [{
            "targets": 3,
            "createdCell": function (td, cellData, rowData, row, col) {
                if (cellData == "ไม่อนุมัติ") {
                    $(td).css('color', '#FF0000');
                }
                else if (cellData == "รออนุมัติ") {
                    $(td).css('color', '#F6B100');
                }
                else if (cellData == "อนุมัติ") {
                    $(td).css('color', '#06B4FF');
                }
                else {
                    $(td).css('color', '#00750C')
                }
            }
        }],

    });

    $("#requesthistoryTable tbody").on("click", ".btn-detail", function () {
        const currentRow = $(this).parents("tr");
        const data = table.row(currentRow).data();
        const requisi_id = data.requisition_id;

        localStorage.requi = requisi_id;
        window.location.replace('/detailhiswithdraw')
    })
    // Sidebar toggle behavior
    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });
})