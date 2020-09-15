import Quaternion from './classes/Quaternion.ts'
import Matrix4x3 from './classes/Matrix4x3.ts'
import RotationMatrix from './classes/RotationMatrix.ts'
import EulerAngles from './classes/EulerAngles.ts'
import Vector3 from './classes/Vector3.ts'

const q = new Quaternion(0.5, 0.8, -0.2, 0.5)
console.log('quternion:', q.toArray())

q.normalize()
console.log('normalize:', q.toArray())

console.log('\n/*quternion -> martrix -> angle -> quternion*/')

const m1 = new RotationMatrix()
m1.fromInertialToObjectQuaternion(q)
console.log('rotate matrix:', m1.toArray())

const m431 = new Matrix4x3()
m431.setupParentToLocalByRotationMatrix(new Vector3(), m1)
console.log('matrix 4x3:', m431.toArray())

const a1 = new EulerAngles()
a1.fromInertialToObjectMatrix(m431)
console.log('euler angle:', a1.toArray())

const q1 = new Quaternion()
q1.setToRotateInertialToObject(a1)
console.log('eulerAngleToQuternion', q1.toArray())

console.log('\n/*quternion -> angle -> matrix -> quternion*/')

const a2 = new EulerAngles()
a2.fromInertialToObjectQuaternion(q)
console.log('angle:', a2.toArray())

const m2 = new RotationMatrix()
m2.setup(a2)
console.log('rotate matrix:', m2.toArray())

const m432 = new Matrix4x3()
m432.setupParentToLocalByRotationMatrix(new Vector3(), m2)
console.log('matrix 4x3:', m432.toArray())

const a3 = new EulerAngles()
a3.fromInertialToObjectMatrix(m432)
console.log('angle:', a3.toArray())

const q2 = new Quaternion()
q2.setToRotateInertialToObject(a2)
console.log('quternion:', q2.toArray())
