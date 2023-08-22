export const datum = () => {
    const date = new Date();
const godina = date.getFullYear();
const mesec = date.getMonth() +1;
const dan = date.getDate();
const datum = `${dan}.${mesec}.${godina}`;
return datum
}