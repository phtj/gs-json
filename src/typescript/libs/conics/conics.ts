import * as three from "three";
import * as gs from "../../gs-json";
import * as threex from "../threex/threex";

/**
 * Calculate a set of xyz position on the circle/arc ir ellipse/arc. The number of points = length / resolution.
 * With resolution from 0.0001 to 0.5, 0.0001 being a higher resolution than 0.5
 */
export function getRenderXYZs(obj: gs.IObj, resolution: number): gs.XYZ[] {
    switch (obj.getObjType()) {
        case gs.EObjType.circle:
            return circleGetRenderXYZs(obj as gs.ICircle, resolution);
        case gs.EObjType.ellipse:
            return ellipseGetRenderXYZs(obj as gs.IEllipse, resolution);
        default:
            throw new Error("Invalid object type.");
    }
}

/**
 * Calculate the length of the circle or arc.
 */
export function circleLength(circle: gs.ICircle): number {
    const rad: number = circle.getRadius();
    const angles: number[] = circle.getAngles();
    // calculate the angle of the arc
    let arc_angle: number;
    if (angles === undefined) {
        return 2 * Math.PI * rad;
    } else if (angles[0] < angles[1]) {
        arc_angle = (angles[1]-angles[0]);
    } else {
        arc_angle = (angles[0]-angles[1]);
    }
    return 2 * Math.PI * rad * (arc_angle / 360);
}

/**
 * Calculate the xyz position at parameter t on the circle or arc. The t parameter range is from 0 to 1.
 */
export function circleEvaluate(circle: gs.ICircle, t: number): gs.XYZ {
    const rad: number = circle.getRadius();
    const angles: number[] = circle.getAngles();
    // set arc start and arc end angles, in radians
    let ang_start: number;
    let ang_end: number;
    if (angles === undefined) {
        ang_start = 0;
        ang_end = Math.PI * 2;
    } else {
        ang_start = angles[0] * (Math.PI / 180);
        ang_end = angles[1] * (Math.PI / 180);
    }
    // calculate the angle of the arc
    let arc_angle: number;
    if (ang_start < ang_end) {
        arc_angle = ang_end - ang_start;
    } else {
        arc_angle = ((Math.PI * 2) - ang_start) + ang_end;
    }
    // create matrix to map from XY plane into the 3D plane for circle
    const matrix_inv: three.Matrix4 =
        threex.matrixInv(threex.xformMatrixFromXYZs(circle.getOrigin().getPosition(), circle.getAxes()));
    // calculate the point
    const alpha: number = ang_start + (t * arc_angle);
    const point: three.Vector3 = new three.Vector3(rad * Math.cos(alpha), rad * Math.sin(alpha), 0);
    point.applyMatrix4(matrix_inv);
    // return the points
    return point.toArray() as gs.XYZ;
}

/**
 * Project a point on a circle, and calculate the parameter t.
 */
export function circleEvaluatePoint(circle: gs.ICircle, point: gs.IPoint): number {
    const angles: number[] = circle.getAngles();
    // create matrix to map from the 3D plane for circle into the XY plane
    const matrix: three.Matrix4 =
        threex.xformMatrixFromXYZs(circle.getOrigin().getPosition(), circle.getAxes());
    // map the point onto the XY plane
    const xyz_2d: gs.XYZ = threex.multXYZMatrix(point.getPosition(), matrix);
    // calculate the angle between the point vector and the x axis, in radians
    let point_angle = Math.atan2(xyz_2d[1], xyz_2d[0]);
    if (point_angle < 0) {point_angle += (2 * Math.PI); }
    // calculate t for a closed circle
    if (angles === undefined) {
        return point_angle / (2 * Math.PI);
    }
    // convert angles to radians
    const ang_start: number = angles[0] * (Math.PI / 180);
    const ang_end: number = angles[1] * (Math.PI / 180);
    // calculate t for an arc
    if (ang_start < ang_end) {
        // calc arc angle
        const arc_angle: number = ang_end - ang_start;
        // the point is on the arc
        if ((point_angle >= ang_start) && (point_angle <= ang_end)) {
            return (point_angle - ang_start) / arc_angle;
        }
        // the point is not on the arc, so it must be at an end point
        else {
            let rotated: number = point_angle - (ang_start + (arc_angle / 2));
            if (rotated < 0) {rotated = rotated + (Math.PI * 2); }
            if (rotated > Math.PI) {
                return 0;
            } else {
                return 1;
            }
        }
    } else {
        // calc arc angle
        const arc_angle_lower: number = ((Math.PI * 2) - ang_start);
        const arc_angle_upper: number = ang_end;
        const arc_angle: number = arc_angle_lower + arc_angle_upper;
        //  the point is on the outer arc, below the x axis
        if (point_angle >= ang_start) {
            return (point_angle - ang_start) / arc_angle;
        }
        // the point is on the outer arc, above the x axis
        else if (point_angle <= ang_end) {
            return (arc_angle_lower + point_angle) / arc_angle;
        }
        // the point is not on the outside arc, so it must be at an end point
        else {
            const rotated: number = point_angle + ((arc_angle / 2) - ang_end);
            if (rotated > Math.PI) {
                return 0;
            } else {
                return 1;
            }
        }
    }
}


