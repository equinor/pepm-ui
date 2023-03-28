import { tokens } from '@equinor/eds-tokens'

export const theme = {
  light: {
    primary: {
      resting: tokens.colors.interactive.primary__resting.hex,
      hover: tokens.colors.interactive.primary__hover.hex,
      hoverAlt: tokens.colors.interactive.primary__hover_alt.hex,
      selectedHighlight:
        tokens.colors.interactive.primary__selected_highlight.hex,
      selectedHover: tokens.colors.interactive.primary__selected_hover.hex,
    },
    secondary: {
      resting: tokens.colors.interactive.secondary__resting.hex,
      linkHover: tokens.colors.interactive.secondary__link_hover.hex,
      highlight: tokens.colors.interactive.secondary__highlight.hex,
    },
  },
}
