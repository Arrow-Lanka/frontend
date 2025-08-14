import fetchedDictionary from './Dictionary.json';

export const getLabel = (data) => {
    const lang = localStorage.getItem("language");
    var localizedLabel;
    try{ 
        localizedLabel = fetchedDictionary[lang][data.module][data.label];
        if(!localizedLabel){
            localizedLabel=data.label
        }
    }catch {
        localizedLabel = data.label;
    } 
    return (localizedLabel);
}