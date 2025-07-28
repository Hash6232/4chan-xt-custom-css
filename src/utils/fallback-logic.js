/*

background-image:     var(--mascot-general-1, var(--mascot-general-0, var(--mascot-1, var(--mascot-0))));
background-position:  var(--mascot-general-1-pos, var(--mascot-general-0-pos, var(--mascot-1-pos, var(--mascot-0-pos, var(--mascot-pos)))));
background-size:      var(--mascot-general-1-size, var(--mascot-general-0-size, var(--mascot-1-size, var(--mascot-0-size, var(--mascot-size)))));

0G > 0 [> fallback]
1G > 0G > 1 > 0 [> fallback]
2G > 0G > 2 > 0 [> fallback]
3G > 1G > 0G > 3 > 1 > 0 [> fallback]
4G > 2G > 0G > 4 > 2 > 0 [> fallback]
5G > 3G > 1G > 0G > 5 > 3 > 1 > 0 [> fallback]
6G > 4G > 2G > 0G > 6 > 4 > 2 > 0 [> fallback]
7G > 5G > 3G > 1G > 0G > 7 > 5 > 3 > 1 > 0 [> fallback]
8G > 6G > 4G > 2G > 0G > 8 > 6 > 4 > 2 > 0 [> fallback]
9G > 7G > 5G > 3G > 1G > 0G > 9 > 7 > 5 > 3 > 1 > 0 [> fallback]

*/

let result = "";
const max = 10;

for (let i = 0; i < max; i++) {
    let bg = "background-image: " + iterateFallbacks(i);
    let bgPos = "background-position: " + iterateFallbacks(i, "pos");
    let bgSize = "background-size: " + iterateFallbacks(i, "size");

    if (i === 0) result += "body.is_index .board::before," + "\n";
    result += `body.is_thread .thread > .opContainer[id$="${i}"]::before {` + "\n" +
        `  ${bg};` + "\n" +
        `  ${bgPos};` + "\n" +
        `  ${bgSize};` + "\n}\n";
}

console.log(result);

function iterateFallbacks(i, a) {
    let output = "";
    const append = (a) ? "-" + a : "";
    let closers = "";

    for (let j = i; j >= 0; j--) {
        closers += ")";
        output += `var(--mascot-general-${j}${append}, `;
        if (j > 1) j -= 1; // Don't skip if iter === 1
    }
    for (let j = i; j >= 0; j--) {
        closers += ")";
        if (j === 0) {
            if (append.length > 0) {
                closers += ")";
                output += `var(--mascot-${j}${append}, var(--mascot${append}${closers}`;
            } else {
                output += `var(--mascot-${j}${closers}`;
            }
        } else {
            output += `var(--mascot-${j}${append}, `;
        }
        if (j > 1) j -= 1; // Don't skip if iter === 1
    }

    return output;
}