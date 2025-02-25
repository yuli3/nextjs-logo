"use client"

import { useReducer, useEffect } from "react"
import type { LogoState, LogoAction, UndoableState } from "@/types/logo"
import { colorPalettes } from "@/utils/color-palettes"
import { defaultLayout } from "@/utils/layouts"

const appleWhitePalette = colorPalettes.find((p) => p.id === "apple-white")!

const initialLogoState: LogoState = {
  type: "icon",
  iconStyle: {
    size: 48,
    rotate: 0,
    strokeWidth: 2,
    color: appleWhitePalette.colors.primary,
    fill: appleWhitePalette.colors.secondary,
    opacity: 1,
    absoluteStrokeWidth: false,
    gradientColorFrom: appleWhitePalette.colors.gradientFrom,
    gradientColorTo: appleWhitePalette.colors.gradientTo,
    borderRadius: "none",
    preserveAspectRatio: "xMidYMid meet",
  },
  textStyle: {
    text: "",
    fontSize: 24,
    fontWeight: 600,
    color: appleWhitePalette.colors.primary,
    borderWidth: 0,
    borderColor: appleWhitePalette.colors.secondary,
    fontFamily: "sans",
    gradientColorFrom: appleWhitePalette.colors.gradientFrom,
    gradientColorTo: appleWhitePalette.colors.gradientTo,
    borderRadius: "none",
  },
  background: {
    rounded: "lg",
    padding: 16,
    shadow: "md",
    gradientColorFrom: appleWhitePalette.colors.gradientFrom,
    gradientColorTo: appleWhitePalette.colors.gradientTo,
    gradientDirection: "to-r",
  },
  selectedLayout: defaultLayout.id,
}

const initialState: UndoableState = {
  past: [],
  present: initialLogoState,
  future: [],
}

function logoReducer(state: UndoableState, action: LogoAction): UndoableState {
  const { past, present, future } = state

  switch (action.type) {
    case "UNDO": {
      if (past.length === 0) return state
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      }
    }
    case "REDO": {
      if (future.length === 0) return state
      const next = future[0]
      const newFuture = future.slice(1)
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      }
    }
    case "RESET": {
      const newPresent = { ...initialLogoState, selectedLayout: present.selectedLayout }
      return {
        past: [],
        present: newPresent,
        future: [],
      }
    }
    case "SET_LAYOUT": {
      const newPresent = { ...present, selectedLayout: action.payload }
      if (present === newPresent) return state
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      }
    }
    default: {
      const newPresent = logoStateReducer(present, action)
      if (present === newPresent) return state
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      }
    }
  }
}

function logoStateReducer(state: LogoState, action: LogoAction): LogoState {
  switch (action.type) {
    case "SET_LOGO_TYPE":
      return { ...initialLogoState, type: action.payload, selectedLayout: state.selectedLayout }
    case "SET_ICON":
      return { ...state, icon: action.payload }
    case "UPDATE_ICON_STYLE":
      return { ...state, iconStyle: { ...state.iconStyle, ...action.payload } }
    case "UPDATE_TEXT_STYLE":
      return { ...state, textStyle: { ...state.textStyle, ...action.payload } }
    case "UPDATE_BACKGROUND":
      return { ...state, background: { ...state.background, ...action.payload } }
    default:
      return state
  }
}

export function useLogoState() {
  const [state, dispatch] = useReducer(logoReducer, initialState)

  const canUndo = state.past.length > 0
  const canRedo = state.future.length > 0

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") {
          e.preventDefault()
          if (canUndo) {
            dispatch({ type: "UNDO" })
          }
        } else if (e.key === "y") {
          e.preventDefault()
          if (canRedo) {
            dispatch({ type: "REDO" })
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [canUndo, canRedo])

  return {
    state: state.present,
    dispatch,
    canUndo,
    canRedo,
  }
}

