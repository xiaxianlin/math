import { Mat, Vec } from './types.ts'
import { dot } from './Vec.ts'

function valid(m: Mat) {
    let total = m.reduce((sum, item) => sum + item.length, 0)
    if (total % m.length !== 0) {
        throw '矩阵结构错误'
    }
}

function validMultiByMartix(m1: Mat, m2: Mat) {
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

export function multi(m1: Mat, m2: Mat) {
    validMultiByMartix(m1, m2)
    let nm: Mat = new Array()
    let size1 = getSize(m1)
    let size2 = getSize(m2)
    for (let i = 0; i < size1.row; i++) {
        nm[i] = new Array()
        for (let j = 0; j < size2.column; j++) {
            nm[i][j] = dot(getRow(m1, i), getColumn(m2, j))
        }
    }
    return nm
}

export function multiWithScalar(m: Mat, k: number) {
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

export function multiWithVector(m: Mat, v: Vec, t: boolean = false) {
    valid(m)

    if (t) {
        return multi(m, transpose([v]))
    }
    return multi([v], m)
}

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
