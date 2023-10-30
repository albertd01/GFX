class Shape {
    constructor() {
        this.vertices = [];
        this.colors = [];

        this.buffers = {
            /* --------- initialize buffers --------- */
            vertexBuffer: gl.createBuffer(),
            colorBuffer: gl.createBuffer(),
        }

        /* --------- initialize model matrix --------- */
        this.modelMatrix = mat4.create();
    }

    initData(vertices, colors) {
        /* --------- flatten & convert data to 32 bit float arrays --------- */
        this.vertices = new Float32Array(vertices.flat());
        this.colors = new Float32Array(colors.flat());

        /* --------- send data to buffers --------- */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
    }

    draw() {
        Shape.setupAttribute(this.buffers.vertexBuffer, locations.attributes.vertexLocation);
        Shape.setupAttribute(this.buffers.colorBuffer, locations.attributes.colorLocation);

        const modelViewMatrix = mat4.create();
        mat4.mul(modelViewMatrix, viewMatrix, this.modelMatrix);

        gl.uniformMatrix4fv(locations.uniforms.modelViewMatrix, gl.FALSE, modelViewMatrix);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 4);
    }

    drawLCS(){
        let lcs = createWCS();
        lcs.setModelMatrix(this.modelMatrix);
        lcs.draw();
    }

    scale(vector, global = false){
        if(!global){
            mat4.scale(this.modelMatrix,this.modelMatrix,vector);
        }
        else{
            const scalingMatrix = mat4.create();
            mat4.scale(scalingMatrix, scalingMatrix, vector);
            mat4.mul(this.modelMatrix, scalingMatrix, this.modelMatrix);
        }
    }

    rotate(angle, axis, global = false) {
        if (!global) {
            mat4.rotate(this.modelMatrix, this.modelMatrix, angle, axis);
        } else {
            const rotationMatrix = mat4.create();
            mat4.rotate(rotationMatrix, rotationMatrix, angle, axis);
            mat4.mul(this.modelMatrix, rotationMatrix, this.modelMatrix)

        }
    }

    translate(vector, global = false) {
        if(!global){
            mat4.translate(this.modelMatrix, this.modelMatrix, vector);
        }
        else{
            const translationMatrix = mat4.create();
            mat4.translate(translationMatrix, translationMatrix, vector);
            mat4.mul(this.modelMatrix, translationMatrix, this.modelMatrix);
        }
    }

    static setupAttribute(buffer, location) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.vertexAttribPointer(
            location, // the attribute location
            4, // number of elements for each attribute/vertex
            gl.FLOAT, // type of the attributes
            gl.FALSE, // is data normalised?
            4 * Float32Array.BYTES_PER_ELEMENT, // size for one vertex
            0 // offset from begin of vertex to the attribute
        );

        gl.enableVertexAttribArray(location);
    }
}
