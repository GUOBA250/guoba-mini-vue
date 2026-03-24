import { NodeTypes } from './ast'

const enum TagType {
    Start,
    End
}

export function baseParse(content: string) {
    const context = createParserContext(content)
    return createRoot(parseChildren(context))
}

function createRoot(children: any[]) {
    return {
        type: NodeTypes.ROOT,
        children
    }
}

function createParserContext(content: string) {
    return {
        source: content
    }
}

function parseChildren(context: any) {
    const nodes: any[] = []

    while (!isEnd(context)) {
        const node = parseNode(context)
        if (node) {
            nodes.push(node)
        }
    }

    return nodes
}

function isEnd(context: any) {
    return context.source.length === 0 || context.source.startsWith('</')
}

function parseNode(context: any) {
    const s = context.source

    if (s.startsWith('{{')) {
        return parseInterpolation(context)
    } else if (s.startsWith('<')) {
        return parseElement(context)
    } else {
        return parseText(context)
    }
}

function parseInterpolation(context: any) {
    const openDelimiter = '{{'
    const closeDelimiter = '}}'

    const closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length)
    advanceBy(context, openDelimiter.length)

    const rawContentLength = closeIndex - openDelimiter.length
    const rawContent = context.source.slice(0, rawContentLength)
    const content = rawContent.trim()

    advanceBy(context, rawContentLength + closeDelimiter.length)

    return {
        type: NodeTypes.INTERPOLATION,
        content: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: content
        }
    }
}

function parseElement(context: any) {
    const element: any = parseTag(context, TagType.Start)

    const children = parseChildren(context)

    if (children.length > 0) {
        element.children = children
    }

    parseTag(context, TagType.End)

    return element
}

function parseTag(context: any, type: TagType) {
    const match: any = /^<\/?([a-z]*)/i.exec(context.source)

    if (!match) {
        throw new Error(`Invalid tag format: ${context.source}`)
    }

    const tag = match[1]
    advanceBy(context, match[0].length)
    advanceBy(context, 1)

    return {
        type: NodeTypes.ELEMENT,
        tag: tag
    }
}

function parseText(context: any) {
    const endTokens = ['<', '{{']
    let endIndex = context.source.length

    for (const token of endTokens) {
        const index = context.source.indexOf(token)
        if (index !== -1 && index < endIndex) {
            endIndex = index
        }
    }

    const content = context.source.slice(0, endIndex)
    advanceBy(context, content.length)

    return {
        type: NodeTypes.TEXT,
        content: content
    }
}

function advanceBy(context: any, length: number) {
    context.source = context.source.slice(length)
}
