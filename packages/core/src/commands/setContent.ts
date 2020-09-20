import { Command } from '../Editor'
import { TextSelection } from 'prosemirror-state'

type SetContentCommand = (
  content: string,
  emitUpdate?: Boolean,
  parseOptions?: any,
) => Command

declare module '../Editor' {
  interface Editor {
    setContent: SetContentCommand,
  }
}

export const setContent: SetContentCommand = (content = null, emitUpdate = false, parseOptions = {}) => ({ tr, editor }) => {
  if (content === null) {
    return false
  }

  const { createDocument } = editor
  const { doc } = tr
  const document = createDocument(content, parseOptions)
  const selection = TextSelection.create(doc, 0, doc.content.size)
  
  tr.setSelection(selection)
    .replaceSelectionWith(document, false)
    .setMeta('preventUpdate', !emitUpdate)

  return true
}
