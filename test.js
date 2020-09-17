const root = {
    id: '',
    name: '一处',
    type: 'chushi',
    parent: null,
    children: [
        {
            id: '',
            name: '处部',
            type: 'kehsi',
            parent: root,
            children: [
                { id: '', name: 'ZHY', type: 'xiaozu', subType: 'leader', children: [{ id: '', name: '员工1' }] },
                {
                    id: '',
                    name: 'ZBBZ',
                    type: 'xiaozu',
                    subType: 'stuff',
                    children: [
                        { id: '', name: '员工2' },
                        { id: '', name: '员工3' }
                    ]
                }
            ]
        }
    ]
}
// 数据补齐
function init(root) {}

function add(node, value: Node) {
    fetch(value)
    node.children.push(value)
    render(root)
}

function remove(node) {
    node.parent.children = parent.children.filter((i) => i.id !== node.id)
    render(root)
}

function render(tree) {
    // todo
}
