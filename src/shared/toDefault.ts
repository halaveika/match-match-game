export function toDefault(inputs: HTMLInputElement[] | HTMLElement[]): void {
  const arr = inputs.slice(0);
  arr.forEach((element: HTMLElement | HTMLInputElement) => {
    if (element.classList.contains('error')) element.classList.remove('error');
    if (element.classList.contains('sucsess')) element.classList.remove('sucsess');
    if (element.classList.contains('bad__turn')) element.classList.remove('bad__turn');
  });
}
