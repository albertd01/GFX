class Vertex {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Face {
    constructor(){
        this.vertices = [];
        //this.normal = null;
    }
    addVertex(vertex){
        this.vertices.push(vertex);
    }
    setNormal(normal){
        this.normal = normal;
    }
}

function parse(text) {
    const objPositions = [new Vertex(0,0,0)];
    const objNormals = [[0,0,0]];
    const objFaces = [];

    const lines = text.split('\n');

    for (const line of lines) {
        const elements = line.trim().split(/\s+/);
        const type = elements[0];

        switch (type) {
            case 'v':
                objPositions.push(new Vertex(
                    parseFloat(elements[1]),
                    parseFloat(elements[2]),
                    parseFloat(elements[3])
                ));
                break;
            case 'vn':
                objNormals.push(elements.slice(1).map(parseFloat));
                break;
            case 'vt':
                // handle textures here
                break;
            case 'f':
                const currentFace = new Face();
                elements.slice(1).map(indexStr => {
                    const indices = indexStr.split('/').map(part => parseInt(part));
                    const vertexIndex = indices[0];
                    const normalIndex = indices[2]; // Assuming vertex/texture/normal format
                    currentFace.addVertex(objPositions[vertexIndex]);
                    currentFace.setNormal(objNormals[normalIndex])
                });
                objFaces.push(currentFace);
                break;
            default:
                break;
        }
    }

    return objFaces;
}

