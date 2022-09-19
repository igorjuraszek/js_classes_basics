class CarFactory {
  supportedBrands = ["Fiat", "Lancia", "Ford", "Subaru"];

  constructor(factoryName, carBrands) {
    if (!Array.isArray(carBrands)) {
      carBrands = carBrands.split();
    }

    const capitalizedBrands = carBrands
      .flat(Infinity)
      .map((brand) => this.#capitalizeBrandName(brand));

    const unsupportedBrands = capitalizedBrands.filter((brand) => {
      return !this.supportedBrands.includes(brand);
    });

    if (unsupportedBrands.length) {
      throw new UnsupportedBrandError(
        `Brand not supported: '${this.#brandsToString(unsupportedBrands)}'`
      );
    }

    this.factoryName = `${factoryName} produces: ${this.#brandsToString(
      capitalizedBrands
    )}`;
    this.brandsSupportedByFactory = capitalizedBrands;
  }

  createCar(carBrand = this.brandsSupportedByFactory) {
    if (Array.isArray(carBrand)) {
      carBrand = carBrand.toString();
    }
    if (
      !this.brandsSupportedByFactory.includes(
        this.#capitalizeBrandName(carBrand)
      )
    ) {
      throw new UnsupportedBrandError(
        "Factory does not have a brand or do not support it"
      );
    }
    return {
      brand: this.#capitalizeBrandName(carBrand),
    };
  }

  createCars(...args) {
    if (Number.isInteger(args[0])) {
      return Array.from(Array(args[0])).map((_, index) => {
        if (this.brandsSupportedByFactory.length === 1) {
          return this.createCar();
        }
        let brand =
          this.brandsSupportedByFactory[
            index % this.brandsSupportedByFactory.length
          ];
        return this.createCar(brand);
      });
    }
    return [...args]
      .map((countOfCarsWithBrand) => {
        let countOfCars = countOfCarsWithBrand[0];
        let brand = this.#capitalizeBrandName(countOfCarsWithBrand[1]);

        if (!this.brandsSupportedByFactory.includes(brand)) {
          return [];
        }

        return Array.from({ length: countOfCars }).map(() => {
          return this.createCar(brand);
        });
      })
      .flat();
  }

  #capitalizeBrandName(brand) {
    return brand.charAt(0).toUpperCase() + brand.toLowerCase().slice(1);
  }

  #brandsToString(arrayOfBrands) {
    return `${arrayOfBrands.toString().replaceAll(",", ", ")}`;
  }
}

class UnsupportedBrandError extends Error {}

module.exports = { CarFactory, UnsupportedBrandError };