/**
 * Calculate a set of xyz position on the circle or arc. The number of points = length / resolution.
 * With resolution from 0.0001 to 0.5, 0.0001 being a higher resolution than 0.5
 */
export function circleGetRenderXYZs(circle: gs.ICircle, resolution: number): gs.XYZ[] { // TODO remove resolution
    const rad: number = circle.getRadius();
    const angles: number[] = circle.getAngles();
    // calculat the arc start angle
    let arc_start: number;
    if (angles === undefined) {
        arc_start = 0;
    } else {
        arc_start = angles[0] * (Math.PI / 180);
    }
    // calculate the angle of the arc
    let arc_angle: number;
    if (angles === undefined) {
        arc_angle = 2 * Math.PI;
    } else if (angles[0] < angles[1]) {
        arc_angle = (angles[1]-angles[0]) * (Math.PI / 180);
    } else {
        arc_angle = (angles[0]-angles[1]) * (Math.PI / 180);
    }
    // calculate number of points
    let N: number = Math.floor(arc_angle / (Math.PI/ 36));
    if (N < 3) {N = 3;}
    // create matrix to map from XY plane into the 3D plane for circle
    const matrix_inv: three.Matrix4 =
        threex.matrixInv(threex.xformMatrixFromXYZs(circle.getOrigin().getPosition(), circle.getAxes()));
    // main loop to create points
    const xyz_points: gs.XYZ[] = [];
    for(let k = 0; k < N; k++) {
        const t: number = k/(N - 1);
        const alpha: number = arc_start + (t * arc_angle);
        const point: three.Vector3 = new three.Vector3(rad * Math.cos(alpha), rad * Math.sin(alpha), 0);
        point.applyMatrix4(matrix_inv);
        xyz_points.push(point.toArray() as gs.XYZ);
    }
    // return the points
    return xyz_points;
}

/**
 * Calculate the length of the conic curve.
 */
export function ellipseLength(curve: gs.IEllipse): number {
    // ConicCurve assumed to be an ellipse or circle;
    const vector_x: number[] = curve.getAxes()[0];
    const vector_y: number[] = curve.getAxes()[1];
    // Initial vector_x and vector_y require to be (almost) orthogonal
    const threshold: number = 1e-6;
    if(Math.abs(vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] + vector_x[2]*vector_y[2]) >= threshold) {
        throw new Error("Orthogonal vectors are required for that Ellipse / Conic length calculation");
    }
    const a: number = Math.sqrt(vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1] + vector_x[2]*vector_x[2]);
    const b: number = Math.sqrt(vector_y[0]*vector_y[0] + vector_y[1]*vector_y[1] + vector_y[2]*vector_y[2]);
    const u: number[] = [a,0];
    const v: number[] = [0,b];
    const angle_1: number = curve.getAngles()[0]*(2*Math.PI)/360;
    const angle_2: number = curve.getAngles()[1]*(2*Math.PI)/360;
    // Radians, although input angles are expected in Degrees
    if( Math.abs(a-b) < threshold) { return a*Math.abs(angle_2 - angle_1);}
    // Range [x1,x2] for length calculation would provide 2 circle arcs,
    // Whereas Angle_1 / Angle_2 provide a unique circle arc.
    let eccentricity: number = null ;
    if(a>b) { eccentricity = Math.sqrt( 1 - (b/a)*(b/a) ) ;}
    if(b>a) { eccentricity = Math.sqrt( 1 - (a/b)*(a/b) ) ;}
    const K: number = 1000;
    let theta: number = null;
    const d_th: number  = (angle_2 - angle_1)/K ;
    let distance: number = 0;
    for(let k = 0; k < K ; k++ ) {
        theta = angle_1 + k*(angle_2 - angle_1)/K ;
        distance = distance + d_th *
            Math.sqrt(1 - eccentricity * Math.sin(theta) * eccentricity * Math.sin(theta));
        // distance along the curve assessed and updated at each timestep;
    }
    distance = Math.max(a,b) * distance ;
    return distance;
}

