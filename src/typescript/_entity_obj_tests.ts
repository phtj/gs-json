import * as gs from "./gs-json";
import * as test_data from "./test_data";
import {} from "jasmine";

describe("Tests for Obj class", () => {
    it("test_obj_getGeomType", () => {
        expect( test_obj_getGeomType() ).toBe(true);
    });
    it("test_obj_getObjType", () => {
        expect( test_obj_getObjType() ).toBe(true);
    });
    it("test_obj_getPoints", () => {
        expect( test_obj_getPoints() ).toBe(true);
    });
    it("test_obj_getVertices", () => {
        expect( test_obj_getVertices() ).toBe(true);
    });
    it("test_obj_getEdges", () => {
        expect( test_obj_getEdges() ).toBe(true);
    });
    it("test_obj_getWires", () => {
        expect( test_obj_getWires() ).toBe(true);
    });
    it("test_obj_getFaces", () => {
        expect( test_obj_getFaces() ).toBe(true);
    });
    it("test_obj_getNumWires", () => {
        expect( test_obj_getNumWires() ).toBe(true);
    });
    it("test_obj_getNumFaces", () => {
        expect( test_obj_getNumFaces() ).toBe(true);
    });
});

// Object tests, extends Entities by 6 complementary methods

export function test_obj_getGeomType(): boolean {
    const m: gs.IModel = new gs.Model(test_data.box_with_groups());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    if(!(a1.getGeomType() === gs.EGeomType.objs)) {return false;}
    return true;
}

export function test_obj_getObjType(): boolean {
    const m: gs.IModel = new gs.Model(test_data.box_with_groups());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    if(!(a1.getObjType() === gs.EObjType.polymesh)) {return false;}
    return true;
}

export function test_obj_getPoints(): boolean {
    //const m: gs.IModel = new gs.Model(test_data.box_with_groups());
    const m: gs.IModel = new gs.Model(test_data.mixed());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const wires: gs.IPoint[][] = a1.getPoints()[0];
    const faces: gs.IPoint[][] = a1.getPoints()[1];
    if(!(wires.length === 1)) {return false;}
    if(!(faces.length === 0)) {return false;}
    return true;
}

export function test_obj_getVertices(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPathData = a1.getVertices()[0][0][0].getTopoPath();
    geom.numTopos(gs.EGeomType.vertices);
    a1.getVertices(); // Looks fine
    return true;
}

export function test_obj_getEdges(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPathData = a1.getEdges()[0][0][0].getTopoPath() ;
    geom.numTopos(gs.EGeomType.edges);
    a1.getEdges(); // Looks fine
    return true;
}

export function test_obj_getWires(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPathData = a1.getWires()[0].getTopoPath() ;
    geom.numTopos(gs.EGeomType.wires);
    // a1.getWires(); // Looks fine
    return true;
}

export function test_obj_getFaces(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPathData = a1.getFaces()[0].getTopoPath() ;
    geom.numTopos(gs.EGeomType.faces);
    a1.getFaces(); // Looks fine

    return true;
}

export function test_obj_getNumWires(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const obj: gs.IObj = m.getGeom().getObj(0);
    if (obj.numWires() !== 1) {return false;}
    return true;
}

export function test_obj_getNumFaces(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const obj: gs.IObj = m.getGeom().getObj(0);
    if (obj.numFaces() !== 5) {return false;}
    return true;
}
