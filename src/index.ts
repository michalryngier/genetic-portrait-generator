
import * as entities from "./entities/";
import * as helpers from "./helpers/";
import * as providers from "./providers/";
import * as services from "./services/";
import {PointInterface} from "./entities/graphics";

const interpolateCurve = require('bindings')('interpolate.node');

class Interpolator {
    singletonFunction(t: number, points: PointInterface[]) {
        return interpolateCurve.interpolate(t, points)
    }
}

const interpolator = (new Interpolator()).singletonFunction

export {
    entities,
    helpers,
    providers,
    services,
    interpolator
}