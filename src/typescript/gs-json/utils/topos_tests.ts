import {Arr} from "./arr";
import * as gs from "./gs-json";
import * as td from "./test_data";
import {Kernel} from "./kernel";


export function test_Topo_constructor(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path1: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 1, si: 0}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const path2: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 0, si: 0}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 0);
    const path3: gs.ITopoPathData = {id: 0, tt: 0, ti: 0, st: 1, si: 0}; //(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0);
    const path4: gs.ITopoPathData = {id: 0, tt: 0, ti: 0, st: 0, si: 0}; //(0, gs.EGeomType.wires, 0, gs.EGeomType.vertices, 0);
    // the Top class is abstract
    const f_e: gs.IEdge = new gs.Edge(k, path1);
    const f_v: gs.IVertex = new gs.Vertex(k, path2);
    const w_e: gs.IEdge = new gs.Edge(k, path3);
    const w_v: gs.IVertex = new gs.Vertex(k, path4);
    return true;
}

export function test_Topo_getObjID(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 1, si: 0}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const e: gs.IEdge = new gs.Edge(k, path);
    if(e.getObjID() != 0) {return false;}
    return true;
}

export function test_Topo_getGeom(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 1, si: 0}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const e: gs.IEdge = new gs.Edge(k, path);
    //if(!Arr.equal(e.getGeom().getPointIDs(), m.getGeom().getPointIDs())){return false;}
    return true;
}

export function test_Topo_getModel(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 1, si: 0}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const e: gs.IEdge = new gs.Edge(k, path);
    //if(!Arr.equal(e.getModel().getGeom().getPointIDs(), m.getGeom().getPointIDs())){return false;}
    return true;
}

export function test_Topo_getAttribNames(): boolean {
    const k: Kernel = new Kernel(td.box_with_attribs());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 1, si: 0}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const e: gs.IEdge = new gs.Edge(k, path);
    if(!Arr.equal(e.getAttribNames(),["edge_id"])) {return false;}
    //const path1: gs.ITopoPath = a1.getWires()[0].getTopoPath() ;
    return true;
}

export function test_Topo_getAttribValue(): boolean {
    const m: gs.IModel = new gs.Model(td.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPathData = a1.getFaces()[0].getTopoPath() ;
    if(!(geom.numTopos(gs.EGeomType.faces) === 6)) {return false;}
    if(!(a1.getFaces()[0].getAttribValue("faces_id") === 0)) {return false;}
    return true;
}

export function test_Topo_setAttribValue(): boolean {
    const m: gs.IModel = new gs.Model(td.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPathData = a1.getFaces()[0].getTopoPath() ;
    if(!(geom.numTopos(gs.EGeomType.faces) === 6)) {return false;}
    if(!(a1.getFaces()[0].getAttribValue("faces_id") === 0)) {return false;}
    a1.getFaces()[0].setAttribValue("faces_id",49);
    if((a1.getFaces()[0].getAttribValue("faces_id") === 0)) {return false;}
    if(!(a1.getFaces()[0].getAttribValue("faces_id") === 49)) {return false;}
    return true;
}

export function test_Topo_getGroups(): boolean {
    const m: gs.IModel = new gs.Model(td.box_with_attribs());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 0, si: 0}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 0);
    const grp1: gs.IGroup = m.addGroup("test1");
    grp1.addObj(path.id);
    if(!(m.getGroups()[0].getName() == "test1")) {return false;}
    return true;
    //    let geom:gs.IGeom = m.getGeom();
    //    let a1:gs.IObj = geom.getObj(0);
    //    let path1:gs.ITopoPath = a1.getFaces()[0].getTopoPath() ;
    //    if(!(geom.numTopos(gs.EGeomType.faces) == 6)){return false;}
    //    if(!(a1.getFaces()[0].getAttribValue("faces_id") == 0)){return false;}
    // a1.getFaces()[0].setAttribValue("faces_id",49)
    // if((a1.getFaces()[0].getAttribValue("faces_id") == 0)){return false;}
    // if(!(a1.getFaces()[0].getAttribValue("faces_id") == 49)){return false;}
}

// Vertex
export function test_Vertex_getGeomType(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1}; //(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(k, path);
    if (v.getGeomType() !== gs.EGeomType.vertices) {return false; }
    return true;
}

export function test_Vertex_getPoint(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1}; //(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(k, path);
    if (v.getPoint().getID() !== 6) {return false; }
    return true;
}

export function test_Vertex_next(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1}; //(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(k, path);
    if (v.next().getPoint().getID() !== 5) {return false; }
    if (v.next().next().getPoint().getID() !== 1) {return false; }
    if (v.next().next().next().getPoint().getID() !== 2) {return false; }
    return true;
}

