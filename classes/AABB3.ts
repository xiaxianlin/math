import Vector3 from './Vector3.ts'
const kBigNumber = 1e37
class AABB3 {
    public static createByDotList(list: Vector3[]) {
        let box = new AABB3()
        box.empty()
        list.forEach((dot) => {
            box.add(dot)
        })
        return box
    }

    public min: Vector3 = new Vector3()
    public max: Vector3 = new Vector3()

    public empty() {
        this.min.x = this.min.y = this.min.z = kBigNumber
        this.max.x = this.max.y = this.max.z = -kBigNumber
    }

    public add(p: Vector3) {
        if (p.x < this.min.x) this.min.x = p.x
        if (p.x > this.max.x) this.max.x = p.x
        if (p.y < this.min.y) this.min.y = p.y
        if (p.y > this.max.y) this.max.y = p.y
        if (p.z < this.min.z) this.min.z = p.z
        if (p.z > this.max.z) this.max.z = p.z
    }
}

export default AABB3
