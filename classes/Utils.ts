import Vector3 from './Vector3.ts'
import MathUtil from './MathUtil.ts'

class Utils {
    /**
     * 在多个顶点中计算最佳平面
     */
    public static computeBestFitNormal(v: Vector3[]) {
        let result = new Vector3()
        let n = v.length
        // 从最后一个顶点开始，避免在循环中做if判断
        let p = v[n - 1]
        // 迭代所有顶点
        for (let i = 0; i < n - 1; ++i) {
            // 得到当前顶点
            let c = v[i]
            // 边向量乘积相加
            result.x += (p.z + c.z) * (p.y - c.y)
            result.y += (p.x + c.x) * (p.z - c.z)
            result.z += (p.y + c.y) * (p.x - c.x)
            p = c
        }
        result.normalize()
        return result
    }

    /**
     * 计算任意点的重心坐标空间
     * @param {Vector3[]} v 三角形的三个顶点
     * @param {Vector3} p  需要计算重心坐标空间的点
     */
    public static computeBarycentricCoords3d(v: Vector3[], p: Vector3) {
        // 计算边向量，呈顺时针方向
        let d1 = v[1].minus(v[0])
        let d2 = v[2].minus(v[1])
        // 用叉乘计算法向量，许多情况下，这一步都可以省略，因为法向量都是预先计算的
        // 不需要正则化，不管预先计算的法向量是否正则化
        let n = d1.cross(d2)

        // 判断法向量中占优势的轴，选择投影平面
        let u1: number, u2: number, u3: number, u4: number, v1: number, v2: number, v3: number, v4: number

        if (Math.abs(n.x) >= Math.abs(n.y) && Math.abs(n.x) >= Math.abs(n.z)) {
            // 抛弃x轴，向yz平面投影
            u1 = v[0].y - v[2].y
            u2 = v[1].y - v[2].y
            u3 = p.y - v[0].y
            u4 = p.y - v[2].y
            v1 = v[0].z - v[2].z
            v2 = v[1].z - v[2].z
            v3 = p.z - v[0].z
            v4 = p.z - v[2].z
        } else if (Math.abs(n.y) >= Math.abs(n.z)) {
            // 抛弃y轴，向xz平面投影
            u1 = v[0].z - v[2].z
            u2 = v[1].z - v[2].z
            u3 = p.z - v[0].z
            u4 = p.z - v[2].z
            v1 = v[0].x - v[2].x
            v2 = v[1].x - v[2].x
            v3 = p.x - v[0].x
            v4 = p.x - v[2].x
        } else {
            // 抛弃z轴，向xy平面投影
            u1 = v[0].x - v[2].x
            u2 = v[1].x - v[2].x
            u3 = p.x - v[0].x
            u4 = p.x - v[2].x
            v1 = v[0].y - v[2].y
            v2 = v[1].y - v[2].y
            v3 = p.y - v[0].y
            v4 = p.y - v[2].y
        }
        // 计算分母，并判断合法性
        let denom = v1 * u2 - v2 * u1
        if (denom === 0) {
            throw '三角形为退化三角形，面积为零'
        }

        //计算重心坐标
        let oneOverDenom = 1.0 / denom
        let b: number[] = []
        b[0] = (v4 * u2 - v2 * u4) * oneOverDenom
        b[1] = (v1 * u3 - v3 * u1) * oneOverDenom
        b[2] = 1.0 - b[0] - b[1]
        return b
    }

    /**
     * 判断多边形是否为凸多边形，假设多边形是平面的
     * @param {Vector3[]} v 多边形顶点列表
     */
    public static isConvex(v: Vector3[]) {
        let angleSum = 0.0
        let n = v.length
        for (let i = 0; i < n; ++i) {
            // 计算边向量，必须小心第一个和最后一个顶点
            let e1 = new Vector3()
            if (i === 0) {
                e1 = v[n - 1].minus(v[i])
            } else {
                e1 = v[i - 1].minus(v[i])
            }
            let e2 = new Vector3()
            if (i === n - 1) {
                e2 = v[0].minus(v[i])
            } else {
                e2 = v[i + 1].minus(v[i])
            }
            // 标准化并计算点乘
            e1.normalize()
            e2.normalize()
            let dot = e1.dot(e2)

            // 计算较小的角
            let theta = MathUtil.safeAcos(dot)
            angleSum += theta
        }
        // 计算内角和
        let covnexAngleSum = (n - 2) * MathUtil.kPi
        // 允许一定误差
        if (angleSum < covnexAngleSum - n * 0.0001) {
            return false
        }
        return true
    }

    public static getPlaneByTriangle(v: Vector3[]) {
        let [p1, p2, p3] = v
        let e3 = p2.minus(p1)
        let e1 = p3.minus(p2)
        let multiValue = e3.cross(e1)
        let magValue = multiValue.mag()
        let n = multiValue.divide(magValue)
        return n
    }
}

export default Utils
