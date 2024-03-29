import { isFileImage } from '$lib/shared/helpers/images';

export function fileToBase64String(file: File): Promise<string | null> {
	return new Promise((resolve, reject) => {
		if (!file) {
			reject('Invalid file object');
		}

		if (!isFileImage(file)) {
			reject('Not an image file');
		}

		const reader = new FileReader();

		reader.onload = (event) => {
			setTimeout(() => {
				if (event.target && typeof event.target.result === 'string') {
					resolve(event.target.result);
				} else {
					reject('Error reading file as base64');
				}
			}, 1500);
		};

		reader.onerror = (error) => {
			reject(error);
		};

		reader.readAsDataURL(file);
	});
}
