class CoordinateSystem extends Shape{
    draw(){
        /* --------- set up attribute arrays --------- */
        Shape.setupAttribute(this.buffers.vertexBuffer, locations.attributes.vertexLocation);
        Shape.setupAttribute(this.buffers.colorBuffer, locations.attributes.colorLocation);

        /* --------- combine view and model matrix into modelView matrix --------- */
        const modelViewMatrix = mat4.create();
        mat4.mul(modelViewMatrix, viewMatrix, this.modelMatrix);

        /* --------- send modelView matrix to GPU --------- */
        gl.uniformMatrix4fv(locations.uniforms.modelViewMatrix, gl.FALSE, modelViewMatrix);

        /* --------- draw the shape --------- */
        gl.drawArrays(gl.LINES, 0, this.vertices.length / 4);
    }
}