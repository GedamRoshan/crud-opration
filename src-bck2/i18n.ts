import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Member Details": "Member Details",
      "First Name": "First Name",
      "Last Name": "Last Name",
      "Email": "Email",
      "State": "State",
      "Gender": "Gender",
      "Action": "Action",
      "Add New Member": "Add New Member",
      "Add Member":"Add Member",
      "Language":"Language",
      "Delete":"Delete",
      "Edit":"Edit",

    }
  },
  fr: {
    translation: {
        "Member Details": "Coordonnées du membre",
        "First Name": "Prénom",
        "Last Name": "Nom de famille",
        "Email": "E-mail",
        "State": "État",
        "Gender": "Le genre",
        "Action": "Action",
        "Add Member":"Ajouter un membre",
        "Add New Member": "Ajouter un nouveau membre",
        "Language":"Langue",
        "Delete":"Effacer",
        "Edit":"Éditer",

        }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;