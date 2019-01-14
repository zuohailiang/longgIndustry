import 'ol/ol.css'
import { OpenlayerMap } from '@/ol/zondy/map_devo.js'
 
function initMap(mapContainer) {
    window.openlayerMap = new OpenlayerMap(mapContainer, "", function (map) {
        window.map = map;
        console.log("地图初始化成功。");
    });
}

function initParkMap(mapContainer) {
    window.openlayerParkMap = new OpenlayerMap(mapContainer, "", function (map) {
        window.Parkmap = map;
        console.log("地图初始化成功1。");
    });
}

function switchMap(mapContainer) {
    window.openlayerSwitchMap = new OpenlayerMap(mapContainer, "", function (map) {
        window.switchmap = map;
        console.log("地图初始化成功2。");
    });
}

export {initMap,initParkMap,switchMap}
