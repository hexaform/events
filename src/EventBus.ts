type Constructor<T> = new (...args: any[]) => T;
type Class<T> = { prototype: T } | Constructor<T>;

interface Handler<T> {
    handle(message: T): Promise<void> | void;
}

export abstract class EventBus<Event> {
    abstract register(event: Constructor<Event>, handler: Constructor<Handler<Event>>): Promise<void> | void;
    abstract dispatch(event: Event): Promise<Array<void>> | Array<void>;
}