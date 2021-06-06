import { QuickActionModel } from "../@types/common";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const quickActionsList: QuickActionModel[] = [
    {
        title: "Ajouter une pharmacie",
        id: "addPharmacy",
        url:"/app/pharmacy/add",
        roles:['SUPER_ADMIN', 'ADMIN'],
        icon:faPlusCircle
    },
]

export default quickActionsList