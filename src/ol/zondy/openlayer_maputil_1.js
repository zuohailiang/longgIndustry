import ol from 'ol'

let $ = require("jquery")

let MapUtilObj = {
	map : null,
	source : null, // 绘制层数据源对象
	draw : null,
	vlayer : null,
	showCircleLayer : null, //画圆显示图层
	modifyC : null,
	selectC : null,
	opcode : 0,
	tipdiv : null,
	showtip : true,
	curPointGeom : null,
	drawType : null,
	event : {
		drawPolyChange : null,
        drawLineChange : null,
		pointClick : null
	},
    geodesic: true  //// false:平面坐标测量法, true:空间坐标测量法
};

// 绘制层数据源
let source = null;
// 画点、线、面 图层
let drawPointLayer = null;
let drawLineLayer = null;
let drawPolyLayer = null;
// 拉框查询图层
let drawPolyQueryLayer = null;
// 画圆，半径查询图层
let drawCircleLayer = null;
// 范围显示图层
let showCircleLayer = null;
// 当前正在编辑的绘制层
let drawLayerDefault = null;
let isOutSide = false;
let isInSide = false;
let selectedFeatures = null;

var distanceLine;
var start,circle,moveEvt;


export const MapUtil = {
    MapUtil_DrawPolyInit: function(m, pointfn, linefn, polyfn){
        MapUtilObj.map = m;
        // m.addEvent("click",MapUtil_Event_PointClick);
        m.un("pointermove",MapUtil_Event_Move);
        m.on("pointermove",MapUtil_Event_Move);
        // m.events.register("mousemove", m, MapUtil_Event_Move);
        // m.paletteLayer.addEvent("change",MapUtil_Event_PaletteChange);
        MapUtilObj.event.pointClick = pointfn;
        MapUtilObj.event.drawLineChange = linefn;
        MapUtilObj.event.drawPolyChange = polyfn;
    },
    /**
     * 根据绘制类型进行交互绘制图形处理
     * @param drawType 绘制类型
     */
    MapUtil_ControlInit: function(drawType) {
        if(MapUtilObj.draw){
            MapUtilObj.draw.setActive(false); // 注销绘图工具
            map.removeInteraction(MapUtilObj.draw); //移除绘制图形
            MapUtilObj.draw = null;
        }
        if(MapUtilObj.source){
            MapUtilObj.source = null;
        }
        if(drawLayerDefault){
            drawLayerDefault.setSource(MapUtilObj.source);
            map.removeLayer(drawLayerDefault);
            drawLayerDefault = null;
        }
    
        MapUtilObj.drawType = drawType;
        MapUtilObj.opcode = 1;
        MapUtil_Title(null);
        removeKeyEvents();
        if (drawType != null && drawType != '' && drawType !== 'None') {
            if (MapUtilObj.source == null) {
                MapUtilObj.source = new ol.source.Vector({ wrapX: false });
            }
            var geometryFunction, maxPoints;
            if(drawType === 'drawPoint'){
                drawType = 'Point';
                // if (!drawPointLayer){
                    drawPointLayer = new ol.layer.Vector({
                        name: '点层',
                        source: MapUtilObj.source,
                        style: styleFunction
                    });
                    map.addLayer(drawPointLayer);
                    drawLayerDefault = drawPointLayer;
                    MapUtilObj.vlayer = drawPointLayer;
                    MapLayerUnRegisterEvent("addfeature", MapUtil_Event_PointAdded);
                    MapLayerRegisterEvent("addfeature", MapUtil_Event_PointAdded);
                // }
                MapUtil_Title("地图上单击完成坐标设置,按Ctrl键取消绘图。");
            } else if(drawType === 'drawLine'){
                drawType = 'LineString';
                // if (!drawLineLayer){
                    drawLineLayer = new ol.layer.Vector({
                        name: '线层',
                        source: MapUtilObj.source,
                        style: styleFunction
                    });
                    map.addLayer(drawLineLayer);
                    drawLayerDefault = drawLineLayer;
                    MapUtilObj.vlayer = drawLineLayer;
                    MapLayerUnRegisterEvent("addfeature", MapUtil_Event_LineChange);
                    MapLayerRegisterEvent("addfeature", MapUtil_Event_LineChange);
                // }
                MapUtil_Title("按ESC键可以取消重绘，按Shift键后退一步操作，按Ctrl键取消绘图。");
            }else if (drawType === 'drawPoly') {
                drawType = 'Polygon';
                // if (!drawPolyLayer){
                    drawPolyLayer = new ol.layer.Vector({
                        name: '多边形层',
                        source: MapUtilObj.source,
                        style: styleFunction
                    });
                    map.addLayer(drawPolyLayer);
                    drawLayerDefault = drawPolyLayer;
                    MapUtilObj.vlayer = drawPolyLayer;
                    MapLayerUnRegisterEvent("addfeature", MapUtil_Event_PaletteChange);
                    MapLayerRegisterEvent("addfeature", MapUtil_Event_PaletteChange);
                // }
                MapUtil_Title("按ESC键可以取消重绘，按Shift键后退一步操作，按Ctrl键取消绘图。");
            }else if (drawType === 'circleQuery') {
                drawType = 'Circle';
                // if (!drawCircleLayer){
                    drawCircleLayer = new ol.layer.Vector({
                        name: '圆层',
                        source: MapUtilObj.source,
                        style: styleFunction
                    });
                    map.addLayer(drawCircleLayer);
                    drawLayerDefault = drawCircleLayer;
                    MapUtilObj.vlayer = drawCircleLayer;
                    MapLayerUnRegisterEvent("addfeature", MapUtil_Event_PaletteChange);
                    MapLayerRegisterEvent("addfeature", MapUtil_Event_PaletteChange);
                // }
                MapUtil_Title("单击中心点之后,移动鼠标设置圆半径,再次点击地图完成画圆");
                // geometryFunction = ol.interaction.Draw.createRegularPolygon(4); //正方形图形（圆）
            }else if (drawType === 'polyQuery'){
                drawType = 'LineString';
                // if (!drawPolyQueryLayer){
                    drawPolyQueryLayer = new ol.layer.Vector({
                        name: '拉框层',
                        source: MapUtilObj.source,
                        style: styleFunction
                    });
                    map.addLayer(drawPolyQueryLayer);
                    drawLayerDefault = drawPolyQueryLayer;
                    MapUtilObj.vlayer = drawPolyQueryLayer;
                    MapLayerUnRegisterEvent("addfeature", MapUtil_Event_PaletteChange);
                    MapLayerRegisterEvent("addfeature", MapUtil_Event_PaletteChange);
                // }
                maxPoints = 2;
                geometryFunction = function (coordinates, geometry) {
                    if (!geometry) {
                        geometry = new ol.geom.Polygon(null); //多边形
                    }
                    var start = coordinates[0];
                    var end = coordinates[1];
                    geometry.setCoordinates([
                        [start, [start[0], end[1]], end, [end[0], start[1]], start]
                    ]);
                    return geometry;
                };
            }
            //实例化交互绘制类对象并添加到地图容器中
            MapUtilObj.draw = new ol.interaction.Draw({
                    source: MapUtilObj.source, //绘制层数据源
                    type: /** @type {ol.geom.GeometryType} */(drawType), //几何图形类型
                    geometryFunction: geometryFunction, //几何信息变更时调用函数
                    snapTolerance: 5,  // 捕捉到绘图完成的像素距离
                    maxPoints: maxPoints //最大点数
                });
            map.addInteraction(MapUtilObj.draw);
            // 初始化绘图快捷键触发事件
            initKeyEvent(MapUtilObj.draw);
        } else {
            if(MapUtilObj.draw){
                MapUtilObj.draw.setActive(false); // 注销绘图工具
                map.removeInteraction(MapUtilObj.draw); //移除绘制图形
                MapUtilObj.draw = null;
            }
            if(MapUtilObj.source){
                MapUtilObj.source = null;
            }
            if(drawLayerDefault){
                drawLayerDefault.setSource(MapUtilObj.source);
                map.removeLayer(drawLayerDefault);
                drawLayerDefault = null;
            }
        }
    },
    //定义修改几何图形功能控件
    Modify: {
        init: function (dataType,features) {
            if (dataType == 'point') {
                MapUtil_ControlInit("drawPoint");
            }else if (dataType == 'line') {
                MapUtil_ControlInit("drawLine");
            } else{
                MapUtil_ControlInit("drawPoly"); 
            }
            drawLayerDefault.getSource().addFeatures(features);
            // 初始化之前先重置
            this.remove();
            // //初始化一个交互选择控件,并添加到地图容器中
            // MapUtilObj.selectC = new ol.interaction.Select();
            // map.addInteraction(MapUtilObj.selectC);
            //初始化一个交互编辑控件，并添加到地图容器中
            MapUtilObj.modifyC = new ol.interaction.Modify({
                style: [new ol.style.Style({
                    stroke: new ol.style.Stroke({  //区的边界样式
                        color: '#11f0ff',
                        lineDash: [0],
                        width: 2
                    }),
                    fill: new ol.style.Fill({  //区的填充样式
                        color: 'rgba(255, 127, 52, 1)'
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        fill: null,
                        stroke: new ol.style.Stroke({ color: '#1693ff', width: 2 })
                    })
                })],
                features: new ol.Collection(drawLayerDefault.getSource().getFeatures())//选中的要素
                // features: MapUtilObj.selectC.getFeatures()//选中的要素
            });
            map.addInteraction(MapUtilObj.modifyC);
            //设置几何图形变更的处理
            this.setEvents();
    
        },
        setEvents: function () {
            // selectedFeatures = MapUtilObj.selectC.getFeatures(); //选中的要素
            // //添加选中要素变更事件
            // MapUtilObj.selectC.on('change:active', function () {
            //     selectedFeatures.forEach(selectedFeatures.remove, selectedFeatures);
            // });
            //添加选中要素变更事件
            MapUtilObj.modifyC.on('modifyend', function (eventArgs) {
                var features = eventArgs.features;
                var geom = null;
                if(features != null && features.getLength() > 0){
                    var geom = features.item(0).getGeometry();
                }
                if (dataType == 'point') {
                    // 修改点
                    if (MapUtilObj.event.pointClick != null) {
                        MapUtilObj.event.pointClick(geom);
                    }
                } else if (dataType == 'line'){
                    // 修改线
                    if(MapUtilObj.event.drawLineChange){
                        MapUtilObj.event.drawLineChange(geom);
                    }
                } else{
                    // 修改面
                    if(MapUtilObj.event.drawPolyChange){
                        MapUtilObj.event.drawPolyChange(geom);
                    }
                }
            });
        },
        setActive: function (active) {
            if(MapUtilObj.selectC){
                MapUtilObj.selectC.setActive(active);//激活选择要素控件
            }
            if(MapUtilObj.modifyC){
                MapUtilObj.modifyC.setActive(active);//激活修改要素控件
            }
        },
        remove: function(){
            this.setActive(false);
            if(MapUtilObj.modifyC){
                map.removeInteraction(MapUtilObj.modifyC);
                MapUtilObj.modifyC = null;
                selectedFeatures = null;
            }
            if(MapUtilObj.selectC){
                map.removeInteraction(MapUtilObj.selectC);
                MapUtilObj.selectC = null;
                selectedFeatures = null;
            }
        }
    },
    MapUtil_DrawPoly: function(activeLayer, draw, drawType) {
        MapUtilObj.vlayer = activeLayer;
        clearLastDraw();
        MapUtilObj.draw = draw;
        MapUtilObj.drawType = drawType;
        MapUtilObj.draw.activate();
        MapUtil_Title("按ESC键可以取消重绘，按Shift键后退一步操作，按Insert键重绘退后的操作，按Alt键可以画环岛,鼠标双击完成绘图,按Ctrl键取消绘图,按Delete键删除。");
        initKeyEvent(draw);
        MapUtilObj.opcode = 1;
        clearLayerFeature()
    },
    MapUtil_SetPoint: function(activeLayer, draw) {
        MapUtilObj.vlayer = activeLayer;
        clearLastDraw();
        MapUtilObj.draw = draw;
        activeLayer.events.register("featureadded", activeLayer,
        MapUtil_Event_PointAdded);
        MapUtilObj.draw.activate();
        initKeyEvent(draw);
        MapUtilObj.opcode = 2;
        MapUtil_Title("地图上单击完成坐标设置,按Ctrl键取消绘图。");
    },
    MapUtil_SetCircle: function(activeLayer, draw,showCircleLayer) {
        MapUtilObj.vlayer = activeLayer;
        clearLastDraw();
        MapUtilObj.draw = draw;
        MapUtilObj.showCircleLayer = showCircleLayer;
        MapUtilObj.draw.featureAdded = onEndCircleRDraw;
        MapUtilObj.draw.activate();
        MapUtilObj.opcode = 3;
        MapUtil_Title("单击中心点之后,移动鼠标设置圆半径,再次点击地图完成画圆");
    },
    MapUtil_Undo: function() {
        MapUtilObj.map.setActiveTool("$");
	    MapUtilObj.opcode = 0;
    },
    MapUtil_Title: function(html) {
        if (MapUtilObj.tipdiv == null) {
            MapUtilObj.tipdiv = $("<div></div>");
            MapUtilObj.tipdiv.attr('id','tipdiv');;
            MapUtilObj.tipdiv.css({
                "border" : "1px solid blue",
                "position" : "absolute",
                "left" : -1000,
                "top" : -1000,
                "zIndex" : 8889,
                "padding" : 5,
                "backgroundColor" : "#ffffff"
            });
            $(document.body).append(MapUtilObj.tipdiv);
            //MapUtilObj.tipdiv.inject($(document.body));
        }
        if (html != null) {
            $("#tipdiv").text(html);
            $("#tipdiv").css({
                display : "block",
                left : -1000,
                top : -1000
            });
        } else {
            $("#tipdiv").css({"display": "none"});
        }
    },
    MapUtil_tipcss: function(display) {
        $("#tipdiv").css({"display": display});
    },
    MapUtil_Event_Move: function(obj) {
        if (MapUtilObj.showtip) {
            if (MapUtilObj.opcode > 0) {
                var x = obj.pointerEvent.clientX;
                var y = obj.pointerEvent.clientY;
                $("#tipdiv").css({
                    left : x + 10,
                    top : y + 10
                });
            }
        } else {
            $("#tipdiv").css({
                left : -1000,
                top : -1000
            });
        }
    },
    MapUtil_CtlTip: function(torf) {
        MapUtilObj.showtip = torf;
        if (!torf) {
            $(MapUtilObj.tipdiv).css({
                left : -1000,
                top : -1000
            });
        }
    }
}

