
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
                "successfullogin":"Successfully logged in",
                "failedlogin":"Failed login. Try again",

                //loginFallback
                "loading":"Loading...",

                //createaccount part
                "confirmpass":"Confirm Password",
                "confirmPasswordText":"Confirm your password",
                "createaccount":"Create Account",
                "accsuccessfull":"Account successfully created",
                "accpassnotmatch":"Passwords don't match!",
                "accnowhitespace":"Username cannot contain whitespace!",
                "passwordstrength":"Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
                "usernameexists":"The username already exists!",
                "fieldsempty":"The fields can't be empty!",

                //createAccount fallback
                "creatingaccount":"Creating account...",

                //quizHeader
                "quizapptext":"Quizes application",
                "personaldata":"Personal data",
                "correct":"Correct:",
                "time":"Time:",
                "language":"Language",
                "logoff":"LOG OFF",

                //sideNav
                "claimtask":"Claim task",
                "taskstobedone":"Tasks to be done",

                //claimTask
                "name":"NAME",
                "tasknr":"Task Nr",
                "claim":"Claim",
                "generalknowledge":"General knowledge",
                "claimquiz":"Claim quiz",
                "hungarianknowledge":"Hungarian knowledge",
                "errormsg":"Please complete the claimed quizzes first."


            },
            hu: {
                //login component and createAccount component
                "username": "Felhasználónév",
                "enterUsername": "Írja be a felhasználónevét",
                "password": "Jelszó",
                "enterPassword": "Írja be a jelszavát",
                "noacctext": "Nincs fiókja? Hozzon létre egyet itt!",
                "login": "Bejelentkezés",
                "successfullogin": "Sikeres bejelentkezés",
                "failedlogin": "Sikertelen bejelentkezés. Próbáld újra",

                //loginFallback
                "loading": "Betöltés...",

                //createaccount part
                "confirmpass": "Jelszó megerősítése",
                "confirmPasswordText": "Erősítse meg a jelszavát",
                "createaccount": "Fiók létrehozása",
                "accsuccessfull": "A fiók sikeresen létrehozva",
                "accpassnotmatch": "A jelszavak nem egyeznek!",
                "accnowhitespace": "A felhasználónév nem tartalmazhat szóközt!",
                "passwordstrength": "A jelszónak legalább 8 karaktert kell tartalmaznia, beleértve legalább egy nagybetűt, egy kisbetűt, egy számot és egy speciális karaktert.",
                "usernameexists": "A felhasználónév már létezik!",
                "fieldsempty": "A mezők nem lehetnek üresek!",

                //createAccount fallback
                "creatingaccount": "Fiók létrehozása...",

                //quizHeader 
                "quizapptext": "Kvízalkalmazás",
                "personaldata": "Személyes adatok",
                "correct": "Helyes:",
                "time": "Idő:",
                "language": "Nyelv",
                "logoff": "Kijelentkezés",

                //sideNav
                "claimtask": "Feladat átvétele",
                "taskstobedone": "Elvégzendő feladatok",

                //claimTask
                "name": "NÉV",
                "tasknr": "Feladat Szám",
                "claim": "Követelés",
                "generalknowledge": "Általános ismeretek",
                "claimquiz": "Kvíz követelése",
                "hungarianknowledge": "Magyarországi ismeretek",
                "errormsg": "Először fejezze be a követelt kvízeket.",


            },
            ro:{
                //login component and createAccount component
                "username": "Nume de utilizator",
                "enterUsername": "Introduceți numele de utilizator",
                "password": "Parolă",
                "enterPassword": "Introduceți parola",
                "noacctext": "Nu ai un cont? Creează unul aici!",
                "login": "Autentificare",
                "successfullogin": "Autentificare reușită",
                "failedlogin": "Autentificare eșuată. Încercați din nou",
                
                //loginFallback
                "loading": "Se încarcă...",

                //createaccount part
                "confirmpass": "Confirmă parola",
                "confirmPasswordText": "Confirmați parola dvs.",
                "createaccount": "Creați un cont",
                "accsuccessfull": "Cont creat cu succes",
                "accpassnotmatch": "Parolele nu se potrivesc!",
                "accnowhitespace": "Numele de utilizator nu poate conține spații!",
                "passwordstrength": "Parola trebuie să conțină cel puțin 8 caractere, inclusiv cel puțin o literă majusculă, o literă minusculă, un număr și un caracter special.",
                "usernameexists": "Numele de utilizator există deja!",
                "fieldsempty": "Câmpurile nu pot fi goale!",

                //createAccount fallback
                "creatingaccount": "Crearea contului...",

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

                //claimTask
                "name": "NUME",
                "tasknr": "Nr. sarcină",
                "claim": "Solicitare",
                "generalknowledge": "Cunoștințe generale",
                "claimquiz": "Solicită test",
                "hungarianknowledge": "Cunoștințe-Ungaria",
                "errormsg": "Vă rugăm să finalizați mai întâi testele revendicate.",
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

