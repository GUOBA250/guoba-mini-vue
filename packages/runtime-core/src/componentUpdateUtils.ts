export function shouldUpdateComponent(prevNode: any, nextNode: any) {
    const { props: prevProps } = prevNode
    const { props: nextProps } = nextNode
    for (const key in nextProps) {
        if (nextProps[key] !== prevProps[key]) {
            return true
        }
    }
    return false
}
