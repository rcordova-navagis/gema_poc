import {USER_ROLES, DRIVER_MENU_ITEMS} from './../constants/Users';


export default class UserService {
    static _getDriverMenuItems() {
        return DRIVER_MENU_ITEMS;
    }

    static getUserMenuItems(user) {
        return UserService._getDriverMenuItems();

        // switch(user.rolename) {
        //     case USER_ROLES.DRIVER:
        //         return UserService._getDriverMenuItems();
        //     case USER_ROLES.DISPATCHER:
        //         return UserService._getDispatcherMenuItems();
        //     default:
        //         return UserService._getDriverMenuItems();
        // }
    }
}