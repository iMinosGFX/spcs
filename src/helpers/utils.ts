export function rewriteMainContentBackground(color: string): void{
    document.getElementById("main-content").style.background = color
}

export function initMainContentBackground(): void{
    document.getElementById("main-content").style.background = "#fffff"
}