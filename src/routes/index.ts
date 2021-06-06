import {lazy} from "react"

import Home from "./Pages/Home"
const Settings = lazy(() => import('./Pages/Settings'))
const ProductProducer = lazy(() => import('./Pages/Products/ProductProducer'))

export {
    Home,
    ProductProducer,
    Settings
}