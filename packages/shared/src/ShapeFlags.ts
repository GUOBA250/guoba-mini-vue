export const enum ShapeFlags {
    element = 1, //0001
    stateful_component = 1 << 1, //0010
    text_children = 1 << 2, //0100
    array_children = 1 << 3, //1000
    slot_children = 1 << 4 //10000
}
