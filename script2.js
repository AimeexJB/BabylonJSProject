window.addEventListener('DOMContentLoaded', function(){

  var canvas = document.getElementById('renderCanvas');
  var engine = new BABYLON.Engine(canvas, true);

  var createScene = function(){

    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    for( var i = 0; i < 300; i++) {
      var box = BABYLON.Mesh.CreateBox('box1', 1, scene);
      box.position.x = (Math.random()* 40) - 20;
      box.position.y = (Math.random()* 40) - 20;
      box.position.z = (Math.random()* 40) - 20;
    }

    // var mat = new BABYLON.StandardMaterial("contain", scene);
    // mat.diffuseTexture = new BABYLON.Texture("public/3.png", scene);
    // mat.backFaceCulling = false;
    // var containBox = BABYLON.Mesh.CreateBox("box2", 200.0, scene);
    // containBox.material = mat;

    var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skybox.infiniteDistance = true;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("public/3", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    skybox.renderingGroupId = 0;
    box.renderingGroupId = 1;

    return scene;
  }

  var scene = createScene();

  engine.runRenderLoop(function(){
    scene.render();
  });

  window.addEventListener('resize', function(){
    engine.resize();
  });

});
