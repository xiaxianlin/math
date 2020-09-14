import EulerAngles from './EulerAngles.ts'
import Quaternion from './Quaternion.ts'
import Vectror3 from './Vector3.ts'

class RotationMatrix {
    public m11: number
    public m12: number
    public m13: number
    public m21: number
    public m22: number
    public m23: number
    public m31: number
    public m32: number
    public m33: number

    public identity() {}

    public setup(orientation: EulerAngles) {}

    public fromWorldToObjectQuaternion(q: Quaternion) {}
    public fromObjectToWorldQuaternion(q: Quaternion) {}

    public getWorldToObjectVector3(v: Vectror3): Vectror3 {
        return new Vectror3()
    }
    public getObjectToWorldVector3(v: Vectror3): Vectror3 {
        return new Vectror3()
    }
}

export default RotationMatrix
