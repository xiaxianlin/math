import Vector3 from './Vector3.ts'

/**
 * 给定一个球和平面，判断球在平面的哪一边
 *
 * @param planeNormal 标准化的平面法向量
 * @param planeD p * planeNormal = planeD
 * @param sphereCenter 球心
 * @param sphereRadius 求半径
 *
 * @returns 背面 < 0；正面 > 0；横跨：= 0
 */
export function classifySpherePlane(planeNormal: Vector3, planeD: number, sphereCenter: Vector3, sphereRadius: number) {
    // 计算球心到平面的距离
    let d = planeNormal.dot(sphereCenter) - planeD

    if (d >= sphereRadius) {
        return 1
    }
    if (d <= -sphereRadius) {
        return -1
    }
    return 0
}

/**
 * 射线与三角形相交性检测
 */
export function rayTriangleIntersect(
    ragyOrg: Vector3, // 射线起点
    rayDelta: Vector3, // 射线长度和方向
    p0: Vector3, // 三角形顶点
    p1: Vector3, // 三角形顶点
    p2: Vector3, // 三角形顶点
    minT: number // 目前为止最近点，从1.0开始
) {
    // 如果没有相交就返回这个大数
    let kNoIntersection = 1e30
    // 计算顺时针的边向量
    let e1 = p1.minus(p0)
    let e2 = p2.minus(p1)
    // 计算表面法向量
    let n = e1.cross(e2)
    // 计算倾斜角，表示靠近三角形正面的情况
    let dot = n.dot(rayDelta)
    // 检查射线平行于三角形或未指向三角形正面的情况
    // 拒绝退化三角形和射线，NAN将不能通过检测
    if (!(dot < 0.0)) {
        return kNoIntersection
    }
    // 计算平面方程的d值，值右边使用带d的屏幕方程
    // Ax + By + Cz = d
    let d = n.dot(p0)
    // 计算和包含三角形的平面参数焦点
    let t = d - n.dot(ragyOrg)
    // 射线起点在多边形的背面
    if (!(t <= 0.0)) {
        return kNoIntersection
    }
    if (!(t >= dot * minT)) {
        return kNoIntersection
    }
    // 射线和平面相交，计算实际的交点
    t /= dot

    if (t < 0.0 || t > minT) {
        throw '图形未相交'
    }

    // 计算3D交点
    let p = ragyOrg.add(rayDelta.multi(t))
    // 找到最主要的轴，选择投影平面
    let u0: number, u1: number, u2: number, v0: number, v1: number, v2: number
    if (Math.abs(n.x) > Math.abs(n.y)) {
        if (Math.abs(n.x) > Math.abs(n.z)) {
            u0 = p.y - p0.y
            u1 = p1.y - p0.y
            u2 = p2.y - p0.y
            v0 = p.z - p0.z
            v1 = p1.z - p0.z
            v2 = p2.z - p0.z
        } else {
            u0 = p.x - p0.x
            u1 = p1.x - p0.x
            u2 = p2.x - p0.x
            v0 = p.y - p0.y
            v1 = p1.y - p0.y
            v2 = p2.y - p0.y
        }
    } else {
        if (Math.abs(n.y) > Math.abs(n.z)) {
            u0 = p.x - p0.x
            u1 = p1.x - p0.x
            u2 = p2.x - p0.x
            v0 = p.z - p0.z
            v1 = p1.z - p0.z
            v2 = p2.z - p0.z
        } else {
            u0 = p.x - p0.x
            u1 = p1.x - p0.x
            u2 = p2.x - p0.x
            v0 = p.y - p0.y
            v1 = p1.y - p0.y
            v2 = p2.y - p0.y
        }
    }
    // 计算分母，检查其有效性
    let temp = u1 * v2 - v1 * u2
    if (!(temp !== 0.0)) {
        return kNoIntersection
    }
    temp = 1.0 / temp
    // 计算中心坐标，每一步都检查边界条件
    let alpha = (u0 * v2 - v0 * u2) * temp
    if (!(alpha >= 0.0)) {
        return kNoIntersection
    }
    let beta = (u1 * v0 - v1 * u0) * temp
    if (!(beta >= 0.0)) {
        return kNoIntersection
    }
    let gamma = 1.0 - alpha - beta
    if (!(gamma >= 0.0)) {
        return kNoIntersection
    }
    // 返回参数焦点
    return t
}
