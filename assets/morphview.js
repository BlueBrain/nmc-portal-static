var lineX,lineY,lineZ;
function build_compass() {
    if (lineX!= "undefined") {
        scene.remove(lineX);
        scene.remove(lineY);
        scene.remove(lineZ);
    }
    init_canvas_done=false;
    var matLineX = new THREE.LineBasicMaterial({color:0x000000});
    var gX = new THREE.Geometry();
    gX.vertices.push(new THREE.Vector3(0,0,0));
    gX.vertices.push(new THREE.Vector3(0+50,0,0));
    gX.vertices.push(new THREE.Vector3(0+100,0,0));

    var matLineY = new THREE.LineBasicMaterial({color:0x000000});
    var gY = new THREE.Geometry();
    gY.vertices.push(new THREE.Vector3(0,0,0));
    gY.vertices.push(new THREE.Vector3(0,0+50,0));
    gY.vertices.push(new THREE.Vector3(0,0+100,0));

    var matLineZ = new THREE.LineBasicMaterial({color:0x000000});
    var gZ = new THREE.Geometry();
    gZ.vertices.push(new THREE.Vector3(0,0,0));
    gZ.vertices.push(new THREE.Vector3(0,0,0+50));
    gZ.vertices.push(new THREE.Vector3(0,0,0+100));

    lineX = new THREE.Line(gX,matLineX);
    lineY = new THREE.Line(gY,matLineY);
    lineZ = new THREE.Line(gZ,matLineZ);

    scene.add(lineX);
    scene.add(lineY);
    scene.add(lineZ);

    init_canvas();
}