/**
 * Calculate the xyz position at parameter t. The t parameter range is from 0 to 1.
 */
export function ellipseEvaluate(curve: gs.IEllipse, t: number): gs.XYZ {
    // ConicCurve assumed to be an ellipse or circle;
    const vector_x: gs.XYZ = curve.getAxes()[0];
    const vector_y: gs.XYZ = curve.getAxes()[1];
    // Initial vector_x and vector_y require to be (almost) orthogonal
    const threshold: number = 1e-6;
    if(Math.abs(vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] + vector_x[2]*vector_y[2])
        >= threshold) { throw new Error("Orthogonal vectors are required for that Ellipse / Conic length calculation");}
    const a: number = Math.sqrt(vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1] + vector_x[2]*vector_x[2]);
    const b: number = Math.sqrt(vector_y[0]*vector_y[0] + vector_y[1]*vector_y[1] + vector_y[2]*vector_y[2]);
    const u: number[] = [a,0];
    const v: number[] = [0,b];
    const z_uv: number[] = [0,0,u[0]*v[1] - u[1]*v[0]]; // cross product
    const angle_1: number = curve.getAngles()[0]*(2*Math.PI)/360;
    const angle_2: number = curve.getAngles()[1]*(2*Math.PI)/360;
    const l: number = ellipseLength(curve);
    let epsilon: number = 1 ;
    let theta: number = null ;
    const K: number = 1000 ;  // Does this not depend on the length of the ellipse?
    let x: number = null;
    let y: number = null;
    let r: number = null;
    let theta_t: number = null;
    const param: number = b*b/a;
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    let curve_theta: gs.IEllipse = null ;
    for(let k = 0; k < K; k++) { // This loops 1000 x 1000 times !
        while( epsilon >= 0) {
            theta = (angle_1 + k * (angle_2 - angle_1)/K);
            curve_theta = g.addEllipse(curve.getOrigin(),curve.getAxes()[0],
                curve.getAxes()[1],[curve.getAngles()[0],theta]);  // Why is this adding ellipses to the model?
            epsilon = t*l - ellipseLength(curve_theta);
            if(epsilon < 0) {theta_t = theta;}
        }
    }
    let eccentricity: number = null;
    if(a>b) { eccentricity = Math.sqrt( 1 - (b/a)*(b/a) ) ;}
    if(b>a) { eccentricity = Math.sqrt( 1 - (a/b)*(a/b) ) ;}
    r = param / (1 + eccentricity*Math.cos(theta_t));
    x = r * Math.cos(theta_t); // expressed in the plan inferred by (u,v)
    y = r * Math.sin(theta_t); // expressed in the plan inferred by (u,v)
    const U1: three.Vector3 = new three.Vector3(
        curve.getAxes()[0][0], curve.getAxes()[0][1], curve.getAxes()[0][2]);
    const V1: three.Vector3 = new three.Vector3(
        curve.getAxes()[1][0], curve.getAxes()[1][1], curve.getAxes()[1][2]);
    U1.normalize();
    V1.normalize();
    const O1O2: three.Vector3 = new three.Vector3(
        curve.getOrigin()[0], curve.getOrigin()[1], curve.getOrigin()[2]);
    const O2P: three.Vector3 = threex.addVectors(U1.multiplyScalar(x),V1.multiplyScalar(y));
    const O1P: three.Vector3 = threex.addVectors(O1O2,O2P);
    return [O1P.x,O1P.y,O1P.z]; // Should work..
}

/**
 * Calculate a set of xyz position on the ellipse. The number of points = length / resolution.
 */
