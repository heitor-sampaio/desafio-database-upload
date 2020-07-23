/* eslint-disable no-console */
import app from './app';

app.listen(3333, () => {
  console.log(
    '\n\n\x1b[1m\x1b[32m|-----------------------------------| %s\x1b[34m%s',
    '\n| 🚀 Server started on port',
    ' 3333\x1b[32m 🚀 |',
    '\n|-----------------------------------|',
    '\n\n\x1b[36mLog start...\x1b[0m\n\n',
  );
});
