export const formatChange = function (obj) {
    let data = {
        pointGeoJson: {
            features: [],
            type: "FeatureCollection"
        }
    }
    if(obj instanceof Array){
        obj.forEach((val,index,arr) => {
            for(let item in val){
                val[item].dataType = item;
                data.pointGeoJson.features.push(val[item]);
            }
        })
        var stringData = JSON.stringify(data);
        var jsonData = JSON.parse(stringData);
        return jsonData;
    }
}

export const deepClone = function(source){
    const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
    for(let keys in source){ // 遍历目标
      if(source.hasOwnProperty(keys)){
        if(source[keys] && typeof source[keys] === 'object'){ // 如果值是对象，就递归一下
          targetObj[keys] = source[keys].constructor === Array ? [] : {};
          targetObj[keys] = deepClone(source[keys]);
        }else{ // 如果不是，就直接赋值
          targetObj[keys] = source[keys];
        }
      }
    }
    return targetObj;
}

export const arrayChange = function(arr) {
    let arrs = [];
	arr.forEach(function(item,index,array){
		let aa = item.split(' ').join(',');
		let bb = aa.split(',');
		bb.forEach(function(item,index,array) {
			arrs.push(item);
		})
    })
    return arrs;
}

export const commonNames = function(data) {
    let item = {};
    let dest = [];
    for(var i=0;i<data.length;i++){   //将相同名称得园区归类到一起
        let ai = data[i];
        if(!item[ai.ViewRentalBuild.names]) {
            dest.push({
                names: ai.ViewRentalBuild.names,
                geometry: ai.ViewRentalBuild.geometry,
                parkid: ai.ViewRentalBuild.parkid,
                btotal: ai.ViewRentalBuild.btotal,
                x: ai.ViewRentalBuild.x,
                y: ai.ViewRentalBuild.y,
                listArr: [ai.ViewRentalBuild]
            });
            item[ai.ViewRentalBuild.names] = ai.ViewRentalBuild;
        }else{
            for(var j = 0; j < dest.length; j++) {
                var dj = dest[j];
                if(dj.names == ai.ViewRentalBuild.names) {
                    dj.listArr.push(ai.ViewRentalBuild);
                    break;
                }
            }
        }
    }
    return dest;
}

export const doGet = function(ajaxUrl,data,onSuccess){
    $.ajax({
        type: 'get',
        url: ajaxUrl,
        data: {
            url: data
        }, 
        // dataType: 'json',
        async: true,
        success : function(result){
            onSuccess(result);
        },
        error: function (e)
        {
            alert("数据请求异常");
        },
        beforeSend: function ()
        {
//             $.ligerDialog.waitting("正在登陆中,请稍后...");
//             $("#btnLogin").attr("disabled", true);
        },
        complete: function ()
        {
//             $.ligerDialog.closeWaitting();
//             $("#btnLogin").attr("disabled", false);
        }
    });
}