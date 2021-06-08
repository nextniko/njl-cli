
export function registerServiceWorker (){
    if('serviceWorker' in navigator){
        window.addEventListener('load',()=>{
            navigator.serviceWorker.register('/service-worker.js')
            .then(res=>{
                console.log('serviceWorker success')
            })
            .catch(err=>{
                console.log('error')
            })
        })
    }
}