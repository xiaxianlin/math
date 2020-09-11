import { Mat, Vec, Vec4, Vec3, Mat3 } from './types.ts'
import { cos } from './triangle.ts'
import { isNumber } from './valid.ts'

function valid(m: Mat) {
    let total = m.reduce((sum, item) => sum + item.length, 0)
    if (total % m.length !== 0) {
        throw '矩阵结构错误'
    }
}

function validMultiByMatrix(m1: Mat, m2: Mat) {
    valid(m1)
    valid(m2)
    let size1 = getSize(m1)
    let size2 = getSize(m2)
    if (size1.column !== size2.row) {
        throw '两个矩阵的结构不匹配，无法相乘'
    }
}

function getRowCount(m: Mat): number {
    valid(m)
    return m.length
}

function getColumnCount(m: Mat): number {
    return m[0].length
}

function getSize(m: Mat) {
    return { row: getRowCount(m), column: getColumnCount(m) }
}

function getRow(m: Mat, index: number): Vec {
    return m[index]
}

function getColumn(m: Mat, index: number): Vec {
    return m.map((item) => item[index])
}

/**
 * 矩阵与标量乘法
 */
function multiWithScalar(m: Mat, k: number): Mat {
    valid(m)
    let nm: Mat = new Array()
    let { row, column } = getSize(m)
    for (let i = 0; i < row; i++) {
        nm[i] = new Array()
        for (let j = 0; j < column; j++) {
            nm[i][j] = m[i][j] * k
        }
    }
    return nm
}
/**
 * 矩阵与向量乘法
 */
function multiWithVector(m: Mat, v: Vec, t: boolean = false): Mat | Vec {
    valid(m)
    if (t) {
        return multiWithMatrix(m, transpose([v]))
    }
    return multiWithMatrix([v], m)[0]
}

/**
 * 矩阵与矩阵乘法
 */
function multiWithMatrix(m1: Mat, m2: Mat): Mat {
    validMultiByMatrix(m1, m2)
    let nm: Mat = new Array()
    let size1 = getSize(m1)
    let size2 = getSize(m2)
    for (let i = 0; i < size1.row; i++) {
        nm[i] = new Array()
        for (let j = 0; j < size2.column; j++) {
            nm[i][j] = 0
            for (let k = 0; k < size2.row; k++) {
                nm[i][j] += m1[i][k] * m2[k][j]
            }
        }
    }
    return nm
}

/**
 * 二维单位矩阵
 */
export function mat2() {
    return [
        [1, 0],
        [0, 1]
    ]
}

/**
 * 三维单位矩阵
 */
export function mat3() {
    return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ]
}

/**
 * 四维单位矩阵
 */
export function mat4() {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
}

/**
 * 矩阵乘法
 */
export function multi(m: Mat, n: number | Vec | Mat, t?: boolean): Mat | Vec {
    if (isNumber(n)) {
        return multiWithScalar(m, n as number)
    }
    if (Array.isArray(n)) {
        if (isNumber(n[0])) {
            return multiWithVector(m, n as Vec, t)
        }
        return multiWithMatrix(m, n as Mat)
    }
    throw '参数格式非法'
}

/**
 * 矩阵转置
 */
export function transpose(m: Mat): Mat {
    let nm: Mat = new Array()
    let { row, column } = getSize(m)
    for (let i = 0; i < column; i++) {
        nm[i] = new Array()
        for (let j = 0; j < row; j++) {
            nm[i][j] = m[j][i]
        }
    }
    return nm
}

/**
 * 创建绕任意旋转的变换矩阵
 * @param {vec3} n 旋转轴
 * @param {number} theta 旋转角度
 */
export function createRotateMatrix(n: Vec3, theta: number): Mat3 {
    let [x, y, z] = n
    let c = cos(theta)
    let ac = 1 - cos(theta)
    return [
        [x * x * ac + c, x * y * ac + z * c, x * z * ac - y * c],
        [x * y * ac - z * c, y * y * ac + c, y * z * ac + x * c],
        [x * z * ac + y * c, y * z * ac - x * c, z * z * ac + c]
    ]
}

/**
 * 沿任意方向缩放
 * @param {vec3} n 缩放方向
 * @param {number} theta 缩放因子
 */
export function createScaleMatrix(n: Vec3, k: number): Mat3 {
    let [x, y, z] = n
    let d = k - 1
    return [
        [1 + d * x * x, d * x * y, d * x * z],
        [d * x * y, 1 + d * y * y, d * y * z],
        [d * x * z, d * z * y, 1 + d * z * z]
    ]
}

