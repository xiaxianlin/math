import * as Vec from './src/vec.ts'
import { vec3 } from './src/types.ts'

console.log('size', Vec.size([3, 4]))

const v1 = [0, 1]
const v2 = [1, 0]
console.log('add', Vec.add(v1, v2))
console.log('dot', Vec.dot(v1, v2))
console.log('theta', Vec.theta(v1, v2))

const v3 = [12, -5]
console.log('normalize', Vec.normalize(v3))

const v4: vec3 = [1, 2, 3]
const v5: vec3 = [4, 5, 6]
console.log('cross', Vec.cross(v4, v5))
