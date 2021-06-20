import {lazy} from "react"

import Home from "./Pages/Home"
const Settings = lazy(() => import('./Pages/Settings'))
const ProductProducer = lazy(() => import('./Pages/Products/ProductProducer'))
const ProductSupermarket = lazy(() => import('./Pages/Products/ProductSupermarket'))
const Storages = lazy(() => import('./Pages/Storages/StoragesList'))

export {
    Home,
    ProductProducer,
    ProductSupermarket,
    Storages,
    Settings
}