#include <array>
#include <cstdlib>
#include <vector>

double* interpolate(double t, double points[][2], int size)
{
    int order = size - 1;
    double mt = 1 -
//    if (t == 0) {
//        return points[0];
//    }
//    if (t == 1) {
//        return points[order];
//    }

    std::vector<std::array<double, 2>> p;
    p.reserve(size);
    for (int i = 0; i < size; ++i) {
        std::array<double, 2> pointArray = { points[i][0], points[i][1] };
        p.push_back(pointArray);
    }    if (order == 1) {
        double* res = (double*)malloc(2 * sizeof(double));
        res[0] = mt * p[0][0] + t * p[1][0];
        res[1] = mt * p[0][1] + t * p[1][1];
        return res;
    }
    if (order >= 2 && order < 4) {
        double mt2 = mt * mt;
        double t2 = t * t;
        double a, b, c, d = 0;
        if (order == 2) {
            p = { p[0], p[1], p[2], { 0, 0 } };
            a = mt2;
            b = mt * t * 2;
            c = t2;
        } else {
            a = mt2 * mt;
            b = mt2 * t * 3;
            c = mt * t2 * 3;
            d = t * t2;
        }
        double* res = (double*)malloc(2 * sizeof(double));
        res[0] = a * p[0][0] + b * p[1][0] + c * p[2][0] + d * p[3][0];
        res[1] = a * p[0][1] + b * p[1][1] + c * p[2][1] + d * p[3][1];

        return res;
    }
    std::vector<std::array<double, 2>> dCpts;
    dCpts.reserve(size);
    for (int i = 0; i < size; ++i) {
        std::array<double, 2> pointArray = { points[i][0], points[i][1] };
        dCpts.push_back(pointArray);
    }
    while (dCpts.size() > 1) {
        for (int i = 0; i < dCpts.size() - 1; i++) {
            dCpts[i] = {
                dCpts[i][0] + (dCpts[i + 1][0] - dCpts[i][0]) * t,
                dCpts[i][1] + (dCpts[i + 1][1] - dCpts[i][1]) * t
            };
        }
        dCpts.pop_back();
    }
    double* res = (double*)malloc(2 * sizeof(double));
    res[0] = dCpts[0][0];
    res[1] = dCpts[0][1];

    return res;
}

void reset(double* pkt)
{
    free(pkt);
}


#include "nbind/nbind.h"

NBIND_CLASS(Greeter) {
  method(interpolate);
  method(reset);
}
