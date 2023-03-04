export const custonFuntions = {
    sizeFormat(size: number) {
        if(size > Math.pow(1024, 3)) {
            return (size/Math.pow(1024, 3)).toFixed(2) + "Gb"
        }
        if(size > Math.pow(1024, 2)) {
            return (size/Math.pow(1024, 2)).toFixed(1) + "Mb"
        }
        if(size > Math.pow(1024, 1)) {
            return (size/Math.pow(1024, 1)).toFixed() + "Kb"
        }
    }

}