//画完圆中心点事件
function onEndCircleRDraw(feature){
	MapUtilObj.draw.deactivate();
	MapUtilObj.vlayer.setVisibility(true);
    start = feature.geometry;
    MapUtilObj.vlayer.addFeatures(start);

    MapUtilObj.map.events.unregister("mousemove",MapUtilObj.map,startCircle);
    MapUtilObj.map.events.unregister("click",MapUtilObj.map,endCircle);
    MapUtilObj.map.events.register("mousemove",MapUtilObj.map,startCircle);
    MapUtilObj.map.events.register("click",MapUtilObj.map,endCircle);
}

function startCircle(e){
	 moveEvt = e;
     MapUtilObj.vlayer.removeAllFeatures();
     MapUtilObj.showCircleLayer.removeAllFeatures();
     var pt = MapUtilObj.map.getLonLatFromPixel(new OpenLayers.Pixel(e.x, e.y));
     var end = new OpenLayers.Geometry.Point(pt.lon, pt.lat);
     var line = new OpenLayers.Geometry.LineString([start, end]);
     var radius = line.getLength();
     var geometry = createCircle(start,radius,100,0);
     var distance = start.distanceTo(end);
     distance = parseInt(distance);
     var feature = new OpenLayers.Feature.Vector(geometry,{radius:distance});
     var lineFeature = new OpenLayers.Feature.Vector(line,{radius:distance});
     circle = feature;
     distanceLine = lineFeature;
     // MapUtilObj.vlayer.addFeatures(feature);
     MapUtilObj.showCircleLayer.addFeatures(circle);
     MapUtilObj.showCircleLayer.addFeatures(distanceLine);
}
function endCircle(e){
	if(circle){
		MapUtilObj.showCircleLayer.removeAllFeatures();
	 	MapUtilObj.showCircleLayer.addFeatures(circle);
	 	MapUtilObj.showCircleLayer.addFeatures(distanceLine);
	 	MapUtilObj.event.drawPolyChange();
	 	MapUtilObj.map.events.unregister("mousemove",MapUtilObj.map,startCircle);
	 	MapUtilObj.map.events.unregister("click",MapUtilObj.map,endCircle);
	 	circle = null;
	 	distanceLine = null;
	}
	if (MapUtilObj.draw)
		MapUtilObj.draw.deactivate();
	MapUtilObj.vlayer.removeAllFeatures();
}
function MapUtil_Event_PointClick(event, point) {
	if (MapUtilObj.opcode == 2) {
		MapUtilObj.map.buildLayer.setData([ {
			x : point.x,
			y : point.y
		} ]);
		MapUtilObj.opcode = 0;
		MapUtil_Title(null);
		if (MapUtilObj.event.pointClick != null) {
			MapUtilObj.event.pointClick(point);
		}

	}

}
function MapUtil_Palette_Clear() {
	MapUtilObj.map.paletteLayer.clear();
	MapUtilObj.map.buildLayer.setData([]);
}

