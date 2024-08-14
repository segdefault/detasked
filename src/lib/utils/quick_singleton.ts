class QuickSingleton<T> {
	instance?: T;
	builder: () => T;

	constructor(builder: () => T) {
		this.builder = builder;
	}

	get(): T {
		if (typeof this.instance === "undefined") {
			this.instance = this.builder();
		}

		return this.instance;
	}

	getter(): () => T {
		return () => this.get();
	}
}

export default QuickSingleton;