export function test_Vertex_previous(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1}; //(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(k, path);
    if (v.previous().getPoint().getID() !== 2) {return false; }
    if (v.previous().previous().getPoint().getID() !== 1) {return false; }
    return true;
}

export function test_Vertex_getEdge(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1}; //(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(k, path);
    const e: gs.IEdge = v.getEdge();
    if (e.getObjID() !== 0) {return false; }
    if (e.getGeomType() !== gs.EGeomType.edges) {return false; }
    return true;
}

export function test_Vertex_getWireOrFace(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1}; //(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(k, path);
    if (v.getWireOrFace().getObjID() !== 0) {return false; }
    if (v.getWireOrFace().getGeomType() !== gs.EGeomType.faces) {return false; }
    return true;
}

export function test_Vertex_verticesSharedPoint(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1}; //(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(k, path);
    let w_v: gs.IVertex[]; // vertices that belong to wires
    let f_v: gs.IVertex[]; // vertices that belong to faces
    [w_v, f_v] = v.verticesSharedPoint();
    if (w_v.length !== 0) {return false;}
    if (f_v.length !== 2) {return false;}
    return true;
}

// Edge
export function test_Edge_getGeomType(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1}; //(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(k, path);
    const e: gs.IEdge = v.getEdge();
    if(!(e.getGeomType() == gs.EGeomType.edges)) {return false;}
    return true;
}

export function test_Edge_getVertices(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1}; //(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(k, path);
    const e: gs.IEdge = v.getEdge();
    if (e.getVertices().length !== 2) {return false; }
    return true;
}

export function test_Edge_getWireOrFace(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path1: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 1, si: 0}; //(0, gs.EGeomType.faces, 1, gs.EGeomType.edges, 0);
    const e1: gs.IEdge = new gs.Edge(k, path1);
    const path2: gs.ITopoPathData = {id: 0, tt: 0, ti: 0, st: 1, si: 0}; //(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0);
    const e2: gs.IEdge = new gs.Edge(k, path2);
    if(gs.mapGeomTypeToString.get(e1.getWireOrFace().getGeomType()) !== "faces") {return false;}
    if(gs.mapGeomTypeToString.get(e2.getWireOrFace().getGeomType()) !== "wires") {return false;}
    return true;
}

export function test_Edge_next(): boolean {

    // TODO

    // const k: Kernel = new Kernel(td.open_box());
    // const e_f1: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0)).next()
    // const e_f2: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 2)).next()
    // const e_f3: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 3)).next()
    // if(!Arr.equal(m.getGeom().getObjData(e_f1.getTopoPath()),[5,4])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_f2.getTopoPath()),[0,1])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_f3.getTopoPath()),[1,5])){return false;}

    // const e_w1: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0)).next()
    // const e_w2: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 2)).next()
    // const e_w3: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 3)).next()
    // if(!Arr.equal(m.getGeom().getObjData(e_w1.getTopoPath()),[1,2])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_w2.getTopoPath()),[3,0])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_w3.getTopoPath()),[0,1])){return false;}

    // const k2: Kernel = new Kernel(td.Unclosed_with_groups());
    // const e2_f1: gs.IEdge = new gs.Edge(k2, new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 3)).next()
    // if(!Arr.equal(k2.getObjData(e2_f1.getTopoPath()),[1,5])){return false;}

    // // Unclosed Wire, shows error if console.log() is released (although e2_w1 is generated as a non existing edge, by constructor), OK
    // const e2_w1: gs.IEdge = new gs.Edge(k2, new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 4)).next()
    // // console.log(k2.getObjData(e2_w1.getTopoPath()))

    // const geom: gs.IGeom = m.getGeom();
    // const a1: gs.IObj = geom.getObj(0);
    // const path1: gs.ITopoPath = a1.getEdges()[0][0][0].getTopoPath();
    // console.log(geom.numTopos(gs.EGeomType.edges));
    // console.log(a1.getEdges()[0][0][0].getTopoPath());
    // console.log(a1.getEdges()[0][0][1].getTopoPath());
    // console.log(a1.getEdges()[0][0][2].getTopoPath());
    // if (!a1.getEdges()[0][0][1].next().getTopoPath()) {return false;}
    // if (!a1.getEdges()[0][0][0].next().getTopoPath()) {return false;}
    return true;
}

