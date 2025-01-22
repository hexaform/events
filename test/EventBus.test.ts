import { InProcessEventBus } from "../src";
import { SingletonContainer } from "@hexaform/container";

class Helper {
    private callback: Function;
    constructor(callback: Function) {
        this.callback = callback;
    }
    callWith(event: Event): void {
        this.callback(event);
    }
}

class Event {
    constructor() {}
}
class EventHandler {
    private caller: Helper
    constructor(service: Helper) {
        this.caller = service;
    }
    handle(event: Event): void {
        this.caller.callWith(event);
    }
}
Object.defineProperty(EventHandler.prototype, "reflect:paramtypes", { get() { return [Helper] }});

describe("EventBus", () => {
    let container = new SingletonContainer();
    let eventBus = new InProcessEventBus<Event>(container);

    eventBus.subscribe(Event, EventHandler);

    test("dispatch invokes appropriate event handler", () => {
        let mock = jest.fn();
        container.register(Helper, () => new Helper(mock));

        let event = new Event();
        eventBus.dispatch(event);

        expect(mock).toBeCalledWith(event);
    });
});
