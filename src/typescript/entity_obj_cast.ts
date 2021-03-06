import {IObj, IRay, IPlane, ICircle, IEllipse, IPolyline, IPolymesh} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {EObjType} from "./enums";
import {Point} from "./entity_point";
import {Polyline} from "./entity_obj_polyline";
import {Circle} from "./entity_obj_circle";
import {Polymesh} from "./entity_obj_polymesh";
import {Plane} from "./entity_obj_plane";
import {Ray} from "./entity_obj_ray";

/**
 * A function to cast obj class to subclass.
 * @param
 * @return
 */
export function _castToObjType(_kernel: Kernel, id: number): IRay|IPlane|ICircle|IPolyline|IPolymesh {
    const obj_type = _kernel.objGetType(id);
    switch (obj_type) {
        case EObjType.ray:
            return new Ray(_kernel, id);
        case EObjType.plane:
            return new Plane(_kernel, id);
        case EObjType.circle:
            return new Circle(_kernel, id);
        case EObjType.polyline:
            return new Polyline(_kernel, id);
        case EObjType.polymesh:
            return new Polymesh(_kernel, id);

        default:
            throw new Error("Object type does not exist.");
        // TODO add more here
    }
}
