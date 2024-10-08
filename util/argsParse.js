export const argsParse = ([, , ...argv], words = []) => {
	const args = {};

	for (const key of words) {
		args[key] = key ===argv[0];
	}

	for (let i = 0; i < argv.length; i++) {
		if (argv[i][0] !== '-') {
			continue;
		}

		if (argv[i + 1] && argv[i + 1][0] !== '-') {
			//Параметр с -- и значение через пробел
      // if (argv[i].startsWith('--')) {
      //   args[argv[i].substring(2)] = argv[i + 1];
      // } else {
      //   args[argv[i].substring(1)] = argv[i + 1];
      // }

      //Параметр с -- и значение через =
      args[argv[i].substring(1)] = argv[i + 1];
      continue;
		}

		if (argv[i].startsWith('--')) {
			if (argv[i].includes('=')) {
				const [key, value] = argv[i].split('=');
				args[key.substring(2)] = value;
			} else {
				args[argv[i].substring(2)] = true;
			}
			continue;
		}

		if (argv[i].startsWith('-no-')) {
			args[argv[i].substring(4)] = false;
			continue;
		}

		args[argv[i].substring(1)] = true;
	}

	return args;
};
