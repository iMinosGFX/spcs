/* eslint-disable default-case */
function roleMap(role: string):string{
    switch (role){
        case 'ADMIN' :
            return 'Administrateur'
        default : 
            return role
    }
}

export default roleMap