function MapUtil_Event_beforefeatureadded(eventArgs) {
    var vlayer = eventArgs.object;
    vlayer.removeAllFeatures();
    // vlayer.addFeatures([eventArgs.feature]);
}

/**
 *  绘制线完成事件
 * @param eventArgs
 * @constructor
 */
function MapUtil_Event_LineChange(eventArgs) {
    var vSource = eventArgs.target; // 数据源
    var feature = eventArgs.feature;
    var geom = feature.getGeometry();

    if (MapUtilObj.event.drawLineChange != null) {
        MapUtilObj.event.drawLineChange(geom);
    }
}
/**
 *  绘制多边形、圆形、拉框完成事件
 * @param eventArgs
 * @constructor
 */
function MapUtil_Event_PaletteChange(eventArgs) {
	var vSource = eventArgs.target; // 数据源
	var feature = eventArgs.feature;
	var geom = feature.getGeometry();

    yzGeometrysInsideTopology("多边形层", geom);
    if (isInSide) {
        vSource.removeFeature(feature);
        alert("对不起,所画多边形轮廓重叠,请重绘");
        return;
    }
	
    // 圆半径要素
    var radiusFeature = null;
	if(MapUtilObj.drawType != null){
        if(MapUtilObj.drawType == 'circleQuery'){
            // 画圆工具时，返回圆半径要素对象
            var circleCenter = geom.getCenter();  // 圆中心点
            var lastPoint = geom.getLastCoordinate(); // 圆最后一个点
            var radius = geom.getRadius(); // 圆半径
            var radiusLine = new ol.geom.LineString([circleCenter,lastPoint]); // 半径线 

            // 计算半径
            if (MapUtilObj.geodesic) { //若使用测地学方法测量
                var coordinates = radiusLine.getCoordinates();//解析线的坐标
                radius = 0;
                var sourceProj = map.getView().getProjection(); //地图数据源投影坐标系
                //通过遍历坐标计算两点之前距离，进而得到整条线的长度
                for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                    var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
                    var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
                    radius += wgs84Sphere.haversineDistance(c1, c2);
                }
            } else {
                radius = Math.round(radiusLine.getLength() * 100) / 100; //直接得到线的长度
            }

            radiusFeature = new ol.Feature({
                 geometry: radiusLine,
                 radius: radius
            });
        }
	}
    if (MapUtilObj.event.drawPolyChange != null) {
        MapUtilObj.event.drawPolyChange(geom, radiusFeature);
    }
    if(MapUtilObj.drawType != null){
        if(MapUtilObj.drawType == "polyQuery" || MapUtilObj.drawType == 'circleQuery'){
            // 拉框和画圆操作时，清空已绘制的轮廓
            MapUtilObj.source.clear();
        }
    }
}
function MapUtil_Event_FeatureAdded(eventArgs) {
	var vlayer = eventArgs.object;
	var features = vlayer.features;
	if (features.length > 1) {
		vlayer.removeFeatures([ eventArgs.feature ]);
		alert("已经存在一个多边形了,不允许同时画多个多边形,画环形请按住Alt键,在已画多边形上画环多边形");
	}
}

