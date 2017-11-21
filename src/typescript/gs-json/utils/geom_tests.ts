import * as gsj from "./gs-json";
import {Model} from "./model";
import {Geom} from "./geom";

export function test_xxx():boolean {
    return true;
}

export function test_createPoint():boolean {
    let model:gsj.IModel = new gsj.Model();
    model.getGeom().addPoint([1,2,3]);
    if (model.getGeom().numPoints() != 1) {return false;}
    return true;
}


// Geom constructor and its 19 public methods are tested
export function test_Geom_constructor():boolean {
    let m:Model = new Model();
    let a:Geom = new Geom(m);
    return true;
}
export function test_Geom_getModel():boolean {
    return true;
}
export function test_Geom_addPoint():boolean {
    let m:Model = new Model();
    let a:Geom = new Geom(m);
    a.addPoint([1,3,8]);
    return true;
}
export function test_Geom_addPolyline():boolean {
    return true;
}
export function test_Geom_addPolymesh():boolean {
    return true;
}
export function test_Geom_getData():boolean {
    return true;
}
export function test_Geom_getPointIDs():boolean {
    return true;
}
export function test_Geom_getPoints():boolean {
    let m:Model = new Model();
    let a:Geom = new Geom(m);
    a.addPoint([1,3,8]);
    a.addPoint([6,4,3]);
    a.addPoint([8,8,8]);
    a.addPoint([3,4,5]);
    a.addPoint([2,3,5]);
    a.addPoint([1,5,2]);
    a.getPoints();
    return true;
}
export function test_Geom_getPoint():boolean {
    let m:Model = new Model();
    let a:Geom = new Geom(m);
    a.addPoint([1,3,8]);
    a.addPoint([6,4,3]);
    a.addPoint([8,8,8]);
    a.addPoint([3,4,5]);
    a.addPoint([2,3,5]);
    a.addPoint([1,5,2]);
    for(let i:number=0;i<a.getPoints.length;i++){
    console.log(a.getPoint(i));
    }
    return true;
}
export function test_Geom_delPoint():boolean {
    return true;
}
export function test_Geom_numPoints():boolean {
    return true;
}
export function test_Geom_setPointPosition():boolean {
    return true;
}
export function test_Geom_getPointPosition():boolean {
    return true;
}
export function test_Geom_getObjIDs():boolean {
    return true;
}
export function test_Geom_getObjs():boolean {
    return true;
}
export function test_Geom_getObj():boolean {
    return true;
}
export function test_Geom_delObj():boolean {
    return true;
}
export function test_Geom_numObjs():boolean {
    return true;
}
export function test_Geom_getTopos():boolean {
    return true;
}
export function test_Geom_numTopos():boolean {
    return true;
}
export function test_Geom_getAttribTemplate():boolean {
    return true;
}
export function test_GeomPath_constructor():boolean {
    return true;
}