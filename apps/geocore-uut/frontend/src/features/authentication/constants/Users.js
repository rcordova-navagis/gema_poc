const USER_ROLES = {
    'ADMIN': 'ADMIN',
    'DRIVER': 'DRIVER',
    'DISPATCHER': 'DISPATCHER',
};

const DRIVER_MENU_ITEMS = [
    {
        name: 'HOME',
        url: '/',
        icon: 'home',
        action: () => {
            console.log('go home');
        }
    },
    {
        name: 'UUT',
        url: '/uut',
        icon: 'cloud_upload',
        action: () => {
            console.log('go draw recap');
        }
    },
];


export {USER_ROLES, DRIVER_MENU_ITEMS};