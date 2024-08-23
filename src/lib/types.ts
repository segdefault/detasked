export type Unpromise<MaybePromise> =
	MaybePromise extends Promise<infer Type> ? Type : MaybePromise;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncReturnType<T extends (...args: any[]) => any> = Unpromise<
	ReturnType<T>
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PromisedFunction<T extends (...args: any[]) => any> = (
	...args: Parameters<T>
) => Promise<AsyncReturnType<T>>;
