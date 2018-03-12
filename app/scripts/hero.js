// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 300 );
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#FFFFFF");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
$( "div.cb-three-canvas" ).append( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: "#BEFDE6" } );
// var cube = new THREE.Mesh( geometry, material );

let spawnCubes = ()=> {
    for (let i = -20; i < 20; i ++ ) {
        
        for (let j = -20; j < 20 ; j ++ ) {
            let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            //let material = new THREE.MeshBasicMaterial({color : "#BEFDE6"});
            let material =  new THREE.MeshDepthMaterial( {
                color: "#EFFBF7",
            } );
            let cube = new THREE.Mesh(geometry, material);
            cube.position.set(i/2, j/2, 0);
            scene.add( cube );
            cubes.push(cube);
        }
    }
}

// Add cube to Scene

let cubes = [];

spawnCubes();

// var width = 2;
// var height = 4;
// var rectLight = new THREE.RectAreaLight( 0xffffff, undefined,  width, height );
// rectLight.intensity = 70.0;
// rectLight.position.set( 5, 5, 0 );
// scene.add( rectLight )

// Render Loop
let increment = 0.01;
var render = function () {
    requestAnimationFrame( render );
    
    cubes.forEach( cube => {
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.05;
    });
    
    
    if (camera.position.z >= 5){
        increment = -0.005;
    }
    if (camera.position.z <= 3){
        increment = 0.005;
    }
    
    camera.position.z += increment;
    camera.position.x += increment;
    
    // Render the scene
    renderer.render(scene, camera);
};

render();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    
}