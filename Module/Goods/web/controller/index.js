$(function() {
    //点击返回
    $("#fanhui").click(function() {
        $.get('/', function(data) {
            location.href = "http://localhost:4000/";
        })
    })

    //查询（支持模糊查询）
    $("#select").click(function() {
        var gname = $("#name").val();
        if (gname == "") {
            gname = null;
        }
        var companyid = $("#companyid").val();

        $("form").attr('action', "/queryGoodsByName/" + gname + "/" + companyid);
        $("form").submit();
    })

    //删除
    $(".delete").click(function() {
        var gid = $(this).attr("id");
        $.get('/deleteGoods/' + gid, function(data) {
            location.reload();
        })
    });

    //新增
    $("#insert").click(function() {
        var companyid = $("#companyid").val();
        console.log(companyid);
        var opt = { type: 1, gid: "", gname: "", gprice: "", gdescrition: "", gid_companies: companyid, title: "新建商品信息" };
        createCommonWin(opt);
    });

    //更新
    $(".update").click(function() {
        var gid = $(this).attr("id");
        $.get("/detailGoods/" + gid, "", function(data) {
            if (data.success) {
                var opt = { type: 2, gid: gid, gname: data.gname, gprice: data.gprice, gdescrition: data.gdescrition, gid_companies: data.gid_companies, title: "修改商品信息" };
                createCommonWin(opt);
            }
        })
    });

    //新增/修改时弹窗操作
    function createCommonWin(opt) {
        bootbox.dialog({
            message: "<div class='container-fluir' id='addOrEdit'" +
                "<div class='row'>" +
                "<div class='row form-group form-group-sm' style='text-align: center'>" +
                "<form class='form-horizontal' id='createForm' role='form' method='post'>" +
                '<div class="form-group form-group-sm" style="margin-left:20px"> ' +
                '<input type="hidden" value="' + opt.gid + '" name="gid" id="gid">' +
                '<input type="hidden" value="' + opt.gid_companies + '" name="gid_companies" id="gid_companies">' +
                '<label class="col-sm-2 control-label"><span style="color:red;font-weight: bolder">*</span>商品名称</label> ' +
                '<div class="col-sm-4" style="display:inline-block"><input id="gname" type="text"  name="gname"  value="' + opt.gname + '" class="form-control input-md">' +
                '</div></br></br> ' +
                '<div class="form-group form-group-sm"> ' +
                '<label class="col-sm-2 control-label"><span style="color:#ff0000;font-weight: bolder">*</span>商品价格</label> ' +
                '<div class="col-sm-4" style="display:inline-block"><input id="gprice" type="text" name="gprice"  value="' + opt.gprice + '" class="form-control input-md">' +
                '</div></br></br> ' +
                '<div class="form-group form-group-sm"> ' +
                '<label class="col-sm-2 control-label"><span style="color:#ff0000;font-weight: bolder">*</span>商品描述</label> ' +
                '<div class="col-sm-4" style="display:inline-block"><input id="gdescrition" type="text" name="gdescrition"  value="' + opt.gdescrition + '" class="form-control input-md">' +
                '</div></br></br> ' +
                "</form>" +
                "</div>" +
                "</div>" +
                "</div>",
            title: opt.title,
            buttons: {
                Cancel: {
                    label: "取消",
                    className: "btn-default cancle",
                    callback: function() {
                        return true;
                    }
                },
                OK: {
                    label: "保存",
                    className: "btn-primary save",
                    callback: function() {
                        var subForm = $("#createForm");
                        if (subForm.find("#gname").val() == "") {
                            alert("商品名称不能为空!");
                            return false;
                        } else if (subForm.find("#gprice").val() == "") {
                            alert("商品价格不能为空!");
                            return false;
                        } else {
                            var gid = $("#gid").val();
                            var gid_companies = $("#gid_companies").val();
                            var gname = $("#gname").val();
                            var gprice = $("#gprice").val();
                            var gdescrition = $("#gdescrition").val();

                            if (opt.type == 1) { //类型为1时进行新增操作
                                $.get('/saveGoods/' + gname + "/" + gprice + "/" + gdescrition + "/" + gid_companies, function(data) {
                                    location.reload(); //操作成功后刷新当前页面
                                })
                                return true;
                            } else if (opt.type == 2) { //类型为2时进行编辑操作
                                $.get('/updateGoods/' + gname + "/" + gprice + "/" + gdescrition + "/" + gid_companies + "/" + gid, function(data) {
                                    location.reload(); //操作成功后刷新当前页面
                                })
                                return true;
                            }
                        }
                    }
                }
            }
        });
    }
})