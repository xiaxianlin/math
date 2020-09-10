const a = [{ a: 1 }, { b: 2 }, { c: 2 }]
const b = [{ a: 12 }, { c: 2 }, { d: 15 }]
const c = [{ d: 1 }]

const result = a.concat(b, c).reduce((data, item) => {
    let key = Object.keys(item)[0]
    let target = data.find((i) => Object.keys(i)[0] === key)
    if (target) {
        target[key] = target[key] + item[key]
        return data
    }
    target = { [key]: item[key] }
    return data.concat(target)
}, [])

console.log(result)
