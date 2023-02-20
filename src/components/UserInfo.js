export default class UserInfo {
    constructor({ name, vocation }) {
        this._name = name;
        this._vocation = vocation;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            vocation: this._vocation.textContent
        }
    }

    setUserInfo(obj) {
        this._name.textContent = obj.name;
        this._vocation.textContent = obj.vocation;
    }
}