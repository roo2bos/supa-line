import type { Preview } from "@storybook/react";
// import "../styles/globals.css"; // Tailwind 적용
import "../styles/tailwind.config.css"; // Tailwind 적용

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true },
  },
};

export default preview;
