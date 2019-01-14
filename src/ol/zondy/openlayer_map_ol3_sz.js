// import ol from 'ol'
import View from 'ol/view';
import Map from 'ol/map';
import extent from 'ol/extent'
import Tile from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';
import TileGrid from 'ol/tilegrid/tilegrid';
import Projection from 'ol/proj/projection';
import Attribution from 'ol/control/attribution';
import Zoom from 'ol/control/zoom';
// import ZoomSlider from 'ol/control/zoomslider';
/*
* 地图加载模块
*/
const basePath = "http://203.91.36.124/mapgis";
// const basePath = "http://203.91.36.34:30080/szmap_gov/";
// const basePath = "http://172.17.6.48:8080/mapgis";
// const basePath = "http://61.144.226.44:6080/arcgis/rest/services/basemap/szmap_basemap_201706_01/MapServer";

const mapbaseUrl = basePath + "/GISDATA/SZMAP201212";//地形图服务Url
const aviUrl = basePath + "/szimage_05"; //影像服务Url
const lgMaskUrl = basePath + "/GISDATA/TRADESUP/LGMASK"; //遮罩层服务Url
const piece1Url = basePath + "/GISDATA/TRADESUP/PIECE1";//片区1服务Url
const parkUrl = basePath + "/GISDATA/TRADESUP/PARK";//园区服务Url
const park1Url = basePath + "/GISDATA/TRADESUP/PARK1";//园区1服务Url
const ghImageUrl = basePath + "/GISDATA/TRADESUP/GHIMAGE";//规划服务Url
const industryUrl = basePath + "/GISDATA/TRADESUP/INDUSTRY";//产业服务Url

let resolutions = new Array();
// 84,133.43766323246   3,572.2340788580477   189,638.3736  65,593.5319
let map, imageLayer, aviLayer, lgMaskLayer, piece1Layer, parkLayer, industryLayer,ghImageLayer;
// let map, imageLayer, aviLayer, lgMaskLayer, piece1Layer, parkLayer, industryLayer;

let layerInfo = {
	"serviceDescription" : "",
	"mapName" : "Layers",
	"description" : "",
	"copyrightText" : "",
	"spatialReference" : {},
	"singleFusedMapCache" : true,
	"tileInfo" : {
		"rows" : 256,
		"cols" : 256,
		"dpi" : 96,
		"format" : "PNG32",
		"compressionQuality" : 0,
		"origin" : {
			"x" : -200,
            "y" : 178200.525
        },
		"spatialReference" : {},

		"lods" : [ {
			"level" : 0,
			"resolution" : 105.833545000423,
			"scale" : 400000
		}, {
			"level" : 1,
			"resolution" : 52.9167725002117,
			"scale" : 200000
		}, {
			"level" : 2,
			"resolution" : 39.6875793751588,
			"scale" : 150000
		}, {
			"level" : 3,
			"resolution" : 26.4583862501058,
			"scale" : 100000
		}
        , {
			"level" : 4,
			"resolution" : 13.2291931250529,
			"scale" : 50000
		}, {
			"level" : 5,
			"resolution" : 5.29167725002117,
			"scale" : 20000
		}, {
			"level" : 6,
			"resolution" : 2.64583862501058,
			"scale" : 10000
		}, {
			"level" : 7,
			"resolution" : 1.32291931250529,
			"scale" : 5000
		}, {
			"level" : 8,
			"resolution" : 0.529167725002117,
			"scale" : 2000
		}, {
			"level" : 9,
			"resolution" : 0.264583862501058,
			"scale" : 1000
		}, {
			"level" : 10,
			"resolution" : 0.13229193125052918,
			"scale" : 500
		 }
        ]
	},
	"initialExtent" : {
		xmin:42156.9212844557,ymin:-34494.8269993417,xmax:212754.432201896,ymax:81261.6583298636,
		"spatialReference" : {}
    },
	"fullExtent" : {
		xmin:42156.9212844557,ymin:-34494.8269993417,xmax:212754.432201896,ymax:81261.6583298636,
		"spatialReference" : {}
	},
	"units" : "esriMeters",
	"supportedImageFormatTypes" : "PNG32,PNG24,PNG,JPG,DIB,TIFF,EMF,PS,PDF,GIF,SVG,SVGZ,AI",
	"documentInfo" : {
		"Title" : "gwMap20170302",
		"Author" : "Owner",
		"Comments" : "",
		"Subject" : "",
		"Category" : "",
		"Keywords" : ""
	}
};

let layerInitialExtent = null;
let layerMaxExtent = null;
// 每次鼠标移动时获取当前像素位置
let mousePosition = null;
/**
 *  地图初始化
 * @param mapContainer 地图容器
 * @param rotation 地图旋转值 0-360
 * @returns {OpenLayers.Map}
 */

