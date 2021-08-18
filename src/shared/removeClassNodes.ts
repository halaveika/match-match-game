export function removeClassNodes(classname: string): void {
  const arr = document.querySelectorAll(`.${classname}`);
  if (arr.length > 0) {
    arr.forEach((element) => element.remove());
  }
}
