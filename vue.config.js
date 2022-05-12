const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/_breakpoints.scss";
          @import "@/assets/scss/_mixins.scss";
        `,
      },
    },
  },
});
