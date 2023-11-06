class CoordinateSystem extends Shape{
    draw(){
        Shape.setupAttribute(this.buffers.vertexBuffer, currentShaderProgram.attributes.vertexLocation);
        Shape.setupAttribute(this.buffers.colorBuffer, currentShaderProgram.attributes.colorLocation);

        const modelViewMatrix = mat4.create();
        mat4.mul(modelViewMatrix, matrices.viewMatrix, this.transformationMatrix);

        gl.uniformMatrix4fv(currentShaderProgram.uniforms.modelViewMatrix, gl.FALSE, modelViewMatrix);

        gl.drawArrays(gl.LINES, 0, this.vertices.length / 4);
    }

    setModelMatrix(modelMatrix){
        this.modelMatrix = modelMatrix;
    }
}