function init() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '565819629218-hrjqptqk34lk5sq2599tasa7gc2tho24.apps.googleusercontent.com'
        });
    });
}

function signout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        window.location.replace('/logout');
    });
}


$(document).ready(function () {
    var table;
    var rowID;



    table = $("#requistionTable").DataTable({
        responsive: true,
        ajax: {
            method: 'GET',
            url: '/getrequisition',
            dataSrc: function (data) {
                for (let i = 0; i < data.length; i++) {
                    let d = new Date(data[i].date_requisition);
                    let year = d.getFullYear();
                    let month = d.getMonth();
                    let date = d.getDate();
                    data[i].date_requisition = date + "-" + month + "-" + year;
                    if (data[i].status_requisition == 1) {
                        data[i].status_requisition = "รออนุมัติ";
                    } else if (data[i].status_requisition == 2) {
                        data[i].status_requisition = "อนุมัติ";
                    }
                }

                $("#badge_req").text(data.length);
                sessionStorage.noti = data.length;
                return data;
            }
        },
        columns: [
            { title: "ลำดับ", defaultContent: "" },
            { data: "date_requisition", title: "วันที่" },
            { data: "name", title: "ชื่อ-นามสกุล" },
            { data: "requisition_id", title: "เลขที่ใบเบิก" },
            { data: "status_requisition", title: "สถานะ" },
            { title: "รายระเอียด", defaultContent: "<a style='cursor: pointer;' class='btndetail'>รายละเอียดเพิ่มเติม</a>" },
        ],
        "columnDefs": [{
            "targets": 4,
            "createdCell": function (td, cellData, rowData, row, col) {
                if (cellData == "รออนุมัติ") {
                    $(td).css('color', '#F7B100');
                } else {
                    $(td).css('color', '#06B4FF');
                }
            }
        }],
        "order": [[1, 'asc']]
    });

    $("#requistionTable").on("click", ".btndetail", function () {
        const currentRow = $(this).parents("tr");
        let datarow = table.row(currentRow).data();
        rowID = table.row(currentRow).index();
        sessionStorage.number = datarow.requisition_id;
        if(datarow.status_requisition == "รออนุมัติ"){
            window.location.href = '/detailrequiadmin';
        }else {
            window.location.href = '/detailsuccessadmin';
        }
    })

    table.on('order.dt search.dt', function () {
        table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();


    // Sidebar toggle behavior
    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });
})