export default function (items) {
    let out = "<tr>";
    for (let i = 0; i < items.length; i++) {
        let j = i + 1;
        let row = "<td>" + j + "</td>" + "<td>" + items[i] + "</td>";
        out = out + row + "</tr>";
    }

    return out;
};
