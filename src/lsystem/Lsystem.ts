import LSystemMesh from '../geometry/LSystemMesh';
import Cube from '../geometry/Cube';
import Square from '../geometry/Square';
import Mesh from '../geometry/Mesh';
import Shape from './Shape';
import Rule from './Rule';
import { vec3, vec4 } from 'gl-matrix';
import { mat4, quat } from 'gl-matrix';

class LSystem {
    static rulebook: Map<string, Rule[]>;
    static shapeSet: Shape[];
    static lsystemMesh: LSystemMesh;
    static cube: Mesh;
    static square: Square;
    static plane: Mesh;
    static gear: Mesh;
    static gear2: Mesh;
    static windows: Mesh;
    static roof1: Mesh;
    static roof2: Mesh;
    static roof3: Mesh;
    static tower: Mesh;
    static cylinder: Mesh;
    static ground: Mesh;

    public static generate(iterations: number): LSystemMesh {
        this.rulebook = new Map<string, Rule[]>();
        this.shapeSet = [];
        this.lsystemMesh = new LSystemMesh(vec3.fromValues(0, 0, 0));
        this.lsystemMesh.create();
        this.cube = loadOBJ("src/geometry/cube.obj");
        this.cube.create();
        this.square = new Square(vec3.fromValues(0, 0, 0));
        this.square.create();
        this.plane = loadOBJ("src/geometry/plane.obj");
        this.plane.create();
        this.gear = loadOBJ("src/geometry/gear.obj");
        this.gear.create();
        this.gear2 = loadOBJ("src/geometry/gear2.obj");
        this.gear2.create();
        this.windows = loadOBJ("src/geometry/windows.obj");
        this.windows.create();
        this.roof1 = loadOBJ("src/geometry/roof1.obj");
        this.roof1.create();
        this.roof2 = loadOBJ("src/geometry/roof2.obj");
        this.roof2.create();
        this.roof3 = loadOBJ("src/geometry/roof3.obj");
        this.roof3.create();
        this.tower = loadOBJ("src/geometry/tower.obj");
        this.tower.create();
        this.cylinder = loadOBJ("src/geometry/cylinder.obj");
        this.cylinder.create();
        this.ground = loadOBJ("src/geometry/ground.obj");
        this.ground.create();

        this.rulebook.set("P", [
            new Rule([
                new Shape("0", this.plane, vec3.fromValues(0.25 + 0.025, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5 - 0.05, 0.5, 1), false, false, vec4.fromValues(0.3, 0.3, 0.3, 1)),
                new Shape("0", this.plane, vec3.fromValues(-0.25 - 0.025, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5 - 0.05, 0.5, 1), false, false, vec4.fromValues(0.3, 0.3, 0.3, 1))
            ], 1, 0)
        ]);
        this.rulebook.set("p", [
            new Rule([
                new Shape("1", this.plane, vec3.fromValues(0, 0, 0.25 + 0.025), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 0.5, 0.5 - 0.05), false, false, vec4.fromValues(0.3, 0.3, 0.3, 1)),
                new Shape("1", this.plane, vec3.fromValues(0, 0, -0.25 - 0.025), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 0.5, 0.5 - 0.05), false, false, vec4.fromValues(0.3, 0.3, 0.3, 1))
            ], 1, 0)
        ]);

        for (var i = 2; i < 7; i += 2) {
            var first1: string = "" + (i-2);
            var first2: string = "" + (i-1);
            var next1: string = "" + i;
            var next2: string = "" + (i+1);
            if (i == 0) {
                first1 = "P";
                first2 = "p";
            }
            if (i == 6) {
                next1 = "6";
                next2 = "6";
            }
            this.rulebook.set(first1, [
                new Rule([
                    new Shape(next2, this.plane, vec3.fromValues(0.25 + 0.025, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5 - 0.05, 0.5, 1), false, false, vec4.fromValues(0.3, 0.3, 0.3, 1)),
                    new Shape(next2, this.plane, vec3.fromValues(-0.25 - 0.025, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5 - 0.05, 0.5, 1), false, false, vec4.fromValues(0.3, 0.3, 0.3, 1))
                ], 0.5, 4),
                new Rule([
                    new Shape(next2, this.plane, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(0.3, 0.3, 0.3, 1)),
                ], 2, 0),
            ]);
            this.rulebook.set(first2, [
                new Rule([
                    new Shape(next1, this.plane, vec3.fromValues(0, 0, 0.25 + 0.025), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 0.5, 0.5 - 0.05), false, false, vec4.fromValues(0.3, 0.3, 0.3, 1)),
                    new Shape(next1, this.plane, vec3.fromValues(0, 0, -0.25 - 0.025), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 0.5, 0.5 - 0.05), false, false, vec4.fromValues(0.3, 0.3, 0.3, 1))
                ], 0.5, 4),
                new Rule([
                    new Shape(next1, this.plane, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(0.3, 0.3, 0.3, 1)),
                ], 2, 0),
            ]);
        }

        this.rulebook.set("6", [
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("f", this.cube, vec3.fromValues(0, -1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.3, 0.3, 0.3, 1)),
            ], 2, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("f", this.cube, vec3.fromValues(0, -1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.3, 0.3, 0.3, 1)),
            ], 0, 8),
            new Rule([
                new Shape("S", this.plane, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.5, 0.5, 0.5, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("G", this.gear, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(0.3, 0.3, 0.3, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("G", this.gear2, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(0.3, 0.3, 0.3, 1)),
            ], 0.25, 0)
        ]);

        this.rulebook.set("B", [
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("b", this.cube, vec3.fromValues(0, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
            ], 1, 0),
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("b", this.cube, vec3.fromValues(-0.25, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("b", this.cube, vec3.fromValues(0.25, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("b", this.cube, vec3.fromValues(0, 1, -0.25), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 0.5), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("b", this.cube, vec3.fromValues(0, 1, 0.25), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 0.5), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
            ], 0.25, 0),

            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("w", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.1, 0.1, 0.1, 1)),
                new Shape("r", this.roof1, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.7, 0.3, 0.3, 1)),
            ], 0.5, 0),
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("w", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.1, 0.1, 0.1, 1)),
                new Shape("r", this.roof2, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.7, 0.3, 0.3, 1)),
            ], 0.5, 0),
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("w", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.1, 0.1, 0.1, 1)),
                new Shape("r", this.roof3, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.7, 0.3, 0.3, 1)),
            ], 0.5, 0)
        ]);

        this.rulebook.set("b", [
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("b", this.cube, vec3.fromValues(0, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
            ], 1, 0),
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("b", this.cube, vec3.fromValues(-0.25, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("b", this.cube, vec3.fromValues(0.25, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("b", this.cube, vec3.fromValues(0, 1, -0.25), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 0.5), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("b", this.cube, vec3.fromValues(0, 1, 0.25), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 0.5), false, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
            ], 0.25, 0),

            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("w", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.1, 0.1, 0.1, 1)),
                new Shape("r", this.roof1, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.7, 0.3, 0.3, 1)),
            ], 1, 0),
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("w", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.1, 0.1, 0.1, 1)),
                new Shape("r", this.roof2, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.7, 0.3, 0.3, 1)),
            ], 1, 0),
            new Rule([
                new Shape("B", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(219/255, 208/255, 175/255, 1)),
                new Shape("w", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.1, 0.1, 0.1, 1)),
                new Shape("r", this.roof3, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.7, 0.3, 0.3, 1)),
            ], 1, 0),
            new Rule([
                new Shape("G", this.gear, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(0.3, 0.3, 0.3, 1)),
            ], 2, 0),
            new Rule([
                new Shape("G", this.gear2, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(0.3, 0.3, 0.3, 1)),
            ], 2, 0)
        ]);

        this.rulebook.set("O", [
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("o", this.cube, vec3.fromValues(0, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
            ], 1, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("o", this.cube, vec3.fromValues(-0.25, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("o", this.cube, vec3.fromValues(0.25, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("o", this.cube, vec3.fromValues(0, 1, -0.25), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 0.5), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("o", this.cube, vec3.fromValues(0, 1, 0.25), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 0.5), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
            ], 0.25, 0),

            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("w", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.1, 0.1, 0.1, 1)),
                new Shape("r", this.roof1, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(86/255, 78/255, 52/255, 1)),
            ], 0.5, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("w", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.1, 0.1, 0.1, 1)),
                new Shape("r", this.roof2, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(86/255, 78/255, 52/255, 1)),
            ], 0.5, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("w", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.1, 0.1, 0.1, 1)),
                new Shape("r", this.roof3, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(86/255, 78/255, 52/255, 1)),
            ], 0.5, 0)
        ]);

        this.rulebook.set("o", [
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("o", this.cube, vec3.fromValues(0, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
            ], 1, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("o", this.cube, vec3.fromValues(-0.25, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("o", this.cube, vec3.fromValues(0.25, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("o", this.cube, vec3.fromValues(0, 1, -0.25), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 0.5), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("o", this.cube, vec3.fromValues(0, 1, 0.25), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 0.5), false, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
            ], 0.25, 0),

            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("w", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.1, 0.1, 0.1, 1)),
                new Shape("r", this.roof1, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(86/255, 78/255, 52/255, 1)),
            ], 0.5, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("w", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.1, 0.1, 0.1, 1)),
                new Shape("r", this.roof2, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(86/255, 78/255, 52/255, 1)),
            ], 0.5, 0),
            new Rule([
                new Shape("O", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(45/255, 42/255, 31/255, 1)),
                new Shape("w", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.1, 0.1, 0.1, 1)),
                new Shape("r", this.roof3, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(86/255, 78/255, 52/255, 1)),
            ], 0.5, 0),
            new Rule([
                new Shape("G", this.gear, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(0.3, 0.3, 0.3, 1)),
            ], 2, 0),
            new Rule([
                new Shape("G", this.gear2, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(0.3, 0.3, 0.3, 1)),
            ], 2, 0)
        ]);
        this.rulebook.set("C", [
            new Rule([
                new Shape("C", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("W", this.windows, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(0.2, 0.2, 0.2, 1)),               
            ], 2, 0),
            new Rule([
                new Shape("C", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.tower, vec3.fromValues(-0.5, 0, 0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.tower, vec3.fromValues(-0.5, 0, -0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.tower, vec3.fromValues(0.5, 0, -0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.tower, vec3.fromValues(0.5, 0, 0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
            ], 0.5, 0),
            new Rule([
                new Shape("C", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("C", this.cube, vec3.fromValues(0, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), false, false, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.cylinder, vec3.fromValues(-0.5, 0, 0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.cylinder, vec3.fromValues(-0.5, 0, -0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.cylinder, vec3.fromValues(0.5, 0, -0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.cylinder, vec3.fromValues(0.5, 0, 0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
            ], 1, 0),
            new Rule([
                new Shape("C", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("C", this.cube, vec3.fromValues(-0.25, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5, 1, 1), false, false, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.cylinder, vec3.fromValues(-0.5, 0, 0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.cylinder, vec3.fromValues(-0.5, 0, -0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.tower, vec3.fromValues(0.5, 0, -0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.tower, vec3.fromValues(0.5, 0, 0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("C", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("C", this.cube, vec3.fromValues(0.25, 1, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.5, 1, 1), false, false, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.tower, vec3.fromValues(-0.5, 0, 0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.tower, vec3.fromValues(-0.5, 0, -0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.cylinder, vec3.fromValues(0.5, 0, -0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.cylinder, vec3.fromValues(0.5, 0, 0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("C", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("C", this.cube, vec3.fromValues(0, 1, -0.25), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 0.5), false, false, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.tower, vec3.fromValues(-0.5, 0, 0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.cylinder, vec3.fromValues(-0.5, 0, -0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.cylinder, vec3.fromValues(0.5, 0, -0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.tower, vec3.fromValues(0.5, 0, 0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
            ], 0.25, 0),
            new Rule([
                new Shape("C", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, false, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("C", this.cube, vec3.fromValues(0, 1, 0.25), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 0.5), false, false, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.cylinder, vec3.fromValues(-0.5, 0, 0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.tower, vec3.fromValues(-0.5, 0, -0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.tower, vec3.fromValues(0.5, 0, -0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
                new Shape("T", this.cylinder, vec3.fromValues(0.5, 0, 0.5), vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1), true, true, vec4.fromValues(208/255, 208/255, 217/255, 1)),
            ], 0.25, 0),
        ]);

        this.shapeSet.push(new Shape("C", this.cube, vec3.fromValues(0, 0.3, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.15, 0.15, 0.15), false, false, vec4.fromValues(208/255, 208/255, 217/255, 1)));
        this.shapeSet.push(new Shape("C", this.cube, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 0, 0), vec3.fromValues(0.15, 0.15, 0.15), true, false, vec4.fromValues(0.3, 0.3, 0.3, 1)));
        this.lsystemMesh.addShape(this.ground, mat4.fromScaling(mat4.create(), vec3.fromValues(1, 0.3, 1)), vec4.fromValues(0.25, 0.45, 0.25, 1));
        var prevj = 0;
        for (var j = 0.3; j < 1; j += 0.2) {
            var previ = 0;
            var ssquared = Math.sin(3.1415926/2 * j / 1);
            var prevPos = vec3.fromValues(j, 0.3 * (1 - ssquared * ssquared), 0);
            for (var i = (Math.random() * 0.3 + 0.1)/j; i < 3.1415926 * 2; i += (Math.random() * 0.3 + 0.1)/j) {
                var x = j * Math.cos(i);
                var z = j * Math.sin(i);
                var pos = vec3.fromValues(x, 0.3 * (1 - ssquared * ssquared), z);
                var dist = vec3.distance(pos, prevPos);
                var newpos = vec3.fromValues(j * Math.cos(i - (i - previ)/2), 0.3 * (1 - ssquared * ssquared), j * Math.sin(i - (i - previ)/2));
                var scaleZ = dist/2.1;
                var scaleX = (Math.random() * ((j - prevj) - 0.5) + 0.4)/3;
                if (scaleX > scaleZ) this.shapeSet.push(new Shape("P", this.plane, newpos, vec3.fromValues(0, -(i - (i-previ)/2), 0), vec3.fromValues(scaleX, (scaleX + scaleZ)/2, scaleZ), false, false, vec4.fromValues(0.3, 0.3, 0.3, 1)));
                else this.shapeSet.push(new Shape("p", this.plane, newpos, vec3.fromValues(0, -(i - (i-previ)/2), 0), vec3.fromValues(scaleX, (scaleX + scaleZ)/2, scaleZ), false, false, vec4.fromValues(0.3, 0.3, 0.3, 1)));
                previ = i;
                vec3.copy(prevPos, pos);
            }
            prevj = j;
        }

        for (var i = 0; i < iterations; i++) {
            var newShapeSet = this.shapeSet.slice();
            for (var j = 0; j < this.shapeSet.length; j++) {
                var s: Shape = this.shapeSet[j];
                var dist = Math.pow(Math.min(vec3.distance(vec3.fromValues(0, 0, 0), s.position), 1), 5);
                if (this.rulebook.has(s.symbol) && !s.terminal) {
                    var rules = this.rulebook.get(s.symbol);
                    var rand = Math.random();
                    var totalProb = 0;
                    var probabilities = [];
                    for (var k = 0; k < rules.length; k++) {
                        totalProb += rules[k].probability + dist * rules[k].populationDependence;
                    }
                    for (var k = 0; k < rules.length; k++) {
                        probabilities[k] = (rules[k].probability + dist * rules[k].populationDependence)/totalProb;
                        if (k != 0) probabilities[k] += probabilities[k-1];
                    }
                    var whichRule = 0;
                    for (var k = 1; k < probabilities.length; k++) {
                        if (rand <= probabilities[k] && rand > probabilities[k-1]) {
                            whichRule = k;
                            break;
                        }
                    }
                    newShapeSet[j] = null;
                    var successors: Shape[] = this.applyRule(s, rules[whichRule]);
                    for (var k = 0; k < successors.length; k++) {
                        newShapeSet.push(successors[k]);
                    }
                }
            }
            this.shapeSet = [];
            for (var j = 0; j < newShapeSet.length; j++) {
                if (newShapeSet[j] != null) this.shapeSet.push(newShapeSet[j]);
            }
        }

        for (var i = 0; i < this.shapeSet.length; i++) {
            var trans = mat4.create();
            mat4.translate(trans, trans, this.shapeSet[i].position);
            mat4.rotate(trans, trans, this.shapeSet[i].rotation[0], vec3.fromValues(1, 0, 0));
            mat4.rotate(trans, trans, this.shapeSet[i].rotation[1], vec3.fromValues(0, 1, 0));
            mat4.rotate(trans, trans, this.shapeSet[i].rotation[2], vec3.fromValues(0, 0, 1));
            mat4.scale(trans, trans, this.shapeSet[i].scale);
            this.lsystemMesh.addShape(this.shapeSet[i].geometry, trans, this.shapeSet[i].color);  
        }
        
        this.lsystemMesh.create();
        return this.lsystemMesh;
    }

    static applyRule(predecessor: Shape, r: Rule): Shape[] {
        var successors: Shape[] = [];
        for (var i = 0; i < r.successors.length; i++) {
            var successor = Shape.copy(r.successors[i]);
            vec3.multiply(successor.position, successor.position, predecessor.scale);
            vec3.scale(successor.position, successor.position, 2);
            vec3.add(successor.position, successor.position, predecessor.position);
            vec3.rotateX(successor.position, successor.position, predecessor.position, predecessor.rotation[0]);
            vec3.rotateY(successor.position, successor.position, predecessor.position, predecessor.rotation[1]);
            vec3.rotateZ(successor.position, successor.position, predecessor.position, predecessor.rotation[2]);

            vec3.add(successor.rotation, successor.rotation, predecessor.rotation);
            vec3.multiply(successor.scale, successor.scale, predecessor.scale);
            if (successor.uniformScale) {
                var scaleX = successor.scale[0];
                var scaleZ = successor.scale[2];
                if (successor.symbol == "T") {
                    if (scaleZ < scaleX) successor.scale = vec3.fromValues(scaleZ, successor.scale[1], scaleZ);
                    else successor.scale = vec3.fromValues(scaleX, successor.scale[1], scaleX);
                }
                else {
                    if (scaleZ < scaleX) successor.scale = vec3.fromValues(scaleZ, scaleZ, scaleZ);
                    else successor.scale = vec3.fromValues(scaleX, scaleX, scaleX);
                }
            }
            successors.push(successor);
        }
        return successors;
    }
}

// function matrixToAngles(matrix: mat4)
// {    
//     var sy = Math.sqrt(matrix[0][0] * matrix[0][0] +  matrix[1][0] * matrix[1][0]);
 
//     var singular = sy < Math.pow(10, -6);
 
//     var x, y, z;
//     if (!singular)
//     {
//         x = Math.atan2(matrix[2][1] , matrix[2][2]);
//         y = Math.atan2(-matrix[2][0], sy);
//         z = Math.atan2(matrix[1][0], matrix[0][0]);
//     }
//     else
//     {
//         x = Math.atan2(-matrix[1][2], matrix[1][1]);
//         y = Math.atan2(-matrix[2][0], sy);
//         z = 0;
//     }
//     return vec3.fromValues(x, y, z);
// }

function loadFile(file: string): string[] {
    var toReturn: string[] = [];
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                toReturn = allText.split("\n");
            }
        }
    }
    rawFile.send(null);
    return toReturn;
}

function loadOBJ(file: string): Mesh {
    var fileContents: string[] = loadFile(file);
    var mesh: Mesh = new Mesh(vec3.fromValues(0, 0, 0));
    var positions: number[] = [];
    var normals: number[] = [];
    var faces: string[] = [];
    for (var i = 0; i < fileContents.length; i++) {
        var line: string[] = fileContents[i].split(" ");
        if (line[0] == "v") {
            positions.push(parseFloat(line[1]));
            positions.push(parseFloat(line[2]));
            positions.push(parseFloat(line[3]));
        }
        if (line[0] == "vn") {
            normals.push(parseFloat(line[1]));
            normals.push(parseFloat(line[2]));
            normals.push(parseFloat(line[3]));
        }
        if (line[0] == "f") {
            faces.push(line[1]);
            faces.push(line[2]);
            faces.push(line[3]);
        }
    }
    for (var i = 0; i < faces.length; i += 3) {
        for (var k = 0; k < 3; k++) {
            var vert: string[] = faces[i + k].split("/");
            var posIndex = parseInt(vert[0]) - 1;
            var normIndex = parseInt(vert[2]) - 1;

            for (var j = 0; j < 3; j++) {
                mesh.positions.push(positions[posIndex * 3 + j]);
            }
            mesh.positions.push(1);

            for (var j = 0; j < 3; j++) {
                mesh.normals.push(normals[normIndex * 3 + j]);
            }
            mesh.normals.push(0);

            mesh.indices.push(i + k);
        }
    }
    return mesh;
}

export default LSystem;