export function test_Edge_previous(): boolean {

    // TODO

    // const k: Kernel = new Kernel(td.open_box());
    // const e_f1: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0)).previous()
    // const e_f2: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 1)).previous()
    // const e_f3: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 3)).previous()

    // if(!Arr.equal(m.getGeom().getObjData(e_f1.getTopoPath()),[0,1])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_f2.getTopoPath()),[1,5])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_f3.getTopoPath()),[4,0])){return false;}

    // const e_w1: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0)).previous()
    // const e_w2: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 2)).previous()
    // const e_w3: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 3)).previous()
    // if(!Arr.equal(m.getGeom().getObjData(e_w1.getTopoPath()),[3,0])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_w2.getTopoPath()),[1,2])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_w3.getTopoPath()),[2,3])){return false;}

    // // Unclosed Wire, shows error if console.log() is released (although e2_w1 is generated as a non existing edge, by constructor), OK
    // const k2: Kernel = new Kernel(td.Unclosed_with_groups());
    // const e2_w1: gs.IEdge = new gs.Edge(k2, new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0)).previous()
    // // Console.log(k2.getObjData(e2_w1.getTopoPath()))

    // ////////////////////////
    // const a1: gs.IObj = m.getGeom().getObj(0);
    // const path1: gs.ITopoPath = a1.getEdges()[0][0][0].getTopoPath();

    // // console.log(geom.numTopos(gs.EGeomType.edges));
    // // console.log(a1.getEdges()[0][0][0].getTopoPath());
    // // console.log(a1.getEdges()[0][0][1].getTopoPath());
    // // console.log(a1.getEdges()[0][0][2].getTopoPath());

    // // console.log(a1.getEdges()[0][0][1])
    // // console.log(a1.getEdges()[0][0][1].previous())
    // // console.log(a1.getEdges()[0][0][1].previous().getTopoPath())
    // if (!a1.getEdges()[0][0][1].previous().getTopoPath()) {return false;}
    // if (!a1.getEdges()[0][0][0].previous().getTopoPath()) {return false;}
    return true;
}

export function test_Edge_edgesSharedPoints(): boolean {

    // TODO

    // const E1: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.open_box())).getGeom(), new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0))).edgesSharedPoints() ;
    // const E2: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.open_box())).getGeom(), new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0))).edgesSharedPoints() ;
    // const E3: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.open_box())).getGeom(), new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 1))).edgesSharedPoints() ;
    // const E4: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.open_box())).getGeom(), new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 1))).edgesSharedPoints() ;

    // const E5: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.Random_Closed())).getGeom(), new gs.TopoPath(0, gs.EGeomType.faces, 4, gs.EGeomType.edges, 0))).edgesSharedPoints() ;
    // const E6: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.Random_Closed())).getGeom(), new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 4))).edgesSharedPoints() ;
    // const E7: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.Random_Closed())).getGeom(), new gs.TopoPath(0, gs.EGeomType.faces, 4, gs.EGeomType.edges, 4))).edgesSharedPoints() ;
    // const E8: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.Random_Closed())).getGeom(), new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0))).edgesSharedPoints() ;

    // if(!((E1[0].length + E1[1].length) === 2)){return false;};
    // if(!((E2[0].length + E2[1].length) === 2)){return false;};
    // if(!((E3[0].length + E3[1].length) === 2)){return false;};
    // if(!((E4[0].length + E4[1].length) === 2)){return false;};
    // if(!((E5[0].length + E5[1].length) === 5)){return false;};
    // if(!((E6[0].length + E6[1].length) === 7)){return false;};
    // if(!((E7[0].length + E7[1].length) === 7)){return false;};
    // if(!((E8[0].length + E8[1].length) === 1)){return false;};

    return true;
}

// Wire
export function test_Wire_getGeomType(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; //(0, gs.EGeomType.wires, 0);
    const w: gs.IWire = new gs.Wire(k, path);
    if(gs.mapGeomTypeToString.get(w.getGeomType()) !== "wires") {return false;}
    return true;
}
export function test_Wire_getVertices(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; //(0, gs.EGeomType.wires, 0);
    const w: gs.IWire = new gs.Wire(k, path);
    const v: gs.IVertex[] = w.getVertices();
    const w2: gs.IWire = v[0].getWireOrFace() as gs.IWire;
    if(!w2.isClosed()) {return false;}
    return true;
}
export function test_Wire_getEdges(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; //(0, gs.EGeomType.wires, 0);
    const w: gs.IWire = new gs.Wire(k, path);
    const e: gs.IEdge[] = w.getEdges();
    const w2: gs.IWire = e[0].getWireOrFace() as gs.IWire;
    if(!w2.isClosed()) {return false;}
    return true;
}
export function test_Wire_numVertices(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; //(0, gs.EGeomType.wires, 0);
    const w: gs.IWire = new gs.Wire(k, path);
    if(w.numVertices() != 4) {return false;}
    return true;
}
export function test_Wire_numEdges(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; //(0, gs.EGeomType.wires, 0);
    const w: gs.IWire = new gs.Wire(k, path);
    if(w.numEdges() != 4) {return false;}
    return true;
}
export function test_Wire_isClosed(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; //(0, gs.EGeomType.wires, 0);
    const w: gs.IWire = new gs.Wire(k, path);
    if(!w.isClosed()) {return false;}
    return true;
}

