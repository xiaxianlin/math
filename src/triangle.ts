export function getAngle(radian: number) {
    return radian * (180 / Math.PI)
}

export function getRadian(angle: number) {
    return (angle * Math.PI) / 180
}

export function sin(angle: number) {
    return Math.sin(getRadian(angle))
}

export function cos(angle: number) {
    return Math.cos(getRadian(angle))
}

export function asin(x: number) {
    let r = Math.asin(x)
    return getAngle(r)
}

function test(x: number) {
    console.log('init', x)
    let a = sin(x)
    console.log('sin', a)
    let x1 = asin(a)
    console.log('asin', x1)
}
