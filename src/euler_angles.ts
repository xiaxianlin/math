import { Vec3, Mat3, Vec4 } from './types.ts'
const { sin, cos } = Math

export function toMatrix(angles: Vec3): Mat3 {
    let [h, p, b] = angles
    return [
        [cos(h) * cos(b) + sin(h) * sin(p) * sin(b), -cos(h) * sin(b) + sin(h) * sin(p) * cos(b), sin(h) * cos(p)],
        [sin(b) * cos(p), cos(b) * cos(p), -sin(p)],
        [-sin(h) * cos(b) + cos(h) * sin(p) * sin(b), sin(b) * sin(h) + cos(h) * sin(p) * cos(b), cos(h) * cos(p)]
    ]
}

export function toQuternion(angles: Vec3): Vec4 {
    let [h, p, b] = angles
    return [
        cos(h / 2) * cos(p / 2) * cos(b / 2) + sin(h / 2) * sin(p / 2) * sin(b / 2),
        -cos(h / 2) * sin(p / 2) * cos(b / 2) - sin(h / 2) * cos(p / 2) * sin(b / 2),
        cos(h / 2) * sin(p / 2) * sin(b / 2) - sin(h / 2) * cos(p / 2) * cos(b / 2),
        sin(h / 2) * sin(p / 2) * cos(b / 2) - cos(h / 2) * cos(p / 2) * sin(b / 2)
    ]
}
