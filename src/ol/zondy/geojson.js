import ol from 'ol'
import WKTFormat from 'ol/format/wkt'
import Feature from 'ol/feature';
// import formatFeature from 'ol/format/feature';

export const readFeaturesFromData = function(object, opt_options) {
  var geoJSONObject = /** @type {GeoJSONObject} */ (object);
  /** @type {Array.<ol.Feature>} */
  var features = null;
  if (geoJSONObject.type === 'FeatureCollection') {
    var geoJSONFeatureCollection = /** @type {GeoJSONFeatureCollection} */
        (object);
    features = [];
    var geoJSONFeatures = geoJSONFeatureCollection.features;
    var i, ii;
    for (i = 0, ii = geoJSONFeatures.length; i < ii; ++i) {
      features.push(readFeatureFromData(geoJSONFeatures[i],
          opt_options));
    }
  } else {
    features = [readFeatureFromData(object, opt_options)];
  }
  return features;
};

 function readFeatureFromData(object, opt_options) {
  if(object[opt_options['geometryName_']] != null || typeof object[opt_options['geometryName_']] !== 'undefined' ){
      var lexer = new WKTFormat.Lexer(object[opt_options['geometryName_']]);
      var parser = new WKTFormat.Parser(lexer);
      var geometry =  parser.parse();
      //if (goog.isDef(geometry)) {
      //geometry = formatFeature.transformWithOptions(geometry, false, opt_options);
      //} else {
      //return null;
      //}
      var feature = new Feature();
      if (opt_options['geometryName_']) {
        feature.setGeometryName(opt_options['geometryName_']);
      } else if (this.extractGeometryName_ && geoJSONFeature.geometry_name !== undefined) {
        feature.setGeometryName(geoJSONFeature.geometry_name);
      }
      feature.setGeometry(geometry);
      // if (geoJSONFeature.id !== undefined) {
      //   feature.setId(geoJSONFeature.id);
      // }
      delete object[opt_options['geometryName_']];
      if (object) {
          feature.setProperties(object);
      }
      return feature;
  }else{
      return null;
  }
};