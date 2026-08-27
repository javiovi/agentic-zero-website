import type { BlogBlock, BlogInline, BlogListItem, BlogPost } from './blog'

function absoluteHref(href: string): string {
  return href.startsWith('/') ? `https://agenticzero.xyz${href}` : href
}

function inlineToMarkdown(content: BlogInline[], accentStrong = false): string {
  return content
    .map((part) => {
      if (typeof part === 'string') return part
      if ('strong' in part) return accentStrong ? `**${part.text}**` : part.text
      if ('code' in part) return `\`${part.text}\``
      if ('emphasis' in part) return `_${part.text}_`

      const label = part.strongLink && accentStrong ? `**${part.text}**` : part.text
      return `[${label}](${absoluteHref(part.href)})`
    })
    .join('')
}

function listItemToMarkdown(
  item: BlogListItem,
  depth: number,
  accentStrong: boolean
): string[] {
  const content = Array.isArray(item) ? item : item.content
  const children = Array.isArray(item) ? [] : item.children
  const indent = '  '.repeat(depth)

  return [
    `${indent}- ${inlineToMarkdown(content, accentStrong)}`,
    ...children.flatMap((child) => listItemToMarkdown(child, depth + 1, accentStrong)),
  ]
}

function tableCell(content: BlogInline[], accentStrong: boolean): string {
  return inlineToMarkdown(content, accentStrong).replace(/\|/g, '\\|').replace(/\n/g, ' ')
}

function blockToMarkdown(block: BlogBlock): string {
  if (block.type === 'heading') return `## ${block.text}`
  if (block.type === 'subheading') return `### ${block.text}`
  if (block.type === 'minorHeading') return `#### ${block.text}`
  if (block.type === 'paragraph') {
    return inlineToMarkdown(block.content, Boolean(block.accentStrong))
  }
  if (block.type === 'list') {
    return block.items
      .flatMap((item) => listItemToMarkdown(item, 0, Boolean(block.accentStrong)))
      .join('\n')
  }
  if (block.type === 'code') return `\`\`\`text\n${block.content}\n\`\`\``
  if (block.type === 'table') {
    const accentStrong = Boolean(block.accentStrong)
    const header = `| ${block.headers.map((cell) => tableCell(cell, accentStrong)).join(' | ')} |`
    const divider = `| ${block.headers.map(() => '---').join(' | ')} |`
    const rows = block.rows.map(
      (row) => `| ${row.map((cell) => tableCell(cell, accentStrong)).join(' | ')} |`
    )
    return [header, divider, ...rows].join('\n')
  }
  if (block.type === 'divider') return '---'

  return [
    `## ${block.title}`,
    block.text,
    `[${block.label}](${absoluteHref(block.href)})`,
  ].join('\n\n')
}

export function blogPostToMarkdown(post: BlogPost): string {
  return [
    `# ${post.title}`,
    `Published: ${post.date}`,
    ...post.body.map(blockToMarkdown),
  ].join('\n\n') + '\n'
}

export function blogPostWordCount(post: BlogPost): number {
  const words = blogPostToMarkdown(post)
    .replace(/https?:\/\/\S+/g, ' ')
    .match(/[\p{L}\p{N}]+(?:[.’'/-][\p{L}\p{N}]+)*/gu)

  return words?.length ?? 0
}
