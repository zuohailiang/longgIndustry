//     import ol from 'ol'

//     const shenzhen = ol.proj.fromLonLat([113.98, 22.57]);
//     var features = [{
//         name: '北京',
//         lonLat:  [116.23, 39.54]
//     },{
//         name: '深圳',
//         lonLat: [113.98, 22.57]
//     },{
//         name: '长沙',
//         lonLat: [112.59, 28.12]
//     }]
//     // const titleLayer = new ol.layer.Tile({source: new ol.source.OSM()});
//     const zoomSlider = new ol.control.ZoomSlider();
//     // 创建矢量标注样式函数
//     var createLabelStyle = function (feature) {
//         return new ol.style.Style({
//             /**{olx.style.IconOptions}类型*/
//             image: new ol.style.Icon(
//                 ({
//                     anchor: [0.5, 0.5],  //锚，默认值是图标中心
//                     anchorOrigin: 'bottom-right', //锚地：bottom-left，bottom-right， top-left或top-right。默认是top-left。
//                     anchorXUnits: 'fraction',  //指定锚点x值的单位。值'fraction'表示x值是图标的一部分。值'pixels'表示以像素为单位的x值。默认是'fraction'。
//                     anchorYUnits: 'pixels',    //指定锚点y值的单位。值'fraction'表示y值是图标的一部分。值'pixels'以x为单位表示y值。默认是'fraction'。
//                     offsetOrigin: 'bottom-right', //偏移地：bottom-left，bottom-right， top-left或top-right。默认是top-left。
//                     // offset:[0,10],
//                     //图标缩放比例
//                     // scale:0.5,
//                     //透明度
//                     opacity: 0.75,
//                     //图标的url
//                     src: '../../static/location.png'
//                 })
//             )
//         });
//     }

// export const loadingMap = function(id) {
//     var map = new ol.Map({
//         // 设置地图图层
//         layers: [
//             new ol.layer.Tile({
//                 source: new ol.source.OSM()
//             })
//         ],
//         // 设置显示地图的视图
//         view: new ol.View({
//           center: shenzhen,   // 定义地图显示中心于经度0度，纬度0度处
//           zoom: 5,            // 并且定义地图显示层级为2
//           maxZoom: 8,
//           minZoom: 3
//         }),
//         // 让id为map的div作为地图的容器
//         target: id    
//     });

//     for(var i=0; i<features.length; i++){
//         console.log(features[i].lonLat);
//         //实例化Vector要素，通过矢量图层添加到地图容器中
//         var iconFeature = new ol.Feature({
//             geometry: new ol.geom.Point(ol.proj.fromLonLat(features[i].lonLat))
//         });
//         iconFeature.setStyle(createLabelStyle(iconFeature));
//         //矢量标注的数据源
//         var vectorSource = new ol.source.Vector({
//             features: [iconFeature]
//         });
//         //矢量标注图层
//         var vectorLayer = new ol.layer.Vector({
//             source: vectorSource
//         });
//         map.addLayer(vectorLayer);
//     }

//     map.addControl(zoomSlider);
// }