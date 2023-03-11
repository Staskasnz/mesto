export default class UserInfo {
    constructor({ nameSelector, vocationSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._vocation = document.querySelector(vocationSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            vocation: this._vocation.textContent
        }
    }

    setUserInfo(obj) {
        this._name.textContent = obj.name;
        this._vocation.textContent = obj.about;
        this._avatar.src = obj.avatar;
    }
}