describe('Car', () => {
	let Car;
	
	beforeEach(() => {
		jest.isolateModules(() => {
			Car = require('./car')
		})
	})
	
	describe('new', () => {
		test('creates instance of Car', () => {
			expect(new Car().constructor.name).toBe('Car');
		});
		
		test('creates Car instance with given name', () => {
			const car = new Car('Bentley');
			expect(car.brand).toBe('Bentley');
		});
	
		test('creates Car instance with given name and color', () => {
			const car = new Car('Bentley', 'Black');
			expect(car.brand).toBe('Bentley');
			expect(car.color).toBe('Black');
		});
	})
	
	describe('Car color generator', () => {
		test('generates car color when not provided', () => {
			Car.COLORS = ['Pink', 'Purple', 'Magenta']

			const car = new Car('Bentley');
			
			expect(car.brand).toBe('Bentley');
			expect(car.color).toBe('Pink');
		});

		test('assigns different color for each created instance', () => {
				Car.COLORS = ['Blue', 'Green', 'Yellow']
				
				expect(new Car('Bentley').color).toBe('Blue');
				expect(new Car('Bentley').color).toBe('Green');
				expect(new Car('Bentley').color).toBe('Yellow');
				expect(new Car('Bentley').color).toBe('Blue');
		})
	})

	describe('Car instances count', () => {
		test('increases instances count after adding new instance', () => {
			new Car('Bentley');
			new Car('BMW');

			expect(Car.instancesCount).toBe(2)
		})
	})
})
