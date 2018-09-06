const faviconsContext = require.context(
    "!!file-loader?name=assets/favicons/[name].[ext]!.",
    true,
    /favicons\/.*?\.(svg|png|ico)$/
  );
  faviconsContext.keys().forEach(faviconsContext);