// Face
export function test_Face_getGeomType(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0);
    const f: gs.IFace = new gs.Face(k, path);
    if(gs.mapGeomTypeToString.get(f.getGeomType()) !== "faces") {return false;}
    return true;
}
export function test_Face_getVertices(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0);
    const f: gs.IFace = new gs.Face(k, path);
    const v: gs.IVertex[] = f.getVertices();
    if(gs.mapGeomTypeToString.get(v[0].getWireOrFace().getGeomType()) !== "faces") {return false;}
    if(gs.mapGeomTypeToString.get(v[1].getWireOrFace().getGeomType()) !== "faces") {return false;}
    if(gs.mapGeomTypeToString.get(v[2].getWireOrFace().getGeomType()) !== "faces") {return false;}
    if(gs.mapGeomTypeToString.get(v[3].getWireOrFace().getGeomType()) !== "faces") {return false;}
    return true;
}
export function test_Face_getEdges(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0);
    const f: gs.IFace = new gs.Face(k, path);
    const e: gs.IEdge[] = f.getEdges();
    if(gs.mapGeomTypeToString.get(e[0].getWireOrFace().getGeomType()) !== "faces") {return false;}
    if(gs.mapGeomTypeToString.get(e[1].getWireOrFace().getGeomType()) !== "faces") {return false;}
    if(gs.mapGeomTypeToString.get(e[2].getWireOrFace().getGeomType()) !== "faces") {return false;}
    if(gs.mapGeomTypeToString.get(e[3].getWireOrFace().getGeomType()) !== "faces") {return false;}
    return true;
}
export function test_Face_numVertices(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0);
    const f: gs.IFace = new gs.Face(k, path);
    if(f.numVertices() != 4) {return false;}
    return true;
}
export function test_Face_numEdges(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0);
    const f: gs.IFace = new gs.Face(k, path);
    if(f.numEdges() != 4) {return false;}
    return true;
}
export function test_Face_isClosed(): boolean {
    const k: Kernel = new Kernel(td.open_box());
    const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0);
    const f: gs.IFace = new gs.Face(k, path);
    if(!f.isClosed()) {return false;}
    return true;
}
export function test_Face_facesSharedPoints(): boolean {
    // METHOD NOT IMPLEMENTED YET
    // const k1: Kernel = new Kernel(td.open_box());
    // const path1: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0);
    // const f1: gs.IFace = new gs.Face(k1, path1);
    // if(!(f1.facesSharedPoints(1).length === 3)) {return false;}

    // const k2: Kernel = new Kernel(td.Random_Closed());
    // const path00: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0);
    // const f00: gs.IFace = new gs.Face(k2, path00);
    // const path01: gs.ITopoPathData = {id: 0, tt: 1, ti: 1}; //(0, gs.EGeomType.faces, 1);
    // const f01: gs.IFace = new gs.Face(k2, path01);
    // const path02: gs.ITopoPathData = {id: 0, tt: 1, ti: 2}; //(0, gs.EGeomType.faces, 2);
    // const f02: gs.IFace = new gs.Face(k2, path02);
    // const path03: gs.ITopoPathData = {id: 0, tt: 1, ti: 3}; //(0, gs.EGeomType.faces, 3);
    // const f03: gs.IFace = new gs.Face(k2, path03);
    // const path04: gs.ITopoPathData = {id: 0, tt: 1, ti: 4}; //(0, gs.EGeomType.faces, 4);
    // const f04: gs.IFace = new gs.Face(k2, path04);
    // const path05: gs.ITopoPathData = {id: 0, tt: 1, ti: 5}; //(0, gs.EGeomType.faces, 5);
    // const f05: gs.IFace = new gs.Face(k2, path05);
    // const path06: gs.ITopoPathData = {id: 0, tt: 1, ti: 6}; //(0, gs.EGeomType.faces, 6);
    // const f06: gs.IFace = new gs.Face(k2, path06);
    // const path07: gs.ITopoPathData = {id: 0, tt: 1, ti: 7}; //(0, gs.EGeomType.faces, 7);
    // const f07: gs.IFace = new gs.Face(k2, path07);
    // const path08: gs.ITopoPathData = {id: 0, tt: 1, ti: 8}; //(0, gs.EGeomType.faces, 8);
    // const f08: gs.IFace = new gs.Face(k2, path08);

    // if(!(f00.facesSharedPoints().length === 6)) {return false;}
    // if(!(f01.facesSharedPoints().length === 7)) {return false;}
    // if(!(f02.facesSharedPoints().length === 8)) {return false;}

    // if(!(f00.facesSharedPoints(1).length === 6)) {return false;}
    // if(!(f01.facesSharedPoints(1).length === 7)) {return false;}
    // if(!(f02.facesSharedPoints(1).length === 8)) {return false;}
    // if(!(f03.facesSharedPoints(1).length === 8)) {return false;}
    // if(!(f04.facesSharedPoints(1).length === 8)) {return false;}
    // if(!(f05.facesSharedPoints(1).length === 8)) {return false;}
    // if(!(f06.facesSharedPoints(1).length === 8)) {return false;}
    // if(!(f07.facesSharedPoints(1).length === 7)) {return false;}
    // if(!(f08.facesSharedPoints(1).length === 6)) {return false;}

    // if(!(f00.facesSharedPoints(5).length === 2)) {return false;}
    // if(!(f01.facesSharedPoints(5).length === 3)) {return false;}
    // if(!(f02.facesSharedPoints(5).length === 4)) {return false;}
    // if(!(f03.facesSharedPoints(5).length === 4)) {return false;}
    // if(!(f04.facesSharedPoints(5).length === 4)) {return false;}
    // if(!(f05.facesSharedPoints(5).length === 4)) {return false;}
    // if(!(f06.facesSharedPoints(5).length === 4)) {return false;}
    // if(!(f07.facesSharedPoints(5).length === 3)) {return false;}
    // if(!(f08.facesSharedPoints(5).length === 2)) {return false;}

    // if(!(f06.facesSharedPoints(6).length === 2)) {return false;}
    // if(!(f07.facesSharedPoints(6).length === 2)) {return false;}
    // if(!(f08.facesSharedPoints(6).length === 1)) {return false;}

    return true;
}

