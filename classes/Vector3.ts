class Vectror3 {
    public x: number
    public y: number
    public z: number
    constructor(x?: number, y?: number, z?: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    public zero() {
        this.x = this.y = this.z = 0.0
    }

    public add(v: Vectror3): Vectror3 {
        return new Vectror3(this.x + v.x, this.y + v.y, this.z + v.z)
    }

    public minus(v: Vectror3): Vectror3 {
        return new Vectror3(this.x - v.x, this.y - v.y, this.z - v.z)
    }

    public multi(k: number): Vectror3 {
        return new Vectror3(this.x * k, this.y * k, this.z * k)
    }

    public divide(k: number): Vectror3 {
        k = 1.0 / k
        return this.multi(k)
    }

    public cross(v: Vectror3): Vectror3 {
        return new Vectror3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x)
    }

    public mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    public dot(v: Vectror3): number {
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

    public distance(v: Vectror3): number {
        let dx = this.x - v.x
        let dy = this.y - v.y
        let dz = this.z - v.z
        return Math.sqrt(dx * dx + dy * dy + dz * dz)
    }
}

export default Vectror3