/**
 * 绘制坐标点完成事件
 * @param eventArgs
 * @constructor
 */
function MapUtil_Event_PointAdded(eventArgs) {
    var feature = eventArgs.feature;
    var geom = feature.getGeometry();
    // yzSQGeometrysTopology("行政区划轮廓层", geom);
    // if (isOutSide) {
    //     vlayer.removeFeatures([ eventArgs.feature ]);
    //     alert("对不起,只能在自己所属行政区划范围内绘制坐标点,请重绘");
    //     return;
    // }
	MapUtilObj.curPointGeom = geom;
	if (MapUtilObj.event.pointClick != null) {
		MapUtilObj.event.pointClick(geom);
	}
	MapUtilObj.opcode = 0;
	// if (MapUtilObj.draw)
	// 	MapUtilObj.draw.deactivate();
	// MapUtilObj.draw = null;
	MapUtil_Title(null);
	// MapUtilObj.modifyC.deactivate();
	// MapUtilObj.modifyC.activate();
}

function MapUtil_Event_RingChange(eventArgs) {
	var vlayer = eventArgs.object;
	var geom = eventArgs.feature.geometry;
	// console.log(eventArgs.type, geom);
	vlayer.refresh({
		force : true,
		active : true
	});
	// yzSQGeometrysTopology("社区轮廓层", geom);
	// yzSpecGeometrysTopology("特定区域层", geom);
	// if (isOutSide) {
	// 	vlayer.removeFeatures([ eventArgs.feature ]);
	// 	alert("对不起,只能在自己所属社区范围内绘制轮廓,请重绘");
	// 	return;
	// }
	// if (isInSide) {
	// 	vlayer.removeFeatures([ eventArgs.feature ]);
	// 	alert("与" + MapUtilObj.spectype + "类型的特定区域轮廓重叠了,请重绘");
	// 	return;
	// }
	if (MapUtilObj.event.drawPolyChange != null) {
		MapUtilObj.event.drawPolyChange();
	}
	// if (MapUtilObj.draw)MapUtilObj.draw.deactivate();
	// MapUtilObj.draw = null;
	// MapUtilObj.modifyC.deactivate();
	// MapUtilObj.modifyC.activate();
}

