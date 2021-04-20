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

    table = $("#requistionTable").DataTable({
        responsive: true,
        ajax: {
            method: 'GET',
            url: '/getrequisition',
            dataSrc: function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status_requisition == 1) {
                        data[i].status_requisition = "รออนุมัติ";
                    } else if (data[i].status_requisition == 2) {
                        data[i].status_requisition = "อนุมัติ";
                    }
                }
                return data;
            }
        },
        columns: [
            { data: "date_requisition", title: "วันที่" },
            { data: "name", title: "ชื่อ-นามสกุล" },
            { data: "requisition_id", title: "เลขที่ใบเบิก" },
            { data: "status_requisition", title: "สถานะ" },
            { title: "รายระเอียด", defaultContent: "<a class='btndetail'>รายละเอียดเพิ่มเติม</a>" },
        ],
        "order": [[1, 'asc']]
    });

    table.on('order.dt search.dt', function () {
        table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

    // $.ajax({
    //     type: 'GET',
    //     url: '/getrequisition',
    //     success: (response) => {
    //         table = $("#requistionTable").DataTable({
    //             responsive: true,
    //             dataSrc: function (data) {
    //                 for (let i = 0; i < data.length; i++) {
    //                     if (data[i].status_requisiton == 1) {
    //                         data[i].status_requisiton = "รออนุมัติ";
    //                     } else if (data[i].status_requisiton == 2) {
    //                         data[i].status_requisiton = "อนุมัติ";
    //                     }
    //                 }
    //             },
    //             columns: [
    //                 { data: "date_requisition", title: "วันที่" },
    //                 { data: "name", title: "ชื่อ-นามสกุล" },
    //                 { data: "requisition_id", title: "เลขที่ใบเบิก" },
    //                 { data: "status_requisition", title: "สถานะ" },
    //                 { title: "รายระเอียด", defaultContent: "<a class='btndetail'>รายละเอียดเพิ่มเติม</a>" },
    //             ]
    //         })
    //     }, error: (xhr) => {
    //         alert(xhr.responseText);
    //     }
    // })

    // var rowID;





    // Sidebar toggle behavior
    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });
})