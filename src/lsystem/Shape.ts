import Mesh from '../geometry/Mesh';
import { vec3, vec4 } from 'gl-matrix';

class Shape {
    symbol: string;
    geometry: Mesh;
    position: vec3;
    rotation: vec3;
    scale: vec3;
    terminal: boolean;
    uniformScale: boolean;
    color: vec4;

    constructor(symbol: string, geometry: Mesh, position: vec3, rotation: vec3, scale: vec3, terminal: boolean, uniformScale: boolean, color: vec4) {
        this.symbol = symbol;
        this.geometry = geometry;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
        this.terminal = terminal;
        this.uniformScale = uniformScale;
        this.color = color;
    }

    public static copy(s: Shape): Shape {
        var position = vec3.fromValues(s.position[0], s.position[1], s.position[2]);
        var rotation = vec3.fromValues(s.rotation[0], s.rotation[1], s.rotation[2]);
        var scale = vec3.fromValues(s.scale[0], s.scale[1], s.scale[2]);
        var color = vec4.fromValues(s.color[0], s.color[1], s.color[2], s.color[3]);
        return new Shape(s.symbol, s.geometry, position, rotation, scale, s.terminal, s.uniformScale, color);
    }
}

export default Shape;