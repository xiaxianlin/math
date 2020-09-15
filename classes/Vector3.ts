import Matrix4x3 from './Matrix4x3.ts'

class Vectror3 {
    public x: number = 0.0
    public y: number = 0.0
    public z: number = 0.0
    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
        this.x = x
        this.y = y
        this.z = z
    }

    public zero() {
        this.x = this.y = this.z = 0.0
    }

    public add(v: Vectror3) {
        return new Vectror3(this.x + v.x, this.y + v.y, this.z + v.z)
    }

    public minus(v: Vectror3) {
        return new Vectror3(this.x - v.x, this.y - v.y, this.z - v.z)
    }

    public multi(k: number) {
        return new Vectror3(this.x * k, this.y * k, this.z * k)
    }

    public multiWithMartix(m: Matrix4x3) {
        return new Vectror3(
            this.x * m.m11 + this.y * m.m21 + this.z * m.m31,
            this.x * m.m12 + this.y * m.m22 + this.z * m.m32,
            this.x * m.m13 + this.y * m.m23 + this.z * m.m33
        )
    }

    public divide(k: number) {
        k = 1.0 / k
        return this.multi(k)
    }

    public cross(v: Vectror3) {
        return new Vectror3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x)
    }

    public mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    public dot(v: Vectror3) {
        return this.x * v.x + this.y * v.y + this.z * v.z
    }

    public normalize() {
        let magSq = this.x * this.x + this.y * this.y + this.z * this.z
        let oneOverMag = 1.0 / Math.sqrt(magSq)
        if (magSq > 0.0) {
            this.x *= oneOverMag
            this.y *= oneOverMag
            this.z *= oneOverMag
        }
    }

    public distance(v: Vectror3) {
        let dx = this.x - v.x
        let dy = this.y - v.y
        let dz = this.z - v.z
        return Math.sqrt(dx * dx + dy * dy + dz * dz)
    }
}

export default Vectror3
