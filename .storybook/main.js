module.exports = {
  "stories": ["../src/components/*.mdx", "../src/components/*.stories.@(js|jsx|ts|tsx)"],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  "framework":"@storybook/react-webpack5",
  "typescript": {"reactDocgen":false},
};
