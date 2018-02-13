"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A box with one side open.
 */
function open_box() {
    return {
        geom: {
            objs: [
                [
                    [
                        [0, 1, 2, 3, -1],
                    ],
                    [
                        [1, 5, 4, 0, -1],
                        [2, 6, 5, 1, -1],
                        [3, 7, 6, 2, -1],
                        [0, 4, 7, 3, -1],
                        [5, 6, 7, 4, -1],
                    ],
                    [200],
                ],
            ],
            points: [
                [0, 1, 2, 3, 4, 5, 6, 7],
                [
                    [-0.7, -1.0, 0.0],
                    [0.2, -1.0, 0.0],
                    [0.2, -1.0, 3.0],
                    [-0.7, -1.0, 3.0],
                    [-0.7, 1.0, 0.0],
                    [0.2, 1.0, 0.0],
                    [0.2, 1.0, 3.0],
                    [-0.7, 1.0, 3.0],
                ],
            ],
        },
        metadata: {
            crs: { epsg: 3857 },
            filetype: "gs-json",
            uuid: "xxx1",
            location: "+0-0",
            version: "0.1.1",
        },
    };
}
exports.open_box = open_box;
/**
 * A box with one side open, with some attributes:
 * "test1" is a point attribute of type "number".
 * "test2" is a vertex attribute of type "string".
 * "shell_id" is a faces attribute of type "number".
 * "test3" is a faces attribute of type "number".
 */
