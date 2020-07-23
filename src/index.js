import app from './app';

const PORT = 5000 || process.env.PORT;

(async () => {
  await app.listen(PORT);

  console.log(`GraphQL-Pokemon started on http://localhost:${PORT}/`);
})();
