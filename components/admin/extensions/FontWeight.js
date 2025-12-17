import { Mark, mergeAttributes } from '@tiptap/react'

export const FontWeight = Mark.create({
  name: 'fontWeight',

  addAttributes() {
    return {
      weight: {
        default: null,
        parseHTML: element => element.style.fontWeight,
        renderHTML: attributes => {
          if (!attributes.weight) {
            return {}
          }
          return {
            style: `font-weight: ${attributes.weight}`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'strong',
        getAttrs: () => ({ weight: '700' }),
      },
      {
        tag: 'b',
        getAttrs: () => ({ weight: '700' }),
      },
      {
        style: 'font-weight',
        getAttrs: value => ({ weight: value }),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setFontWeight: weight => ({ commands }) => {
        return commands.setMark(this.name, { weight })
      },
      unsetFontWeight: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },
})
