export const camelCaseConverter = str => {
  return (' ' + str)
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
      return chr.toUpperCase()
    })
}

/**
|--------------------------------------------------
| To get camel case string out of a specific string,
| @param { string } initialString       | ABCD_EFG (2 or more characters) | Abcd Efg |  ABCD_EFG  |
| @param { string } delimiter           | separator string (default "_")  | " "      |   "_"      |
| @param { boolean } isCamelCasing      | false                           |  true    |   false    |
| @param { string } wordJoinByDelimiter | concat string default " "       |  N/A     |   "-"      |
| @return { string }                    |          Abcd Efg               | abcdEfg  |  Abcd-Efg  |
|--------------------------------------------------
*/
export const formatDelimiterTextToCamelCase = (initialString, delimiter = "_", isCamelCasing = false, wordJoinByDelimiter = " ") => {
  try{
    let formattedTextSplit = initialString && typeof initialString === "string" && initialString.split(delimiter);
    //maps each word in array and joins with " " after camel casing each
    if (isCamelCasing) {
      let camelCaseText = formattedTextSplit.map((textPart,index)=> (index === 0 ? textPart.slice(0,1).toLowerCase() : textPart.slice(0,1).toUpperCase()).concat(textPart.slice(1).toLowerCase())).join("");
      return camelCaseText;
    } else {
      let capitalizedSentence = formattedTextSplit.map(textPart=> textPart.slice(0,1).toUpperCase().concat(textPart.slice(1).toLowerCase())).join(wordJoinByDelimiter);
      return capitalizedSentence;
    }
  }catch(error){
    return "";
  }
}

export const camelCaseModifier = (inputWord) => {
  let modifiedWord = inputWord?.slice(0,1)?.toUpperCase() + inputWord?.slice(1)?.toLowerCase();
  return(modifiedWord);
}
