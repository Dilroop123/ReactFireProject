import { markerColor } from "../constants/constants";

export const getmarkerIcon = (color: string) => {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1
    };
}

export const getMarkerColor = (riskScore: string) => {
    const score = Number(riskScore);
    if (score >= 0 && score <= 0.09)
        return markerColor.yellow;
    if (score >= 0.1 && score <= 0.19)
        return markerColor.green;
    if (score >= 0.2 && score <= 0.29)
        return markerColor.orange;
    if (score >= 0.3 && score <= 0.39)
        return markerColor.grey;
    if (score >= 0.4 && score <= 0.49)
        return markerColor.purple;
    if (score >= 0.5 && score <= 0.59)
        return markerColor.red;
    if (score >= 0.6 && score <= 0.69)
        return markerColor.black;
    if (score >= 0.7 && score <= 0.79)
        return markerColor.pink;
    if (score >= 0.8 && score <= 0.89)
        return markerColor.teal;
    if (score >= 0.9 && score <= 0.99)
        return markerColor.navy;
    if (score == 1)
        return markerColor.brown;
}