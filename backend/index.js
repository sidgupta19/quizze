const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', err => {
  console.log('Uncaught exception 💥');
  console.log(err);

  process.exit(1);
});

dotenv.config({ path: './dotenv.config' });

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

main()
  .then(() => console.log('Connnected to DB ✅'))
  .catch(err => console.log(err));

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('Unhandled regection 💥');
  console.log(err);

  server.close(() => {
    process.exit(1);
  });
});
