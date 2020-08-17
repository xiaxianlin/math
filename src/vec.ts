import { Vec2, Vec3, Vec4 } from './types.ts'

type VecType = Array<number>

function validLength(v1: VecType, v2: VecType) {
    if (v1.length !== v2.length) {
        throw '两个向量的长度不一致'
    }
}

export function zero() {
    return [0.0, 0.0, 0.0]
}

export function size(v: VecType) {
    let sum = v.reduce((total, item) => total + item * item, 0)
    return Math.sqrt(sum)
}

export function add(v1: VecType, v2: VecType) {
    validLength(v1, v2)
    return v1.map((item, index) => item + v2[index])
}

export function substract(v1: VecType, v2: VecType) {
    validLength(v1, v2)
    return v1.map((item, index) => item - v2[index])
}

export function multi(v: VecType, k: number) {
    return v.map((item, index) => item * k)
}

export function normalize(v: VecType) {
    return multi(v, 1 / size(v))
}

export function dot(v1: VecType, v2: VecType) {
    validLength(v1, v2)
    return v1.reduce((total, item, index) => total + item * v2[index], 0)
}

export function theta(v1: VecType, v2: VecType) {
    validLength(v1, v2)
    let val = dot(v1, v2) / (size(v1) * size(v2))
    return Math.acos(val)
}

export function cross(v1: Vec3, v2: Vec3) {
    validLength(v1, v2)
    if (v1.length !== 3) {
        throw '叉乘计算限定维度为3'
    }
    return [v1[1] * v2[2] - v1[2] * v2[1], v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v1[1] * v2[0]]
}

export function distance() {}

export function vec2(): Vec2 {
    return [0.0, 0.0]
}

export function vec3(): Vec3 {
    return [0.0, 0.0, 0.0]
}

export function vec4(): Vec4 {
    return [0.0, 0.0, 0.0, 0.0]
}
