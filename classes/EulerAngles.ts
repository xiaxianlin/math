import MathUtil from './MathUtil.ts'
import Matrix4x3 from './Matrix4x3.ts'
import Quaternion from './Quaternion.ts'
import RotationMatrix from './RotationMatrix.ts'
import { Vec3 } from '../src/types.ts'

class EulerAngles {
    public heading: number = 0.0
    public pitch: number = 0.0
    public bank: number = 0.0

    /**
     * 可直接传入参数构造欧拉角
     */
    constructor(h: number = 0.0, p: number = 0.0, b: number = 0.0) {
        this.heading = h
        this.pitch = p
        this.bank = b
    }

    public toArray() {
        return [this.heading, this.pitch, this.bank]
    }

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
        // 首先，将pitch变换到-π到π之间
        this.pitch = MathUtil.wrapPi(this.pitch)

        // 然后，将pitch变换到-π/2到π/2之间
        if (this.pitch < -MathUtil.kPiOver2) {
            this.pitch = -MathUtil.kPi - this.pitch
            this.heading += MathUtil.kPi
            this.bank += MathUtil.kPi
        } else if (this.pitch > MathUtil.kPiOver2) {
            this.pitch = MathUtil.kPi - this.pitch
            this.heading += MathUtil.kPi
            this.bank += MathUtil.kPi
        }

        // 检查万向锁问题，允许存在一定的误差
        if (Math.abs(this.pitch) > MathUtil.kPiOver2 - 1e-4) {
            // 在万向锁中，将所有绕垂直轴的旋转赋给heading
            this.heading += this.bank
            this.bank = 0.0
        } else {
            // 非万向锁，将bank转换到限制集中
            this.bank = MathUtil.wrapPi(this.bank)
        }

        // 将heading转换到限制集中
        this.heading = MathUtil.wrapPi(this.heading)
    }
    /**
     * 从四元数转换到欧拉角：对象坐标系-世界坐标系
     */
    public fromObjectToInertialQuaternion(q: Quaternion) {
        let sp = -2.0 * (q.y * q.z - q.w * q.x)
        if (Math.abs(sp) > 0.9999) {
            this.pitch = MathUtil.kPiOver2 * sp
            this.heading = Math.atan2(-q.x * q.z + q.w * q.y, 0.5 - q.y * q.y - q.z * q.z)
            this.bank = 0.0
        } else {
            this.pitch = Math.asin(sp)
            this.heading = Math.atan2(q.x * q.z + q.w * q.y, 0.5 - q.x * q.x - q.y * q.y)
            this.bank = Math.atan2(q.x * q.y + q.w * q.z, 0.5 - q.x * q.x - q.z * q.z)
        }
    }
    /**
     * 从四元数转换到欧拉角：世界坐标系-对象坐标系
     */
    public fromInertialToObjectQuaternion(q: Quaternion) {
        let sp = -2.0 * (q.y * q.z + q.w * q.x)
        if (Math.abs(sp) > 0.9999) {
            this.pitch = MathUtil.kPiOver2 * sp
            this.heading = Math.atan2(-q.x * q.z - q.w * q.y, 0.5 - q.y * q.y - q.z * q.z)
            this.bank = 0.0
        } else {
            this.pitch = Math.asin(sp)
            this.heading = Math.atan2(q.x * q.z - q.w * q.y, 0.5 - q.x * q.x - q.y * q.y)
            this.bank = Math.atan2(q.x * q.y - q.w * q.z, 0.5 - q.x * q.x - q.z * q.z)
        }
    }
    /**
     * 从矩阵换到欧拉角：对象坐标系-惯性坐标系
     * 假设矩阵是正交的，忽略平移部分
     */
    public fromObjectToInertialMatrix(m: Matrix4x3) {
        let sp = -m.m32
        if (Math.abs(sp) > 9.99999) {
            this.pitch = MathUtil.kPiOver2 * sp
            this.heading = Math.atan2(-m.m23, m.m11)
            this.bank = 0.0
        } else {
            this.pitch = Math.asin(sp)
            this.heading = Math.atan2(m.m31, m.m33)
            this.bank = Math.atan2(m.m12, m.m22)
        }
    }
    /**
     * 从矩阵转换到欧拉角：惯性坐标系-对象坐标系
     * 假设矩阵是正交的，忽略平移部分
     */
    public fromInertialToObjectMatrix(m: Matrix4x3) {
        let sp = -m.m23
        if (Math.abs(sp) > 9.99999) {
            this.pitch = MathUtil.kPiOver2 * sp
            this.heading = Math.atan2(-m.m31, m.m11)
            this.bank = 0.0
        } else {
            this.pitch = Math.asin(sp)
            this.heading = Math.atan2(m.m13, m.m33)
            this.bank = Math.atan2(m.m21, m.m22)
        }
    }
    /**
     * 从旋转矩阵转换到欧拉角
     */
    public fromRotationMatrix(m: RotationMatrix) {
        let sp = -m.m23
        if (Math.abs(sp) > 9.99999) {
            this.pitch = MathUtil.kPiOver2 * sp
            this.heading = Math.atan2(-m.m31, m.m11)
            this.bank = 0.0
        } else {
            this.pitch = Math.asin(sp)
            this.heading = Math.atan2(m.m13, m.m33)
            this.bank = Math.atan2(m.m21, m.m22)
        }
    }
}

export default EulerAngles
