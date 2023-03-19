export class Fetch {
    static GET = async (url: string) => {
        return fetch(url, {
            method: "GET"
        });
    }

    static POST = async (url: string, body: object) => {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    }

    static DELETE = async (url: string, body = {}) => {
        return fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    }
}