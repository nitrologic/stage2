// stage - a cesium client by simon

// visit roa.nz a new beginning for the long term 

//https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=-36.88|174.75&format=json
//https://en.wikipedia.org/?curid=18630637

var degrees=Math.PI/180;
var range=new Cesium.HeadingPitchRange(0,-30*degrees,26000);

var home = Cesium.Cartesian3.fromDegrees(174.7577127,-36.8763942, 250.0);
var extent = Cesium.Rectangle.fromCartesianArray(home);

Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

var time=new Cesium.JulianDate(0,60*60*15);
var dragontime=new Cesium.JulianDate(0,60*60*8);

var editor = new Cesium.Viewer('editor', {
  animation: false,
  baseLayerPicker : false,
  fullscreenButton: false,
  geocoder:false,  
  homeButton: false,
  timeline: false,
  infoBox: false,
  sceneModePicker: false,
  selectionIndicator: false,
  navigationHelpButton: false,
  creditContainer: "credits",
  sceneMode : Cesium.SceneMode.COLUMBUS_VIEW,
  imageryProvider : Cesium.createOpenStreetMapImageryProvider({url : 'https://a.tile.openstreetmap.org/'})
  });
  
/*
  var clock = new Cesium.Clock();
  var clockViewModel = new Cesium.ClockViewModel(clock);
  var viewModel = new Cesium.AnimationViewModel(clockViewModel);
  var widget = new Cesium.Animation('jog', viewModel);
*/

//url : 'https://stamen-tiles.a.ssl.fastly.net/watercolor/',
//credit : 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'

var terrainSource="https://s3-ap-southeast-2.amazonaws.com/roanz/terrain/nz-dem"; ///layer.json

var viewer = new Cesium.Viewer('viewer', {
  sceneMode : Cesium.SceneMode.SCENE_3D,
  mapProjection : new Cesium.WebMercatorProjection(),
  imageryProvider : Cesium.createOpenStreetMapImageryProvider({url : 'https://a.tile.openstreetmap.org/'}),
  //imageryProvider : Cesium.createOpenStreetMapImageryProvider({url : 'https://stamen-tiles.a.ssl.fastly.net/watercolor/'}),
//  terrainProvider : new Cesium.CesiumTerrainProvider({url : 'https://assets.agi.com/stk-terrain/world', requestVertexNormals: true}),
  terrainProvider : new Cesium.CesiumTerrainProvider({url : terrainSource, requestVertexNormals: true}),
  baseLayerPicker : false,
  homeButton: false,
  timeline: false,
  geocoder:false,  
  infoBox: true,
  sceneModePicker: false,
  selectionIndicator: false,
  navigationHelpButton: false,
  shadows : true,
  vrButton:true,
  creditContainer: "credits",
  animation: false,
  // clockViewModel:clockViewModel
//    terrainShadows : Cesium.ShadowMode.ENABLED,    
//    automaticallyTrackDataSourceClocks: false,
//    mapProjection : new Cesium.WebMercatorProjection()
});

var shadows = viewer.shadowMap;
shadows.darkness=0.86;

var scene = viewer.scene;

scene.globe.enableLighting = true;
scene.allowTextureFilterAnisotropic = true;
viewer.clock.currentTime = time;

// viewer.clock.multiplier = 2000;
scene.globe.maximumScreenSpaceError = 2;

//viewer.clockViewModel= new Cesium.ClockViewModel(viewer.clock);

var canvas = viewer.canvas;
canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
canvas.onclick = function() {
    canvas.focus();
};
var ellipsoid = viewer.scene.globe.ellipsoid;

/*
scene.screenSpaceCameraController.enableTilt = true;
scene.screenSpaceCameraController.enableZoom = true;
scene.screenSpaceCameraController.enableRotate = true;

scene.screenSpaceCameraController.enableTranslate = false;
scene.screenSpaceCameraController.enableLook = false;
*/

var placemat= new Cesium.GridMaterialProperty({
  color : Cesium.Color.BLACK,
  cellAlpha : 0.03,
  lineCount : new Cesium.Cartesian2(16,16),
  lineThickness : new Cesium.Cartesian2(0.4, 0.4)
});


//36°50′26″S 174°44′24″E 'dragon.json'

var tiles=[];
var tilesrc=[];
for(var index in tilesrc){
  var name=tilesrc[index];
  var tile = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({  
    name : name,
    url : '../static/assets/'+name
  }));
  tiles[tile.name]=tile
  Cesium.when(tile.readyPromise).then(function(tile) {
    console.log("tile ready "+tile.url+" "+JSON.stringify(tile.boundingSphere));
//    viewer.camera.viewBoundingSphere(tile.boundingSphere);
  });
}

var models=['CesiumAir.glb','seagull.glb','Duck.glb','CesiumMan.glb',"CesiumMilkTruck.glb"];

for(var index in models){
  var matrix = Cesium.Transforms.eastNorthUpToFixedFrame(home);  
  var model = scene.primitives.add(Cesium.Model.fromGltf({
      url : '../static/assets/'+models[index],
      modelMatrix : matrix,
      scale : 1000.0
  }));

  Cesium.when(model.readyPromise).then(function(model) {
    console.log("model ready "+JSON.stringify(model.gltf.asset));
    model.activeAnimations.addAll({
        loop : Cesium.ModelAnimationLoop.REPEAT
    });
    
  });
}

var cursor = viewer.entities.add({
  position: home,
  ellipse : {
    semiMinorAxis : 150.0,
    semiMajorAxis : 150.0,
    material : placemat
  }
});

viewer.zoomTo(cursor,range);

viewer.extend(Cesium.viewerDragDropMixin);
viewer.dropError.addEventListener(function(dropHandler, name, error) {
console.log(error);
window.alert(error);
});    

/*
var startMousePosition;
var mousePosition;
var flags = {
    looking : false,
    moveForward : false,
    moveBackward : false,
    moveUp : false,
    moveDown : false,
    moveLeft : false,
    moveRight : false
};
*/