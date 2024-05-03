
import { defineStore } from 'pinia';


const LOCALE_STORAGE_KEY = 'currentLocale';

export const useLocaleStore = defineStore('locale', {
    state: () => ({
        currentLocale: 'en', 
        translations: {
            en: {
                //login component and createAccount component
                "username":"Username",
                "enterUsername":"Enter your username",
                "password":"Password",
                "enterPassword":"Enter your password",
                "noacctext":"Don't have an account? Create one here!",
                "login": "Login",

                //createaccount part
                "confirmpass":"Confirm Password",
                "confirmPasswordText":"Confirm your password",
                "createaccount":"Create Account",

                //quizHeader
                "quizapptext":"Quizes application",
                "personaldata":"Personal data",
                "correct":"Correct:",
                "time":"Time:",
                "language":"Language",
                "logoff":"LOG OFF",

                //sideNav
                "claimtask":"Claim task",
                "taskstobedone":"Tasks to be done"


            },
            hu: {
                //login component and createAccount component
                "username": "Felhasználónév",
                "enterUsername": "Írja be a felhasználónevét",
                "password": "Jelszó",
                "enterPassword": "Írja be a jelszavát",
                "noacctext": "Nincs fiókja? Hozzon létre egyet itt!",
                "login": "Bejelentkezés",

                //createaccount part
                "confirmpass": "Jelszó megerősítése",
                "confirmPasswordText": "Erősítse meg a jelszavát",
                "createaccount": "Fiók létrehozása",

                //quizHeader 
                "quizapptext": "Kvízalkalmazás",
                "personaldata": "Személyes adatok",
                "correct": "Helyes:",
                "time": "Idő:",
                "language": "Nyelv",
                "logoff": "Kijelentkezés",

                //sideNav
                "claimtask": "Feladat átvétele",
                "taskstobedone": "Elvégzendő feladatok"


            },
            ro:{
                //login component and createAccount component
                "username": "Nume de utilizator",
                "enterUsername": "Introduceți numele de utilizator",
                "password": "Parolă",
                "enterPassword": "Introduceți parola",
                "noacctext": "Nu ai un cont? Creează unul aici!",
                "login": "Autentificare",

                //createaccount part
                "confirmpass": "Confirmă parola",
                "confirmPasswordText": "Confirmați parola dvs.",
                "createaccount": "Creați un cont",

                //quizHeader
                "quizapptext": "Aplicație de quiz",
                "personaldata": "Date personale",
                "correct": "Corect:",
                "time": "Timp:",
                "language": "Limba",
                "logoff": "Deconectare",

                //sideNav
                "claimtask": "Preluare sarcină",
                "taskstobedone": "Sarcini de făcut",
            }
           
        },
    }),
    actions: {
        
        setLocale(newLocale) {
            this.currentLocale = newLocale;
            localStorage.setItem(LOCALE_STORAGE_KEY, newLocale); 
        },
        translate(key) {
            return this.translations[this.currentLocale][key] || key;
        },
       
        loadLocale() {
            const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
            if (savedLocale) {
                this.currentLocale = savedLocale; 
            }
        },
    },
});

