import { Vec4, Vec, Mat3 } from './types.ts'

export function exp(q: Vec4, t: number): Vec4 {
    let [w, x, y, z] = q
    if (Math.abs(w) < 1) {
        let alpha = Math.acos(w)
        let newAlpha = alpha * t
        w = Math.cos(newAlpha)

        let mult = Math.sin(newAlpha) / Math.sin(alpha)

        x *= mult
        y *= mult
        z *= mult
    }
    return [w, x, y, z]
}

export function slerp(v1: Vec4, v2: Vec4, t: number): Vec4 {
    let [w0, x0, y0, z0] = v1
    let [w1, x1, y1, z1] = v2
    let w: number, x: number, y: number, z: number
    // 点乘计算两个四元数的夹角的cos值
    let cosOmega = w0 * w1 + x0 * x1 + y0 * y1 + z0 * z1
    // 如果点乘为负，则反转一个四元数以取得短的4D弧
    if (cosOmega < 0) {
        w1 = -w1
        x1 = -x1
        y1 = -y1
        z1 = -z1
    }

    let k0: number, k1: number
    // 检查是否过于接近以避免除零
    if (cosOmega > 0.9999) {
        // 非常接近，即线性插值
        k0 = 1.0 - t
        k1 = t
    } else {
        // 用三角公式sin^2(omega) + cos^2(omega) = 1计算sin值
        let sinOmega = Math.sqrt(1.0 - cosOmega * cosOmega)
        // 通过sin和cos计算角度
        let omega = Math.atan2(sinOmega, cosOmega)
        // 计算分母的倒数，这样就只需要一次除法
        let oneOverSinOmega = 1.0 / sinOmega
        // 计算插值变量
        k0 = Math.sin((1.0 - t) * omega) * oneOverSinOmega
        k1 = Math.sin(t * omega) * oneOverSinOmega
    }

    // 插值
    w = w0 * k0 + w1 * k1
    x = x0 * k0 + x1 * k1
    y = y0 * k0 + y1 * k1
    z = z0 * k0 + z1 * k1

    return [w, x, y, z]
}

export function toMatrix(q: Vec4): Mat3 {
    let [w, x, y, z] = q
    return [
        [1 - 2 * y * y - 2 * z * z, 2 * x * y + 2 * w * z, 2 * x * z - 2 * w * y],
        [2 * x * y - 2 * w * z, 1 - 2 * x * x - 2 * z * z, 2 * y * z + 2 * w * x],
        [2 * x * z + 2 * w * y, 2 * y * z - 2 * w * x, 1 - 2 * x * x - 2 * y * y]
    ]
}
