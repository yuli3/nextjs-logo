import type { LogoState } from "@/types/logo"
import { getBackgroundStyle } from "@/utils/gradient"

interface LogoPreviewProps {
  state: LogoState
  size?: number
}

export function LogoPreview({ state, size = 320 }: LogoPreviewProps) {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    maxWidth: "100%",
    aspectRatio: "1",
    // backgroundColor: state.background.gradientColorFrom,
  }

  const contentStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${state.background.padding}px`,
    background:
      state.type === "icon"
        ? getBackgroundStyle(
            state.iconStyle.gradientColorFrom,
            state.iconStyle.gradientColorTo,
            state.iconStyle.gradientDirection,
          )
        : getBackgroundStyle(
            state.textStyle.gradientColorFrom,
            state.textStyle.gradientColorTo,
            state.textStyle.gradientDirection,
          ),
    borderRadius: state.type === "icon" ? state.iconStyle.borderRadius : state.textStyle.borderRadius,
  }

  return (
    <div id="logo-preview" className="mx-auto flex items-center justify-center overflow-hidden" style={containerStyle}>
      <div className="relative flex h-full w-full items-center justify-center" style={contentStyle}>
        {state.type === "icon" && state.icon && (
          <state.icon
            size={Math.min(state.iconStyle.size, size * 0.8)}
            style={{
              transform: `rotate(${state.iconStyle.rotate}deg)`,
              strokeWidth: state.iconStyle.strokeWidth,
              color: state.iconStyle.color,
              fill: state.iconStyle.fill,
              opacity: state.iconStyle.opacity,
            }}
            absoluteStrokeWidth={state.iconStyle.absoluteStrokeWidth}
          />
        )}
        {state.type === "text" && (
          <span
            style={{
              fontSize: Math.min(state.textStyle.fontSize, size * 0.4),
              fontWeight: state.textStyle.fontWeight,
              color: state.textStyle.color,
              WebkitTextStroke: `${state.textStyle.borderWidth}px ${state.textStyle.borderColor}`,
              fontFamily:
                state.textStyle.fontFamily === "sans"
                  ? "ui-sans-serif, system-ui, sans-serif"
                  : state.textStyle.fontFamily === "serif"
                    ? "ui-serif, Georgia, serif"
                    : "ui-monospace, monospace",
            }}
          >
            {state.textStyle.text}
          </span>
        )}
      </div>
    </div>
  )
}

