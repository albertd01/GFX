class CoordinateSystem extends Shape{
    draw(){
        Shape.setupAttribute(this.buffers.vertexBuffer, locations.attributes.vertexLocation);
        Shape.setupAttribute(this.buffers.colorBuffer, locations.attributes.colorLocation);

        const modelViewMatrix = mat4.create();
        mat4.mul(modelViewMatrix, viewMatrix, this.modelMatrix);

        gl.uniformMatrix4fv(locations.uniforms.modelViewMatrix, gl.FALSE, modelViewMatrix);

        gl.drawArrays(gl.LINES, 0, this.vertices.length / 4);
    }

    setModelMatrix(modelMatrix){
        this.modelMatrix = modelMatrix;
    }
}