import env from 'dotenv';

import { Livida } from './Util/Client';

env.config();

const client = new Livida({
	token: process.env.TOKEN,
	debug: false,
	_apiPort: process.env.PORT
})

client.login();

export {client};