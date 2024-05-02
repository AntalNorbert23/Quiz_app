
import { defineStore } from 'pinia';


const LOCALE_STORAGE_KEY = 'currentLocale';

export const useLocaleStore = defineStore('locale', {
    state: () => ({
        currentLocale: 'en', 
        translations: {
            en: {
                "username":"Username",
                "enterUsername":"Enter your username",
                "password":"Password",
                "enterPassword":"Enter your password",
                "noacctext":"Don't have an account? Create one here!",
                "login": "Login",
            },
            hu: {
                "username": "Felhasználónév",
                "enterUsername": "Írja be a felhasználónevét",
                "password": "Jelszó",
                "enterPassword": "Írja be a jelszavát",
                "noacctext": "Nincs fiókja? Hozzon létre egyet itt!",
                "login": "Bejelentkezés",

            },
            ro:{
                "username": "Nume de utilizator",
                "enterUsername": "Introduceți numele de utilizator",
                "password": "Parolă",
                "enterPassword": "Introduceți parola",
                "noacctext": "Nu ai un cont? Creează unul aici!",
                "login": "Autentificare",
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

