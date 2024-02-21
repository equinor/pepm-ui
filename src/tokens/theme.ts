import { tokens } from '@equinor/eds-tokens';

const interactive = tokens.colors.interactive;
const text = tokens.colors.text;
const ui = tokens.colors.ui;
const base = tokens.elevation;
const infographic = tokens.colors.infographic;

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
    text: {
      staticIconsTertiary: text.static_icons__tertiary.hex,
    },
    ui: {
      background: {
        default: ui.background__default.hex,
        light: ui.background__light.hex,
        medium: ui.background__medium.hex,
      },
      elevation: {
        raised: base.raised,
      },
    },
    info: {
      warning: infographic.primary__spruce_wood.hex,
    },
  },
};
