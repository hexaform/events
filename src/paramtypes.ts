// @ts-nocheck

import { EventBus as EventBus_1 } from "./EventBus";
  import { Container as Container_1 } from "@hexaform/container";
    Object.defineProperty(EventBus_1.prototype, "reflect:paramtypes", { get() { return [ Container_1 ]; }});
    Object.defineProperty(EventBus_1.prototype.subscribe, "reflect:paramtypes", { get() { return [ "undefined", "undefined" ]; }});
    Object.defineProperty(EventBus_1.prototype.dispatch, "reflect:paramtypes", { get() { return [ "undefined" ]; }});
