const { mat4, mat3, vec3,vec4 } = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const shapes = [];
let gl = null;

let currentChoice = 0;
let cameraMovementEnabled = true;
let wcs = null;

let lightMovementEnabled = false;
const lightPosition = vec4.fromValues(0,10,0,1);

const shaders = {
    noLight: "v-shader-nolight",
    gouraudDiffuse: "v-gouraudDiffuse",
    gouraudSpecular: "v-gouraudSpecular",
    phongVertex: "v-phong",
    phongFragmentSpecular: "f-phong-specular",
    phongFragmentDiffuse: "f-phong-diffuse",
    gouraudFragment: "f-shader"
}

let currentShaderProgram = null;

const shaderInfo = {
    attributes: {
        vertexLocation: "vertexPosition",
        colorLocation: "vertexColor",
        normalLocation: "vertexNormal"
    }, uniforms: {
        modelViewMatrix: "modelViewMatrix",
        projectionMatrix: "projectionMatrix",
        viewMatrix: "viewMatrix",
        normalMatrix: "normalMatrix",
        lightPosition: "lightViewPosition",
    }
}

const shaderPrograms = {
    noLightProgram: null,
    gouraudDiffuse: null,
    gouraudSpecular: null,
    phongDiffuse: null,
    phongSpecular: null
}

const matrices = {
    viewMatrix: mat4.create(),
    projectionMatrix: mat4.create(),
}