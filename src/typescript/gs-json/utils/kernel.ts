import * as ifs from "./ifaces_gs";
import {Arr} from "./arr";
import {IMetadata, IModelData, IGeomData,  IAttribData,
    IGroupData, TObjData, TPointsData, ITopoPathData, ITopoTree2} from "./ifaces_json";
import {EGeomType, EDataType, EObjType, mapGeomTypeToString, mapDataTypeToString} from "./enums";
import {TopoTree2} from "./topo_trees";

/**
 * Kernel Class
 * This class controls all acces to the data and ensures that the data remains consistent.
 * No other class should have any irect access to this data.
 */
export class Kernel {
    private _metadata: IMetadata;
    private _points: TPointsData;
    private _objs: TObjData[];
    private _attribs: Map<EGeomType, Map<string, IAttribData>>;
    private _groups: Map<string, IGroupData>;
    private _topos_trees: Map<string, ITopoTree2>;

    /**
     * to be completed
     * @param
     * @return
     */
    constructor(data?: IModelData) {
        this._attribs = new Map();
        this._attribs.set(EGeomType.points, new Map());
        this._attribs.set(EGeomType.objs, new Map());
        this._attribs.set(EGeomType.vertices, new Map());
        this._attribs.set(EGeomType.edges, new Map());
        this._attribs.set(EGeomType.wires, new Map());
        this._attribs.set(EGeomType.faces, new Map());
        this._groups = new Map();
        this._topos_trees = new Map();
        // Set the data
        if (data && data.metadata !== undefined) {
            this._metadata = data.metadata;
        } else {
            this._metadata = {filetype: "gs-json", version: "0.1.1"};
        }
        // Geom points
        if (data && data.geom !== undefined && data.geom.points !== undefined) {
            this._points = data.geom.points;
        } else {
            this._points = [[], [null]];
        }
        // Geom objs
        if (data && data.geom !== undefined && data.geom.objs !== undefined) {
            this._objs = data.geom.objs;
        } else {
            this._objs = [];
        }
        // Attributes
        if (data && data.attribs && data.attribs.points !== undefined) {
            for (const attrib_data of data.attribs.points) {
                this._attribs.get(EGeomType.points).set(attrib_data.name, attrib_data);
            }
        }
        if (data && data.attribs && data.attribs.objs !== undefined) {
            for (const attrib_data of data.attribs.objs) {
                this._attribs.get(EGeomType.objs).set(attrib_data.name, attrib_data);
            }
        }
        if (data && data.attribs && data.attribs.vertices !== undefined) {
            for (const attrib_data of data.attribs.vertices) {
                this._attribs.get(EGeomType.vertices).set(attrib_data.name, attrib_data);
            }
        }
        if (data && data.attribs && data.attribs.edges !== undefined) {
            for (const attrib_data of data.attribs.edges) {
                this._attribs.get(EGeomType.edges).set(attrib_data.name, attrib_data);
            }
        }
        if (data && data.attribs && data.attribs.wires !== undefined) {
            for (const attrib_data of data.attribs.wires) {
                this._attribs.get(EGeomType.wires).set(attrib_data.name, attrib_data);
            }
        }
        if (data && data.attribs && data.attribs.faces !== undefined) {
            for (const attrib_data of data.attribs.faces) {
                this._attribs.get(EGeomType.faces).set(attrib_data.name, attrib_data);
            }
        }
        // Groups
        if (data && data.attribs && data.groups !== undefined) {
            for (const group_data of data.groups) {
                this._groups.set(group_data.name, group_data);
                this._topos_trees.set(group_data.name, new TopoTree2(group_data.topos));
                this._groups.get(group_data.name).topos = null;
            }
        }
    }