export function ellipseGetRenderXYZs(curve: gs.IEllipse, resolution: number): gs.XYZ[] {
    const O: number[] = curve.getOrigin().getPosition();
    const renderingXYZs: gs.XYZ[] = [];
    const renderXYZs: gs.XYZ[] = [];
    let r: number = null;
    let theta: number = 0;
    let d_theta: number = 0;
    const U1: three.Vector3 = new three.Vector3(...curve.getAxes()[0]).normalize();
    const V1: three.Vector3 = new three.Vector3(...curve.getAxes()[1]).normalize();
    const a: number = new three.Vector3(...curve.getAxes()[0]).length();
    const b: number = new three.Vector3(...curve.getAxes()[1]).length();
    const L: number = Math.PI * Math.sqrt(2*(a*a + b*b) - (a-b)*(a-b)/2);
    const l: number = L * resolution;
    const param: number = b*b/a;
    const c: number = Math.sqrt(Math.abs(a*a - b*b));
    if(a>=b) {
        const e: number = Math.sqrt(1 - b*b/(a*a));
        let N: number = 0;
        let eps: number = 1;
        while (eps>0) {
            theta = theta + d_theta ;
            eps = Math.PI*2 - theta;
            N++;
            r = param / (1 + e*Math.cos(theta));
            d_theta = l/r;
        }
        N--;
        theta = 0;
        d_theta = 0;
        for (let k = 0; k<N;k++) {
            theta = theta + d_theta ;
            r = param / (1 + e*Math.cos(theta));
            d_theta = l/r;
            renderingXYZs.push([(r*Math.cos(theta)) + c,r * Math.sin(theta),0]);
        }
    }
    if(b>a) {
        const e: number = Math.sqrt(1 - a*a/(b*b));
        let N: number = 0;
        let eps: number = 1;
        while (eps>0) {
            theta = theta + d_theta ;
            eps = Math.PI*2 - theta;
            N++;
            r = param / (1 + e*Math.cos(theta));
            d_theta = l/r;
        }
        N--;
        theta = 0;
        d_theta = 0;
        for (let k = 0; k<N;k++) {
            theta = theta + d_theta;
            r = param / (1 + e*Math.cos(theta));
            d_theta = l/r;
            renderingXYZs.push([r*Math.cos(theta),(r*Math.sin(theta))+c,0]);
        }
    }
    const results: three.Vector3[] = [];
    for (const point of renderingXYZs) {results.push(new three.Vector3(point[0],point[1],point[2]));}
    const O1: three.Vector3 = new three.Vector3(0,0,0);
    const e1: three.Vector3 = new three.Vector3(1,0,0);
    const e2: three.Vector3 = new three.Vector3(0,1,0);
    const e3: three.Vector3 = new three.Vector3(0,0,1);
    const C1: three.Vector3 = new three.Vector3(
    curve.getOrigin().getPosition()[0],curve.getOrigin().getPosition()[1],curve.getOrigin().getPosition()[2]);
    const W1: three.Vector3 = threex.crossVectors(U1,V1,true);
    const C1O1: three.Vector3 = threex.subVectors(O1,C1,false);
    const vec_O_1: three.Vector3 = new three.Vector3(
    C1O1.dot(U1),C1O1.dot(V1),C1O1.dot(W1));
    const x1: three.Vector3 = new three.Vector3(e1.dot(U1),e1.dot(V1),e1.dot(W1));
    const y1: three.Vector3 = new three.Vector3(e2.dot(U1),e2.dot(V1),e2.dot(W1));
    let z1: three.Vector3 = new three.Vector3();
    z1 = z1.crossVectors(x1,y1);
    const m1: three.Matrix4 = new three.Matrix4();
    const o_neg: three.Vector3 = vec_O_1.clone().negate();
    m1.setPosition(o_neg);
    let m2: three.Matrix4 = new three.Matrix4();
    m2 = m2.makeBasis(x1.normalize(), y1.normalize(), z1.normalize());
    m2 = m2.getInverse(m2);
    const m3: three.Matrix4 = new three.Matrix4();
    const rotation1: three.Matrix4 = m3.multiplyMatrices(m2, m1);
    const results_c1: three.Vector3[] = [];
    for (const point of results) {results_c1.push(threex.multVectorMatrix(point,rotation1));}
    for(const point of results_c1) {renderXYZs.push([point.x,point.y,point.z]);}
    // console.log("rendering is ");
    // console.log(renderingXYZs);
    throw new Error("Method not implemented");
    // return renderXYZs;
}
