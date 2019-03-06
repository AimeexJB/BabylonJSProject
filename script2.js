var canvas, engine;
var scene, camera, createScene;

window.addEventListener('DOMContentLoaded', function(){

    canvas = document.getElementById('renderCanvas');
    engine = new BABYLON.Engine(canvas, true);

    function createScene(){

        //--------------------------Creating Scene--------------------------//
        scene = new BABYLON.Scene(engine);
        camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);

        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        //--------------------------Adding text to screen--------------------------//
        container = document.createElement( 'div' );
    	document.body.appendChild( container );

    	var info = document.createElement( 'div' );
        	info.style.position = 'absolute';
        	info.style.top = '20px';
        	info.style.color = 'white'
        	info.style.width = '100%';
        	info.style.textAlign = 'center';
        	info.innerHTML = 'Interactive Museum';
    	container.appendChild( info );

        //--------------------------Adding The lighting effects--------------------------//
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

        //--------------------------Adding the Cubes to the Scene--------------------------//
        for( var i = 0; i < 300; i++) {
            var box = BABYLON.Mesh.CreateBox('box1', 1, scene);
            box.position.x = (Math.random()* 40) - 20;
            box.position.y = (Math.random()* 40) - 20;
            box.position.z = (Math.random()* 40) - 20;
        }
        var mat = new BABYLON.StandardMaterial("mat", scene);
	      mat.diffuseColor = BABYLON.Color3.Blue();

        box.isPickable = true;
        scene.constantlyUpdateMeshUnderPointer = true;
        scene.onPointerMove = function (evt, pickingInfo) {
      		scene.meshes.forEach(function (m) {
      			m.material = null;
      		});
      		if (pickingInfo.pickedMesh) {
      			pickingInfo.pickedMesh.material = mat;
      		}
      	}

        //--------------------------Loading the Background Image--------------------------//
        var mat2 = new BABYLON.StandardMaterial("contain", scene);
            mat2.diffuseTexture = new BABYLON.Texture("public/grid.png", scene);
            mat2.backFaceCulling = false;
        var containBox = BABYLON.Mesh.CreateBox("box2", 200.0, scene);
            containBox.material = mat2;

        return scene;
    }

    scene = createScene();

    engine.runRenderLoop(function(){
        scene.render();
    });

    window.addEventListener('resize', function(){
        engine.resize();
    });

});
