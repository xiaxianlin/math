import Vector3 from './classes/Vector3.ts'
import Utils from './classes/Utils.ts'

let p1 = new Vector3(1, 2, 1)
let p2 = new Vector3(2, 4, 2)
let p3 = new Vector3(-9, 8, 0)

// let n = Utils.getPlaneByTriangle([p1, p2, p3])

// console.log(n.toArray())

// console.log(p1.dot(n))
// console.log(p2.dot(n))
// console.log(p3.dot(n))

// let e3 = p2.minus(p1)
// console.log('e3', e3.toArray())
// let e1 = p3.minus(p2)
// console.log('e1', e1.toArray())

// let t = e3.cross(e1)
// console.log('t', t.toArray())
// console.log('n', t.divide(t.mag()).toArray())

// console.log(p1.dot(t))
// console.log(p2.dot(t))
// console.log(p3.dot(t))

// p1.normalize(), p2.normalize()
console.log(p1.mag(), p2.mag())
