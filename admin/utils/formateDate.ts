
const formateDate = (date: string, language: string, format = "ymdwhns") => {
    const dateObject = new Date(date);
    const options:any = {};
    for (let i = 0; i < format.length; i++) {
        switch (format[i]) {
            case "y":
                options["year"] = "numeric";
                break;
            case "m": 
                options["month"] = "long";
                break;
            case "d": 
                options["day"] = "numeric";
                break;
            case "w":
                options["weekday"] = "long";
                break;
            case "h":
                options["hour"] = "numeric";
                break;
            case "n":
                options["minute"] = "numeric";
                break;
            case "s":
                options["second"] = "numeric";
                break;
        }
    }
        // const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric'};
    const lg = getIso(language);
    return dateObject.toLocaleDateString(lg, options as Intl.DateTimeFormatOptions);
};

const getIso = (Language: string) => {
    if (Language === "fr") {
        return "fr-FR";
    } else {
        return "en-US";
    }
};

export default formateDate;