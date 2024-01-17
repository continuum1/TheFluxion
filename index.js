const page = "https://continuum1.github.io/TheFluxion/";

async function fetchSlate(slate) {
    temp = await fetch(page + slate + "/slate.json");
    return await temp.json();
}

function hasPoint(pos1, pos2, dim2) {
    return (pos1[0] >= pos2[0] && 
            pos1[1] >= pos2[1] && 
            pos1[0] <= (pos2[0] + dim2[0]) && 
            pos1[1] <= (pos2[1] + dim2[1]));
}
function overlap(pos1, pos2, dim1, dim2) {
    if(pos1[0] <= pos2[0] && 
       pos1[1] <= pos2[1] &&
       pos1[0] + dim1[0] >= pos2[0] + dim2[0] &&
       pos1[1] + dim1[1] >= pos2[1] + dim2[1]) return dim2[0] * dim2[1]; //case 9

    c1 = hasPoint(pos1, pos2, dim2);
    c2 = hasPoint([pos1[0] + dim1[0], pos1[1]], pos2, dim2);
    c3 = hasPoint([pos1[0], pos1[1] + dim1[1]], pos2, dim2);
    c4 = hasPoint([pos1[0] + dim1[0], pos1[1] + dim1[1]], pos2, dim2);

    if(c1 && c2 && c3 && c4) return (dim1[0] * dim1[1]); //case 0
    if(!c1 && !c2 && c3 && !c4) return (pos1[0] + dim1[0] - pos2[0]) * (pos1[1] + dim1[1] - pos2[1]); //case 1
    if(!c1 && !c2 && !c3 && c4) return (pos2[0] + dim2[0] - pos1[0]) * (pos1[1] + dim1[1] - pos2[1]); //case 2
    if(!c1 && c2 && !c3 && !c4) return (pos1[0] + dim1[0] - pos2[0]) * (pos2[1] + dim2[1] - pos1[1]); //case 3
    if(c1 && !c2 && !c3 && !c4) return (pos2[0] + dim2[0] - pos1[0]) * (pos2[1] + dim2[1] - pos1[1]); //case 4
    if(c1 && c2 && !c3 && !c4) return dim1[0] * (pos2[1] + dim2[1] - pos1[1]); //case 5
    if(!c1 && c2 && c3 && !c4) return (pos1[0] + dim1[0] - pos2[0]) * dim1[1]; //case 6
    if(!c1 && !c2 && c3 && c4) return dim1[0] * (pos1[1] + dim1[1] - pos2[1]); //case 7
    if(c1 && !c2 && !c3 && c4) return (pos2[0] + dim2[0] - pos1[0]) * dim1[1]; //case 8

    return 0; //case 10
}

function add(id, slateData, position) {
    slateSpace = document.getElementById(id);

    slate = document.createElement("iframe");
    slate.width = slateData.dimensions.w;
    slate.height = slateData.dimensions.h;
    slate.position;
}

async function arrange(id) {
    temp = document.getElementById(id);
    width = temp.offsetWidth;
    height = temp.offsetHeight;
    console.log(width + ", " + height);

    temp = await fetch(page + "slates.json");
    slates = await temp.json();

    //console.log(slates.slates);

    slateJsons = [];
    for(i = 0; i < slates.slates.length; i++) {
        slateJsons[i] = await fetchSlate(slates.slates[i]);
    }

    //console.log(slateDocs);
    //console.log(slateDocs.length);
    //console.log(slates.slates.length);

    viablePositions = [[0, 0, width, -1]];

    

}