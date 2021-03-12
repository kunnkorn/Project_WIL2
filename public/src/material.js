$(document).ready(function(){
     // Sidebar toggle behavior
     $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
    });
    var rowID;
    var material = [{
        "number": "1",
        "id": "101000001",
        "name": "กรรไกรตัดกระดาษ 6",
        "balance": "50",
        "unit": "อัน",
    }, {
        "number": "2",
        "id": "101000002",
        "name": "กรรไกรตัดกระดาษ 9",
        "balance": "50",
        "unit": "อัน",
    }, {
        "number": "3",
        "id": "101000003",
        "name": "กระดาษ POSTIT ขนาด 2*3",
        "balance": "110",
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
            { data: "balance", title: "คงเหลือ" },
            { data: "unit", title: "หน่ายนับ" },
            { title: "เพิ่มจำนวน", orderable: false, defaultContent: " <button class='btn btn-warning my-1'>Edit</button>" }
        ],
        columnDefs: [
            // make the last column align right, also target: "_all"
            { "className": "dt-center", "targets": 5 }
        ]
    });
     //Edit Table
     $("#materialTable tbody").on("click", ".btn-warning", function () {
        const currentRow = $(this).parents("tr")
        const data = table.row(currentRow).data();
        rowID = table.row(currentRow).index();
        $("#EditID").prop("disabled", true);
        $("#EditID").val(data.id);
        $("#EditName").prop("disabled", true);
        $("#EditName").val(data.name);
        $("#EditNum").val(data.balance);
        $("#EditUnit").prop("disabled", true);
        $("#EditUnit").val(data.unit);

        //show model
        $("#modelEdit").modal("show");
    });
    //save Edit
    $("#btnSaveEdit").click(function () {
        const number = $("#EditNum").val();
        material[rowID].balance = number;

        let temp = table.row(rowID).data();
        temp.balance = number;
        table.row(rowID).data(temp).invalidate();

        $("#modelEdit").modal("hide");
    });

    

});