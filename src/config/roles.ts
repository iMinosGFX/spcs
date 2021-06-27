import { faHome, faCog, faChartBar, faCartPlus, faWarehouse, faShoppingCart, faCommentDollar, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

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
    homeAdmin: {
        component: 'DashboardAdmin',
        url: '/home',
        title: 'Statistiques',
        icon: faChartBar,
        module: 1,
    },
    homeSupermarket: {
        component: 'DashboardSupermarket',
        url: '/home',
        title: 'Statistiques',
        icon: faChartBar,
        module: 1,
    },
    homeProducer: {
        component: 'DashboardProducer',
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
        component: 'Storages',
        url: '/inventory',
        title: 'Inventaire',
        icon: faWarehouse,
        module: 1,
    },
    orders: {
        component: 'OrdersList',
        url: '/orders',
        title: 'Liste des commandes',
        icon: faShoppingCart,
        module: 1,
    },
    comments: {
        component: 'CommentsList',
        url: '/comments',
        title: 'Liste des commentaires',
        icon: faCommentDollar,
        module: 1,
    },
    viewMap: {
        component: 'ViewMap',
        url: '/map',
        title: 'Organisation du magasin',
        icon: faMapMarkedAlt,
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
            components.homeAdmin,
            components.inventory,
            components.settings,
            components.settingProfile,
        ]
    },
    ADMIN: {
        routes: [
            components.homeAdmin,
            components.inventory,
            components.settings,
            components.settingProfile,
        ]
    },
    SUPERMARKET: {
        routes: [
            components.homeSupermarket,
            components.productSupermarket,
            components.inventory,
            components.orders,
            components.comments,
            components.viewMap,
            components.settings,
            components.settingProfile,
        ]
    },
    PRODUCER: {
        routes: [
            components.homeProducer,
            components.productProducer,
            components.inventory,
            components.settings,
            components.settingProfile,
        ]
    },
    USER:{
        routes: [
            components.settings,
            components.settingProfile,
        ]
    }
}

export { modules, rolesConfig }