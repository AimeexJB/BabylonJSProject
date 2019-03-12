var canvas, engine;
var scene, camera, createScene, box;

var  mouse, INTERSECTED, raycaster, selectedObject;

var objects = [];

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
        for( var i = 0; i < 20; i++) {
            box = BABYLON.Mesh.CreateBox('box1', 1, scene);
            box.position.x = (Math.random()* 40) - 20;
            box.position.y = (Math.random()* 40) - 20;
            box.position.z = (Math.random()* 40) - 20;

            objects.push( box );
        }

        // box.isPickable = true;

        var mat = new BABYLON.StandardMaterial("mat", scene);
        box.material = mat;

        //--------------------------Making box selectable--------------------------//

        var actionManager = new BABYLON.ActionManager(scene);
        box.actionManager = actionManager;
        
        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
                () => mat.diffuseColor = BABYLON.Color3.Random()
            )
        );

        //--------------------------adding in DIVs--------------------------//

        var div = document.createElement("div");
        div.style.backgroundColor = "yellow";
        div.style.position = "absolute";
        div.style.width = "200px";
        div.style.height = "200px";
        div.style.top = "50%";
        div.style.left = "50%";
        div.style.transform = "translate(-50%, -50%)";
        div.style.display = "none";
        document.body.appendChild(div);

        div.addEventListener("click", () => div.style.display = "none");

        var actionSphere = new BABYLON.ActionManager(scene);
        box.actionManager = actionSphere;

        actionSphere.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
                () => div.style.display = "block"
            )
        );

        //--------------------------Loading the Background Image--------------------------//
        var mat2 = new BABYLON.StandardMaterial("containBox", scene);
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
