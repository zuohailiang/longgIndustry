import ol from 'ol'
import sourceVector from 'ol/source/vector'
import layerVector from 'ol/layer/vector'
import Polygon from 'ol/geom/polygon';
import Draw from 'ol/interaction/draw';
import GeoJSON from 'ol/format/geojson';
import LineString from 'ol/geom/linestring';
import Feature from 'ol/feature';
import { readFeaturesFromData } from './geojson.js'
import $ from 'jquery'

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
                MapUtilObj.source = new sourceVector({ wrapX: false });
            }
        }
        let geometryFunction, maxPoints;
        if(drawType === 'drawPoint'){
            drawType = 'Point';
            // if (!drawPointLayer){
                drawPointLayer = new layerVector({
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
        }else if(drawType === 'drawLine'){
        	drawType = 'LineString';
            // if (!drawLineLayer){
                drawLineLayer = new layerVector({
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
                drawPolyLayer = new layerVector({
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
                drawCircleLayer = new layerVector({
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
                drawPolyQueryLayer = new layerVector({
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
                    geometry = new Polygon(null); //多边形
                }
                var start = coordinates[0];
                var end = coordinates[1];
                geometry.setCoordinates([
                    [start, [start[0], end[1]], end, [end[0], start[1]], start]
                ]);
                return geometry;
            };
        }else {
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
        //实例化交互绘制类对象并添加到地图容器中
        MapUtilObj.draw = new Draw({
            source: MapUtilObj.source, //绘制层数据源
            type: /** @type {ol.geom.GeometryType} */(drawType), //几何图形类型
            geometryFunction: geometryFunction, //几何信息变更时调用函数
            snapTolerance: 5,  // 捕捉到绘图完成的像素距离
            maxPoints: maxPoints //最大点数
        });
        map.addInteraction(MapUtilObj.draw);
		// 初始化绘图快捷键触发事件
        initKeyEvent(MapUtilObj.draw);
    },

    /**
     *  添加要素后，定义范围缩放
     * @param pointLayer
     * @param lineLayer
     * @param polyLayer
     * @param data
     */
    drawGraphic: function(pointLayer,lineLayer,polyLayer,data){
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
        var geojson_format = new GeoJSON({geometryName:'geometry'});
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
            // var features = geojson_format.readFeatures(pointGeoJson);
            var features = readFeaturesFromData(pointGeoJson,{'geometryName_':'geometry'});
            // pointLayer.getSource().addFeatures(features);
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
                var TrackLine = new LineString(linePoints);
                var TrackLineFeature = new Feature({geometry:TrackLine});
                lineLayer.getSource().addFeatures([TrackLineFeature]);
            }
        }
        if (polyLayer && polyGeoJson) {//画面
            console.log(polyGeoJson);
            // polyGeoJson.features = ConvertToJsonForJs(polyGeoJson.features);
            // polyLayer.getSource().un("addfeature", loadFeaturesHandler, polyLayer.getSource());
            polyLayer.getSource().once("addfeature", loadFeaturesHandler, polyLayer.getSource()); // 只执行一次
            var polyFeatures = readFeaturesFromData(polyGeoJson,{'geometryName_':'geometry'});
            // var polyFeatures = geojson_format.readFeatures(polyGeoJson);
            polyLayer.getSource().addFeatures(polyFeatures);
        }
    },

    /**
     *  添加要素后，不定义范围缩放
     * @param pointLayer
     * @param lineLayer
     * @param polyLayer
     * @param data
     */
    drawGraphicNoZoom: function(pointLayer,lineLayer,polyLayer,data){
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
        if(data.pointGeoJson) {
            var pointGeoJson = data.pointGeoJson;
        }
        if(data.polyGeoJson) {
            var polyGeoJson = data.polyGeoJson;
        }
        let geojson_format = new GeoJSON({geometryName:'geometry'});
        if (pointLayer && pointGeoJson) { //画点
            for(var i=0;i < pointGeoJson.features.length;i++){
                var point = pointGeoJson.features[i];
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
            // pointGeoJson.features = ConvertToJsonForJs(pointGeoJson.features);
            // var geoJsons = new GeoJSON();
            // var features = geojson_format.readFeatures(pointGeoJson);
            var features = readFeaturesFromData(pointGeoJson,{'geometryName_':'geometry'});
            pointLayer.getSource().addFeatures(features);
            if (lineLayer){  //画线
                var linePoints = [];
                for(var i=0;i < features.length;i++){
                    var point = features[i].geometry;
                    linePoints.push(point);
                }
                var TrackLine = new LineString(linePoints);
                var TrackLineFeature = new Feature({geometry:TrackLine});
                lineLayer.getSource().addFeatures([TrackLineFeature]);
            }
        }
        if (polyLayer && polyGeoJson) {//画面
            // var polyFeatures = geojson_format.readFeatures(polyGeoJson);
            // polyLayer.getSource().addFeatures(polyFeatures);
            // polyLayer.getSource().once("addfeature", loadFeaturesHandler, polyLayer.getSource()); // 只执行一次
            var polyFeatures = readFeaturesFromData(polyGeoJson,{'geometryName_':'geometry'});
            // var polyFeatures = geojson_format.readFeatures(polyGeoJson);
            polyLayer.getSource().addFeatures(polyFeatures);
        }
    },

    /**
     *  添加要素后，不定义范围缩放
     * @param pointLayer
     * @param lineLayer
     * @param polyLayer
     * @param data
     */
    drawGraphicNoZoom_1: function(pointLayer,lineLayer,polyLayer,data){
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
        if(data.pointGeoJson) {
            var pointGeoJson = data.pointGeoJson;
        }
        if(data.polyGeoJson) {
            var polyGeoJson = data.polyGeoJson;
        }
        let geojson_format = new GeoJSON({geometryName:'geometrypoint'});
        if (pointLayer && pointGeoJson) { //画点
            for(var i=0;i < pointGeoJson.features.length;i++){
                var point = pointGeoJson.features[i];
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
            // pointGeoJson.features = ConvertToJsonForJs(pointGeoJson.features);
            // var geoJsons = new GeoJSON();
            // var features = geojson_format.readFeatures(pointGeoJson);
            var features = readFeaturesFromData(pointGeoJson,{'geometryName_':'geometrypoint'});
            pointLayer.getSource().addFeatures(features);
            if (lineLayer){//画线
                var linePoints = [];
                for(var i=0;i < features.length;i++){
                    var point = features[i].geometry;
                    linePoints.push(point);
                }
                var TrackLine = new LineString(linePoints);
                var TrackLineFeature = new Feature({geometry:TrackLine});
                lineLayer.getSource().addFeatures([TrackLineFeature]);
            }
        }
        if (polyLayer && polyGeoJson) {//画面
            var polyFeatures = geojson_format.readFeatures(polyGeoJson);
            polyLayer.getSource().addFeatures(polyFeatures);
        }
    }
}

function MapUtil_Title(html) {
    if(MapUtilObj.tipdiv == null) {
        MapUtilObj.tipdiv = $("<div></div>");
        MapUtilObj.tipdiv.attr('id','tipdiv');
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
    }
}

function loadFeaturesHandler(eventArgs) {
	var targetLayerSource = eventArgs.target;
	if (targetLayerSource && targetLayerSource.getFeatures().length > 0) {
        if(window.Parkmap) {
            window.Parkmap.getView().fit(targetLayerSource.getExtent(),  window.Parkmap.getSize());
        }
        if(window.map) {
            window.map.getView().fit(targetLayerSource.getExtent(),  window.map.getSize());
        }
	}
}

/**
 * 移除按键事件
 */
function removeKeyEvents() {
    if(keyHandler){
        keyHandler.detach();
        keyHandler = null;
    }
}
