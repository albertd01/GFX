class Vertex {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Face {
    constructor(indices) {
        this.indices = indices;
    }
}

function parse(text) {
    const objPositions = [new Vertex(0, 0, 0)];
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
                // handle normals here
                break;
            case 'vt':
                // handle textures here
                break;
            case 'f':
                const faceIndices = elements.slice(1).map(indexStr => {
                    return parseInt(indexStr.split('/')[0]);
                });
                objFaces.push(new Face(faceIndices));
                break;
            default:
                break;
        }
    }

    return {
        positions: objPositions,
        faces: objFaces,
    };
}