export const LoadMap = {
    loadMap: function(mapContainer,rotation){
        if (!layerInitialExtent) {
            layerInitialExtent = [layerInfo.initialExtent.xmin,
                layerInfo.initialExtent.ymin, layerInfo.initialExtent.xmax,
                layerInfo.initialExtent.ymax];
        }
        var mapCenter = extent.getCenter(layerInitialExtent);
        mapCenter = [132019.42062761972,36308.13768113985];
        if (!layerMaxExtent) {
            layerMaxExtent = layerInitialExtent;
        }
        resolutions = [];
        for ( var i = 0; i < layerInfo.tileInfo.lods.length; i++) {
            resolutions.push(layerInfo.tileInfo.lods[i].resolution);
        }
        // if(map != null) return;
        // 电子地形图
        imageLayer = addGeoServerTile(mapbaseUrl,'电子地形图',1,true,'');
        // 影像图
        aviLayer = addGeoServerTile(aviUrl,'卫星影像图',1,false,'');            
        // 遮罩层
        lgMaskLayer = addGeoServerTile(lgMaskUrl,'遮罩层',10,true,'png');
        // 片区
        piece1Layer = addGeoServerTile(piece1Url,'片区',3,true,'png');
        // 园区
        parkLayer = addGeoServerTile(parkUrl,'园区',3,true,'png');
        // 产业
        industryLayer = addGeoServerTile(industryUrl,'产业',4,true,'png');
        // 规划图层
        ghImageLayer = addGeoServerTile(ghImageUrl,'规划',11,false,'png');
        var layers = [imageLayer, aviLayer, lgMaskLayer,piece1Layer,parkLayer,industryLayer,ghImageLayer];
        // const zoomSlider = new ol.control.ZoomSlider();
        // var layers = [imageLayer, aviLayer, lgMaskLayer,piece1Layer,parkLayer,industryLayer];
        var view = new View({
            center: mapCenter, //地图初始中心点
            minZoom: 0, //地图最小显示级别
            zoom: 2, //地图初始显示级别
            resolutions : resolutions, //地图分辨率
            rotation: rotation, //地图旋转角度
            extent: layerInitialExtent, //地图初始范围
            projection: new Projection({
                code: "EPSG:2327",
                units: (layerInfo.units == "esriFeet") ? 'ft' : 'm'
            }),
        });
        // 隐藏属性控件
        var attribution = new Attribution({
            className:'hide'
        });
        // 隐藏zoom控件
        var zoomBar = new Zoom({
            className:'hide'
        });
        //实例化Map对象加载地图
        map = new Map({
            target: mapContainer, //地图容器div的ID
            //地图容器中加载的图层
            layers: layers,
            //地图视图设置
            view: view,
            // controls: ol.control.defaults({attribution: false,zoom:false }).extend([attribution,zoomBar])
            // controls: new ol.control.ZoomSlider()
        });

        // map.addLayer(imageLayer); //添加矢量地图图层
        // map.addLayer(aviLayer); //添加影像地图图层
        //添加坐标
        // var mousePositionControl = new ol.control.MousePosition({
        //     coordinateFormat: ol.coordinate.createStringXY(2),
        //     className: 'custom-mouse-position',
        //     target: document.getElementById('mouse-position'),
        //     undefinedHTML: '&nbsp;'
        // });
        // map.addControl( new ol.control.Zoom({}));
        // map.addControl( new ol.control.ZoomSlider({}));

        // var container = map.getTargetElement();
        // container.addEventListener('mousemove', function(event) {
        //     mousePosition = map.getEventPixel(event);
        //     map.render();
        // });

        // container.addEventListener('mouseout', function() {
        //     mousePosition = null;
        //     map.render();
        // });
        return map;
    },
    // 放大地图
    zoomIn: function() {
        var mapLev = map.getView().getZoom();
        // map.getView().setZoom(mapLev + 1);
        map.getView().animate({zoom: mapLev + 1});
    },
    //缩小地图
    zoomOut: function() {
        var mapLev = map.getView().getZoom();
        // map.getView().setZoom(mapLev - 1);
        map.getView().animate({zoom: mapLev - 1});
    },
    /**
     *  地图缩放到固定级别
     * @param zoomLevel 缩放级别
     */
    zoomTo: function(zoomLevel) {
        map.getView().setZoom(zoomLevel);
    },
    /**
     *  切换底图
     * @param layerType 图层类型
     */
    closeIndustryLayer: function() {
        industryLayer.setVisible(false);
    },
    changeDefaultBaseLayer_evt: function(layerType) {
        if(layerType == "image"){
            if(imageLayer){
                imageLayer.setVisible(true);
                aviLayer.setVisible(false);
            }
            // imageLayer.setVisible(!imageLayer.getVisible());
        }else if(layerType == "avi"){
            if(aviLayer){
                aviLayer.setVisible(true);
                imageLayer.setVisible(false);
            }
            // aviLayer.setVisible(!aviLayer.getVisible());
        }else if(layerType == "wgb"){
            wgbLayer.setVisible(!wgbLayer.getVisible());
        }else if(layerType == "ghw"){
            ghwLayer.setVisible(!ghwLayer.getVisible());
        }else if(layerType == "add_wgb"){
            addWgbLayer.setVisible(!addWgbLayer.getVisible());
        }else if(layerType == "del_wgb"){
            delWgbLayer.setVisible(!delWgbLayer.getVisible());
        }
    }
}

// 添加geoserver服务
function addGeoServerTile(geoserverUrl, layerName, zIndex, visible, format) {
    let geoserverLayer = new Tile({
        name: layerName,
        source: new XYZ({
            url:  geoserverUrl + '/{z}/{y}/{x}' + (format?('.'+format):''),
            tileGrid: new TileGrid({
                // extent: layerInitialExtent,
                resolutions: resolutions,
                origin: [layerInfo.tileInfo.origin.x,layerInfo.tileInfo.origin.y],
                tileSize: 256
            }),
            projection : new Projection({
                code: "EPSG:2327",
                units: (layerInfo.units == "esriFeet") ? 'ft' : 'm'
            })
        }),
        visible: visible==null?false:visible,
        opacity : 1,
        zIndex: zIndex==null?0:zIndex,
        extent: layerMaxExtent
    });
    return geoserverLayer;
}