
function applyTemplate(obj, template) {
    let keys = Object.keys(template);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        obj[key] = template[key];
    }
}


function circleCircle(c1, r1, c2, r2) {
    return c1.dist(c2) < r1 + r2;
}


function getByType(entities, types) {
    let results = [];
    if (typeof types === 'undefined') types = [];
    for (let i = 0; i < entities.length; i++) {
        let e = entities[i];
        if (types.indexOf(e.type) > -1) results.push(e);
    }

    return results;
}


function mutate(val, amt, limit) {
    let num = max(val + random(-amt, amt), 0);
    if (typeof limit !== 'undefined') num = min(num, limit);
    return num;
}

function pointCircle(p, c, r) {
    return p.dist(c) < r;
}

// Remove duplicate entries from array
function uniq(arr) {
    return Array.from(new Set(arr));
}