/**
 * 获取点对象的WKT String
 * @param geom
 * @constructor
 */
function MapUtil_GetPointWKT(geom) {
    var format = new ol.format.WKT();
    var wkt = format.writeGeometry(geom);
    return wkt;
}
/**
 * 获取线对象的WKT String
 * @param geom
 * @constructor
 */
function MapUtil_GetLineWKT(geom) {
    var format = new ol.format.WKT();
    var wkt = format.writeGeometry(geom);
    return wkt;
}
/**
 * 获取单面对象的WKT String
 * @param geom
 * @constructor
 */
function MapUtil_GetPolygonWKT(geom) {
    var format = new ol.format.WKT();
    var wkt = format.writeGeometry(geom);
    return wkt;
}

/**
 * 获取多面对象的WKT String，统一返回多面格式
 * @param geom
 * @constructor
 */
function MapUtil_GetMultiPolygonWKT(geom) {
    var format = new ol.format.WKT();
	var wkt = "";
	if(drawLayerDefault){
		var multiPolygon = null;
		var features = drawLayerDefault.getSource().getFeatures();
		if(features && features.length > 0){
            features.forEach(function (feature,i) {
                if(feature.getGeometry().getType() === 'LineString'){
                    return true;
                } else if(feature.getGeometry().getType() === 'Circle'){
                    // 由于圆形对象不支持直接读取wkt string,所以根据所画的中心点和半径，创建一个圆形多边形，才可以读取到wkt值。
                    multiPolygon = feature.getGeometry().getSimplifiedGeometry(10).clone();
                    // 圆半径
                    var radius = multiPolygon.getRadius();
                    // 圆中心点坐标
                    var centerPoint = multiPolygon.getCenter();
                    // 根据中心点和圆半径创建一个包含100个坐标点的圆形多边形
                    multiPolygon = createCircle(centerPoint,radius,100,0);
				} else if (feature.getGeometry().getType() === 'MultiPolygon'){
            		if (i == 0){
                        multiPolygon = feature.getGeometry().clone();
					}else{
            			var polygons = feature.getGeometry().clone().getPolygons();
                        polygons.forEach(function(polygon,j){
                            multiPolygon.appendPolygon(polygon);
						});
					}
				} else{
                    if (i == 0){
                        multiPolygon = new ol.geom.MultiPolygon([feature.getGeometry().clone().getCoordinates()]);
                    }else{
                        multiPolygon.appendPolygon(feature.getGeometry().clone());
					}
				}
            });
            wkt = format.writeGeometry(multiPolygon);
		}
	}
	return wkt;
}

function MergeGeometry(features){
	var mutiPoly = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.MultiPolygon()
        );
	for (var i=0;i < features.length;i++){
		if (features[i].geometry instanceof  OpenLayers.Geometry.MultiPolygon){
			for (var j=0; j < features[i].geometry.components.length; j++){
                mutiPoly.geometry.addComponent(features[i].geometry.components[j]);
			}
		}else{
            mutiPoly.geometry.addComponent(features[i].geometry);
        }
	}
	return mutiPoly;
}

function InterruptGeometry(feature){
	var features = [];
	components = feature.geometry.components;
	for (var i=0;i < components.length;i++){
		var Poly = new OpenLayers.Feature.Vector(
	            new OpenLayers.Geometry.Polygon()
	        );
		Poly.geometry=components[i];	
		features.push(Poly);
	}
	return features;
}

function initModifyControl() {
	if (MapUtilObj.modifyC){
        MapUtilObj.modifyC.deactivate();
		// MapUtilObj.map.removeControl(MapUtilObj.modifyC);
		// MapUtilObj.modifyC = null;
	}else{
        MapUtilObj.modifyC = new OpenLayers.Control.ModifyFeature(MapUtilObj.vlayer);
        MapUtilObj.map.addControl(MapUtilObj.modifyC);
	}
}