function createLabelMesh(label,color){
    init_canvas_done= true;
    var canvas_text = document.createElement('canvas');
    canvas_text.width=20;
//canvas_text.style.width=20;
canvas_text.height=20;
//canvas_text.style.height=20;
var context = canvas_text.getContext('2d');
context.font="Bold 10px Verdana";
context.fillStyle=color;
context.textAlign = "center";
context.textBaseline = "middle";
context.fillText(label, canvas_text.width/2 , canvas_text.height/2);

var texture_text = new THREE.Texture(canvas_text);
texture_text.needsUpdate = true;

var material_text = new THREE.MeshBasicMaterial( {map: texture_text});
material_text.transparent = true;

var mesh = new THREE.Mesh(new THREE.PlaneGeometry(canvas_text.width,canvas_text.height), material_text);
mesh.doubleSided = true;

//var sprite =  new THREE.Sprite({map:texture, useScreenCoordinates:true, color: 0x00ffaa, alignment: THREE.SpriteAlignment.topleft});
return mesh;
}
var mX,mY,mZ;
var mLabel;
function init_canvas(){
    if (! init_canvas_done ){
        mX=createLabelMesh("X","#000000");
        mY=createLabelMesh("Y","rgba(0,0,0,0.95)");
        mZ=createLabelMesh("Z","rgba(0,0,0,0.95)");

        mX.position.set(0+115,0,0);
        mY.position.set(0,0+115,0);
        mZ.position.set(0,0,0+115);

        scene.add(mX);
        scene.add(mY);
        scene.add(mZ);

        init_canvas_done = true;
    }
}
function onfsChange(event){
console.log("onfsChange");
console.log(event);
var width;
var height;
console.log(getFullScreenElement(document));
// avoid the === because of NSETM-176 issue with firefox returning undefined
if (getFullScreenElement(document) == null){
   height = default_height;
   width = default_width;
} else {
    width = window.innerWidth;
    height= window.innerHeight;
}
    renderer.setSize( width, height);
    camera.aspect   = width/ height;
    A_R = camera.aspect;

    camera.updateProjectionMatrix();
    controls.handleResize();
    var button = $(".fsButton");
    button.toggleClass("wmButton");

    if(button.hasClass("wmButton")) {
        button.attr("alt","Exit fullscreen");
    } else {
        button.attr("alt","Switch to fullscreen");
    }
}
function onResize(event){
    console.log("onResize");
    var r_height = $("#img_morph")[0].offsetHeight;
    var r_width = $("#img_morph")[0].offsetWidth;
    renderer.setSize( r_width, r_height );
    camera.aspect   = r_width / r_height;
    A_R = camera.aspect;

    camera.updateProjectionMatrix();
    controls.handleResize();

}
document.addEventListener('mozfullscreenchange',onfsChange,false);
document.addEventListener('webkitfullscreenchange',onfsChange,false);
document.addEventListener('fullscreenchange',onfsChange,false);
//window.addEventListener('resize',onResize,false);
var stats;
var camera, controls, scene, projector, renderer;
var objects = [], plane;
var button;
var FOV = 70;
var A_R ;
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
INTERSECTED, SELECTED;
var material1 = new THREE.MeshLambertMaterial({color:0x000000});
var material2 = new THREE.MeshLambertMaterial({color:0x0000ff});
var material3 = new THREE.MeshLambertMaterial({color:0xff0000});
var material4 = new THREE.MeshLambertMaterial({color:0xff00ff});
var material = [material4,material1,material2,material3,material4];
function mapMaterial(iM){
    return material[iM];
}
var posOnX = 0;
var posOnY = 0;
var posOnZ = 0;
var FOV = 70;
var tanFOV = Math.tan(FOV*Math.PI/(2*180));
var tanA_R = tanFOV*A_R;
function updateBB(bb){
    computeInitialCameraPosition(3);
}
function updateBoundingBox( v ){
    yCx = Math.abs(v.y)/tanA_R;
    zCx = Math.abs(v.z)/tanFOV;
    posOnX = Math.max(posOnX, v.x + Math.max(zCx,yCx));

    xCy = Math.abs(v.x)/tanFOV;
    zCy = Math.abs(v.z)/tanA_R;
    posOnY = Math.max(posOnY, v.y + Math.max(zCy,xCy));

    yCz = Math.abs(v.y)/tanFOV;
    xCz = Math.abs(v.x)/tanA_R;
    posOnZ = Math.max(posOnZ, v.z + Math.max(xCz,yCz));
//build_compass();
//computeInitialCameraPosition(3);
}
function lerp(a,b,t){
    return a+ t*(b-a);
}
var animated = true;
var initialPosition;
var initialUp;
var TargetUp;
var TargetPosition;
var directionalLight;
function computeInitialCameraPosition(plan){
    initialPosition = camera.position;
    initialUp = camera.up;
    if (plan===3){
        targetPosition =  new THREE.Vector3(0 ,0 ,posOnZ);
        targetUp = new THREE.Vector3(0,1,0);
    }
    if (plan===2){
        targetPosition =  new THREE.Vector3(0 ,posOnY,0);
        targetUp = new THREE.Vector3(1,0,0);
    }
    if (plan===1){
        targetPosition =  new THREE.Vector3(posOnX,0,0);
        targetUp = new THREE.Vector3(0,0,1);
    }

    if (animated){

        var tweenP = new TWEEN.Tween({t:0}).to({t:1},800).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(onTweenUpdateP ).start();
    } else {

        camera.position = targetPosition;
        camera.up = targetUp;
        directionalLight.position = camera.position;
        updateLabelDirection();
        controls.update();
        animated = true;
    }
}
function onTweenUpdateP(){
    var cx = lerp(initialPosition.x ,targetPosition.x ,this.t);
    var cy = lerp(initialPosition.y ,targetPosition.y ,this.t);
    var cz = lerp(initialPosition.z ,targetPosition.z ,this.t);

    camera.position = new THREE.Vector3(cx,cy,cz);

    var ux = lerp(initialUp.x,targetUp.x,this.t);
    var uy = lerp(initialUp.y,targetUp.y,this.t);
    var uz = lerp(initialUp.z,targetUp.z,this.t);
    camera.up = new THREE.Vector3(ux,uy,uz);

    directionalLight.position = camera.position;
    updateLabelDirection();
}
function onTweenComplete(){
    camera.position = targetPosition;
    camera.up = targetUp;
    directionalLight.position = camera.position;
    updateLabelDirection();
    controls.update();
}
var default_height;
var default_width;