    //  Model attributes ---------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public modelGetAttribs(geom_type?: EGeomType): IAttribData[] {
        switch (geom_type) {
            case EGeomType.points:
                return Array.from(this._attribs.get(geom_type).values());
            case EGeomType.objs:
                return Array.from(this._attribs.get(geom_type).values());
            case EGeomType.faces:
                return Array.from(this._attribs.get(geom_type).values());
            case EGeomType.wires:
                return Array.from(this._attribs.get(geom_type).values());
            case EGeomType.edges:
                return Array.from(this._attribs.get(geom_type).values());
            case EGeomType.vertices:
                return Array.from(this._attribs.get(geom_type).values());
            default:
                return [
                    ...this.modelGetAttribs(EGeomType.points),
                    ...this.modelGetAttribs(EGeomType.objs),
                    ...this.modelGetAttribs(EGeomType.faces),
                    ...this.modelGetAttribs(EGeomType.wires),
                    ...this.modelGetAttribs(EGeomType.edges),
                    ...this.modelGetAttribs(EGeomType.vertices),
                ];
        }
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public modelGetAttrib(name: string, geom_type?: EGeomType): IAttribData {
        return this._attribs.get(geom_type).get(name);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public modelAddAttrib(name: string, geom_type: EGeomType, data_type: EDataType): IAttribData {
        // name = name.replace(/\s/g, "_");
        const data: IAttribData = {name,
                                   geom_type: mapGeomTypeToString.get(geom_type),  //TODO string not good
                                   data_type: mapDataTypeToString.get(data_type)}; //TODO string not good
        this._attribs.get(geom_type).set(name, data);
        return data;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public modelDelAttrib(name: string, geom_type: EGeomType): boolean {
        return this._attribs.get(geom_type).delete(name);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public modelHasAttrib(name: string, geom_type: EGeomType): boolean {
        return this._attribs.get(geom_type).has(name);
    }

    //  Model Groups -------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public modelGetGroups(): IGroupData[] {
        return Array.from(this._groups.values());
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public modelGetGroup(name: string): IGroupData {
        return this._groups.get(name);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public modelAddGroup(name: string, parent?: string): IGroupData {
        // name = name.replace(/\s/g, "_");
        let data: IGroupData = {name};
        if (parent !== undefined && this._groups.has(parent)) {
            // parent = parent.replace(/\s/g, "_");
            data = {name, parent};
        }
        this._groups.set(name, data);
        this._topos_trees.set(name, new TopoTree2());
        return data;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public modelDelGroup(name: string): boolean {
        const group = this._groups.delete(name);
        const tree = this._topos_trees.delete(name);
        return (group && tree);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public modelHasGroup(name: string): boolean {
        return this._groups.has(name);
    }

    //  Model General ------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public modelPurgePoints(): number {
        throw new Error ("Method not implemented.");
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public modelValidate(): boolean {
        throw new Error ("Method not implemented.");
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public modelToJSON(): string {
        //
        // const
        // const points:TPointsData = this._geom.
        // const json = {
        //     metadata : this._metadata,
        //     test : {points: [], objs: []},
        //     attribs : [],
        //     groups : [],
        // };
        return "";
    }

    //  Geom Points --------------------------------------------------------------------------------

    /**
     * Adds a new point to the model at position xyz.
     * @param cartesian xyz coordinates are required to create a point
     * @return a instance of type Point is returned
     */
    public geomAddPoint(xyz: number[]): number {
        const new_id: number = this._points[0].length; //next in sparse array
        // create the point
        this._points[0].push(0); // add a point to the points list
        this.pointSetPosition(new_id, xyz);
        // update point attributes
        this._addPointToAttribs(new_id);
        return new_id;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public geomAddPoints(xyzs: number[][]): number[] {
        return xyzs.map((xyz) => this.geomAddPoint(xyz));
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public geomDelPoint(id: number): boolean {
        // delete the point from the geometry array
        if (this._points[id] === undefined) {return false; }
        delete this._points[id];
        // delete the point from any geometrc objects
        this._delPointFromObjs(id);
        // delete the point from attribs
        this._delPointFromAttribs(id);
        // delete the points from groups
        this._delPointFromGroups(id);
        // all seem ok
        return true;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public geomDelPoints(ids: number[]): boolean {
        let ok: boolean = true;
        for (const id of ids) {
            if  (!this.geomDelPoint(id)) {ok = false;}
        }
        return ok;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public geomNumPoints(): number {
        return this._points[0].filter((n) => n !== undefined).length; // ignores empty slots in spare array
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public geomGetPointIDs(): number[] {
        const point_ids: number[] = [];
        this._points.forEach((v,i) => (v !== undefined) && point_ids.push(i)); // ignores empty slots in spare array
        return point_ids
    }

    //  Geom Objects -------------------------------------------------------------------------------

    /**
     * Adds a new polyline to the model that passes through a sequence of points.
     * @param points An array of Points.
     * @param is_closed Indicates whether the polyline is closed.
     * @return Object of type Polyline
     */
    public geomAddPolyline(points: ifs.IPoint[], is_closed: boolean): TObjData {
        if (points.length < 2) {throw new Error("Too few points for creating a polyline."); }
        const new_id: number = this._objs.length;
        const wire_ids: number[] = points.map((v, i) => v.getID());
        // create the pline
        if (is_closed) {wire_ids.push(-1); }
        this._objs.push([[wire_ids], [], [100]]); // add the obj
        // update all attributes
        this._addObjToAttribs(new_id);
        // return the new pline
        return this._objs[new_id];
    }

    /**
     * Adds a new NURBS curve to the model given a set of control points.
     * @param control_points, which is a collection of Points
     * @param is_closed Indicates whether the polyline is closed.
     * @param is_closed Indicates whether the polyline is closed.
     * @return Object of type Polyline
     */
    public geomAddNurbsCurve(control_points: ifs.IPoint[], order: number, is_closed: boolean): TObjData {
        if (control_points.length < order) {throw new Error("Too few points for creating a NURBS curve."); }
        const new_id: number = this._objs.length;
        const wire_ids: number[] = control_points.map((v, i) => v.getID());
        // create the pline
        if (is_closed) {wire_ids.push(-1); }
        this._objs.push([[wire_ids], [], [120, order]]); // add the obj
        // update all attributes
        this._addObjToAttribs(new_id);
        // return the new pline
        return this._objs[new_id];
    }

    /**
     * to be completed
     * @param
     * @return Object of type Polymesh
     */
    public geomAddPolymesh(face_points: ifs.IPoint[][]): TObjData {
        for (const f of face_points) {
            if (f.length < 3) {throw new Error("Too few points for creating a face."); }
        }
        const new_id: number = this._objs.length;
        const face_ids: number[][] = face_points.map((f) => f.map((v) => v.getID()));
        const wire_ids: number[][] = this._findPolymeshWires(face_ids);
        face_ids.forEach((f) => f.push(-1));
        wire_ids.forEach((w) => w.push(-1));
        this._objs.push([wire_ids, face_ids, [100]]); // add the obj
        // update all attributes
        this._addObjToAttribs(new_id);
        // return the new pline
        return this._objs[new_id];
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public geomDelObj(id: number, keep_unused_points: boolean = true): boolean {
        if (this._objs[id] === undefined) {return false; }
        // get the data
        const data: TObjData = this._objs[id];
        // delete the obj from the geometry array
        delete this._objs[id];
        // delete attribute values for this object
        this._delObjFromAttribs(id);
        // delete this object from all groups
        this._delObjFromGroups(id);
        // delete the points
        if (!keep_unused_points) {
            const unused_points: number[] = [];
            this._objs.forEach((o,oi) => o[0].forEach((w, wi) => w.forEach((v, vi) =>
                this.pointIsUnused(v) && unused_points.push(v))));
            this._objs.forEach((o,oi) => o[1].forEach((f, fi) => f.forEach((v, vi) =>
                this.pointIsUnused(v) && unused_points.push(v))));
            this.geomDelPoints(unused_points);
        }
        return true;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public geomDelObjs(ids: number[], keep_unused_points: boolean = true): boolean {
        let ok: boolean = true;
        for (const id of ids) {
            if  (!this.geomDelObj(id, keep_unused_points)) {ok = false;}
        }
        return ok;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public geomNumObjs(): number {
        return this._objs.filter((v) => (v !== undefined)).length; // ignores empty slots in sparse arrays
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public geomGetObjIDs(): number[] {
        const obj_ids: number[] = [];
        this._objs.forEach((v,i) => (v !== undefined) && obj_ids.push(i)); // ignores empty slots in spare array
        return obj_ids
    }

    //  Geom Topo ----------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public geomGetTopoPaths(geom_type: EGeomType): ITopoPathData[] {
        const objs_data: any[] = this._objs.filter((n) => n !== undefined);
        switch (geom_type) {
            case EGeomType.vertices:
                return this._getVEPathsFromObjsData(objs_data, 0);
            case EGeomType.edges:
                return this._getVEPathsFromObjsData(objs_data, 1);
            case EGeomType.wires:
                return this._getWFPathsFromObjsData(objs_data, 0);
            case EGeomType.faces:
                return this._getWFPathsFromObjsData(objs_data, 1);
        }
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public geomNumTopos(geom_type: EGeomType): number {
        // return this._getPaths(geom_type).length;
        switch (geom_type) {
            case EGeomType.vertices:
                return this._objs.map((o) => [
                    ...o[0].map((w) => w.filter((wi) => (wi !== -1)).length),
                    ...o[1].map((f) => f.filter((fi) => (fi !== -1)).length),
                ].reduce((a,b) => a + b)).reduce((a,b) => a + b);
            case EGeomType.edges:
                return this._objs.map((o) => [
                    ...o[0].map((w) => w.length - 1),
                    ...o[1].map((f) => f.length - 1),
                ].reduce((a,b) => a + b)).reduce((a,b) => a + b);
            case EGeomType.wires:
                return this._objs.map((o) => o[0].length).reduce((a,b) => a + b);
            case EGeomType.faces:
                return this._objs.map((o) => o[1].length).reduce((a,b) => a + b);
        }
    }

    /**
     * Within the parent object, find all vertices with the same point.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    public geomFindVerticesSharedPoint(vertex_path: ITopoPathData): ITopoPathData[][] {
        const point_id: number = this.vertexGetPoint(vertex_path);
        // loop through all wires and extract verts that have same point_id
        const wire_vertices: ITopoPathData[] = [];
        this._objs[vertex_path.id][0].forEach((w, w_i) => w.forEach((v, v_i) =>
            (v === point_id) // same point id
            && (!(w_i === vertex_path.ti && v_i === vertex_path.si)) // avoid dup
            && wire_vertices.push(
                {id: vertex_path.id, tt: 0, ti: w_i, st: vertex_path.st, si: v_i}),
        ));
        // loop through all faces and extract verts that have same point_id
        const face_vertices: ITopoPathData[] = [];
        this._objs[vertex_path.id][1].forEach((f, f_i) => f.forEach((v, v_i) =>
            (v === point_id) // same point id
            && (!(f_i === vertex_path.ti && v_i === vertex_path.si)) // avoid dup
            && face_vertices.push(
                {id: vertex_path.id, tt: 1, ti: f_i, st: vertex_path.st, si: v_i}),
        ));
        return [wire_vertices, face_vertices];
    }

    /**
     * Within the parent object, find all edges with the same two points as this edge.
     * The order of the points is ignored.
     * Returns an array containing two sub-arrays.
     * 1) The wire edges, and 2) the face edges.
     * @return An array containing the two sub-arrays of edges.
     */
    public geomFindEdgesSharedPoints(edge_path: ITopoPathData): ITopoPathData[][] {
        const point_id_0: number = this.vertexGetPoint(edge_path);
        const wf_topos: number[] = this._objs[edge_path.id][edge_path.tt][edge_path.ti];
        const num_edges: number = this.topoNumEdges({id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti});
        let vertex_index: number = edge_path.si + 1;
        if (vertex_index > num_edges - 1) {
            vertex_index = 0;
        }
        const point_id_1: number = this.vertexGetPoint(
            {id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti, st: edge_path.st, si: vertex_index},
        );
        const points: number[] = [point_id_0, point_id_1].sort();
        // loop through all wires and extract verts that have same point_id
        const wire_edges: ITopoPathData[] = [];
        this._objs[edge_path.id][0].forEach((w, w_i) => w.forEach((v, v_i) =>
            Arr.equal([v, w[v_i + 1]].sort(), points) && (w_i !== edge_path.ti)
                && wire_edges.push({id: edge_path.id, tt: 0, ti: w_i, st: 1, si: v_i})));
        // loop through all faces and extract verts that have same point_id
        const face_edges: ITopoPathData[] = [];
        this._objs[edge_path.id][1].forEach((f, f_i) => f.forEach((v, v_i) =>
            Arr.equal([v, f[v_i + 1]].sort(), points) && (f_i !== edge_path.ti)
                && face_edges.push({id: edge_path.id, tt: 1, ti: f_i, st: 1, si: v_i})));
        // return the doube list of edges
        return [wire_edges, face_edges]; // TODO I am avoiding all edges in same face or wire
    }

    /**
     * Within the parent object, find all vertices with the same point position.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    public geomFindVerticesSamePosition(vertex_path: ITopoPathData): ITopoPathData[][] {
        const point_id: number = this.vertexGetPoint(vertex_path);
        // loop through all wires and extract verts that have same position
        const wire_vertices: ITopoPathData[] = [];
        this._objs[vertex_path.id][0].forEach((w, w_i) => w.forEach((v, v_i) =>
            (this._points[0][v] === this._points[0][point_id]) // same pos
                 &&  (!(w_i === vertex_path.ti && v_i === vertex_path.si)) // avoid dup
                 &&  wire_vertices.push(
                     {id: vertex_path.id, tt: 0, ti: w_i, st: vertex_path.st, si: v_i}),
            ));
        // loop through all faces and extract verts that have same position
        const face_vertices: ITopoPathData[] = [];
        this._objs[vertex_path.id][1].forEach((f, f_i) => f.forEach((v, v_i) =>
            (this._points[0][v] === this._points[0][point_id]) // same pos
                 &&  (!(f_i === vertex_path.ti && v_i === vertex_path.si)) // avoid dup
                 &&  face_vertices.push(
                     {id: vertex_path.id, tt: 1, ti: f_i, st: vertex_path.st, si: v_i}),
            ));
        return [wire_vertices, face_vertices];
    }

    //  Objects ------------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public objGetType(id: number): number {
        return this._objs[id][2][0];
    }

    /**
     * Get the points for this object. If the point_type is not specified, then
     * points for both wires and faces are returned.
     * @return The array of points.
     */
    public objGetPoints(id: number, point_type?: EGeomType.wires|EGeomType.faces): number[][][] {
        let w_points: number[][] = [];
        if (point_type === undefined || point_type === EGeomType.wires) {
            w_points = this._objs[id][0].map((w) => w.filter((v) => (v !== -1)));
        }
        let f_points: number[][] = [];
        if (point_type === undefined || point_type === EGeomType.faces) {
            f_points = this._objs[id][1].map((f) => f.filter((v) => (v !== -1)));
        }
        return [w_points, f_points];
    }

    /**
     * Get the set of unique points for this object.
     * @return The array of point IDs.
     */
    public objGetGetPointSet(id: number): Set<number> {
        return new Set(Arr.flatten(this.objGetPoints(id)));
    }

    /**
     * Get the vertices for this object. If the vertex_type is not specified, then
     * vertices for both wires and faces are returned.
     * @return The array of vertices.
     */
    public objGetVertices(id: number, vertex_type?: EGeomType.wires|EGeomType.faces): ITopoPathData[][][] {
        const w_vertices: ITopoPathData[][] = [];
        if (vertex_type === undefined || vertex_type === EGeomType.wires) {
            for (let wi = 0; wi < this._objs[id][0].length; wi++) {
                const wire:number[] = this._objs[id][0][wi];
                const v_paths: ITopoPathData[] = [];
                for (let vi = 0; vi < wire.length; vi++) {
                    if (wire[vi] !== -1) {
                        v_paths.push({id: id, tt: 0, ti: wi, st: 0, si: vi});
                    }
                }
                w_vertices.push(v_paths);
            }
        }
        const f_vertices: ITopoPathData[][] = [];
        if (vertex_type === undefined || vertex_type === EGeomType.faces) {
            for (let fi = 0; fi < this._objs[id][1].length; fi++) {
                const face:number[] = this._objs[id][0][fi];
                const v_paths: ITopoPathData[] = [];
                for (let vi = 0; vi < face.length; vi++) {
                    if (face[vi] !== -1) {
                        v_paths.push({id: id, tt: 1, ti: fi, st: 0, si: vi});
                    }
                }
                w_vertices.push(v_paths);
            }
        }
        return [w_vertices, f_vertices];
    }

    /**
     * Get the edges for this object. If the edge_type is not specified, then
     * edges for both wires and faces are returned.
     * @return The array of edges.
     */
    public objGetEdges(id: number, edge_type?: EGeomType.wires|EGeomType.faces): ITopoPathData[][][] {
        const w_edges: ITopoPathData[][] = [];
        if (edge_type === undefined || edge_type === EGeomType.wires) {
            for (let wi = 0; wi < this._objs[id][0].length; wi++) {
                const wire:number[] = this._objs[id][0][wi];
                const e_paths: ITopoPathData[] = [];
                for (let vi = 0; vi < wire.length; vi++) {
                    if (vi < wire.length - 1 || wire[vi] === -1) {
                        e_paths.push({id: id, tt: 0, ti: wi, st: 1, si: vi});
                    }
                }
                w_edges.push(e_paths);
            }
        }
        const f_edges: ITopoPathData[][] = [];
        if (edge_type === undefined || edge_type === EGeomType.faces) {
            for (let fi = 0; fi < this._objs[id][1].length; fi++) {
                const face:number[] = this._objs[id][0][fi];
                const e_paths: ITopoPathData[] = [];
                for (let vi = 0; vi < face.length; vi++) {
                    if (vi < face.length - 1 || face[vi] === -1) {
                        e_paths.push({id: id, tt: 1, ti: fi, st: 1, si: vi});
                    }
                }
                f_edges.push(e_paths);
            }
        }
        return [w_edges, f_edges];
    }

    /**
     * Get the wires for this object.
     * @return The array of wires.
     */
    public objGetWires(id: number): ITopoPathData[] {
        return this._objs[id][0].map((w,wi) => Object({id: id, tt: 0, ti: wi}));
    }

    /**
     * Get the faces for this object.
     * @return The array of faces.
     */
    public objGetFaces(id: number): ITopoPathData[] {
        return this._objs[id][1].map((f,fi) => Object({id: id, tt: 1, ti: fi}));
    }

    /**
     * Get the number of wires for this object.
     * @return The number of wires.
     */
    public objNumWires(id: number): number {
        return this._objs[id][0].length;
    }

    /**
     * Get the number of faces for this object.
     * @return The number of faces.
     */
    public objNumFaces(id: number): number {
        return this._objs[id][1].length;
    }

    /**
     * Get all the groups for which this obj is a member.
     * @return The array of group names.
     */
    public objGetGroups(id: number): string[] {
        const names: string[] = [];
        this._groups.forEach((v,k) => (v.objs.indexOf(id) !== -1) && names.push(v.name));
        return names;
    }

    //  Points -------------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public pointSetPosition(id: number, xyz: number[]): number[] {
        const old_xyz: number[] = this._points[1][this._points[0][id]];
        if (Arr.equal(xyz, old_xyz)) {return old_xyz; }
        let value_index: number = Arr.indexOf(xyz, this._points[1]);
        if (value_index === -1) {
            value_index = this._points[1].length;
            this._points[1].push(xyz);
        }
        this._points[0][id] = value_index;
        return old_xyz;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public pointGetPosition(point_id: number): number[] {
        return this._points[1][this._points[0][point_id]];
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public pointGetVertices(id: number): ITopoPathData[] { // TODO replace implementation with reverse map
        const vertices: ITopoPathData[]  = [];
        for (const [obj_id_str, obj] of this._objs.entries()) { // sparse array
            obj[0].forEach((w,wi) => w.forEach((v,vi) => (v === id) && vertices.push( // Slow
                {id: Number(obj_id_str), tt: 0, ti: wi, st: 0, si: vi})));
            obj[1].forEach((f,fi) => f.forEach((v,vi) => (v === id) && vertices.push( // Slow
                {id: Number(obj_id_str), tt: 1, ti: fi, st: 0, si: vi})));
        }
        return vertices;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public pointIsUnused(point_id: number): boolean { // TODO replace implementation with reverse map
        for (const obj of this._objs.values()) { // sparse array
            if (Arr.flatten(obj.slice(0,3)).indexOf(point_id) !== -1) {return false;} // Slow
        }
        return true;
    }

    /**
     * Get all the groups for which this point is a member.
     * @return The array of group names.
     */
    public pointGetGroups(id: number): string[] {
        const names: string[] = [];
        this._groups.forEach((v,k) => (v.points.indexOf(id) !== -1) && names.push(v.name));
        return names;
    }

    //  Topo ---------------------------------------------------------------------------------

    /**
     * Get the number of vertices in this wire or face.
     * @return The number of vertices.
     */
    public topoNumVertices(topo_path: ITopoPathData): number {
        const vertices: number[] = this._objs[topo_path.id][topo_path.tt][topo_path.ti];
        if (vertices[length - 1] === -1) {
            return vertices.length - 1;
        } else {
            return vertices.length;
        }
    }

    /**
     * Get the number of edges in this wire or face.
     * @return The number of edges.
     */
    public topoNumEdges(topo_path: ITopoPathData): number {
        return this._objs[topo_path.id][topo_path.tt][topo_path.ti].length - 1;
    }

    /**
     * Get the vertices for this wire or face.
     * @return An array of vertices.
     */
    public topoGetVertices(topo_path: ITopoPathData): ITopoPathData[] {
        const vertices: ITopoPathData[] = [];
        for (let i = 0; i < this.topoNumVertices(topo_path); i++) {
            vertices.push({id: topo_path.id, tt: topo_path.tt, ti: topo_path.ti, st: 0, si: i});
        }
        return vertices;
    }
    /**
     * Get the edges for this wire or face.
     * @return An array of edges.
     */
    public topoGetEdges(topo_path: ITopoPathData): ITopoPathData[] {
        const edges: ITopoPathData[] = [];
        for (let i = 0; i < this.topoNumEdges(topo_path); i++) {
            edges.push({id: topo_path.id, tt: topo_path.tt, ti: topo_path.ti, st: 1, si: i});
        }
        return edges;
    }

    /**
     * Return true if this wire is closed. For faces, the result is always true.
     * @return boolean
     */
    public topoIsClosed(topo_path: ITopoPathData): boolean {
        const wf_topo: number[] = this._points[topo_path.id][topo_path.tt][topo_path.ti];
        return (wf_topo[wf_topo.length - 1] === -1);
    }

    /**
     * Within the parent object, find all faces or wires that share at least n points.
     * @return An array of faces.
     */
    public topoFindSharedPoints(topo_path: ITopoPathData, num_shared_points?: number): ITopoPathData[] {
        // TODO trees
        throw new Error ("Method not implemented.");
    }

    /**
     * Get the group names for all the groups for which this topological component is a member.
     * @return The array of group names.
     */
    public topoGetGroups(path: ITopoPathData): string[] {
        const group_names: string[] = [];
        this._topos_trees.forEach((tree,group_name) =>
            tree.hasTopo(path) && group_names.push(group_name));
        return group_names;
    }

    //  Edges --------------------------------------------------------------------------------------

    /**
     * Get the two vertices for this edge.
     * @return An array of two edges.
     */
    public edgeGetVertices(edge_path: ITopoPathData): ITopoPathData[] {
        let vertex_index: number = edge_path.si + 1;
        const wf_path: ITopoPathData = this.edgeGetTopo(edge_path);
        if (vertex_index > this.topoNumEdges(wf_path) - 1) {
            vertex_index = 0;
        }
        return [
            {id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti, st: 0, si: edge_path.si},
            {id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti, st: 0, si: vertex_index},
        ];
    }

    /**
     * Get the wire or face to which this edge belongs.
     * @return The wire or face.
     */
    public edgeGetTopo(edge_path: ITopoPathData): ITopoPathData {
        return {id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti};
    }

    /**
     * Find the next edge in the sequence of edges in the wire or face.
     * @return The next edge object.
     */
    public edgeNext(edge_path: ITopoPathData): ITopoPathData {
        let edge_index: number = edge_path.si + 1;
        const wf_path: ITopoPathData = this.edgeGetTopo(edge_path);
        if (edge_index > this.topoNumEdges(wf_path) - 1) {
            if (!this.topoIsClosed(wf_path)) {return null; }
            edge_index = this.topoNumEdges(wf_path) - 1;
        }
        return {id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti, st: edge_path.st, si: edge_index};
    }

    /**
     * Find the previous edge in the sequence of edges in the wire or face.
     * @return The previous edge object.
     */
    public edgePrevious(edge_path: ITopoPathData): ITopoPathData {
        let edge_index: number = edge_path.si - 1;
        const wf_path: ITopoPathData = this.edgeGetTopo(edge_path);
        if (edge_index < 0) {
            if (!this.topoIsClosed(wf_path)) {return null; }
            edge_index = this.topoNumEdges(wf_path) - 1;
        }
        return {id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti, st: edge_path.st, si: edge_index};
    }

    //  Vertices -----------------------------------------------------------------------------------

    /**
     * Get the point associated with this vertex.
     * @return The point object.
     */
    public vertexGetPoint(vertex_path: ITopoPathData): number {
        return this._objs[vertex_path.id][vertex_path.tt][vertex_path.ti][vertex_path.st][vertex_path.si];
    }

    /**
     * Get the edge for which this is the start vertex.
     * @return The edge object.
     */
    public vertexGetEdge(vertex_path: ITopoPathData): ITopoPathData {
        let edge_index: number = vertex_path.si;
        const wire_or_face:ITopoPathData = this.vertexGetTopo(vertex_path);
        if (edge_index > this.topoNumEdges(wire_or_face) - 1) {
            if (!this.topoIsClosed(wire_or_face)) {return null; }
            edge_index = 0;
        }
        return {id: vertex_path.id, tt: vertex_path.tt, ti: vertex_path.ti, st: 1, si: edge_index};
    }

    /**
     * Get the wire or face to which this vertex belongs.
     * @return The wire or face object.
     */
    public vertexGetTopo(vertex_path: ITopoPathData): ITopoPathData {
        return {id: vertex_path.id, tt: vertex_path.tt, ti: vertex_path.ti};
    }

    /**
     * Find the next vertex in the sequence of vertices in the wire or face.
     * @return The next vertex object.
     */
    public vertexNext(vertex_path: ITopoPathData): ITopoPathData {
        let edge_index: number = vertex_path.si;
        const wf_topos: ITopoPathData = this.vertexGetTopo(vertex_path);
        if (edge_index > this.topoNumEdges(wf_topos) - 1) {
            if (!this.topoIsClosed(wf_topos)) {return null; }
            edge_index += 1;
        }
        return {id: vertex_path.id, tt: vertex_path.tt, ti: vertex_path.ti, st: 0, si: edge_index};
    }

    /**
     * Find the previous vertex in the sequence of vertices in the wire or face.
     * @return The previous vertex object.
     */
    public vertexPrevious(vertex_path: ITopoPathData): ITopoPathData {
        let edge_index: number = vertex_path.si;
        const wf_topos: ITopoPathData = this.vertexGetTopo(vertex_path);
        if (edge_index === 0) {
            if (!this.topoIsClosed(wf_topos)) {return null; }
            edge_index = this.topoNumVertices(wf_topos) - 1;
        }
        return {id: vertex_path.id, tt: vertex_path.tt, ti: vertex_path.ti, st: 0, si: edge_index};
    }

    //  Attributes ---------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public attribSetName(old_name, new_name, geom_type: EGeomType): boolean {
        if (!this._attribs.get(geom_type).has(old_name)) {return false; }
        if (this._attribs.get(geom_type).has(new_name)) {return false; }
        this._attribs.get(geom_type).set(new_name, this._attribs.get(geom_type).get(old_name));
        this._attribs.get(geom_type).delete(old_name);
        return true;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public attribGetName(geom_type: EGeomType): string[] {
        const names: string[] = [];
        this._attribs.get(geom_type).forEach((a) => names.push(a.name));
        return names;
    }

    //  Attribute values for Entities --------------------------------------------------------------

    /**
     * Get a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param id The id of a geometric entity.
     * @return The value.
     */
    public entAttribGetValue(name: string, geom_type: EGeomType, id: number): any {
        const data: IAttribData = this._attribs.get(geom_type).get(name);
        return data.values[1][data.values[0][id]];
    }

    /**
     * Set a single attribute value.
     * The data type of the attribute value must match the getDataType() method.
     * @param id The id of a geometric entity.
     * @param value The new value.
     * @return The old value.
     */
    public entAttribSetValue(name: string, geom_type: EGeomType, id: number, value: any): any {
        const data: IAttribData = this._attribs.get(geom_type).get(name);
        let index: number = Arr.indexOf(value, data.values);
        if (index === -1) {
            index = data.values[1].push(value) - 1;
        }
        let old_value: any;
        old_value = data.values[1][data.values[0][id]];
        data.values[0][id] = index;
        return old_value;
    }

    //  Attributes Values for Topos ----------------------------------------------------------------

    /**
     * Get a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param path The path to a topological component.
     * @return The value.
     */
    public topoAttribGetValue(name: string, geom_type: EGeomType, path: ITopoPathData): any {
        const data: IAttribData = this._attribs.get(geom_type).get(name);
        switch (geom_type) {
            case EGeomType.wires: case EGeomType.faces:
                return data.values[1][data.values[0][path.id][path.ti]];
            case EGeomType.vertices: case EGeomType.edges:
                return data.values[1][data.values[0][path.id][path.ti][path.si]];
        }
    }

    /**
     * Set a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param path The path to a topological component.
     * @param value The new value.
     * @return The old value.
     */
    public topoAttribSetValue(name: string, geom_type:EGeomType, path: ITopoPathData, value: any): any {
        const data: IAttribData = this._attribs.get(geom_type).get(name);
        let index: number = Arr.indexOf(value, data.values);
        if (index === -1) {
            index = data.values[1].push(value) - 1;
        }
        let old_value: any;
        switch (geom_type) {
            case EGeomType.wires: case EGeomType.faces:
                old_value = data.values[1][data.values[0][path.id][path.ti]];
                data.values[0][path.id][path.ti] = index;
                return old_value;
            case EGeomType.vertices: case EGeomType.edges:
                old_value = data.values[1][data.values[0][path.id][path.ti][path.si]];
                data.values[0][path.id][path.ti][path.si] = index;
                return old_value;
        }
    }

    //  Group manipulation methods -----------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public groupSetName(old_name, new_name): boolean {
        if (!this._groups.has(old_name)) {return false; }
        if (this._groups.has(new_name)) {return false; }
        this._groups.set(new_name, this._groups.get(old_name));
        this._groups.delete(old_name);
        return true;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupGetParent(name: string): string {
        return this._groups.get(name).parent;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupSetParent(name: string, parent: string): string {
        const old_parent_name: string = this._groups.get(name).parent;
        this._groups.get(name).parent = name;
        return old_parent_name;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupGetChildren(name: string): string[] {
        const children: string[] = [];
        this._groups.forEach((g) => (g.parent === name) && children.push(g.name));
        return children;
    }

    // Objs in group -------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public groupGetObjIDs(name: string, obj_type?: EObjType): number[] {
        const group: IGroupData = this._groups.get(name);
        if (obj_type === undefined) {return group.objs; }
        const ids: number[] = [];
        group.objs.forEach((oi) => (this._objs[oi][2][0] === obj_type) && ids.push(oi));
        return ids;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupAddObj(name: string, id: number): boolean {
        const group: IGroupData = this._groups.get(name);
        if (id in group.objs) {return false;}
        else {group.objs.push(id); } // double check, I still have duplicates
        return true;
    }

    /**
     * to be completed
     *
     * @param
     * @return Returns true if all obj IDs were added, false otherwise.
     */
    public groupAddObjs(name: string, ids: number[]): boolean {
        const group: IGroupData = this._groups.get(name);
        let ok: boolean = true;
        for (const id of ids) {
            if (!this.groupAddObj(name, id)) {ok = false; }
        }
        return ok;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public groupRemoveObj(name: string, id: number): boolean {
        const group: IGroupData = this._groups.get(name);
        const index = group.objs.indexOf(id);
        if (index === -1) {return false; }
        group.objs.splice(index, 1);
        return true;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupRemoveObjs(name: string, ids: number[]): boolean {
        const group: IGroupData = this._groups.get(name);
        let ok: boolean = true;
        for (const id of ids) {
            if (!this.groupRemoveObj(name, id)) {ok = false; }
        }
        return ok;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupHasObj(name: string, id: number): boolean {
        const group: IGroupData = this._groups.get(name);
        const index = group.objs.indexOf(id);
        if (index === -1) {return false; }
        return true;
    }

    // Topos in group ------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public groupGetTopos(name: string, geom_type?: EGeomType): ITopoPathData[] {
        return this._topos_trees.get(name).getTopos();
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public groupAddTopo(name: string, topo: ITopoPathData): void {
        this._topos_trees.get(name).addTopo(topo);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupAddTopos(name: string, topos: ITopoPathData[]): void {
        topos.forEach((v, i) => this._topos_trees.get(name).addTopo(v));
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupRemoveTopo(name: string, topo: ITopoPathData): boolean {
        return this._topos_trees.get(name).removeTopo(topo);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public groupRemoveTopos(name: string, topos: ITopoPathData[]): boolean {
        let ok: boolean = true;
        for (const topo of topos) {
            if (!this._topos_trees.get(name).removeTopo(topo)) {ok = false; }
        }
        return ok;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupHasTopo(name: string, topo: ITopoPathData): boolean {
        return this._topos_trees.get(name).hasTopo(topo);
    }

    //  Points in group ----------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public groupGetPointIDs(name: string): number[] {
        return this._groups.get(name).points;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupAddPoint(name: string, id: number): boolean {
        const group: IGroupData = this._groups.get(name);
        if (id in group.points) {return false; }
        group.points.push(id);
        return true;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupAddPoints(name: string, ids: number[]): boolean {
        const group: IGroupData = this._groups.get(name);
        let ok: boolean = true;
        for (const id of ids) {
            if (!this.groupAddPoint(name, id)) {ok = false; }
        }
        return ok;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupRemovePoint(name: string, id: number): boolean {
        const group: IGroupData = this._groups.get(name);
        const index = group.points.indexOf(id);
        if (index === -1) {return false; }
        group.points.splice(index, 1);
        return true;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupRemovePoints(name: string, ids: number[]): boolean {
        let ok: boolean = true;
        for (const id of ids) {
            if (!this.groupRemovePoint(name, id)) {ok = false; }
        }
        return ok;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupHasPoint(name: string, id: number): boolean {
        const index = this._groups.get(name).points.indexOf(id);
        if (index === -1) {return false; }
        return true;
    }

    //  Group Properties ---------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public groupGetProps(name: string): Array<[string, any]> { //TODO change to Map
        return this._groups.get(name).props;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public groupSetProps(name: string, new_map: Array<[string, any]>): Array<[string, any]> { //TODO
        const old_map = this._groups.get(name).props;
        this._groups.get(name).props = new_map ;
        return old_map;
    }

    //  ============================================================================================
    //  ============================================================================================
    //  PRIVATE METHODS ============================================================================
    //  ============================================================================================
    //  ============================================================================================

    //  Creating and deleting object and points ----------------------------------------------------

    /**
     * This method assumes that the object id is for a newly created object.
     * It creates null attribute values for all attributes in the model.
     * @param
     * @return
     */
    private _addObjToAttribs(id: number): void {
        for (const attrib of this._attribs.get(EGeomType.objs).values()) {
            attrib.values[0][id] = 0;
        }
        for (const attrib of this._attribs.get(EGeomType.wires).values()) {
            attrib.values[0][id] = Arr.make(this._objs[id][0].length, 0);
        }
        for (const attrib of this._attribs.get(EGeomType.faces).values()) {
            attrib.values[0][id] = Arr.make(this._objs[id][1].length, 0);
        }
        for (const attrib of this._attribs.get(EGeomType.edges).values()) {
            attrib.values[0][id] =
                [
                    this._objs[id][0].map((w, wi) =>
                        Arr.make(w.filter((v) => v !== -1).length, 0)),
                    this._objs[id][1].map((f, fi) =>
                        Arr.make(f.filter((v) => v !== -1).length, 0)),
                ];
        }
        for (const attrib of this._attribs.get(EGeomType.vertices).values()) {
            attrib.values[0][id] =
                [
                    this._objs[id][0].map((w, wi) =>
                        Arr.make(w.filter((v) => v !== -1).length, 0)),
                    this._objs[id][1].map((f, fi) =>
                        Arr.make(f.filter((v) => v !== -1).length, 0)),
                ];
        }
    }
    /**
     * This method assumes that the object id is for an object that is about to be deleted.
     * It deletes the attributs values for all attributes in the model.
     * @param
     * @return
     */
    private _delObjFromAttribs(id: number): void {
        for (const attrib of this._attribs.get(EGeomType.objs).values()) {
            delete attrib.values[0][id];
        }
        for (const attrib of this._attribs.get(EGeomType.wires).values()) {
            delete attrib.values[0][id];
        }
        for (const attrib of this._attribs.get(EGeomType.faces).values()) {
            delete attrib.values[0][id];
        }
        for (const attrib of this._attribs.get(EGeomType.edges).values()) {
            delete attrib.values[0][id];
        }
        for (const attrib of this._attribs.get(EGeomType.vertices).values()) {
            delete attrib.values[0][id];;
        }
    }

    /**
     * This method assumes that the point id is for a newly created point.
     * It creates null attribute values for all point attributes in the model.
     * @param
     * @return
     */
    private _addPointToAttribs(id: number): void {
        for (const attrib of this._attribs.get(EGeomType.points).values()) {
            attrib.values[0][id] = 0;
        }
    }

    /**
     * This method assumes that the point id is for an point that is about to be deleted.
     * It deletes the attributs values for this point for all attributes in the model.
     * @param
     * @return
     */
    private _delPointFromAttribs(id: number): void {
        for (const attrib of this._attribs.get(EGeomType.points).values()) {
            delete attrib.values[0][id];
        }
    }

    /**
     * This method assumes that the object id is for an object that is about to be deleted.
     * It deletes the attributs values for all attributes in the model.
     * @param
     * @return
     */
    private _delPointFromObjs(id: number): void {
        for (const [obj_id_str, obj] of this._objs.entries()) { // sparse array
            switch (obj[2][0]) {
                case 100:
                    for (let wi = 0; wi < obj[0].length; wi++) {
                        const w: number[] = obj[0][wi];
                        const point_index: number = w.indexOf(id);
                        if (point_index !== -1) {
                            let num_vertices = w.length;
                            if (w[w.length - 1] === -1) {num_vertices--;}
                            if (num_vertices > 3 ) {
                                w.splice(point_index, 1); //delete one vertex
                            } else {
                                obj[0].splice(wi,1); //delete the whole wire
                            }
                        }
                    }
                    break;
                case 200:
                    let changed: boolean = false;
                    for (let fi = 0; fi < obj[1].length; fi++) {
                        const f: number[] = obj[1][fi];
                        const point_index: number = f.indexOf(id);
                        if (point_index !== -1) {
                            changed = true;
                            let num_vertices = f.length - 1;
                            if (num_vertices > 3 ) {
                                f.splice(point_index, 1); //delete one vertex
                            } else {
                                obj[1].splice(fi,1); //delete the whole face
                            }
                        }
                    }
                    if (changed) {
                        if (obj[1].length === 0) {
                            delete this._objs[obj_id_str]; //if no faces, delete whole obj
                        } else {
                            obj[0] = this._findPolymeshWires(obj[1]);
                        }
                    }
                    break;
            }
        }
    }

    /**
     * This method assumes that the object id is for an object that is about to be deleted.
     * It deletes the attributs values for all attributes in the model.
     * @param
     * @return
     */
    private _delObjFromGroups(id: number): void {
        for (const [name, group] of this._groups.entries()) {
            // objects
            const oi: number = group.objs.indexOf(id);
            if (oi !== -1) {group.objs.splice(oi, 1);}
            // topos
            this._topos_trees.get(name).removeObj(id);
        }
    }

    /**
     * This method assumes that the point id is for an point that is about to be deleted.
     * It deletes the attributs values for all attributes in the model.
     * @param
     * @return
     */
    private _delPointFromGroups(id: number): void {
        for (const [name, group] of this._groups.entries()) {
            const pi: number = group.points.indexOf(id);
            if (pi !== -1) {group.objs.splice(pi, 1);}
        }
    }

    //  --------------------------------------------------------------------------------------------

    /**
     * Add an attributes value.
     * @param path The path to a geometric entity or topological component.
     * @return True if the path does not exist.
     */
    private _addTopoAttribValue(name: string, geom_type: EGeomType, path: ITopoPathData): boolean  {
        const data: IAttribData = this._attribs.get(geom_type).get(name);
        switch (geom_type) {
            case EGeomType.wires: case EGeomType.faces:
                if (data.values[0][path.id] === undefined) {data.values[0][path.id] = []; }
                if (data.values[0][path.id][path.ti] !== undefined) {return false; }
                data.values[0][path.id][path.ti] = 0;
                return true;
            case EGeomType.vertices: case EGeomType.edges:
                if (data.values[0][path.id] === undefined) {data.values[0][path.id] = []; }
                if (data.values[0][path.id][path.ti] === undefined) {data.values[0][path.id][path.ti] = []; }
                if (data.values[0][path.id][path.ti][path.si] !== undefined) {return false; }
                data.values[0][path.id][path.ti][path.si] = 0;
                return true;
        }
    }

    /**
     * Delete an attribute value.
     * @param path The path to a geometric entity or topological component.
     * @return The attribute value.
     */
    private _delTopoAttribValue(name: string, geom_type: EGeomType, path: ITopoPathData): any  {
        const data: IAttribData = this._attribs.get(geom_type).get(name);
        let old_value: any;
        switch (geom_type) {
            case EGeomType.wires: case EGeomType.faces:
                old_value = data.values[1][data.values[0][path.id][path.ti]];
                delete data.values[0][path.id][path.ti];
                return old_value;
            case EGeomType.vertices: case EGeomType.edges:
                old_value = data.values[1][data.values[0][path.id][path.ti][path.si]];
                delete data.values[0][path.id][path.ti][path.si];
                return old_value;
        }
        return null;
    }

    /**
     * Template is an array full of zeros, but with the right structure for the attribute data
     * @param
     * @return
     */
    private _getAttribTemplate(geom_type: EGeomType): any[] {
        switch (geom_type) {
            case EGeomType.objs:
                return Arr.make(this.geomNumObjs(), 0);
            case EGeomType.faces:
                return this._objs.map((o) =>
                        [o[1].map((f) => Arr.make(f.length, 0))]);
            case EGeomType.wires:
                return this._objs.map((o) =>
                        [o[0].map((w) => Arr.make(w.length, 0))]);
            case EGeomType.edges:
                return this._objs.map((o) => [
                    o[0].map((w) => Arr.make(w.length - 1, 0)),
                    o[1].map((f) => Arr.make(f.length - 1, 0)),
                ]);
            case EGeomType.vertices:
                return this._objs.map((o) => [
                    o[0].map((w) => Arr.make(w.filter((wi) => (wi !== -1)).length, 0)),
                    o[1].map((f) => Arr.make(f.filter((fi) => (fi !== -1)).length, 0)),
                ]);
            case EGeomType.points:
                return Arr.make(this.geomNumPoints(), 0);
        }
    }

    //  --------------------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return Object of type Polymesh
     */
    private _findPolymeshWires(face_ids: number[][]): number[][] {
        const wire_ids: number[][] = [];
        const edges: number[][] = [];
        for (const f of face_ids) {
            for (let i = 0; i < f.length; i++) {
                const v1 = f[i];
                let i2 = i + 1;
                if (i2 === f.length) {i2 = 0; }
                const v2 = f[i2];
                edges.push([v1, v2]);
            }
        }
        const naked_edges: number[][] = [];
        for (const e of edges) {
            if (Arr.indexOf([e[1], e[0]], edges) === -1) {naked_edges.push(e); }
        }
        if (naked_edges.length === 0) {
            return [];
        }
        const sorted_naked_edges: number[][][] = [[naked_edges[0]]];
        const already_used: number[][] = [naked_edges[0]];
        for (const _ of naked_edges) {
            const current_wire_edges: number[][] = sorted_naked_edges[sorted_naked_edges.length - 1];
            const start: number = current_wire_edges[0][0];
            const end: number = current_wire_edges[current_wire_edges.length - 1][1];
            if (start === end) {
                for (const e of naked_edges) {
                    if (Arr.indexOf(e, already_used) === -1) {
                        sorted_naked_edges.push([e]);
                        already_used.push(e);
                        break;
                    }
                }
            } else {
                for (const e of naked_edges) {
                    if (e[0] === end) {
                        current_wire_edges.push(e);
                        already_used.push(e);
                        break;
                    }
                }
            }
        }
        const naked_wires: number[][] = sorted_naked_edges.map((w) => Arr.flatten(w.map((e) => e[0])));
        return naked_wires;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    private _getVEPathsFromWF(path_arr: ITopoPathData[], obj_id: number,
                              wf_data: any[], wf_topos: 0|1, v_or_e: 0|1): void {
        // loop through all the wire or faces, and create paths for all the vertices or edges
        for (let wf_index = 0; wf_index < wf_data.length; wf_index++) {
            for (let ve_index = 0; ve_index < wf_data[wf_index].length - v_or_e; ve_index++) {
                if (wf_data[wf_index][ve_index] !== -1) {
                    path_arr.push(
                        {id: Number(obj_id), tt: wf_topos, ti: wf_index, st: v_or_e, si: ve_index});
                }
            }
        }
    }

    /**
     * to be completed
     * @param
     * @return
     */
    private _getVEPathsFromObjsData(objs_data: any[], v_or_e: 0|1): ITopoPathData[] {
        const path_arr: ITopoPathData[] = [];
        // loop through all the objects
        for (const obj_id_str of objs_data.keys()) {  // sparse array
            const w_data: number[][] = objs_data[obj_id_str][0];
            this._getVEPathsFromWF(path_arr, Number(obj_id_str), w_data, 0, v_or_e);
            const f_data: number[][] = objs_data[obj_id_str][1];
            this._getVEPathsFromWF(path_arr, Number(obj_id_str), f_data, 1, v_or_e);
        }
        return path_arr;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    private _getWFPathsFromObjsData(objs_data: any[], wf_topos: 0|1): ITopoPathData[] {
        const path_arr: ITopoPathData[] = [];
        // loop through all the objects, and create paths for wires or faces
        for (const obj_id_str of objs_data.keys()) { // sparse arrays
            const wf_data: number[][] = objs_data[obj_id_str][wf_topos]; // wf_choice is 0 or 1, wires or faces
            for (let wf_index = 0; wf_index < wf_data.length; wf_index++) {
                path_arr.push({id: Number(obj_id_str), tt: wf_topos, ti: wf_index});
            }
        }
        return path_arr;
    }
}