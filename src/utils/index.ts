export function formatCurrent(amount:number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export function getImagePath(imagePatch: string){
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    if(imagePatch.startsWith(cloudinaryBaseUrl)){
        return imagePatch
    }else{
        return `/products/${imagePatch}.jpg`
    }
}