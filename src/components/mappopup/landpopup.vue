<template>
      <div id="popup" class="ol-popup">
          <a href="#" id="popup-closer" class="ol-popup-closer"></a>
          <v-landpop></v-landpop>
      </div>
</template>

<script>
  import vLandpop from './popupBlock/landpop'
  import Overlay from 'ol/overlay';
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {

    },

    methods: {
        selectFeatureFun: function(argument){
            if (argument.target.getFeatures().getLength() > 0) {
                // 获取选择的要素对象
                var selectFeature = argument.target.getFeatures().getArray()[0];
                // var selectLayer = select.getLayer(selectFeature);
                var selectLayer = openlayerMap.getLayerByFeature(selectFeature);
                console.log(selectLayer.get('name'));
                // 获取选择要素的属性集
                properties = selectFeature.getProperties();
                
                popOverLay.setPosition(ol.extent.getCenter(selectFeature.getGeometry().getExtent()));
                openlayerMap.setCenterAndZoom(ol.extent.getCenter(selectFeature.getGeometry().getExtent()),8);
            }
        },
        initPopup: function() {
            let popContainer = document.getElementById('popup');
            let popContent = document.getElementById('popup-content');
            let popCloser = document.getElementById('popup-closer');
            if (popOverLay) {
                map.removeOverlay(popOverLay)
            }
            let popOverLay = new Overlay({
                id: 'popupInfo',
                element: popContainer,
                autoPan: true,
                autoPanAnimation: {
                duration: 250
                }
            });
            map.addOverlay(popOverLay);
            popCloser.onclick = function() {
                select.featureOverlay_.getSource().clear();
                popOverLay.setPosition(undefined);
                popCloser.blur();
                return false;
            };
        }
    },

    watch: {}

  }

</script>
<style lang=''>

</style>