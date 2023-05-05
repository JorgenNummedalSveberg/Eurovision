export function capitalize(word) {
    if (word == "") return "";
    return word[0].toUpperCase() + word.substring(1);
}

export const flagURL = (countryCode) => "https://flagcdn.com/w80/"+countryCode+".png";
