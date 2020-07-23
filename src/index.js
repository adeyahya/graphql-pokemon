import app from './app';

const PORT = process.env.PORT || 5000;

(async () => {
  await app.listen(PORT);

  console.log(`GraphQL-Pokemon started on http://localhost:${PORT}/`);
})();
