declare var require: any
  
export type token = string

export type BreadcrumbItem = {
    name:string, 
    link: string,
    statut?: string
}

export type routes = {
    component: string,
    url: string,
    title:string,
    module: number
    icon?: any
    subMenu?:number
}

export type QuickActionModel = {
    title: string,
    id: string,
    url: string
    roles: string[]
    icon?: any
}

export type GenericAction<P> = {
    type: string,
    payload?: P
}
