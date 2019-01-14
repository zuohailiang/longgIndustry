// import ol from 'ol'
import Style from 'ol/style/style';
import Icon from 'ol/style/icon';
import Text from 'ol/style/text';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import Circle from 'ol/style/circle';
// import { map } from '@/utils/publicMap.js'

let devSrc = '../../static/images/';
let proSrc = 'static/images/';
let baseSrc = '';
let env = process.env.NODE_ENV;
if(env === "development") {
    baseSrc = devSrc;
}else{
    baseSrc = proSrc;
}

export const defaultStyles = {
    'PointLand1': [new Style({
        image: new Icon({
          anchor: [0.55, 39.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          scale: 1, 
        //   src: '../../static/images/land1.png'
          src: `${baseSrc}land1.png`
        })  //选中的点样式
    })],
    'PointLand2': [new Style({
        image: new Icon({
          anchor: [0.55, 39.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          scale: 1, 
          //src: '../../static/images/land2.png'
          src: `${baseSrc}land2.png`
        })  //选中的点样式
    })],
    'PointHouse1': [new Style({
        image: new Icon({
          anchor: [0.55, 39.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          scale: 1, 
          //src: '../../static/images/house1.png'
          src: `${baseSrc}house1.png`
        })  //选中的点样式
    })],
    'PointHouse2': [new Style({
        image: new Icon({
          anchor: [0.55, 39.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          scale: 1, 
          //src: '../../static/images/house2.png'
          src: `${baseSrc}house2.png`
        })  //选中的点样式
    })],
    'EnterpriseMsg': [new Style({
        image: new Icon({
        //   anchor: [0.55, 17.5],
          anchor: [0.85, 17.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          scale: 1, 
          //src: '../../static/images/emarkers.png'
          src: `${baseSrc}emarkers.png`
        })  //选中的点样式
    })],
    'Polygon': [new Style({
        stroke: new Stroke({  //区的边界样式
            color: '#11f0ff',
            lineDash: [0],
            width: 2
        }),
        fill: new Fill({  //区的填充样式
            color: 'rgba(255, 127, 52, 1)'
        })
    })],
    'listMapMark': [new Style({
        image: new Icon({
          anchor: [0.55, 39.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          scale: 1, 
          //src: '../../static/images/ss.png'
          src: `${baseSrc}ss.png`
        })  //选中的点样式
    })],
}

const styles = {
    'Point': [new Style({
        image: new Icon({
            anchor: [0.55, 39.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            scale: 0.8, 
            //src: '../../static/images/point1.png'
            src: `${baseSrc}point1.png`
        })  //点样式
    })],
    'LineString': [new Style({
        stroke: new Stroke({  //线的边界样式
            color: 'red',
            width: 3
        })
    })],
    'MultiLineString': [new Style({
        stroke: new Stroke({  //多线的边界样式
            color: 'green',
            width: 1
        })
    })],
    // 'MultiPoint': [new Style({
    //     image: image  //多点的点样式
    // })],
    'MultiPolygon': [new Style({
        stroke: new Stroke({  //区的边界样式
            color: '#11f0ff',
            lineDash: [0],
            width: 2
        }),
        fill: new Fill({  //区的填充样式
            color: 'rgba(255, 127, 52, 1)'
        })
    })],
    'Polygon': [new Style({
        stroke: new Stroke({  //区的边界样式
            color: '#DF4000',
            lineDash: [0],
            width: 2
        }),
        fill: new Fill({  //区的填充样式
            color: 'rgba(255, 255, 255, 0.4)'
        })
    })],
    'GeometryCollection': [new Style({
        stroke: new Stroke({  //集合要素的边界样式
            color: 'magenta',
            width: 2
        }),
        fill: new Fill({  //集合要素的填充样式
            color: 'magenta'
        }),
        image: new Circle({  //集合要素的点样式
            radius: 10,
            fill: null,
            stroke: new Stroke({
                color: 'magenta'
            })
        })
    })],
    'Circle': [new Style({
        stroke: new Stroke({  //圆的边界样式
            color: 'red',
            width: 2
        }),
        fill: new Fill({  //圆的填充样式
            color: 'rgba(255,0,0,0.2)'
        })
    })]
};

const styles_1 = {
    'Point': [new Style({
        image: new Icon({
            anchor: [0.55, 39.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            scale: 0.8, 
            //src: '../../static/images/ss.png'
            src: `${baseSrc}ss.png`
        })  //点样式
    })],
    'LineString': [new Style({
        stroke: new Stroke({  //线的边界样式
            color: 'red',
            width: 3
        })
    })],
    'MultiLineString': [new Style({
        stroke: new Stroke({  //多线的边界样式
            color: 'green',
            width: 1
        })
    })],
    // 'MultiPoint': [new Style({
    //     image: image  //多点的点样式
    // })],
    'MultiPolygon': [new Style({
        stroke: new Stroke({  //区的边界样式
            color: '#11f0ff',
            lineDash: [0],
            width: 2
        }),
        fill: new Fill({  //区的填充样式
            color: 'rgba(255, 127, 52, 1)'
        })
    })],
    'Polygon': [new Style({
        stroke: new Stroke({  //区的边界样式
            color: '#DF4000',
            lineDash: [0],
            width: 2
        }),
        fill: new Fill({  //区的填充样式
            color: 'rgba(255, 255, 255, 0.4)'
        })
    })],
    'GeometryCollection': [new Style({
        stroke: new Stroke({  //集合要素的边界样式
            color: 'magenta',
            width: 2
        }),
        fill: new Fill({  //集合要素的填充样式
            color: 'magenta'
        }),
        image: new Circle({  //集合要素的点样式
            radius: 10,
            fill: null,
            stroke: new Stroke({
                color: 'magenta'
            })
        })
    })],
    'Circle': [new Style({
        stroke: new Stroke({  //圆的边界样式
            color: 'red',
            width: 2
        }),
        fill: new Fill({  //圆的填充样式
            color: 'rgba(255,0,0,0.2)'
        })
    })]
};

const keyStyles = {
    'Point': [new Style({
        image: new Icon({
            anchor: [0.55, 39.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            scale: 0.8, 
            //src: '../../static/images/point1.png'
            src: `${baseSrc}point1.png`
        })  //点样式
    })],
    'Polygon': [new Style({
        stroke: new Stroke({  //区的边界样式
            color: '#2059D2',
            lineDash: [0],
            width: 2
        }),
        fill: new Fill({  //区的填充样式
            color: 'rgba(43,93,213, 0.4)'
        })
    })],
}

const keySelectStyles = {
    'Polygon': [new Style({
        stroke: new Stroke({  //区的边界样式
            color: '#2059D2',
            lineDash: [0],
            width: 2
        }),
        fill: new Fill({  //区的填充样式
            color: 'rgba(43,93,213, 1)'
        })
    })],
}

//重点片区几何要素的样式
export const styleKeyArea = function (feature) {
    return keyStyles[feature.getGeometry().getType()];
};

export const styleKeyAreaSelect = function(feature) {
    return keySelectStyles[feature.getGeometry().getType()];
}

//根据要素类型设置几何要素的样式
export const styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
};

//根据要素类型设置几何要素的样式
export const styleFunction_1 = function (feature) {
    return styles_1[feature.getGeometry().getType()];
};

//根据要素类型设置几何要素的选中样式
export const selectStyles = function (feature, resolution) {
    return selectStyles[feature.getGeometry().getType()];
};

//根据不同类型加载工业区信息不同类型的点
export const industrailStyles = function(feature) {
    let image;
    let attrs = feature.getProperties();
    let transformway = attrs['transformway'];
    if (attrs['transformway'] == "综合整治") {
        //image = '../../static/images/point1.png';
        image = `${baseSrc}point1.png`;
    } else if(transformway == '维持现状') {
        //image = '../../static/images/point2.png';
        image = `${baseSrc}point2.png`;
    } else if(transformway == '拆除重建') {
        //image = '../../static/images/point3.png';
        image = `${baseSrc}point3.png`;
    } else if(transformway == '空地新建') {
        //image = '../../static/images/point4.png';
        image = `${baseSrc}point4.png`
    } else if(transformway == '逐步清退') {
        //image = '../../static/images/point5.png';
        image = `${baseSrc}point5.png`
    } else if(transformway == '产业置换') {
        //image = '../../static/images/point6.png';
        image = `${baseSrc}point6.png`
    }
    return [new Style({
        image: new Icon({
            anchor: [0.5, 1],
            scale: 0.8,
            src: image,
        })
    })]
}

//鼠标移动到图标点上改变的样式
export const pointMoveStyles = function (feature, resolution) {
    let image;
    let textField;
    let offsetY;
    offsetY = 15;
    let attrs = feature.getProperties();
    if (attrs['dataType'] == 'ViewLand'){
        //image = '../../static/images/land2.png';
        image = `${baseSrc}land2.png`;
        textField = 'names';
    } else if (attrs['dataType'] == 'ViewParkBuild'){
        //image = '../../static/images/house2.png';
        image = `${baseSrc}house2.png`;
        textField = 'names';
    } else if (attrs['dataType'] == 'ViewCreateSpace'){
        //image = '../../static/images/house2.png';
        image = `${baseSrc}house2.png`;
        textField = 'names';
    } else if (attrs['dataType'] == 'ViewEnterprise'){
        //image = '../../static/images/emarkers.png';
        // image = `${baseSrc}emarkers.png`;
        image = `${baseSrc}emarkershover.png`;
        textField = 'names';
    } else if (attrs['dataType'] == 'listMapMark'){
        //image = '../../static/images/emarkers.png';
        image = `${baseSrc}emarkers.png`;
        textField = 'names';
    }
    if(attrs['dataType'] == 'ViewEnterprise') {
        return [new Style({
            image: new Icon({
                anchor: [0.85, 17.5],
                scale: 1,
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: image,
            }),
            text: createTextStyle(feature, resolution, {
                textField: textField,//标注字段为 "NAME"
                fontSize: 14,
                outlineWidth: 2,
                offsetY: offsetY
            })
        })]
    }else{
        return [new Style({
            image: new Icon({
                anchor: [0.5, 1],
                scale: 1,
                src: image,
            }),
            text: createTextStyle(feature, resolution, {
                textField: textField,//标注字段为 "NAME"
                fontSize: 14,
                outlineWidth: 2,
                offsetY: offsetY
            })
        })]
    }
};

export const pointMoveStyles_1 = function (feature, resolution) {
    let image;
    let textField;
    let offsetY;
    offsetY = 15;
    let attrs = feature.getProperties();
    if (attrs['dataType'] == 'listMapMark'){
        //image = '../../static/images/sss.png';
        image = `${baseSrc}sss.png`;
        textField = 'names';
    }
    return [new Style({
        image: new Icon({
            anchor: [0.5, 1],
            scale: 1,
            src: image,
        }),
        text: createTextStyle_2(feature, resolution, {
            textField: textField,//标注字段为 "NAME"
            fontSize: 14,
            outlineWidth: 2,
            offsetY: offsetY
        })
    })]
};

//工业区信息点  鼠标移动到上面时
export const InpointMoveStyles = function(feature, resolution) {
    let image;
    let textField;
    let offsetY;
    offsetY = 15;
    let attrs = feature.getProperties();
    let transformway = attrs['transformway'];
    if (attrs['transformway'] == "综合整治") {
        //image = '../../static/images/point1.png';
        image = `${baseSrc}point1.png`;
        textField = 'names';
    } else if(transformway == '维持现状') {
        //image = '../../static/images/point2.png';
        image = `${baseSrc}point2.png`;
        textField = 'names';
    } else if(transformway == '拆除重建') {
        //image = '../../static/images/point3.png';
        image = `${baseSrc}point3.png`;
        textField = 'names';
    } else if(transformway == '空地新建') {
        //image = '../../static/images/point4.png';
        image = `${baseSrc}point4.png`;
        textField = 'names';
    } else if(transformway == '逐步清退') {
        //image = '../../static/images/point5.png';
        image = `${baseSrc}point5.png`;
        textField = 'names';
    } else if(transformway == '产业置换') {
        //image = '../../static/images/point6.png';
        image = `${baseSrc}point6.png`;
        textField = 'names';
    }
    return [new Style({
        image: new Icon({
            anchor: [0.5, 1],
            scale: 0.8,
            src: image,
        }),
        text: createTextStyle(feature, resolution, {
            textField: textField,//标注字段为 "NAME"
            fontSize: 14,
            outlineWidth: 2,
            offsetY: offsetY
        })
    })]
}

//工业区信息 卫星图像 点鼠标移动上去样式
export const InpointsetlledStyles = function(feature, resolution) {
    let image;
    let textField;
    let offsetY;
    offsetY = 15;
    let attrs = feature.getProperties();
    if(feature.getGeometry().getType() === "Point") {
        //image = '../../static/images/point1.png';
        image = `${baseSrc}point1.png`;
        textField = 'names';
        return [new Style({
            image: new Icon({
                anchor: [0.5, 1],
                scale: 0.8,
                src: image
            }),
            text: createTextStyle_1(feature, resolution, {
                textField: textField,//标注字段为 "NAME"
                fontSize: 14,
                outlineWidth: 2,
                offsetY: offsetY
            })
        })]
    }else{
        return [new Style({
            stroke: new Stroke({  //区的边界样式
                color: '#DF4000',
                lineDash: [0],
                width: 2
            }),
            fill: new Fill({  //区的填充样式
                color: 'rgba(255, 255, 255, 0)'
            })
        })]
    }
}

export const InpointsetlledStyles_1 = function(feature, resolution) {
    let image;
    let textField;
    let offsetY;
    offsetY = 15;
    let attrs = feature.getProperties();
    if(feature.getGeometry().getType() === "Point") {
        //image = '../../static/images/sss.png';
        image = `${baseSrc}sss.png`;
        textField = 'names';
        return [new Style({
            image: new Icon({
                anchor: [0.5, 1],
                scale: 0.8,
                src: image
            }),
            text: createTextStyle_2(feature, resolution, {
                textField: textField,//标注字段为 "NAME"
                fontSize: 14,
                outlineWidth: 2,
                offsetY: offsetY
            })
        })]
    }else{
        return [new Style({
            stroke: new Stroke({  //区的边界样式
                color: '#DF4000',
                lineDash: [0],
                width: 2
            }),
            fill: new Fill({  //区的填充样式
                color: 'rgba(255, 255, 255, 0)'
            })
        })]
    }
}

//鼠标点击时图标样式的改变
export const pointSelectStyle = function (feature, resolution) {
    let image;
    let attrs = feature.getProperties();
    if (attrs['dataType'] == 'ViewLand'){
        //image = '../../static/images/land2.png';
        image = `${baseSrc}land2.png`;
    } else if (attrs['dataType'] == 'ViewParkBuild'){
        //image = '../../static/images/house2.png';
        image = `${baseSrc}house2.png`;
    } else if (attrs['dataType'] == 'ViewCreateSpace'){
        //image = '../../static/images/house2.png';
        image = `${baseSrc}house2.png`;
    } else if (attrs['dataType'] == 'ViewEnterprise'){
        //image = '../../static/images/emarkers.png';
        // image = `${baseSrc}emarkers.png`;
        image = `${baseSrc}emarkershover.png`;
    }
    if(attrs['dataType'] == 'ViewEnterprise') {
        return [new Style({
            image: new Icon({
                anchor: [0.85, 17.5],
                scale: 1,
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: image,
            })
        })]
    }else {
        return [new Style({
            image: new Icon({
                anchor: [0.5, 1],
                scale: 1,
                src: image,
            })
        })]
    }
};

//工业区信息  鼠标点击时图标样式的改变
export const pointInSelectStyle = function (feature, resolution) {
    let image;
    let attrs = feature.getProperties();
    let transformway = attrs['transformway'];
    if (attrs['transformway'] == "综合整治") {
        //image = '../../static/images/point1.png';
        image = `${baseSrc}point1.png`;
    } else if(transformway == '维持现状') {
        //image = '../../static/images/point2.png';
        image = `${baseSrc}point2.png`;
    } else if(transformway == '拆除重建') {
        //image = '../../static/images/point3.png';
        image = `${baseSrc}point3.png`;
    } else if(transformway == '空地新建') {
        //image = '../../static/images/point4.png';
        image = `${baseSrc}point4.png`;
    } else if(transformway == '逐步清退') {
        //image = '../../static/images/point5.png';
        image = `${baseSrc}point5.png`;
    } else if(transformway == '产业置换') {
        //image = '../../static/images/point6.png';
        image = `${baseSrc}point6.png`;
    }
    return [new Style({
        image: new Icon({
            anchor: [0.5, 1],
            scale: 0.8,
            src: image,
        })
    })]
};


/**
 * 创建文本样式函数
 * @param {ol.Feature} feature 要素
 * @param  resolution 地图分辨率
 * @param  dom 要素样式
 *
 * @dec textAlign   文本位置 'center'、'end'、'left'、'right'、'start'，默认center
 * @dec textBaseline  基准线 'top'、'alphabetic'、'bottom'、'hanging'、'ideographic'、'middle'，默认middle
 * @dec offsetX  偏移量X，默认0
 * @dec offsetY  偏移量Y，默认0
 * @dec fontWeight  字体粗细 'normal'、'bold'，默认normal
 * @dec fontSize  字体大小，默认12px
 * @dec font  字体  '微软雅黑'、'Arial'、'Courier New'、'Quattrocento Sans'、'Verdana'，默认'微软雅黑'
 * @dec fontColor  字体颜色，默认#000
 * @dec outlineColor  外框颜色，默认#fff
 * @dec outlineWidth  外框宽度，默认1
 * @dec textField   标注字段，默认null
 * @dec rotation  旋转角度，默认0°
 * @dec showLev  标注显示级别，默认0级
 */
function createTextStyle(feature, resolution, dom) {
    //读取当前面板设置的样式值
    var align = dom.textAlign == null?'center':dom.textAlign;  //文本位置 'center'、'end'、'left'、'right'、'start'
    var baseline = dom.textBaseline == null?'middle':dom.textBaseline; //基准线 'top'、'alphabetic'、'bottom'、'hanging'、'ideographic'、'middle'

    var offsetX = parseInt(dom.offsetX == null?0:dom.offsetX, 10); //偏移量X
    var offsetY = parseInt(dom.offsetY == null?0:dom.offsetY, 10); //偏移量Y
    var weight = dom.fontWeight == null?'normal':dom.fontWeight; //字体粗细 'normal'、'bold'
    var size = dom.fontSize == null? 12:dom.fontSize;  //字体大小,默认12px
    var font = dom.font == null? '微软雅黑':dom.font;  //字体 '微软雅黑'、'Arial'、'Courier New'、'Quattrocento Sans'、'Verdana'
    var fontStyle = weight + ' ' + size + 'px ' + font; //文字样式（粗细、大小、字体）
    var fillColor = dom.fontColor == null? '#000':dom.fontColor; //字体颜色 默认#fff
    var outlineColor = dom.outlineColor == null? '#fff':dom.outlineColor; //外框颜色 默认#000
    var outlineWidth = parseInt(dom.outlineWidth == null?1:dom.outlineWidth, 10);//外框宽度 默认1
    var text = feature.get(dom.textField == null? '':dom.textField) + ''; // 标注字段
    text = (text == null || text == 'undefined') ? '':text;
    var rotation = parseFloat(dom.rotation == null?0:dom.rotation);  //旋转角度
    var showLev = parseFloat(dom.showLev == null?0:dom.showLev);  //标注显示级别

    var mapLev = window.map.getView().getZoom();
    if( mapLev >= showLev){
        //返回实例化的文本样式对象（ol.style.Text）
        return new Text({
            textAlign: align, //位置
            textBaseline: baseline, //基准线
            font: fontStyle,  //文字样式
            text: text,  //文本内容
            fill: new Fill({ color: fillColor }),//文本填充样式（即文字颜色）
            stroke: new Stroke({ color: outlineColor, width: outlineWidth }),//文本外框样式（颜色与宽度）
            offsetX: offsetX, //偏移量X
            offsetY: offsetY, //偏移量Y
            rotation: rotation //角度
        });
    }else{
        return null;
    }

};

function createTextStyle_1(feature, resolution, dom) {
    //读取当前面板设置的样式值
    var align = dom.textAlign == null?'center':dom.textAlign;  //文本位置 'center'、'end'、'left'、'right'、'start'
    var baseline = dom.textBaseline == null?'middle':dom.textBaseline; //基准线 'top'、'alphabetic'、'bottom'、'hanging'、'ideographic'、'middle'

    var offsetX = parseInt(dom.offsetX == null?0:dom.offsetX, 10); //偏移量X
    var offsetY = parseInt(dom.offsetY == null?0:dom.offsetY, 10); //偏移量Y
    var weight = dom.fontWeight == null?'normal':dom.fontWeight; //字体粗细 'normal'、'bold'
    var size = dom.fontSize == null? 12:dom.fontSize;  //字体大小,默认12px
    var font = dom.font == null? '微软雅黑':dom.font;  //字体 '微软雅黑'、'Arial'、'Courier New'、'Quattrocento Sans'、'Verdana'
    var fontStyle = weight + ' ' + size + 'px ' + font; //文字样式（粗细、大小、字体）
    var fillColor = dom.fontColor == null? '#000':dom.fontColor; //字体颜色 默认#fff
    var outlineColor = dom.outlineColor == null? '#fff':dom.outlineColor; //外框颜色 默认#000
    var outlineWidth = parseInt(dom.outlineWidth == null?1:dom.outlineWidth, 10);//外框宽度 默认1
    var text = feature.get(dom.textField == null? '':dom.textField) + ''; // 标注字段
    text = (text == null || text == 'undefined') ? '':text;
    var rotation = parseFloat(dom.rotation == null?0:dom.rotation);  //旋转角度
    var showLev = parseFloat(dom.showLev == null?0:dom.showLev);  //标注显示级别

    var mapLev = window.Parkmap.getView().getZoom();
    if( mapLev >= showLev){
        //返回实例化的文本样式对象（ol.style.Text）
        return new Text({
            textAlign: align, //位置
            textBaseline: baseline, //基准线
            font: fontStyle,  //文字样式
            text: text,  //文本内容
            fill: new Fill({ color: fillColor }),//文本填充样式（即文字颜色）
            stroke: new Stroke({ color: outlineColor, width: outlineWidth }),//文本外框样式（颜色与宽度）
            offsetX: offsetX, //偏移量X
            offsetY: offsetY, //偏移量Y
            rotation: rotation //角度
        });
    }else{
        return null;
    }
};

function createTextStyle_2(feature, resolution, dom) {
    //读取当前面板设置的样式值
    var align = dom.textAlign == null?'center':dom.textAlign;  //文本位置 'center'、'end'、'left'、'right'、'start'
    var baseline = dom.textBaseline == null?'middle':dom.textBaseline; //基准线 'top'、'alphabetic'、'bottom'、'hanging'、'ideographic'、'middle'

    var offsetX = parseInt(dom.offsetX == null?0:dom.offsetX, 10); //偏移量X
    var offsetY = parseInt(dom.offsetY == null?0:dom.offsetY, 10); //偏移量Y
    var weight = dom.fontWeight == null?'normal':dom.fontWeight; //字体粗细 'normal'、'bold'
    var size = dom.fontSize == null? 12:dom.fontSize;  //字体大小,默认12px
    var font = dom.font == null? '微软雅黑':dom.font;  //字体 '微软雅黑'、'Arial'、'Courier New'、'Quattrocento Sans'、'Verdana'
    var fontStyle = weight + ' ' + size + 'px ' + font; //文字样式（粗细、大小、字体）
    var fillColor = dom.fontColor == null? '#000':dom.fontColor; //字体颜色 默认#fff
    var outlineColor = dom.outlineColor == null? '#fff':dom.outlineColor; //外框颜色 默认#000
    var outlineWidth = parseInt(dom.outlineWidth == null?1:dom.outlineWidth, 10);//外框宽度 默认1
    var text = feature.get(dom.textField == null? '':dom.textField) + ''; // 标注字段
    text = (text == null || text == 'undefined') ? '':text;
    var rotation = parseFloat(dom.rotation == null?0:dom.rotation);  //旋转角度
    var showLev = parseFloat(dom.showLev == null?0:dom.showLev);  //标注显示级别

    var mapLev = window.switchmap.getView().getZoom();
    if( mapLev >= showLev){
        //返回实例化的文本样式对象（ol.style.Text）
        return new Text({
            textAlign: align, //位置
            textBaseline: baseline, //基准线
            font: fontStyle,  //文字样式
            text: text,  //文本内容
            fill: new Fill({ color: fillColor }),//文本填充样式（即文字颜色）
            stroke: new Stroke({ color: outlineColor, width: outlineWidth }),//文本外框样式（颜色与宽度）
            offsetX: offsetX, //偏移量X
            offsetY: offsetY, //偏移量Y
            rotation: rotation //角度
        });
    }else{
        return null;
    }
};