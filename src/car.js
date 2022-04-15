class Car {
    
    static instancesCount = 0
    static COLORS = ['Pink']
    
    constructor(brand, color = Car.COLORS[Car.instancesCount % Car.COLORS.length]){
        this.brand = brand
        this.color = color

        Car.instancesCount += 1
    }
}

module.exports = Car

