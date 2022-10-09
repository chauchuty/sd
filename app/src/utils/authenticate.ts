class Authenticate {

    constructor(){}

    static getLocalStorage() {
        return localStorage.getItem('access');
    }

    static setLocalStorage(access: any) {
        console.log(access)
        // localStorage.setItem('access', `${username}:${password}`);
    }

    static removeLocalStorage() {
        localStorage.removeItem('access');
    }
}

export default Authenticate