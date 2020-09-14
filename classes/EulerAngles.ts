import MathUtil from './MathUtil.ts'
import Matrix4x3 from './Matrix4x3.ts'
import Quaternion from './Quaternion.ts'
import RotationMatrix from './RotationMatrix.ts'

class EulerAngles {
    public heading: number
    public pitch: number
    public bank: number

    /**
     * 可直接传入参数构造欧拉角
     */
    constructor(h?: number, p?: number, b?: number) {}

    /**
     * 置零
     */
    public identity() {
        this.heading = this.pitch = this.bank = 0.0
    }

    /**
     * 变换为“限制集”欧拉角
     */
    public canonize() {
        this.pitch = MathUtil.wrapPi(this.pitch)
        if (this.pitch < -MathUtil.kPiOver2) {
            this.pitch = -MathUtil.kPi - this.pitch
            this.heading += MathUtil.kPi
            this.bank += MathUtil.kPi
        } else if (this.pitch > MathUtil.kPiOver2) {
            this.pitch = MathUtil.kPi - this.pitch
            this.heading += MathUtil.kPi
            this.bank += MathUtil.kPi
        }
    }
    /**
     * 从四元数转换到欧拉角：对象坐标系-世界坐标系
     */
    public fromObjectToWorldQuaternion(q: Quaternion) {}
    /**
     * 从四元数转换到欧拉角：世界坐标系-对象坐标系
     */
    public fromWorldToObjectQuaternion(q: Quaternion) {}
    /**
     * 从矩阵换到欧拉角：对象坐标系-世界坐标系
     */
    public fromObjectToWorldMatrix(m: Matrix4x3) {}
    /**
     * 从矩阵转换到欧拉角：世界坐标系-对象坐标系
     */
    public fromWorldToObjectMatrix(m: Matrix4x3) {}
    /**
     * 从旋转矩阵转换到欧拉角
     */
    public fromRotationMatrix(m: RotationMatrix) {}
}

export default EulerAngles
