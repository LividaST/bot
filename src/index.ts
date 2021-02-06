import env from 'dotenv';

import { Livida } from './util/client';

env.config();

const client = new Livida({
	token: process.env.TOKEN,
	debug: false,
	_apiPort: 3000
})

client.login();

export {client};