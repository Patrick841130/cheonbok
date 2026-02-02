import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function convertGoogleDriveLink(url) {
    if (!url) return '';
    if (url.includes('drive.google.com') && (url.includes('/file/d/') || url.includes('id='))) {
        let id = '';
        const parts = url.split('/');
        const dIndex = parts.indexOf('d');
        if (dIndex !== -1 && parts[dIndex + 1]) {
            id = parts[dIndex + 1];
            if (id.includes('?')) id = id.split('?')[0];
        } else if (url.includes('id=')) {
            id = url.split('id=')[1].split('&')[0];
        }

        if (id) {
            return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
        }
    }
    return url;
}
