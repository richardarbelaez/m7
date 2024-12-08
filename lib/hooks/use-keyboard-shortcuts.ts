"use client"

import { useEffect } from 'react'
import hotkeys from 'hotkeys-js'

export function useKeyboardShortcuts(shortcuts: { key: string; callback: () => void }[]) {
  useEffect(() => {
    shortcuts.forEach(({ key, callback }) => {
      hotkeys(key, (event) => {
        event.preventDefault()
        callback()
      })
    })

    return () => {
      shortcuts.forEach(({ key }) => {
        hotkeys.unbind(key)
      })
    }
  }, [shortcuts])
}