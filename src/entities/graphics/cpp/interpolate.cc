#include <napi.h>

struct Point {
    double x;
    double y;

    Point(double x, double y) : x(x), y(y) {}
};

Point interpolate(double t, const std::vector<Point>& points) {
    if (t == 0) {
        return points[0];
    }

    const size_t order = points.size() - 1;

    if (t == 1) {
        return points[order];
    }

    const double mt = 1 - t;
    std::vector<Point> p = points;

    // linear curve
    if (order == 1) {
        return Point(
            mt * p[0].x + t * p[1].x,
            mt * p[0].y + t * p[1].y
        );
    }

    // quadratic or cubic curve
    if (order >= 2 && order < 4) {
        double mt2 = mt * mt;
        double t2 = t * t;
        double a, b, c, d = 0;

        if (order == 2) {
            p = {p[0], p[1], p[2], Point(0, 0)};
            a = mt2;
            b = mt * t * 2;
            c = t2;
        } else {
            a = mt2 * mt;
            b = mt2 * t * 3;
            c = mt * t2 * 3;
            d = t * t2;
        }

        return Point(
            a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
            a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y
        );
    }

    // Higher order curves - use de Casteljau's computation.
    std::vector<Point> dCpts = points;
    while (dCpts.size() > 1) {
        for (size_t i = 0; i < dCpts.size() - 1; i++) {
            dCpts[i] = Point(
                dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t,
                dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t
            );
        }
        dCpts.pop_back();
    }

    return dCpts[0];
}

Napi::Value Interpolate(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() != 2 || !info[0].IsNumber() || !info[1].IsArray()) {
        Napi::TypeError::New(env, "Invalid arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    double t = info[0].As<Napi::Number>().DoubleValue();
    Napi::Array pointsArray = info[1].As<Napi::Array>();
    std::vector<Point> points;

    for (size_t i = 0; i < pointsArray.Length(); i++) {
        Napi::Object pointObject = pointsArray.Get(i).As<Napi::Object>();
        double x = pointObject.Get("x").As<Napi::Number>().DoubleValue();
        double y = pointObject.Get("y").As<Napi::Number>().DoubleValue();
        points.push_back(Point(x, y));
    }

    Point result = interpolate(t, points);

    Napi::Object resultObject = Napi::Object::New(env);
    resultObject.Set("x", result.x);
    resultObject.Set("y", result.y);

    return resultObject;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("interpolate", Napi::Function::New(env, Interpolate));
    return exports;
}

NODE_API_MODULE(addon, Init)