function box_with_attribs() {
    return {
        attribs: {
            edges: [
                {
                    data_type: "number",
                    geom_type: "edges",
                    name: "edge_id",
                    values: [
                        [[0, 0, 0, 0, 0, 0]],
                        [0],
                    ],
                },
            ],
            faces: [
                {
                    data_type: "number",
                    geom_type: "faces",
                    name: "faces_id",
                    values: [
                        [[0, 0, 0, 0, 0, 0]],
                        [0],
                    ],
                },
                {
                    data_type: "number",
                    geom_type: "faces",
                    name: "test3",
                    values: [
                        [[0, 1, 2, 3, 4, 5]],
                        [2.0, 12.0, 22.0, 32.0, 42.0, 52.0],
                    ],
                },
            ],
            objs: [
                {
                    data_type: "number",
                    geom_type: "objs",
                    name: "obj_id",
                    values: [
                        [0],
                        [1234],
                    ],
                },
            ],
            points: [
                {
                    data_type: "number",
                    geom_type: "points",
                    name: "test1",
                    values: [
                        [0, 1, 2, 3, 4, 5, 6, 7],
                        [641.600585938, 800.463806152, 510.895019531,
                            775.474304199, 879.505859375, 205.040100098, 522.06060791, 885.056274414],
                    ],
                },
            ],
            vertices: [
                {
                    data_type: "string",
                    geom_type: "vertices",
                    name: "test2",
                    values: [
                        [[[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []],
                            [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []]],
                        ["id_0", "id_1", "id_2", "id_3"],
                    ],
                },
            ],
            wires: [
                {
                    data_type: "number",
                    geom_type: "wires",
                    name: "wires_id",
                    values: [
                        [[0, 0, 0, 0, 0, 0]],
                        [0],
                    ],
                },
            ],
        },
        geom: {
            objs: [
                [
                    [
                        [5, 4, 5],
                    ],
                    [
                        [1, 5, 4, 0, -1],
                        [2, 6, 5, 1, -1],
                        [3, 7, 6, 2, -1],
                        [0, 4, 7, 3, -1],
                        [2, 1, 0, 3, -1],
                        [5, 6, 7, 4, -1],
                    ],
                    [200],
                ],
            ],
            points: [
                [0, 1, 2, 3, 4, 5, 6, 7],
                [
                    [-0.7, -1.0, 0.0],
                    [0.2, -1.0, 0.0],
                    [0.2, -1.0, 3.0],
                    [-0.7, -1.0, 3.0],
                    [-0.7, 1.0, 0.0],
                    [0.2, 1.0, 0.0],
                    [0.2, 1.0, 3.0],
                    [-0.7, 1.0, 3.0],
                ],
            ],
        },
        metadata: {
            crs: { epsg: 3857 },
            filetype: "gs-json",
            uuid: "xxx1",
            location: "+0-0",
            version: "0.1.1",
        },
    };
}
exports.box_with_attribs = box_with_attribs;
/**
 * A box with one side open, with some groups.
 */
function box_with_groups() {
    return {
        attribs: null,
        geom: {
            objs: [
                [
                    [
                        [0, 1, 2, 3, -1],
                    ],
                    [
                        [1, 5, 4, 0, -1],
                        [2, 6, 5, 1, -1],
                        [3, 7, 6, 2, -1],
                        [0, 4, 7, 3, -1],
                        [5, 6, 7, 4, -1],
                    ],
                    [200],
                ],
            ],
            points: [
                [0, 1, 2, 3, 4, 5, 6, 7],
                [
                    [-0.7, -1.0, 0.0],
                    [0.2, -1.0, 0.0],
                    [0.2, -1.0, 3.0],
                    [-0.7, -1.0, 3.0],
                    [-0.7, 1.0, 0.0],
                    [0.2, 1.0, 0.0],
                    [0.2, 1.0, 3.0],
                    [-0.7, 1.0, 3.0],
                ],
            ],
        },
        groups: [
            {
                name: "building_obj",
                objs: [0],
                props: [["descr", "The building object, that has wire and faces."]],
            },
            // groups with topo
            {
                name: "building_all_faces",
                topos: [
                    [[0, [0, 1, 2, 3, 4]]],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "walls",
                parent: "building_obj",
                props: [["descr", "Three walls."], ["material", "brick"], ["thickness", 300]],
                topos: [
                    [[0, [1, 3, 4]]],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "floor",
                parent: "building_obj",
                topos: [
                    [[0, [0]]],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "roof",
                parent: "building_obj",
                topos: [
                    [[0, [2]]],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "winodw_openings",
                parent: "building_obj",
                topos: [
                    [],
                    [[0, [0]]],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "vertical_edges_of_faces",
                parent: "building_obj",
                topos: [
                    [
                        [0,
                            [
                                [1, [1, 3]],
                                [3, [1, 3]],
                                [4, [0, 2]],
                            ],
                        ],
                    ],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "vertices_on_ground",
                parent: "building_obj",
                topos: [
                    [
                        [0,
                            [
                                [0, [0, 1, 2, 3]],
                                [1, [2, 3]],
                                [3, [0, 1]],
                                [4, [0, 3]],
                            ],
                        ],
                    ],
                    [
                        [0,
                            [
                                [0, [0, 1]],
                            ],
                        ],
                    ],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "points_on_ground",
                parent: "building_obj",
                points: [0, 1, 4, 5],
            },
        ],
        metadata: {
            crs: { epsg: 3857 },
            filetype: "gs-json",
            uuid: "xxx1",
            location: "+0-0",
            version: "0.1.1",
        },
        skins: null,
    };
}
exports.box_with_groups = box_with_groups;
/**
 * A box with one side open, with some groups.
 */
function Unclosed_with_groups() {
    return {
        attribs: null,
        geom: {
            objs: [
                [
                    [
                        [0, 4, 1, 5, 7],
                    ],
                    [
                        [1, 5, 4, 0, -1],
                        [2, 6, 5, 1, -1],
                        [3, 7, 6, 2, -1],
                        [0, 4, 7, 3, -1],
                        [5, 6, 7, 4, -1],
                    ],
                    [200],
                ],
            ],
            points: [
                [0, 1, 2, 3, 4, 5, 6, 7],
                [
                    [-0.7, -1.0, 0.0],
                    [0.2, -1.0, 0.0],
                    [0.2, -1.0, 3.0],
                    [-0.7, -1.0, 3.0],
                    [-0.7, 1.0, 0.0],
                    [0.2, 1.0, 0.0],
                    [0.2, 1.0, 3.0],
                    [-0.7, 1.0, 3.0],
                ],
            ],
        },
        groups: [
            {
                name: "building_obj",
                objs: [0],
                props: [["descr", "The building object, that has wire and faces."]],
            },
            // groups with topo
            {
                name: "building_all_faces",
                topos: [
                    [[0, [0, 1, 2, 3, 4]]],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "walls",
                parent: "building_obj",
                props: [["descr", "Three walls."], ["material", "brick"], ["thickness", 300]],
                topos: [
                    [[0, [1, 3, 4]]],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "floor",
                parent: "building_obj",
                topos: [
                    [[0, [0]]],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "roof",
                parent: "building_obj",
                topos: [
                    [[0, [2]]],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "winodw_openings",
                parent: "building_obj",
                topos: [
                    [],
                    [[0, [0]]],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "vertical_edges_of_faces",
                parent: "building_obj",
                topos: [
                    [
                        [0,
                            [
                                [1, [1, 3]],
                                [3, [1, 3]],
                                [4, [0, 2]],
                            ],
                        ],
                    ],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "vertices_on_ground",
                parent: "building_obj",
                topos: [
                    [
                        [0,
                            [
                                [0, [0, 1, 2, 3]],
                                [1, [2, 3]],
                                [3, [0, 1]],
                                [4, [0, 3]],
                            ],
                        ],
                    ],
                    [
                        [0,
                            [
                                [0, [0, 1]],
                            ],
                        ],
                    ],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "points_on_ground",
                parent: "building_obj",
                points: [0, 1, 4, 5],
            },
        ],
        metadata: {
            crs: { epsg: 3857 },
            filetype: "gs-json",
            uuid: "xxx1",
            location: "+0-0",
            version: "0.1.1",
        },
        skins: null,
    };
}
exports.Unclosed_with_groups = Unclosed_with_groups;
function Random_Closed() {
    return {
        attribs: null,
        geom: {
            objs: [
                [
                    [
                        [0, 4, 1, 5, 7, 8, 9, 10, 11, 12, 13, 14],
                    ],
                    [
                        [0, 1, 2, 3, 4, 5, 6, -1],
                        [1, 2, 3, 4, 5, 6, 7, -1],
                        [2, 3, 4, 5, 6, 7, 8, -1],
                        [3, 4, 5, 6, 7, 8, 9, -1],
                        [4, 5, 6, 7, 8, 9, 10, -1],
                        [5, 6, 7, 8, 9, 10, 11, -1],
                        [6, 7, 8, 9, 10, 11, 12, -1],
                        [7, 8, 9, 10, 11, 12, 13, -1],
                        [8, 9, 10, 11, 12, 13, 14, -1],
                    ],
                    [200],
                ],
            ],
            points: [
                [0, 1, 2, 3, 4, 5, 6, 7],
                [
                    [-0.7, -1.0, 0.0],
                    [0.2, -1.0, 0.0],
                    [0.2, -1.0, 3.0],
                    [-0.7, -1.0, 3.0],
                    [-0.7, 1.0, 0.0],
                    [0.2, 1.0, 0.0],
                    [0.2, 1.0, 3.0],
                    [-0.7, 1.0, 3.0],
                ],
            ],
        },
        groups: [
            {
                name: "building_obj",
                objs: [0],
                props: [["descr", "The building object, that has wire and faces."]],
            },
            // groups with topo
            {
                name: "building_all_faces",
                topos: [
                    [[0, [0, 1, 2, 3, 4]]],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "walls",
                parent: "building_obj",
                props: [["descr", "Three walls."], ["material", "brick"], ["thickness", 300]],
                topos: [
                    [[0, [1, 3, 4]]],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "floor",
                parent: "building_obj",
                topos: [
                    [[0, [0]]],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "roof",
                parent: "building_obj",
                topos: [
                    [[0, [2]]],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "winodw_openings",
                parent: "building_obj",
                topos: [
                    [],
                    [[0, [0]]],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "vertical_edges_of_faces",
                parent: "building_obj",
                topos: [
                    [
                        [0,
                            [
                                [1, [1, 3]],
                                [3, [1, 3]],
                                [4, [0, 2]],
                            ],
                        ],
                    ],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "vertices_on_ground",
                parent: "building_obj",
                topos: [
                    [
                        [0,
                            [
                                [0, [0, 1, 2, 3]],
                                [1, [2, 3]],
                                [3, [0, 1]],
                                [4, [0, 3]],
                            ],
                        ],
                    ],
                    [
                        [0,
                            [
                                [0, [0, 1]],
                            ],
                        ],
                    ],
                    [],
                    [],
                    [],
                    [],
                ],
            },
            {
                name: "points_on_ground",
                parent: "building_obj",
                points: [0, 1, 4, 5],
            },
        ],
        metadata: {
            crs: { epsg: 3857 },
            filetype: "gs-json",
            uuid: "xxx1",
            location: "+0-0",
            version: "0.1.1",
        },
        skins: null,
    };
}
exports.Random_Closed = Random_Closed;
function mixed() {
    return {
        metadata: {
            filetype: "gs-json",
            version: "0.1.1",
            uuid: "xxx1",
            crs: { epsg: 3857 },
            location: "+40.6894-074.0447",
        },
        geom: {
            points: [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
                [[-0.7794438004493713, -1.0, 0.0], [0.22055619955062866, -1.0, 0.0], [0.22055619955062866, -1.0, 3.0], [-0.7794438004493713, -1.0, 3.0], [-0.7794438004493713, 1.0, 0.0], [0.22055619955062866, 1.0, 0.0], [0.22055619955062866, 1.0, 3.0], [-0.7794438004493713, 1.0, 3.0], [1.3269386291503906, -1.0, 0.0], [2.3269386291503906, -1.0, 0.0], [2.3269386291503906, -1.0, 3.0], [1.3269386291503906, -1.0, 3.0], [1.3269386291503906, 1.0, 0.0], [2.3269386291503906, 1.0, 0.0], [2.3269386291503906, 1.0, 3.0], [1.3269386291503906, 1.0, 3.0], [1.4623746871948242, -2.6389076709747314, -0.31497955322265625], [1.4623746871948242, -2.3732826709747314, -0.31497955322265625], [1.4623746871948242, -2.1076576709747314, -0.31497955322265625], [1.5453824996948242, -1.9250404834747314, -0.31497955322265625], [1.5453824996948242, -2.1906654834747314, -0.31497955322265625], [1.5453824996948242, -2.4562904834747314, -0.31497955322265625], [-0.5512971878051758, -2.6389076709747314, -0.31497955322265625], [-0.6549032330513, -2.368194580078125, -0.31497955322265625], [-0.7585092782974243, -2.0974817276000977, -0.31497955322265625], [-0.7905550003051758, -2.194010019302368, -0.31497955322265625], [-0.7905550003051758, -2.4838716983795166, -0.31497955322265625], [-0.8672151565551758, -2.580742120742798, -0.31497955322265625], [-0.8672151565551758, -2.2908804416656494, -0.31497955322265625], [-0.8672151565551758, -2.001019239425659, -0.31497955322265625], [-0.7103590369224548, -2.0080180168151855, -0.31497955322265625], [-0.6064698696136475, -2.278623104095459, -0.31497955322265625], [-0.4999831020832062, -2.482268810272217, -0.31497955322265625], [-0.3953130841255188, -2.211965322494507, -0.31497955322265625], [-0.2906434237957001, -1.9416617155075073, -0.31497955322265625], [-0.16018390655517578, -2.073054313659668, -0.31497955322265625], [-0.16018390655517578, -2.3629159927368164, -0.31497955322265625], [-0.17405441403388977, -2.6389076709747314, -0.31497955322265625], [-0.24319171905517578, -2.4181833267211914, -0.31497955322265625], [-0.24252620339393616, -2.128326177597046, -0.31497955322265625], [-0.2995643615722656, -2.16054630279541, -0.31497955322265625], [-0.4040381610393524, -2.430924654006958, -0.31497955322265625], [0.6552457809448242, -2.2809975147247314, -0.31497955322265625], [0.5780249238014221, -2.538818597793579, -0.31497955322265625], [0.3367978632450104, -2.648444652557373, -0.31497955322265625], [0.5011316537857056, -2.5077075958251953, -0.31497955322265625], [0.5664176940917969, -2.2479758262634277, -0.31497955322265625], [0.4481579661369324, -2.014356851577759, -0.31497955322265625], [0.18578748404979706, -2.028092622756958, -0.31497955322265625], [0.0865355059504509, -2.272844076156616, -0.31497955322265625], [0.17117466032505035, -2.5248000621795654, -0.31497955322265625], [0.2941988706588745, -2.647393226623535, -0.31497955322265625], [0.06101566553115845, -2.522721767425537, -0.31497955322265625], [-0.0011052392655983567, -2.259951591491699, -0.31497955322265625], [0.08764392882585526, -2.006666421890259, -0.31497955322265625], [0.3368940055370331, -1.9140163660049438, -0.31497955322265625], [0.5783979296684265, -2.023050546646118, -0.31497955322265625], [0.8144254684448242, -1.9250404834747314, -0.31497955322265625], [1.102770209312439, -1.9299184083938599, -0.31497955322265625], [1.2849626541137695, -2.1093807220458984, -0.31497955322265625], [1.1502881050109863, -2.2096476554870605, -0.31497955322265625], [1.090009331703186, -2.001718044281006, -0.31497955322265625], [0.8974332809448242, -2.092536687850952, -0.31497955322265625], [1.0478017330169678, -2.2305264472961426, -0.31497955322265625], [1.0315463542938232, -2.3010170459747314, -0.31497955322265625], [0.8974332809448242, -2.4554409980773926, -0.31497955322265625], [1.0732861757278442, -2.5672106742858887, -0.31497955322265625], [1.208114743232727, -2.3706717491149902, -0.31497955322265625], [1.2719993591308594, -2.32572603225708, -0.31497955322265625], [1.24326753616333, -2.5858538150787354, -0.31497955322265625], [0.9661754369735718, -2.6389076709747314, -0.31497955322265625], [0.8144254684448242, -2.5021183490753174, -0.31497955322265625], [0.8144254684448242, -2.2135796546936035, -0.31497955322265625], [2.280245780944824, -1.9250404834747314, -0.31497955322265625], [2.280245780944824, -2.193127393722534, -0.31497955322265625], [2.2724032402038574, -2.460641384124756, -0.31497955322265625], [2.0921428203582764, -2.6389458179473877, -0.31497955322265625], [1.833667516708374, -2.6027204990386963, -0.31497955322265625], [1.7338590621948242, -2.3665759563446045, -0.31497955322265625], [1.7338590621948242, -2.0984888076782227, -0.31497955322265625], [1.8168668746948242, -1.9366711378097534, -0.31497955322265625], [1.8168668746948242, -2.2047581672668457, -0.31497955322265625], [1.8297230005264282, -2.4713997840881348, -0.31497955322265625], [2.054230213165283, -2.5724759101867676, -0.31497955322265625], [2.197237968444824, -2.378206491470337, -0.31497955322265625], [2.197237968444824, -2.110119342803955, -0.31497955322265625], [2.872042655944824, -2.4489662647247314, -0.31497955322265625], [2.6958096027374268, -2.6418278217315674, -0.31497955322265625], [2.422823905944824, -2.6069283485412598, -0.31497955322265625], [2.633169174194336, -2.5757405757904053, -0.31497955322265625], [2.77113938331604, -2.3934872150421143, -0.31497955322265625], [2.520369291305542, -2.2608282566070557, -0.31497955322265625], [2.453770875930786, -2.00935697555542, -0.31497955322265625], [2.7089829444885254, -1.9171342849731445, -0.31497955322265625], [2.7718653678894043, -2.006145715713501, -0.31497955322265625], [2.5197558403015137, -2.0665476322174072, -0.31497955322265625], [2.695028305053711, -2.251216411590576, -0.31497955322265625]],
            ],
            objs: [
                [
                    [[16, 17, 18, 19, 20, 21]],
                    [],
                    [100],
                ],
                [
                    [[22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]],
                    [],
                    [100],
                ],
                [
                    [[42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56]],
                    [],
                    [100],
                ],
                [
                    [[57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72]],
                    [],
                    [100],
                ],
                [
                    [[73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85]],
                    [],
                    [100],
                ],
                [
                    [[86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96]],
                    [],
                    [100],
                ],
                [
                    [[5, 4, 5]],
                    [[1, 5, 4, 0, -1], [2, 6, 5, 1, -1], [3, 7, 6, 2, -1], [0, 4, 7, 3, -1], [5, 6, 7, 4, -1]],
                    [200],
                ],
                [
                    [[9, 13, 13, 14, 10, 10, 9], [12, 8, 8, 11, 11, 12]],
                    [[9, 13, 12, 8, -1], [11, 15, 14, 10, -1], [10, 9, 8, 11, -1], [13, 14, 15, 12, -1]],
                    [200],
                ],
            ],
        },
        attribs: {
            vertices: [
                {
                    name: "id",
                    geom_type: "vertices",
                    data_type: "number",
                    values: [
                        [[[0, 1, 2, 3, 4, 5], []], [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], []], [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], []], [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], []], [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], []], [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []], [[[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []]], [[[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []]]],
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                    ],
                },
            ],
            wires: [
                {
                    name: "shell_id",
                    geom_type: "wires",
                    data_type: "number",
                    values: [
                        [[0], [1], [2], [3], [4], [5], [], []],
                        [0, 1, 2, 3, 4, 5],
                    ],
                },
            ],
            faces: [
                {
                    name: "shell_id",
                    geom_type: "faces",
                    data_type: "number",
                    values: [
                        [[], [], [], [], [], [], [0, 0, 0, 0, 0], [1, 1, 1, 1]],
                        [6, 7],
                    ],
                },
            ],
        },
    };
}
exports.mixed = mixed;
//# sourceMappingURL=test_data.js.map