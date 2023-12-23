function arrange(slates, width, height) {

}

function overlap(pos1, pos2, dim1, dim2) {
    c1 = hasPoint(pos1, pos2, dim2);
    c2 = hasPoint([pos1[0] + dim1[0], pos1[1]], pos2, dim2);
    c3 = hasPoint([pos1[0], pos1[1] + dim1[1]], pos2, dim2);
    c4 = hasPoint([pos1[0] + dim1[0], pos1[1] + dim1[1]], pos2, dim2);

    if(c1 && c2 && c3 && c4) return (dim1[0] * dim1[1]);
//    if()


    return 0;
}

function hasPoint(pos1, pos2, dim2) {
    return (pos1[0] > pos2[0] && 
            pos1[1] > pos2[1] && 
            pos1[0] < (pos2[0] + dim2[0]) && 
            pos1[1] < (pos2[1] + dim2[1]));
}