// export function test_TopoPath_constructor(): boolean {
//     const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
//     if(path.toString() != "Obj: 0/faces: 0/edges: 0"){return false;}
//     return true;
// }
// export function test_TopoPath_equals(): boolean {
//     const k: Kernel = new Kernel(td.open_box());
//     const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
//     const e: gs.IEdge = new gs.Edge(k, path)
//     const path1: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
//     const path2: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 1, gs.EGeomType.edges, 0);
//     const path3: gs.ITopoPathData = {id: 0, tt: 0, ti: 0, st: 0, si: 0}; //(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 1);
//     const path4: gs.ITopoPathData = {id: 0, tt: 0, ti: 0, st: 0, si: 0}; //(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 1);
//     if(!e.getTopoPath().equals(path1)){return false;}
//     if(e.getTopoPath().equals(path2)){return false;}
//     if(e.getTopoPath().equals(path3)){return false;}
//     if(e.getTopoPath().equals(path4)){return false;}
//     return true;
// }
// export function test_TopoPath_toString(): boolean {
//     const path1: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
//     const path2: gs.ITopoPathData = {id: 0, tt: 0, ti: 0, st: 0, si: 0}; //(1, gs.EGeomType.wires, 4, gs.EGeomType.vertices, 9);
//     if(path1.toString() != "Obj: 0/faces: 0/edges: 0"){return false;}
//     if(path2.toString() != "Obj: 1/wires: 4/vertices: 9"){return false;}
//     return true;
// }

// Ignore this method for the moment
// export function test_Vertex_verticesSamePosition(): boolean {
//     const k: Kernel = new Kernel(td.open_box());
//     const path0: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 0, si: 0}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 0);
//     const v0: gs.IVertex = new gs.Vertex(k, path0);
//     if((v0.verticesSamePosition().length != 2)){return false;}
//     const path1: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 0, si: 1}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 1);
//     const v1: gs.IVertex = new gs.Vertex(k, path1);
//     if((v1.verticesSamePosition().length != 2)){return false;}
//     const path2: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 0, si: 2}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 2);
//     const v2: gs.IVertex = new gs.Vertex(k, path2);
//     if((v2.verticesSamePosition().length != 2)){return false;}
//     const path3: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 0, si: 3}; //(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 3);
//     const v3: gs.IVertex = new gs.Vertex(k, path3);
//     if((v3.verticesSamePosition().length != 2)){return false;}
//     return true;
// }
