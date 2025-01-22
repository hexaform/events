import { Container } from "@hexaform/container";
import { EventBus } from "./EventBus";

type Class<T> = new (...args: any[]) => T;
type Constructor<T> = { readonly prototype: T } | Class<T>;

interface Handler<T> {
    handle(message: T): Promise<void> | void;
}

export class InProcessEventBus<Event> implements EventBus<Event> {
    private container: Container;
    private eventHandlers: Map<Constructor<Event>, Set<Class<Handler<Event>>>> = new Map();

    constructor(container: Container) {
        this.container = container;
    }

    register(event: Class<Event>, handler: Class<Handler<Event>>): Promise<void> | void {
        let handlers = this.eventHandlers.get(event);
        if (!handlers) {
            handlers = new Set();
            this.eventHandlers.set(event, handlers);
        }

        handlers.add(handler);
    }

    dispatch(event: Event): Promise<Array<void>> | Array<void> {
        let handlers = Array.from(this.eventHandlers.get(event.constructor) || new Set<Class<Handler<Event>>>());

        return Promise.all(handlers.map((handlerClass: Class<Handler<Event>>) => {
            let handler = this.container.resolve<Handler<Event>>(handlerClass);
            return handler.handle(event);
        }));
    }
}