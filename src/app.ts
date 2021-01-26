import swagger from './swagger';
import server from './server';

async function Main() {
  await swagger;
  server.app.listen(process.env.PORT || 3333, () => console.log('starting...'));
}
Main();
