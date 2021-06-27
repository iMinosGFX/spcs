import {lazy} from "react"

import Home from "./Pages/Home"
const Settings = lazy(() => import('./Pages/Settings'))
const ProductProducer = lazy(() => import('./Pages/Products/ProductProducer'))
const ProductSupermarket = lazy(() => import('./Pages/Products/ProductSupermarket'))
const Storages = lazy(() => import('./Pages/Storages/StoragesList'))
const OrdersList = lazy(() => import('./Pages/Orders/OrdersList'))
const CommentsList = lazy(() => import('./Pages/Comments/CommentsList'))
const DashboardSupermarket = lazy(() => import('./Pages/Dashboard/DashboardSupermarket'))
const DashboardAdmin = lazy(() => import('./Pages/Dashboard/DashboardAdmin'))
const DashboardProducer = lazy(() => import('./Pages/Dashboard/DashboardProducer'))
const ViewMap = lazy(() => import('./Pages/Map/ViewMap'))

export {
    Home,
    ProductProducer,
    ProductSupermarket,
    Storages,
    OrdersList,
    CommentsList,
    Settings,
    DashboardProducer,
    DashboardSupermarket,
    DashboardAdmin,
    ViewMap
}