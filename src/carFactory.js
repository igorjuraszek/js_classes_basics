class CarFactory {
  static supportedBrands = ["Fiat", "Lancia", "Ford", "Subaru"];

  brandNameCapitalize(brand) {
    const brandOfCar =
      brand.slice(0, 1).toUpperCase() + brand.slice(1).toLowerCase();
    return brandOfCar;
  }

  constructor(factoryName, brandsSupportedByFactory) {
    if (Array.isArray(brandsSupportedByFactory)) {
      const flattenedBrandsSupportedByFactory = brandsSupportedByFactory
        .flat(Infinity)
        .map((brand) => this.brandNameCapitalize(brand));
      const unsupportedBrands = flattenedBrandsSupportedByFactory.filter(
        (brand) => {
          return !CarFactory.supportedBrands.includes(
            this.brandNameCapitalize(brand)
          );
        }
      );
      if (unsupportedBrands.length !== 0) {
        const stringOfUnsupportedBrands = unsupportedBrands
          .map((brand) => this.brandNameCapitalize(brand))
          .join(", ");
        throw new UnsupportedBrandError(
          `Brand not supported: '${stringOfUnsupportedBrands}'`
        );
      } else {
        this.factoryName = `${factoryName} produces: ${flattenedBrandsSupportedByFactory.join(
          ", "
        )}`;
        this.brandsSupportedByFactory = flattenedBrandsSupportedByFactory;
      }
    } else {
      this.factoryName = `${factoryName} produces: ${this.brandNameCapitalize(
        brandsSupportedByFactory
      )}`;
      this.brandsSupportedByFactory = this.brandNameCapitalize(
        brandsSupportedByFactory
      );
    }
  }

  createCar(brandOfCar = this.brandsSupportedByFactory) {
    if (Array.isArray(brandOfCar)) {
      throw new UnsupportedBrandError(
        "Factory does not have a brand or do not support it"
      );
    } else {
      if (
        this.brandsSupportedByFactory == this.brandNameCapitalize(brandOfCar) ||
        this.brandsSupportedByFactory.includes(
          this.brandNameCapitalize(brandOfCar)
        )
      ) {
        const newCar = {
          brand: this.brandNameCapitalize(brandOfCar),
        };
        return newCar;
      } else {
        throw new UnsupportedBrandError(
          "Factory does not have a brand or do not support it"
        );
      }
    }
  }

  createCars(...args) {
    if (Array.isArray(args[0])) {
      let arrayOfCars = [];
      for (const array of args) {
        let carCount = array[0];
        let brand = array[1];
        for (let i = 0; i < carCount; i++) {
          try {
            let car = this.createCar(brand);
            arrayOfCars.push(car);
          } catch (error) {
            continue;
          }
        }
      }
      return arrayOfCars;
    } else {
      const countOfCars = args[0];
      if (Array.isArray(this.brandsSupportedByFactory)) {
        let arrayOfCars = [];

        for (let i = 0; i < countOfCars; i++) {
          let car = this.createCar(
            this.brandsSupportedByFactory[
              i % this.brandsSupportedByFactory.length
            ]
          );
          arrayOfCars.push(car);
        }
        return arrayOfCars;
      } else {
        let arrayOfCars = [];
        for (let i = 0; i < countOfCars; i++) {
          let car = this.createCar(this.brandsSupportedByFactory);
          arrayOfCars.push(car);
        }
        return arrayOfCars;
      }
    }
  }
}

class UnsupportedBrandError extends Error {}

module.exports = { CarFactory, UnsupportedBrandError };
