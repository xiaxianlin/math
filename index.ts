import * as Vector from './src/Vec.ts'
import * as Martrix from './src/martrix.ts'
import { Vec3, Mat, Vec } from './src/types.ts'

// console.log('size', Vector.size([3, 4]))

// const v1 = [0, 1]
// const v2 = [1, 0]
// console.log('add', Vector.add(v1, v2))
// console.log('dot', Vector.dot(v1, v2))
// console.log('theta', Vector.theta(v1, v2))

// const v3 = [12, -5]
// console.log('normalize', Vector.normalize(v3))

// const v4: Vec3 = [1, 2, 3]
// const v5: Vec3 = [4, 5, 6]
// console.log('cross', Vector.cross(v4, v5))

const v1: Vec = [1, 2, 3]

const m1: Mat = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

const m2: Mat = [
    [-3, 0],
    [5, 0.5],
    [4, 9]
]

const m3: Mat = [
    [-7, 2, 9, -20, 22],
    [4, 6, 9, 1, 2]
    // [-4, 61, 29, 21, 2]
]

console.log('transpose', Martrix.transpose([v1]))
console.log('multiWithScalar', Martrix.multiWithScalar(m1, 2))
console.log('multiWithVector', Martrix.multiWithVector(m1, v1, true))
console.log('multi', Martrix.multi(m2, m3))
