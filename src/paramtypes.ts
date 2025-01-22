// @ts-nocheck

import { EventBus as EventBus_1 } from "./EventBus";

import { InProcessEventBus as InProcessEventBus_1 } from "./InProcessEventBus";
  import { Container as Container_1 } from "@hexaform/container";
    Object.defineProperty(InProcessEventBus_1.prototype, "reflect:paramtypes", { get() { return [ Container_1 ]; }});
    Object.defineProperty(InProcessEventBus_1.prototype.register, "reflect:paramtypes", { get() { return [ "undefined", "undefined" ]; }});
    Object.defineProperty(InProcessEventBus_1.prototype.dispatch, "reflect:paramtypes", { get() { return [ "undefined" ]; }});
