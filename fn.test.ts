import * as Vector from './src/vec.ts'
import * as Matrix from './src/matrix.ts'
import * as Quternion from './src/quternion.ts'
import * as EulerAngle from './src/euler_angles.ts'
import { Vec4 } from './src/types.ts'

const q: Vec4 = [0.5, 0.8, -0.2, 0.5]
console.log('quternion:', q)

const nq: Vec4 = Vector.normalize(q) as Vec4
console.log('normalize:', nq)

console.log('\n/*quternion -> matrix -> angle -> quternion*/')
const m1 = Quternion.toMatrix(nq)
console.log('quternionToMatrix:', m1)

const a1 = Matrix.toEulerAngle(m1)
console.log('martirxToEulerAngle:', a1)

const q1 = EulerAngle.toQuternion(a1)
console.log('eulerAngleToQuternion', q1)

console.log('\n/*quternion -> angle -> matrix -> quternion*/')

const a2 = Quternion.toEularAngle(nq)
console.log('quternionToEularAngle:', a2)

const m2 = EulerAngle.toMatrix(a2)
console.log('eulerAngleToMatrix:', m2)

const q2 = Matrix.toQuternion(m2)
console.log('martirxToQuternion:', q2)
