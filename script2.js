window.addEventListener('DOMContentLoaded', function(){

    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function(){

        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);

        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);

        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

        for( var i = 0; i < 50; i++) {
            var box = BABYLON.Mesh.CreateBox('box1', 1, scene);
            box.position.x = Math.random()* 10 - 4
            box.position.y = Math.random()* 10 - 4
            box.position.z = Math.random()* 10 - 4
        }

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
