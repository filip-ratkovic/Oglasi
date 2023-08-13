export const datum = () => {
    const date = new Date();
const godina = date.getFullYear();
const mesec = date.getMonth();
const dan = date.getDate();
const datum = `${dan}.${mesec}.${godina}`;
return datum
}