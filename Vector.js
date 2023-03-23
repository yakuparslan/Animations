f = 0, draw = a => { 
    for (f || createCanvas(W = 400, W, WEBGL), 
    lights(background(0)), j = 0; j < PI; j += PI / 32)
    for (i = 0; i < TAU; i += PI / 512)
            push(), 
            rotateY(i + f), 
            translate(sin(T = tan(atan(i))) * (S = 150 * sin(j + i)), tan(cos(i + f)) * sin(i + f) * 150, cos(T) * S), 
            pop(sphere(3 * cos(i + f), W)); f += PI / 256 };//