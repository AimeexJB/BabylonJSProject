var canvas, engine;
var scene, camera, createScene, box;

var objects = [];

var songs = [{"title": "Smells Like Teen Spirit - Nirvana", "source": "music/SmellsLikeTeenSpirit.mp3", "description": "10/10 would listen to"},
			{"title": "Imagine - John Lennon", "source": "music/Imagine.mp3", "description": "10/10 would listen to"},
			{"title": "One - U2", "source": "music/One.mp3", "description": "10/10 would listen to"},
			{"title": "Billie Jean - Michael Jackson", "source": "music/BillieJean.mp3", "description": "10/10 would listen to"},
			{"title": "Bohemian Rhapsody - Queen", "source": "music/BohemianRhapsody.mp3", "description": "10/10 would listen to"},
			{"title": "Hey Jude - The Beatles", "source": "music/HeyJude.mp3", "description": "10/10 would listen to"},
			{"title": "I Can't Get No Satisfaction - Rolling Stones", "source": "music/ICantGetNo.mp3", "description": "10/10 would listen to"},
			{"title": "Sweet Child O'Mine - Guns N' Roses", "source": "music/SweetChildMine.mp3", "description": "10/10 would listen to"},
			{"title": "London Calling - The Clash", "source": "music/LondonCalling.mp3", "description": "10/10 would listen to"},
			{"title": "Hotel California - The Eagles", "source": "music/HotelCalifornia.mp3", "description": "10/10 would listen to"},
			{"title": "Your Song - Elton John", "source": "music/YourSong.mp3", "description": "10/10 would listen to"},
			{"title": "Stairway To Heaven - Led Zeppelin", "source": "music/StairwayToHeaven.mp3", "description": "Song from Your Name movie 10/10 would listen to"},
			{"title": "I Will Always Love You - Whitney Houston", "source": "music/IWillAlwaysLoveYou.mp3", "description": "Song from Your Name movie 10/10 would listen to"},
			{"title": "Heartbreak Hotel - Elvis Presley", "source": "music/HeartbreakHotel.mp3", "description": "Song from Your Name movie 10/10 would listen to"},
			{"title": "Over The Rainbow - Judy Garland", "source": "music/OverTheRainbow.mp3", "description": "Song from Your Name movie 10/10 would listen to"},
			{"title": "What's Goin' On - Marvin Gaye", "source": "music/WhatsGoinOn.mp3", "description": "Song from Your Name movie 0/10 would listen to"},
			{"title": "Creep - Radiohead", "source": "music/Creep.mp3", "description": "Song from Your Name movie 6/10 would listen to"},
			{"title": "Bridge Over Troubled Water - Simon & Garfunkel", "source": "music/BridgeOverTroubledWater.mp3", "description": "Song from Your Name movie 6/10 would listen to"},
			{"title": "Respect - Aretha Franklin", "source": "music/Respect.mp3", "description": "Song from Your Name movie 6/10 would listen to"},
			{"title": "Dancing Queen - ABBA", "source": "music/DancingQueen.mp3", "description": "Song from Your Name movie 6/10 would listen to"}];


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
            box = BABYLON.Mesh.CreateBox(i, 1, scene);
            box.position.x = (Math.random()* 40) - 20;
            box.position.y = (Math.random()* 40) - 20;
            box.position.z = (Math.random()* 40) - 20;

            objects.push( box );

			//--------------------------Making the cubes clickable--------------------------//
			box.isPickable = true;

	        var mat = new BABYLON.StandardMaterial("mat", scene);
	        box.material = mat;

	        var actionManager = new BABYLON.ActionManager(scene);
	        box.actionManager = actionManager;

			//--------------------------adding in DIVs--------------------------//
			var boxinfo = document.createElement( 'div' );
			// var songTitle = document.createElement( 'h3' );
			// var songInfo = document.createElement( 'p' );
			// 	boxinfo.appendChild( songTitle );
			// 	boxinfo.appendChild( songInfo );
				boxinfo.setAttribute("class", "modal");
				boxinfo.style.color = 'black'
	            boxinfo.style.display = "none";

			document.body.appendChild( boxinfo );

	        boxinfo.addEventListener("click", () => boxinfo.style.display = "none");

			objects[0].name = "Hello"

	        boxinfo.innerHTML = objects.id;

	        actionManager.registerAction(
	            new BABYLON.ExecuteCodeAction(
					BABYLON.ActionManager.OnPickTrigger,
	                () => boxinfo.style.display = "block",
	            )
	        );

        }

        //--------------------------changing box colour--------------------------//
        // actionManager.registerAction(
        //     new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
        //         () => mat.diffuseColor = BABYLON.Color3.Random()
        //     )
        // );


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
