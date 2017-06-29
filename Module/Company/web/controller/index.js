$(function() {
    //双击跳转显示该商场下的所有商品信息
    $("table tr").dblclick(function() {
        var thisCid = $(this).children("td").html();
        $("form").attr('action', "/queryGoodsByCompanyId/" + thisCid);
        $("form").submit();
    })

    //查询（支持模糊查询）
    $("#select").click(function() {
        var name = $("#name").val();
        if (name == "") {
            name = null;
        }
        $("form").attr('action', "/queryByName/" + name);
        $("form").submit();
    })

    //删除
    $(".delete").click(function() {
        var id = $(this).attr("id");
        $.get('/delete/' + id, function(data) {
            location.reload();
        })
    });

    //新增
    $("#insert").click(function() {
        var opt = { type: 1, id: "", name: "", address: "", regisNum: "", title: "新建商城信息" };
        createCommonWin(opt);
    });

    //更新
    $(".update").click(function() {
        var id = $(this).attr("id");
        $.get("/detail/" + id, "", function(data) {
            if (data.success) {
                var opt = { type: 2, id: id, name: data.name, address: data.address, regisNum: data.regisNum, title: "修改商城信息" };
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
                '<input type="hidden" value="' + opt.id + '" name="id" id="id">' +
                '<input type="hidden" value="' + opt.regisNum + '" name="regisNum" id="regisNum">' +
                '<label class="col-sm-2 control-label"><span style="color:red;font-weight: bolder">*</span>商城名称</label> ' +
                '<div class="col-sm-4" style="display:inline-block"><input id="names" type="text"  name="names"  value="' + opt.name + '" class="form-control input-md">' +
                '</div></br></br> ' +
                '<div class="form-group form-group-sm"> ' +
                '<label class="col-sm-2 control-label"><span style="color:#ff0000;font-weight: bolder">*</span>商城地址</label> ' +
                '<div class="col-sm-4" style="display:inline-block"><input id="address" type="text" name="address"  value="' + opt.address + '" class="form-control input-md">' +
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
                        if (subForm.find("#name").val() == "") {
                            alert("商城名称不能为空!");
                            return false;
                        } else if (subForm.find("#address").val() == "") {
                            alert("商城地址不能为空!");
                            return false;
                        } else {
                            var id = $("#id").val();
                            var regisNum = $("#regisNum").val();
                            var name = $("#names").val();
                            var address = $("#address").val();

                            if (opt.type == 1) { //类型为1时进行新增操作
                                $.get('/save/' + name + "/" + address, function(data) {
                                    location.reload(); //操作成功后刷新当前页面
                                })
                                return true;
                            } else if (opt.type == 2) { //类型为2时进行编辑操作
                                $.get('/update/' + id + "/" + name + "/" + address + "/" + regisNum, function(data) {
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