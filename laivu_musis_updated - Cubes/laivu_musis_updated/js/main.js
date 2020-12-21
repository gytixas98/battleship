
import { THREE, OrbitControls } from "./packages.js";
import { renderScene } from "./grid-helper.js";
import { createFleet } from "./ships-helpers.js";
import { GUI} from "./three/dat.gui.module.js";
import Stats from "./three/stats.module.js";

// reiks ateiciai
//import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

var mesh, renderer, scene, camera, controls, boxGrid;

let group;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();



console.log(createFleet());




function init() {
    

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );
    
    // camera
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 20, 20, 20 );

    // controls
    controls = new OrbitControls( camera, renderer.domElement );
    
    // ambient
    scene.add( new THREE.AmbientLight( 0x222222 ) );
    
    // light
    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 20,20, 0 );
    scene.add( light );
    
    // axes
    scene.add( new THREE.AxesHelper( 20 ) );

    //raycaster

    // geometry
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );


    
    
    // material
   var material = new THREE.MeshPhongMaterial( {
       color: 0x00ff00, 
       flatShading: true,
       transparent: true,
       opacity: 0.7,
   } );


    //grid box
    var boxGrid = new THREE.BoxGeometry( 1, 1, 1);

    // gridBoxMaterial
   //gridbox material
    var gridBoxMaterial = new THREE.MeshPhongMaterial( {
        color: 0x00ffff,
        flatShading: true,
        transparent: false,
        opacity: 1,
    });



 



    // set grid rows and columns and the size of each square
    var rows = 10;
    var cols = 10;

  
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
        	var boxGrid  = new THREE.Mesh(geometry, gridBoxMaterial);
            scene.add(boxGrid);
            boxGrid.position.set(i,0.1,j);
        }
    }
    

   const fleet = createFleet();

   fleet.forEach(ship => {
    const meshShip = new THREE.Mesh(geometry, material);
    scene.add(meshShip);
    meshShip.position.set(ship.coord.x,0,ship.coord.z);
   });

}

// --------------------------------------
function onMouseMove( event ) {
	// calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

//resize when you change window size
export function onWindowResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


// Registrate events and etc.
function eventRegistry() {
    requestAnimationFrame( animate );

    window.addEventListener( 'resize',onWindowResize, false );
    window.addEventListener( "mousemove", onMouseMove, false);
}
// --------------------------------------



function animate() {
    eventRegistry();
    
    //controls.update();


    //update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	//calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {
		intersects[ i ].object.material.color.set( 0xff0000 );

	}


    renderer.render( scene, camera );

}


init();
animate();

// sheepCoord.x === box1.threeJsObject.cord.x

// {
//     box1: {
//         threeJsObject: {
//             ...mesh,
//             coord: {

//             }
//         },
//         status: {
//             isHitted: true,
//             haveShipPart: true
//         }
//     }
// }
