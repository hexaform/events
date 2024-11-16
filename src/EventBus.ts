import { Container } from "@hexaform/container";

type Prototype<T> = { prototype: T };
type HandlerLike<E, R = unknown> = { handle(event: E): R };

export class EventBus<Event extends { new (...args: any): Event }, Handler extends HandlerLike<Event, Result>, Result = unknown> {
    private container: Container;
    private events: Map<Prototype<Event>, Set<Prototype<Handler>>> = new Map();

    constructor(container: Container) {
        this.container = container;
    }

    subscribe(event: Event, handler: Prototype<Handler>): void {
        let handlers = this.events.get(event);
        if (!handlers) {
            handlers = new Set();
            this.events.set(event, handlers);
        }

        handlers.add(handler);
    }

    dispatch(event: Event): Promise<Array<Result>> {
        let handlers: Array<Prototype<Handler>> = Array.from(this.events.get(event.constructor) || new Set<Prototype<Handler>>());

        return Promise.all(handlers.map((handlerClass: Prototype<Handler>) => {
            let handler = this.container.construct<Handler>(handlerClass);
            return handler.handle(event);
        }));
    }
}