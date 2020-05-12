import defaultUser from "../assets/img/user-silhouette.svg";

export function insteadIMG(path) {
  let img = path !== "" ? path : defaultUser;
  return img;
}
/**
 * Convierte cualquier arreglo de objetos en un archivo csv
 * @param [{*}] args
 */
export function arrayToCsv(args, titles = null, filename) {
  let csv = [];
  if (titles) {
    csv.push(join(titles, ",", []));
  }
  for (let items of args) {
    const values = Object.values(items);
    csv.push(join(values, ",", []));
  }
  let csvContent = "data:text/csv;charset=utf-8," + csv.join("\n");
  var encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename + ".csv");
  document.body.appendChild(link); // Required for FF
  link.click();
}
/**
 * turn array into string
 * @param [] args
 * @param string separator
 * @param [int] skip
 */
export function join(args, separator = ",", skip = []) {
  args = args.filter((item, key) => {
    return !skip.includes(key);
  });
  return args.join(separator);
}
