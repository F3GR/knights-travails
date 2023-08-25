const knightMovesList = [
    [-2, 1], [-1, 2], [2, 1], [1, 2], 
    [-2, -1], [-1, -2], [2, -1], [1, -2]
]
const validCoordinates = [0, 1, 2, 3, 4, 5, 6, 7]

function knightMoves(startPosition, endPosition) {
    if (!notOutOfBoard(startPosition[0]) || 
        !notOutOfBoard(startPosition[1]) ||
        !notOutOfBoard(endPosition[0]) || 
        !notOutOfBoard(endPosition[1])
        ) {
        return -1
    }

    const root = new Node(startPosition[0], startPosition[1])
    const queue = [root]
    const visitedPositions = new Set()
    visitedPositions.add(root)

    while (queue.length) {
        const currentNode = queue.shift()
        const currentPosition = [currentNode.x, currentNode.y]
        if (currentPosition[0] === endPosition[0] && currentPosition[1] === endPosition[1]) {
            const path = []
            let node = currentNode
            while (node) {
                path.unshift(node)
                node = node.prev
            }
            return path;
        }
        
        visitedPositions.add(currentPosition.toString())
        knightMovesList.forEach((move) => {
            const newCoordinateX = currentPosition[0] + move[0]
            const newCoordinateY = currentPosition[1] + move[1]
            const newCoordinate = [newCoordinateX, newCoordinateY]
            if (notOutOfBoard(newCoordinateX) && 
                notOutOfBoard(newCoordinateY) &&
                !visitedPositions.has(newCoordinate.toString())) {

                const newNode = new Node(newCoordinateX, newCoordinateY)
                newNode.prev = currentNode
                currentNode.next.push(newNode)
                queue.push(newNode)
                visitedPositions.add(newNode.toString())
            }
        })
    }
    return -1
}

class Node {
    constructor(coordinateX, coordinateY) {
        this.x = coordinateX
        this.y = coordinateY
        this.next = []
        this.prev = null
    }
}

function notOutOfBoard(coordinate) {
    return validCoordinates.includes(coordinate)
}

function printTree(path) {
    console.log(path.map(node => `[${node.x}, ${node.y}]`).join(" -> "))
}

printTree(knightMoves([0, 0], [1, 2]))
printTree(knightMoves([0, 0], [3, 3]))
printTree(knightMoves([3, 3], [0, 0]))
printTree(knightMoves([0, 0], [7, 7]))
printTree(knightMoves([7, 0], [0, 7]))
printTree(knightMoves([1, 2], [6, 5]))
printTree(knightMoves([2, 3], [7, 7]))
printTree(knightMoves([2, 2], [6, 6]))
printTree(knightMoves([4, 4], [0, 0]))
printTree(knightMoves([0, 1], [4, 5]))