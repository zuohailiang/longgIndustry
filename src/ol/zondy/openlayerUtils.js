// let ol = require("openlayers")
import ol from 'ol'

// 添加geoserver服务
export const addGeoServerTile = function(geoserverUrl, layerName, zIndex, visible, format) {
    let geoserverLayer = new ol.layer.Tile({
        name: layerName,
        source: new ol.source.XYZ({
            url:  geoserverUrl + '/{z}/{y}/{x}' + (format?('.'+format):''),
            tileGrid: new ol.tilegrid.TileGrid({
                // extent: layerInitialExtent,
                resolutions: resolutions,
                origin: [layerInfo.tileInfo.origin.x,layerInfo.tileInfo.origin.y],
                tileSize: 256
            }),
            projection : new ol.proj.Projection({
                code: "EPSG:2327",
                units: (layerInfo.units == "esriFeet") ? 'ft' : 'm'
            })
        }),
        visible: visible==null?false:visible,
        opacity : 1,
        zIndex: zIndex==null?0:zIndex,
        extent: layerMaxExtent
    })
    return geoserverLayer;
}

/**
    * 图层控制：切换图层显示与隐藏
    * @param layerName 图层名称
    * @param visible 是否显示
*/
export const changeLayerVisible = function(layerName,visible) {
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
}