function initSelectControl() {
	if (MapUtilObj.selectC){
		MapUtilObj.map.removeControl(MapUtilObj.selectC);
		MapUtilObj.selectC = null;
	}
	MapUtilObj.selectC = new OpenLayers.Control.SelectFeature(MapUtilObj.vlayer);
	MapUtilObj.map.addControl(MapUtilObj.selectC);
}

// 键盘触发事件对象
var keyHandler = null;
/**
 * 移除按键事件
 */
function removeKeyEvents() {
    if(keyHandler){
        keyHandler.detach();
        keyHandler = null;
    }
}
/**
 * 初始化按键事件
 */
function initKeyEvent(draw) {
	$(document).keydown(function (evt) { //按键事件，document节点绑定不管元素是否获得焦点都会触发
        switch (evt.which) {
                case 16: // Shift_L 回退
                draw.removeLastPoint();
                handled = true;
                // }
                break;
            case 45: // Insert
                // draw.redo();
                handled = true;
                break;
            case 27: // esc
                if(drawLayerDefault){
                    drawLayerDefault.getSource().clear();
                }
                Modify.setActive(false); // 注销修改工具
                draw.finishDrawing();
                draw.source_.clear();
            	$("#pointWkt").val("");
            	$("#areaWkt").val("");
                handled = true;
                break;
            case 17: // ctrl
                draw.setActive(false); // 注销绘制工具
                MapUtil_Title(null);
                handled = true;
                break;
            case 46: // Delete
				if(drawLayerDefault){
                    drawLayerDefault.getSource().clear();
				}
                // if(selectedFeature && MapUtilObj.vlayer){
                //     if(MapUtilObj.modifyC){
                //         MapUtilObj.modifyC.unselectFeature(selectedFeature);
                //     }
                //     MapUtilObj.vlayer.removeFeatures([selectedFeature]);
                //     selectedFeature = null;
                // }
                handled = true;
                break;
        }
    });
}

// 图层注册事件
function MapLayerRegisterEvent(eventType, func) {
	MapUtilObj.vlayer.getSource().on(eventType, func, MapUtilObj.vlayer.getSource());
}
// 图层反注册事件
function MapLayerUnRegisterEvent(eventType, func) {
    MapUtilObj.vlayer.getSource().un(eventType, func, MapUtilObj.vlayer.getSource());
}

function clearLastDraw() {
	if (MapUtilObj.draw) {
		MapUtilObj.draw.deactivate();
		MapUtilObj.draw = null;

	}if (MapUtilObj.vlayer){
        MapUtilObj.vlayer.removeAllFeatures();
    }
    MapUtil_Title(null);
    closeControl();
}

function closeControl(){
	// if (MapUtilObj.draw) {
    // 	MapUtilObj.draw.deactivate();
    // }
	if (MapUtilObj.modifyC) {
		MapUtilObj.modifyC.deactivate();
	}
	if (MapUtilObj.selectC) {
		MapUtilObj.selectC.deactivate();
	}
}
function closeAllControl(){
	if (MapUtilObj.draw) {
    	MapUtilObj.draw.deactivate();
    }
	if (MapUtilObj.modifyC) {
		MapUtilObj.modifyC.deactivate();
	}
	if (MapUtilObj.selectC) {
		MapUtilObj.selectC.deactivate();
	}
}


function loadFeaturesHandler(eventArgs) {
	var targetLayerSource = eventArgs.target;
	if (targetLayerSource && targetLayerSource.getFeatures().length > 0) {
		map.getView().fit(targetLayerSource.getExtent(), map.getSize());
	}
}

/**
 * 验证所画轮廓是否处于当前社区轮廓内
 * @param layerName
 * @param geom
 */
function yzSQGeometrysTopology(layerName, geom) {
	isOutSide = true;
	var layers = map.getLayers().array_;
	if (layers != null && layers.length > 0){
		for (var j=0;j < layers.length;j++){
			if(layers[j].getProperties()['name'] == layerName){
                var yzFeatures = layers[j].getSource().getFeatures();
                if(yzFeatures != null && yzFeatures.length > 0){
                    for (var i = 0; i < yzFeatures.length; i++) {
                    	var coordinates = geom.getCoordinates();
                    	for (var j=0,k=coordinates[0].length;j < k;j++){
                    		// 判断只要有一个坐标落在行政区划轮廓内，则定为重叠，否则定为不重叠
                            if (yzFeatures[i].getGeometry().intersectsCoordinate(coordinates[0][j])) {
                                isOutSide = false;
                                break;
                                break;
                            }
						}
                    }
				}else{
                    isOutSide = false;
				}
                break;
			}
		}
	}

}

/**
 * 验证同类型区域是否重叠
 * @param layerName
 * @param geom
 */
function yzGeometrysInsideTopology(layerName, geom) {
	isInSide = false;
    var layers = map.getLayers().array_;
    if (layers != null && layers.length > 0) {
        for (var j = 0; j < layers.length; j++) {
            if (layers[j].getProperties()['name'] == layerName) {
                var yzFeatures = layers[j].getSource().getFeatures();
                if(yzFeatures != null && yzFeatures.length > 0){
                    for (var i = 0; i < yzFeatures.length; i++) {
                    	if (yzFeatures[i].getGeometry() == geom) continue;
                        var coordinates = geom.getCoordinates();
                        for (var j=0,k=coordinates[0].length;j < k;j++){
                            // 判断只要有一个坐标落在轮廓内，则定为重叠，否则定为不重叠
                            if (yzFeatures[i].getGeometry().intersectsCoordinate(coordinates[0][j])) {
                                isInSide = true;
                                break;
                                break;
                            }
                        }
                    }
                }else{
                    isInSide = false;
                }
                break;
            }
        }
    }
}

