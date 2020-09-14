import Vectror3 from './Vector3.ts'
import EulerAngles from './EulerAngles.ts'
import RotationMatrix from './RotationMatrix.ts'
import Quaternion from './Quaternion.ts'

class Matrix4x3 {
    public m11: number
    public m12: number
    public m13: number
    public m21: number
    public m22: number
    public m23: number
    public m31: number
    public m32: number
    public m33: number

    public tx: number
    public ty: number
    public tz: number

    public identity() {}

    public multi() {}
    public multiWithVector3() {}

    public determinant() {}
    public inverse() {}
    public getTranslation() {}
    public getPositionFromParentToLocalMatrix(): Vectror3 {
        return new Vectror3()
    }
    public getPositionFromLocalToParentMatrix(): Vectror3 {
        return new Vectror3()
    }

    public zeroTranslate() {}
    public setTranslation(d: Vectror3) {}
    public setupTranslation(d: Vectror3) {}

    public setLocalToParentByEulerAngles(pos: Vectror3, orient: EulerAngles) {}
    public setLocalToParentByRotationMatrix(pos: Vectror3, orient: RotationMatrix) {}
    public setParentToLocalByEulerAngles(pos: Vectror3, orient: EulerAngles) {}
    public setParentToLocalByRotationMatrix(pos: Vectror3, orient: RotationMatrix) {}

    public setupRotate(axis: number, theta: number) {}
    public setupRotateByVector3(axis: Vectror3, theta: number) {}

    public fromQuaternion(q: Quaternion) {}

    public setupScale(s: Vectror3) {}

    public setupScaleAlongAxis(axis: Vectror3, k: number) {}

    public setupShear(axis: number, s: number, t: number) {}

    public setupProject(n: Vectror3) {}

    public setupReflect(axis: number, k: number = 0.0) {}

    public setupReflectByVector3(n: Vectror3) {}
}

export default Matrix4x3
