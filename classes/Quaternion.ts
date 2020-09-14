import Vectror3 from './Vector3.ts'
import EulerAngles from './EulerAngles.ts'

class Quaternion {
    public w: number
    public x: number
    public y: number
    public z: number

    public identity() {
        this.w = 1.0
        this.x = this.y = this.z = 0.0
    }

    public cross(a: Quaternion) {}

    public normalize() {}

    public dot(b: Quaternion) {}

    public slerp(q: Quaternion, t: number) {}

    public conjuate() {}

    public pow(exponent: number) {}

    public setToRotateAboutX(theta: number) {}
    public setToRotateAboutY(theta: number) {}
    public setToRotateAboutZ(theta: number) {}
    public setToRotateAboutAxis(v: Vectror3, theta: number) {}

    public setToRotateObjectToWorld(orientation: EulerAngles) {}
    public setToRotateWorldToObject(orientation: EulerAngles) {}
}

export default Quaternion