var map_2d = {}
var map_image = {};
var map_container = {};
function toggle_loadGeometry(g, tab){

if ( map_2d[tab] === undefined){
    map_2d[tab] = true;
}


if ( ! map_2d[tab]){

        $("."+tab).find(".view3d")[0].innerText = "view in 3D";
        map_2d[tab] = true;

        $(map_container[tab]).detach();
        var img = map_image[tab];

        $("."+tab).find("#morph")[0].appendChild( img[0] )
        return;
    }

$("."+tab).find(".view3d")[0].innerText = "view in 2D";
map_2d[tab] = false;
$("."+tab).find(".container")[0]
var container = $("."+tab).find(".morphcontainer")[0];

if (container === undefined) {
        camera = new THREE.PerspectiveCamera( FOV, A_R, 1, 10000 );
        camera.position.z=1000;
        scene = new THREE.Scene();
        scene.add( new THREE.AmbientLight( 0x505050 ) );
//var light = new THREE.SpotLight( 0xffffff, 1.5 );
//light.position=camera.position;
directionalLight = new THREE.DirectionalLight(0xffffff,0.85);
directionalLight.position = camera.position;
scene.add( directionalLight );
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.sortObjects = false;
//http://stackoverflow.com/questions/16177056/changing-three-js-background-to-transparent-or-other-color
renderer.setClearColor(0xffffff, 1);
default_height = $("."+tab).find("#img_morph").height();
default_width = $("."+tab).find("#img_morph").width();
map_image[tab] = $("."+tab).find("#img_morph")

A_R = default_width/default_height;
tanA_R = tanFOV*A_R;

map_image[tab] = $("."+tab).find("#img_morph");
$("."+tab).find("#img_morph").detach();
renderer.setSize( default_width, default_height );
controls = new THREE.TrackballControls( camera,renderer.domElement );
controls.rotateSpeed = 2.0;
//controls.zoomSpeed = 0.1;
controls.zoomSpeed = 0.5;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
THREE.EventDispatcher.call(controls);
controls.addEventListener('change',render);
controls.dispatchEvent({type:'change'});
container = document.createElement('div');
$("."+tab).find("#morph")[0].appendChild( container );
map_container[tab] = container;
$(container).addClass("morphcontainer");
console.log("container");
console.log($("."+tab).find(".morphcontainer")[0]);
console.log($("."+tab).find("#morph")[0]);
// Create UI
$(function(){
    var bdiv = $("<div class='morphtoolbar' style='height:0px; display:block;'></div>");

    var buttonXY = $("<a href='#' alt='Align with XY axis' class='myButton xyButton'><span>XY</span></a>").click(function (){
        computeInitialCameraPosition(3);
        return false;
    });
    bdiv.append(buttonXY);

    var buttonXZ = $("<a href='#' alt='Align with XZ axis' class='myButton xzButton'><span>XZ</span></a>").click(function (){
        computeInitialCameraPosition(2);
        return false;
    });
    bdiv.append(buttonXZ);

    var buttonYZ = $("<a href='#' alt='Align with YZ axis' class='myButton yzButton'><span>YZ</span></a>").click(function (){
        computeInitialCameraPosition(1);
        return false;
    });
    bdiv.append(buttonYZ);

    var buttonFS = $("<a href='#' alt='Switch to fullscreen' class='myButton fsButton'><span>switch to fullscreen</span></a>").click(function (){
        toggleFullScreen($("."+tab).find("#morph")[0], document);
        return false;
    });
    bdiv.append(buttonFS);

    $("canvas").mousedown(function(){
        $(this).addClass("moveing");
    }).mouseup(function(){
        $(this).removeClass("moveing");
    })
    container.appendChild(bdiv[0]);
});

container.appendChild( renderer.domElement );
build_compass();

var obj = new BB.MorphologyMapper2(g);
obj.init(updateBB, updateBoundingBox);

//build_compass();

//InitialCameraPosition(3);
animate();
}
else {
    console.log("morph container not recreated");
   // $("."+tab).find("#img_morph").detach();
    //$("."+tab).find(".container")[0].attach();
    console.log(map_image);
        $(map_image[tab]).detach();
        var c = map_container[tab];

        $("."+tab).find("#morph")[0].appendChild( c );
}
}
//loadGeometry('morph')
function animate() {
    requestAnimationFrame( animate );
    TWEEN.update();
    controls.update();
    render();
}
function onMouseMove(event){
    updateLabelDirection();
    directionalLight.position = camera.position;
}
function updateLabelDirection(){
    if (mX !== undefined && mY !==undefined && mZ!==undefined){
//var position = controls.eye;
var position = controls.object.position;
mX.lookAt(position);
mX.up = camera.up;
mY.lookAt(position);
mY.up = camera.up;
mZ.lookAt(position);
mZ.up = camera.up;
}
}
function render() {
    renderer.render( scene, camera );
//controls.update();
}

function launchFullScreen(element){
//from http://davidwalsh.name/fullscreen
console.log(window.frameElement);
if(element.requestFullScreen) {
    element.requestFullScreen();
} else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
} else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
}
};
function cancelFullScreen(document){
    if(document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
};
function getFullScreenElement(document){
    var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    return fullscreenElement;
};
function isFullScreenEnabled(document){
    var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
    return fullscreenEnabled;
};
function toggleFullScreen(element,document){
    if (this.getFullScreenElement(document) != null){ this.cancelFullScreen(document);}
        else{
            this.launchFullScreen(element);
        }
    };
    document.addEventListener('mousemove',onMouseMove,false);
    window.addEventListener('mousewheel',onMouseMove,false);