/**
 * 验证所画特定区域坐标点是否在特定区域轮廓内
 * @param layerName
 * @param geom
 */
function yzSpecPointAndPolyTopology(layerName, geom) {
	isOutSide = false;
	var targetLayer = MapUtilObj.map.getLayersByName(layerName);
	for (var i = 0; i < targetLayer[0].features.length; i++) {
		if (!geom.intersects(targetLayer[0].features[i].geometry)) {
			isOutSide = true;
			break;
		}
	}
}

/**
 * 验证所画特定区域坐标点是否在某一图层内
 * @param layer
 * @param geom
 */
function yzSpecPointAndLayerTopology(layer, geom) {
	isOutSide = false;
	var targetLayer = layer;
	for (var i = 0; i < targetLayer.features.length; i++) {
		if (!geom.intersects(targetLayer.features[i].geometry)) {
			isOutSide = true;
			break;
		}
	}
}

/**
 * 设置图层样式
 * @param layer
 * @param styleName
 */
function setLayerStyle(layer, styleName) {
	if (layer) {
		layer.styleMap = styleName;
	}
}

/**
 * 刷新图层
 * @param layer
 */
function refreshLayer(layer) {
	if (layer) {
		layer.redraw();
		layer.refresh({
			force : true,
			active : true
		});
	}
}

/**
 *  添加要素后，定义范围缩放
 * @param pointLayer
 * @param lineLayer
 * @param polyLayer
 * @param data
 */
function drawGraphic(pointLayer,lineLayer,polyLayer,data){
	//移除已有矢量数据
    if (pointLayer != null || pointLayer == "undefined") {
        pointLayer.getSource().clear();
	}
    if (lineLayer != null || lineLayer == "undefined") {
        lineLayer.getSource().clear();
	}
    if (polyLayer != null || polyLayer == "undefined") {
        polyLayer.getSource().clear();
	}

	var pointGeoJson = data.pointGeoJson;
	var polyGeoJson = data.polyGeoJson;
	var geojson_format = new ol.format.GeoJSON({geometryName:'geometry'});
	if (pointLayer && pointGeoJson) { //画点
		for(var i=0;i < pointGeoJson.features.length;i++){
			var point = pointGeoJson.features[i];
			var pointGeom = "";
			if (!point.geometry){
				point.hasgeom = false;
				if (point.x && point.x != "") {
					pointGeom += "POINT (" + point.x ;
				}
				if (point.y && point.y != ""){
					pointGeom += " " + point.y + ")";
				}
				point.geometry = pointGeom;
			}else{
				point.hasgeom = true;
			}
		}
        // pointGeoJson.features = ConvertToJsonForJs(pointGeoJson.features);
		var features = geojson_format.readFeatures(pointGeoJson);
		/*pointLayer.events.unregister("featuresadded",
				pointLayer, loadFeaturesHandler);
		pointLayer.events.register("featuresadded",
				pointLayer, loadFeaturesHandler);*/
        pointLayer.getSource().once("addfeature", loadFeaturesHandler, pointLayer.getSource()); // 只执行一次
		pointLayer.getSource().addFeatures(features);
		if (lineLayer){//画线
			var linePoints = [];
			for(var i=0;i < features.length;i++){
				var point = features[i].geometry;
				linePoints.push(point);
			}
			var TrackLine = new ol.geom.LineString(linePoints);
			var TrackLineFeature = new ol.Feature({geometry:TrackLine});
			lineLayer.getSource().addFeatures([TrackLineFeature]);
		}
	}
	if (polyLayer && polyGeoJson) {//画面
        // polyGeoJson.features = ConvertToJsonForJs(polyGeoJson.features);
        // polyLayer.getSource().un("addfeature", loadFeaturesHandler, polyLayer.getSource());
        polyLayer.getSource().once("addfeature", loadFeaturesHandler, polyLayer.getSource()); // 只执行一次
		var polyFeatures = geojson_format.readFeatures(polyGeoJson);
		polyLayer.getSource().addFeatures(polyFeatures);
	}
}

/**
 *  添加要素后，不定义范围缩放
 * @param pointLayer
 * @param lineLayer
 * @param polyLayer
 * @param data
 */
