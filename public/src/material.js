$(document).ready(function(){
     // Sidebar toggle behavior
     $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
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
            { data: "number", title: "ลำดับ"   },
            { data: "id", title: "รหัสวัสดุ" },
            { data: "name", title: "รายการ" },
            { data: "balance", title: "คงเหลือ" },
            { data: "unit", title: "หน่ายนับ" },
            { title: "เพิ่มจำนวน", orderable: false, defaultContent: " <button class='btn btn-warning my-1'>  Edit</button>" }
        ],
        columnDefs: [
            // make the last column align right, also target: "_all" 
            { "className": "dt-center", "targets": 5 }
        ]
    });

    //Add data
    var count = 3;
    $("#btnimport").click(function(){
        $("#modeladd").modal("show");
        $("#btnSaveadd").on("click",function(){
            var checkindex = 0;
            count++;
            const id = $("#addID").val();
            const name = $("#addName").val();
            const balance = $("#addNum").val();
            const unit = $("#addUnit").val(); 
            for(let i =0;i< material.length ; i++){
                if(id != material[i].id){
                    checkindex++;  
                }else{
                    alert("Have too much ID");
                    break;
                }
            }   
            if(checkindex == material.length){
                material.push({ "id" : count, "name" : name ,"balance" : balance ,"unit":unit});
                console.log(material);
                table.row.add({
                    //"number":ลำดับ,
                    "number" : count,
                    "id" :id , 
                    "name" : name ,
                    "balance" : balance ,
                    "unit" : unit,
                }).draw();

                $("#addID").val("");
                $("#addName").val("");
                $("#addNum").val("");
                $("#addUnit").val("");
                $("#modeladd").modal("hide");
            }
        });
    });
     //Edit Table
     $("#materialTable tbody").on("click", ".btn-warning", function () {
        const currentRow = $(this).parents("tr")
        const data = table.row(currentRow).data();
        rowID = table.row(currentRow).index();
        $("#EditID").val(data.id);
        $("#EditName").val(data.name);
        $("#EditNum").val(data.balance);
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