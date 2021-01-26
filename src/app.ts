import swagger from './swagger';
import server from './server';

async function Main() {
  await swagger;
  server.app.listen(3333, () => console.log('stating...'));
}
Main();
