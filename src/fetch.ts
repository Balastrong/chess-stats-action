import http from 'https';

export default function fetch<Type>(url: string): Promise<Type> {
  return new Promise((res, rej) => {
    http.get(url, response => {
      let data = '';

      response.on('data', chunk => (data += chunk));
      response.on('end', () => res(JSON.parse(data)));
      response.on('error', e => rej(e));
    });
  });
}
