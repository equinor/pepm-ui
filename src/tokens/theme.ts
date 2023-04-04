import { tokens } from '@equinor/eds-tokens'

const interactive = tokens.colors.interactive

export const theme = {
  light: {
    primary: {
      resting: interactive.primary__resting.hex,
      hover: interactive.primary__hover.hex,
      hoverAlt: interactive.primary__hover_alt.hex,
      selectedHighlight: interactive.primary__selected_highlight.hex,
      selectedHover: interactive.primary__selected_hover.hex,
    },
    secondary: {
      resting: interactive.secondary__resting.hex,
      linkHover: interactive.secondary__link_hover.hex,
      highlight: interactive.secondary__highlight.hex,
    },
  },
}
