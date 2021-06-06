//isDarkMode === 'true' alors le darkmode est activé
//isDarkMode === 'false' alors il est désactivé 

export function getlocalStorageDarkMode():boolean{
    if (!!localStorage.getItem('isDarkMode'))
        if(localStorage.getItem('isDarkMode') === "true"){
            document.getElementById('body').className="darkTheme"
        return localStorage.getItem('isDarkMode') === "true" ? true : false
    } else {
        document.getElementById('body').className=""
        localStorage.setItem('isDarkMode', 'false')
        return false
    }
}

export function switchDarkMode():boolean{
    getlocalStorageDarkMode()
    if(localStorage.getItem('isDarkMode') === "true"){
        document.getElementById('body').className=""
        localStorage.setItem('isDarkMode', "false")
    } else {
        document.getElementById('body').className="darkTheme"
        localStorage.setItem('isDarkMode', "true")
    }
    return localStorage.getItem('isDarkMode') === "true" ? true : false 
}

export function getQuickActionsList(): string{
    return localStorage.getItem('quickActions')
}

export function setQuickActionsList(list:string): void{
    localStorage.setItem('quickActions', list)
}

export function toggleIsPrimaryNavExtend(): boolean{
    getIsPrimaryNavExtend()
    if(localStorage.getItem('primaryExtend') === "true"){
        localStorage.setItem('primaryExtend', "false")
        return false
    } else {
        localStorage.setItem('primaryExtend', 'true')
        return true
    }
}

export function getIsPrimaryNavExtend(): boolean{
    return !!localStorage.getItem('primaryExtend') && localStorage.getItem('primaryExtend') === "true" ? true : false 
}