function drawGraphicNoZoom(pointLayer,lineLayer,polyLayer,data){
    //移除已有矢量数据
    if (pointLayer != null || pointLayer == "undefined") {
        pointLayer.getSource().clear();
    }
    if (lineLayer != null || lineLayer == "undefined") {
        lineLayer.getSource().clear();
    }
    if (polyLayer != null || polyLayer == "undefined") {
        polyLayer.getSource().clear();
    }

    var pointGeoJson = data.pointGeoJson;
    var polyGeoJson = data.polyGeoJson;
    var geojson_format = new ol.format.GeoJSON({geometryName:'geometry'});
    if (pointLayer && pointGeoJson) { //画点
        for(var i=0;i < pointGeoJson.Rows.length;i++){
            var point = pointGeoJson.Rows[i];
            var pointGeom = "";
            if (point.geom == ""){
                point.hasgeom = false;
                if (point.X && point.X != ""){
                    pointGeom += "POINT (" + point.X ;
                }
                if (point.Y && point.Y != ""){
                    pointGeom += " " + point.Y + ")";
                }
                point.geom = pointGeom;
            }else{
                point.hasgeom = true;
            }
        }
        pointGeoJson.features = ConvertToJsonForJs(pointGeoJson.features);
        var features = geojson_format.readFeatures(pointGeoJson);
        pointLayer.getSource().addFeatures(features);
        if (lineLayer){//画线
            var linePoints = [];
            for(var i=0;i < features.length;i++){
                var point = features[i].geometry;
                linePoints.push(point);
            }
            var TrackLine = new ol.geom.LineString(linePoints);
            var TrackLineFeature = new ol.Feature({geometry:TrackLine});
            lineLayer.getSource().addFeatures([TrackLineFeature]);
        }
    }
    if (polyLayer && polyGeoJson) {//画面
        var polyFeatures = geojson_format.readFeatures(polyGeoJson);
        polyLayer.getSource().addFeatures(polyFeatures);
    }
}

function clearDrawFeatures(){
	if (MapUtilObj.vlayer){
        // MapUtilObj.vlayer.removeAllFeatures();
        MapUtilObj.vlayer.getSource().clear();;
	}
}
function clearLayerFeature(targetLayer){
	if (targetLayer){
		// targetLayer.removeAllFeatures();
        targetLayer.getSource().clear();
	}
}

/**
 * Method: createCircle
 * Create a regular polygon around a radius. Useful for creating circles
 * and the like.
 *
 * Parameters:
 * origin - {<OpenLayers.Geometry.Point>} center of polygon.
 * radius - {Float} distance to vertex, in map units.
 * sides - {Integer} Number of sides. 20 approximates a circle.
 * rotation - {Float} original angle of rotation, in degrees.
 */
function createCircle(origin, radius, sides, rotation) {
    var angle = Math.PI * ((1/sides) - (1/2));
    if(rotation) {
        angle += (rotation / 180) * Math.PI;
    }
    var rotatedAngle, x0, y0, x, y;
    var points = [];
    for(var i=0; i<sides; ++i) {
        rotatedAngle = angle + (i * 2 * Math.PI / sides);
        x = origin[0] + (radius * Math.cos(rotatedAngle));
        y = origin[1] + (radius * Math.sin(rotatedAngle));
        points.push([x, y]);
        if(i == 0){
        	x0 = x;
        	y0 = y;
		}
    }
    points.push([x0, y0]);
    return new ol.geom.Polygon([points]);
};

var openOrClose = true;
/**
 * 是否开启地图透视镜功能
 */
function openSpyEvent() {
    MapUtilObj.opcode = 5;
    MapUtil_DrawPolyInit(map, null, null, null);
    aviLayer.un('precompose', precompose);
    aviLayer.un('postcompose', postcompose);
    if(openOrClose){
        MapUtil_Title('Up键扩大半径,Down键缩小半径(Tab键快速开启)');
        imageLayer.setVisible(true);
        aviLayer.setVisible(true);
        aviLayer.on('precompose', precompose);
        aviLayer.on('postcompose', postcompose);
    }else {
        aviLayer.setVisible(false);
        MapUtil_Title(null);
    }
    openOrClose = !openOrClose;
}

// 影像图层绘制（渲染）前进行一部分裁剪
var precompose = function (event) {
    var ctx = event.context; //影像图层画布
    var pixelRatio = event.frameState.pixelRatio; //像素比
    ctx.save();
    ctx.beginPath();
    if (mousePosition) {
        // 只显示以鼠标当前位置为圆心的一个圆圈
        ctx.arc(mousePosition[0] * pixelRatio, mousePosition[1] * pixelRatio,
            radius * pixelRatio, 0, 2 * Math.PI); //设置画布区域为一个圆
        ctx.lineWidth = 5* pixelRatio;  //圆边框的宽，设置为5个像素单位
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'; // 圆边框样式（颜色）
        ctx.stroke();
    }
    ctx.clip();//裁剪画布
};
// 影像图层绘制后还原画布背景（the canvas context）
var postcompose = function (event) {
    var ctx = event.context;
    ctx.restore();//还原画布
};

/*
 下面代码通过jQuery插件的方法实现对图层的裁剪
 */
var radius = 75; //圆半径
$(function () {
    //通过keydown事件实现键盘Up与Down改变圆半径
    $(document).keydown(function (evt) { //按键事件，document节点绑定不管元素是否获得焦点都会触发
        if (evt.which === 9) { //指示按了哪个键或按钮（9为Tab），当按下Tab键时开启或关闭地图透视镜功能
            openSpyEvent();
        } else if (evt.which === 38) { //指示按了哪个键或按钮（38为Up），当按下Up键时半径扩大5个像素
            radius = Math.min(radius + 5, 150);
            map.render();//渲染地图
        } else if (evt.which === 40) {  //指示按了哪个键或按钮（40为Down），当按下Down键时半径减小5个像素
            radius = Math.max(radius - 5, 25);
            map.render(); //渲染地图
        }
    });
})


//String转Json
function ConvertToJsonForJs(stringJson) {  
    //jsonObj=eval(stringJson);//错误的转换方式  
    jsonObj = eval("(" + stringJson + ")");  
    return jsonObj;
}