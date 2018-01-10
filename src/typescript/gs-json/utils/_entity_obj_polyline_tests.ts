import * as gs from "./gs-json";
import * as td from "./gen_gs_models";

export function test_Polyline_getObjType(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([3,6,0]);
    const p4 = g.addPoint([7,4,9]);
    const pline1: gs.IPolyline = g.addPolyline([p1,p2,p3,p4], true);
    const pline2: gs.IPolyline = g.addPolyline([p1,p2,p3], false);
    if (!(pline1.getObjType() === 100)) {return false;}
    if (!(pline2.getObjType() === 100)) {return false;}
    return true;
}

export function test_Polyline_insertVertex(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([3,6,0]);
    const p4 = g.addPoint([7,4,9]);
    const pline1: gs.IPolyline = g.addPolyline([p1,p2,p3,p4], true);
    const edge: gs.IEdge = pline1.getEdges()[0][0][1];
    pline1.insertVertex(edge, g.addPoint([1,1,0]));
    return true;
}