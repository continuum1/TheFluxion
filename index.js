const page = "https://continuum1.github.io/TheFluxion/";

async function slateFetcher(slate) {
    temp = await fetch(page + "slates.json");
    slatesToFetch = await temp.json();
    console.log(slatesToFetch);
    slates = [];

    for(f = 0; f < slatesToFetch.slates.length; f++) {
        temp = await fetch(page + slatesToFetch.slates[f] + "/slate.json");
        slates[f] = await temp.json();
    }

    return slates;
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
function fits(slate, position) {
    return true;
}

function add(id, slateData, position) {
    slateSpace = document.getElementById(id);

    slate = document.createElement("iframe");
    slate.width = slateData.dimensions.w;
    slate.height = slateData.dimensions.h;
    slate.position;
}

function updateViablePositions(currentPositions) {

}

async function arrange(id) {
    width = document.getElementById(id).width;
    height = document.getElementById(id).height;

    slateDocs = [];
    temp = await fetch(slates.json);
    slates = await temp.json();

    slateDocs = slates.slates;
    console.log(slateDocs);

    console.log(width + ", " + height);
    
}