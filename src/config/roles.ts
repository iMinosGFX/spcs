import {faHome, faCog, faChartBar, faCartPlus, faWarehouse} from '@fortawesome/free-solid-svg-icons'

/**
 * Nav Link: module = 1
 * Page Link : module = 3
 * Setting Page : module = 4
 */

/** Element avec un submenu : 
 *     changeoverTimeMain: {
    component: 'ChangeoverTimeMain',
    url:'/changeover-time',
    title:'Tps changements',
    icon: faClock,
    module: 1,
    subMenu: 1
},

Element submenu : 
    changeTimeTwo: {
        component: "ChangeTimeTwo",
        subMenuId: 1,
        title: "Titre 2",
        url: "/changeover-time/test-2",
        module:2
    }

components.changeTimeOne,
components.changeTimeTwo
*/

const components = {
    home: {
        component: 'Home',
        url: '/home',
        title: 'Statistiques',
        icon: faChartBar,
        module: 1,
    },
    productProducer: {
        component: 'ProductProducer',
        url: '/products',
        title: 'Produits',
        icon: faCartPlus,
        module: 1,
    },
    productSupermarket: {
        component: 'ProductSupermarket',
        url: '/products',
        title: 'Produits',
        icon: faCartPlus,
        module: 1,
    },
    inventory: {
        component: 'Inventory',
        url: '/inventory',
        title: 'Inventaire',
        icon: faWarehouse,
        module: 1,
    },
    settings: {
        component: 'Settings',
        url:'/settings',
        title:'Paramètres',
        icon: faCog,
        module: 1,
    },
    settingProfile: {
        component: 'ParameterProfile',
        subSettings: 'Personnel',
        title:'Mon compte',
        module: 4   
    },
}

const modules = {
	0: {
		title: 'Dashboard',
		icon: 'home',
		isExpendable: true
    }
};

const rolesConfig = {
    ROLE_ADMIN: {
        routes: [
            components.home,
            components.inventory,
            components.settings,
            components.settingProfile,
        ]
    },
    ADMIN: {
        routes: [
            components.home,
            components.inventory,
            components.settings,
            components.settingProfile,
        ]
    },
    SUPERMARKET: {
        routes: [
            components.home,
            components.productSupermarket,
            components.inventory,
            components.settings,
            components.settingProfile,
        ]
    },
    PRODUCER: {
        routes: [
            components.home,
            components.productProducer,
            components.inventory,
            components.settings,
            components.settingProfile,
        ]
    },
    USER:{
        routes: [
            components.home,
            components.inventory,
            components.settings,
components.settingProfile,
        ]
    }
}

export { modules, rolesConfig }