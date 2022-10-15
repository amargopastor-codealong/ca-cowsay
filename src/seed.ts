import cowsay from 'cowsay';
import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import fs from 'fs-extra';
import configFIle from './config';

const getCatsFacts = (facts: number = 6) => {
	const url: string = configFIle.url+facts;
	try {
		axios
			.get(url)
			.then((response: AxiosResponse) => {
				console.log(response.status);
				console.log(response.data);
				const data = response.data;
				fs.writeJSONSync(configFIle.store_file, data);
                const output: string = cowsay.say({ text: `${facts} cats facts generated` });
                console.log(output);
			})
			.catch((e: Response) => {
				console.log(e);
				console.log('AXIOS return an error if http error code is > 400');
				console.log(e.status);
			});
	} catch (e: any) {
		console.log('AXIOS return an error if http error code is > 400');
		console.log(e.response.status);
	}
};

(async () => {
	getCatsFacts(configFIle.cats_facts_threshold);
})();
