"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topo_face_tests = require("../_topo_face_tests");
describe("Tests for Face class", () => {
    it("test_Face_getGeomType", () => {
        expect(topo_face_tests.test_Face_getGeomType()).toBe(true);
    });
    it("test_Face_getVertices", () => {
        expect(topo_face_tests.test_Face_getVertices()).toBe(true);
    });
    it("test_Face_getEdges", () => {
        expect(topo_face_tests.test_Face_getEdges()).toBe(true);
    });
    it("test_Face_numVertices", () => {
        expect(topo_face_tests.test_Face_numVertices()).toBe(true);
    });
    it("test_Face_numEdges", () => {
        expect(topo_face_tests.test_Face_numEdges()).toBe(true);
    });
    it("test_Face_isClosed", () => {
        expect(topo_face_tests.test_Face_isClosed()).toBe(true);
    });
    it("test_Face_facesSharedPoints", () => {
        expect(topo_face_tests.test_Face_facesSharedPoints()).toBe(true);
    });
});
//# sourceMappingURL=topo_face.tests.js.map