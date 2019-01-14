import layerVector from 'ol/layer/vector'
import sourceVector from 'ol/source/vector'
import Select from 'ol/interaction/select'
import Extent from 'ol/extent'
import Polygon from 'ol/geom/polygon'
import WKT from 'ol/format/wkt'
import Condition from 'ol/events/condition'
import { LoadMap } from './openlayer_map_ol3_sz.js'
import { MapUtil } from './openlayer_maputil.js'

/**
 * 初始化地图对象
 */
export const OpenlayerMap = function (mapContainer,options,f_callback) {
    // 地图对象
    var map = null;
    // 地图选择控件
    var selectCtrl = null;
    var selectCtrl_1 = null;

    map = LoadMap.loadMap(mapContainer,0);

    /**
     * 添加单个图层
     * @param _layer_ 图层
     * @param _visible_ 图层是否显示
     */
    this.addLayer = function(_layer_,_visible_){
        map.addLayer(_layer_);
    };

    /**
     * 添加多个图层
     * @param _layers_ 图层数组
     * @param _visible_ 图层是否显示
     */
    this.addLayers = function(_layers_,_visible_){
        if(_layers_ && _layers_.length > 0){
            for (var i=0; i < _layers_.length; i++){
                this.addLayer(_layers_[i],_visible_);
            }
        }
    };

    /**
     * 往地图视图中添加一个矢量图层
     * @param _layerName_ 图层名称
     * @param _styleMap_ 图层样式
     * @param _zIndex 图层显示位置zIndex
     * @param _visible_ 图层是否显示
     */
    this.addVectorLayer = function(_layerName_,_styleMap_,_zIndex,_visible_){
        var vectorLayer = new layerVector({
            name: _layerName_,
            source: new sourceVector(),
            zIndex: _zIndex,
            style: _styleMap_  //样式设置
        });
        vectorLayer.setVisible(_visible_);
        this.addLayer(vectorLayer,_visible_);
        return vectorLayer;
    }

    /**
     * 在地图上添加后台数据源，有缩放定位
     * @param _dataType 数据类型:point、line、polygon
     * @param _dataLayer 数据目标图层
     * @param _data_ 数据源
     */
    this.drawGraphics = function(_dataType, _dataLayer, _data){
        if(_dataType == 'point'){
            // 画点
            MapUtil.drawGraphic(_dataLayer,null,null,_data);
        } else if(_dataType == 'line'){
            // 画线
            MapUtil.drawGraphic(null,_dataLayer,null,_data);
        } else if(_dataType == 'polygon'){
            // 画面
            MapUtil.drawGraphic(null,null,_dataLayer,_data);
        } else{
            // 在同一图层绘制点面要素对象
            MapUtil.drawGraphic(_dataLayer,null,_dataLayer,_data);
        } 
    };

    /**
     * 在地图上添加后台数据源,无缩放定位
     * @param _dataType 数据类型:point、line、polygon
     * @param _dataLayer 数据目标图层
     * @param _data_ 数据源
     */
    this.drawGraphicNoZoom = function(_dataType, _dataLayer, _data){
        if(_dataType == 'point') {
            // 画点
            MapUtil.drawGraphicNoZoom(_dataLayer,null,null,_data);
        } else if(_dataType == 'line') {
            // 画线
            MapUtil.drawGraphicNoZoom(null,_dataLayer,null,_data);
        } else if(_dataType == 'polygon') {
            // 画面
            MapUtil.drawGraphicNoZoom(null,null,_dataLayer,_data);
        } else {
            // 在同一图层绘制点面要素对象
            MapUtil.drawGraphicNoZoom(_dataLayer,null,_dataLayer,_data);
        }
    };

    this.drawGraphicNoZoom_1 = function(_dataType, _dataLayer, _data){
        if(_dataType == 'point'){
            // 画点
            MapUtil.drawGraphicNoZoom_1(_dataLayer,null,null,_data);
        } else if(_dataType == 'line'){
            // 画线
            MapUtil.drawGraphicNoZoom_1(null,_dataLayer,null,_data);
        } else{
            // 画面
            MapUtil.drawGraphicNoZoom_1(null,null,_dataLayer,_data);
        }
    };

    /**
     * 初始化地图选择控件
     * @param _selectType 选择类型：singleclick、click、pointermove、altclick
     * @param _onFeatureSelect 选中事件
     */
    this.initSelect = function (_selectType,_selectLayers,_selectStyle, _onFeatureSelect) {
        if (_selectType == 'singleclick') {
            selectCtrl = new Select({
                layers: _selectLayers,
                style: _selectStyle
            });
        }else if (_selectType == 'click') {
            selectCtrl = new Select({
                condition: Condition.click,
                layers: _selectLayers,
                style: _selectStyle
            });
        }else if(_selectType == 'doubleclick') {
            selectCtrl = new Select({
                condition: Condition.doubleClick,
                layers: _selectLayers,
                style: _selectStyle
            });
        }else if (_selectType == 'pointermove') {
            selectCtrl = new Select({
                condition: Condition.pointerMove,
                layers: _selectLayers,
                style: _selectStyle
            });
        }else if (_selectType == 'altclick') {
            selectCtrl = new Select({
                condition: function(mapBrowserEvent) {
                  return Condition.click(mapBrowserEvent) &&
                  Condition.altKeyOnly(mapBrowserEvent);
                },
                layers: _selectLayers,
                style: _selectStyle
            });
        }else{
            selectCtrl = null;
        }
        if (selectCtrl !== null){
            map.addInteraction(selectCtrl);
                selectCtrl.on('select', function(e) {
                if (typeof(_onFeatureSelect) == 'function') {
                    _onFeatureSelect(e);    
                }
            });
        }
        return selectCtrl;
    }

    this.initSelect_1 = function (_selectType,_selectLayers,_selectStyle, _onFeatureSelect) {
        if (_selectType == 'singleclick') {
            selectCtrl_1 = new Select({
                layers: _selectLayers,
                style: _selectStyle
            });
        }else if (_selectType == 'click') {
            selectCtrl_1 = new Select({
                condition: Condition.click,
                layers: _selectLayers,
                style: _selectStyle
            });
        }else if (_selectType == 'pointermove') {
            selectCtrl_1 = new Select({
                condition: Condition.pointerMove,
                layers: _selectLayers,
                style: _selectStyle
            });
        }else if (_selectType == 'altclick') {
            selectCtrl_1 = new Select({
                condition: function(mapBrowserEvent) {
                  return Condition.click(mapBrowserEvent) &&
                  Condition.altKeyOnly(mapBrowserEvent);
                },
                layers: _selectLayers,
                style: _selectStyle
            });
        }else{
            selectCtrl_1 = null;
        }
        if (selectCtrl_1 !== null){
            map.addInteraction(selectCtrl_1);
            selectCtrl_1.on('select', function(e) {
                if (typeof(_onFeatureSelect) == 'function') {
                    _onFeatureSelect(e);    
                }
            });
        }
        return selectCtrl_1;
    }

    /**
     * 实例化绘图工具
     * @param type
     */
    this.drawCtrl = function (type) {
        stopMeasureTool();
        MapUtil_DrawPolyInit(map, PointDataFn, LineDataFn, PolyDataFn);
        MapUtil_ControlInit(type);
    };

    /**
     * 图层控制：切换图层显示与隐藏
     * @param layerName 图层名称
     * @param visible 是否显示
     */
    this.changeLayerVisible = function(layerName,visible){
        var alllayers = map.getLayers();
        if(alllayers && alllayers.getArray().length > 0){
            for (var i = 0; i < alllayers.getArray().length; i++) {
                var activeLayer = alllayers.getArray()[i];
                if (activeLayer.get('name') == layerName) {
                    activeLayer.setVisible(visible);
                    break;
                }
            }
        }
    };

    /**
     * 从元素获取图层
     * @param feature 元素
     */
    this.getLayerByFeature = function (feature){  
        var layers = map.getLayers();  
        for(var i=0;i<layers.getLength();i++){  
            var layer = layers.getArray()[i];
            var source = layer.getSource();  
            if(source instanceof sourceVector){  
               var features = source.getFeatures();  
             if(features.length>0){  
              for(var j=0;j<features.length;j++){  
                 if(features[j]===feature){  
                    return layer;  
                 }  
              }  
             }  
         }  
        }  
        return null;  
    }; 

    /**
     * 设置地图中心点和放大尺寸
     * @param lonlat 中心点坐标
     * @param zoomLevel
     */
    this.setCenterAndZoom = function(lonlat,zoomLevel){
        // var lonlat = new OpenLayers.LonLat(x,y);
        // var lonlat = ol.proj.fromLonLat([x, y]);
        map.getView().setCenter(lonlat);
        if(zoomLevel) {
            LoadMap.zoomTo(zoomLevel);
        }
    };


    //图层控制：控制选定矢量图层显示，没选定的隐藏
    this.changeLayerVector = function(layerName) {
        var alllayers = map.getLayers();
        if(alllayers && alllayers.getArray().length > 0){
            for (var i = 6; i < alllayers.getArray().length; i++) {
                var activeLayer = alllayers.getArray()[i];
                if (activeLayer.get('name') == layerName) {
                    activeLayer.setVisible(true);
                }else{
                    activeLayer.setVisible(false);
                }
            }
        }
    };

    //获取当前地图范围
    this.getViewExtentWkt = function() {
        if (map){
            var viewExtent = map.getView().calculateExtent(map.getSize())
            var topLeft = Extent.getTopLeft(viewExtent);
            var topRight = Extent.getTopRight(viewExtent);
            var bottomRight = Extent.getBottomRight(viewExtent);
            var bottomLeft = Extent.getBottomLeft(viewExtent);
            var extentGeometry =  new Polygon([[topLeft,topRight,bottomRight,bottomLeft,topLeft]]);
            var format = new WKT();
            var extentWkt = format.writeGeometry(extentGeometry);
            return extentWkt
        }
    }

    if (typeof f_callback == "function"){
        f_callback(map);
    }
};