/**
 * 创建正交投影矩阵
 * @param {vec3} n 投影平面
 */
export function createOrthogonalProjectionMatrix(n: Vec3): Mat3 {
    // return createScaleMatrix(n, 0)
    let [x, y, z] = n
    return [
        [1 - x * x, -x * y, -x * z],
        [-x * y, 1 - y * y, -y * z],
        [-x * z, -z * y, 1 - 1 * z]
    ]
}

/**
 * 沿任意轴镜像
 * @param {vec3} n 镜像轴
 */
export function createMirrorMatrix(n: Vec3): Mat3 {
    // return createScaleMatrix(n, -1)
    let [x, y, z] = n
    return [
        [1 - 2 * x * x, -2 * x * y, -2 * x * z],
        [-2 * x * y, 1 - 2 * y * y, -2 * y * z],
        [-2 * x * z, -2 * z * y, 1 - 2 * z * z]
    ]
}

/**
 * 行列式
 */
export function det(m: Mat): number {
    return 0
}

/**
 * 求逆
 */
export function adj(m: Mat) {}

/**
 * 余子式
 * @param {Mat} m 方阵
 * @param {number} i 删除的行
 * @param {number} j 删除的列
 */
export function minor(m: Mat, i: number, j: number): Mat {
    let newMat = []
    let { row } = getSize(m)
    for (let r = 0; r < row; r++) {
        if (r !== i) {
            newMat.push(m[r].slice(0, j).concat(m[r].slice(j + 1)))
        }
    }
    return newMat
}

/**
 * 代数余子式
 */
export function cofactor(m: Mat, i: number, j: number) {}

export function toEulerAngle(m: Mat3): Vec3 {
    // 以弧度形式计算欧拉角
    let h: number, p: number, b: number
    let [m11, m12, m13] = m[0]
    let [m21, m22, m23] = m[1]
    let [m31, m32, m33] = m[2]

    // 从m23计算pitch，小心asin()的域错误，因为浮点计算，允许一定误差
    let sp = -m23

    if (sp <= -1.0) {
        p = Math.PI / -2
    } else if (sp >= 1.0) {
        p = Math.PI / 2
    } else {
        p = Math.asin(sp)
    }

    // 检查万向锁，允许一些误差
    if (sp > 0.9999) {
        // 从正上或正下看
        // 将bank置零，赋值给heading
        h = Math.atan2(-m31, m11)
        b = 0.0
    } else {
        // 通过m13和m33计算heading
        h = Math.atan2(m13, m33)
        // 通过m21和m22计算bank
        b = Math.atan2(m21, m22)
    }

    return [h, p, b]
}

export function toQuternion(m: Mat3): Vec4 {
    let x: number = 0,
        y: number = 0,
        z: number = 0,
        w: number = 0
    let [m11, m12, m13] = m[0]
    let [m21, m22, m23] = m[1]
    let [m31, m32, m33] = m[2]

    let fourWSquareMinus1 = m11 + m22 + m33
    let fourXSquareMinus1 = m11 - m22 - m33
    let fourYSquareMinus1 = m22 - m11 - m33
    let fourZSquareMinus1 = m33 - m11 - m22

    let biggestIndex = 0
    let fourBiggestSquareMinus1 = fourWSquareMinus1
    if (fourXSquareMinus1 > fourBiggestSquareMinus1) {
        fourBiggestSquareMinus1 = fourXSquareMinus1
        biggestIndex = 1
    }

    if (fourYSquareMinus1 > fourBiggestSquareMinus1) {
        fourBiggestSquareMinus1 = fourYSquareMinus1
        biggestIndex = 2
    }

    if (fourZSquareMinus1 > fourBiggestSquareMinus1) {
        fourBiggestSquareMinus1 = fourZSquareMinus1
        biggestIndex = 3
    }

    let biggestVal = Math.sqrt(fourBiggestSquareMinus1 + 1.0) * 0.5
    let mult = 0.25 / biggestVal

    switch (biggestIndex) {
        case 0:
            w = biggestVal
            x = (m23 - m32) * mult
            y = (m31 - m13) * mult
            z = (m12 - m21) * mult
            break
        case 1:
            x = biggestVal
            w = (m23 - m32) * mult
            y = (m12 + m21) * mult
            z = (m31 + m13) * mult
            break
        case 2:
            y = biggestVal
            w = (m31 - m13) * mult
            x = (m12 + m21) * mult
            z = (m23 + m32) * mult
            break
        case 3:
            z = biggestVal
            w = (m12 - m21) * mult
            x = (m31 + m13) * mult
            y = (m23 + m32) * mult
            break
    }

    return [w, x, y, z]
}
