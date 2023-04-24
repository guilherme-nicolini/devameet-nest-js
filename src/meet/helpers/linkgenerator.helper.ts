
const chars = '0123456789abcdefghijklmnopqrstuvxywz';
const size = 12;

export const generateLink = () => {
    let randowString = '';

    for (let i = 0; i < size; i++) {
        if (i === 3 || i === 8) {
            randowString += '-'
        } else {
            let rnum = Math.floor(Math.random() * chars.length);
            randowString += chars.substring(rnum, rnum + 1);
        }
    }

    return randowString;
}