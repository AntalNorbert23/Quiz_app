<template>
        <div class="w-full">
            <transition name="fade"
                        enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__hinge"
                        @before-enter="onBeforeEnter"
                        @after-leave="onAfterLeave"
            >
                <p :class="{'bg-green-400':login.loginSuccess, 'bg-red-400':!login.loginSuccess}"
                    class="absolute top-0 left-1/2 translate-x-[-50%] px-6 py-6 md:w-52 select-none rounded-b-lg text-center"
                    v-if="login.loginTextShowed"
                >
                    {{ login.loginSuccess ?  localeStore.translate("successfullogin") : localeStore.translate("failedlogin") }}
                </p>
            </transition>
        </div>
    <div id="outerlogincontainer" class="absolute top-2/4 left-2/4 translate-y-[-50%] translate-x-[-50%] m-0 select-none"> 
          <div class="absolute top-0 right-0 m-2 z-10">
            <div class="relative">
                <button @click="showDropdown = !showDropdown" class="p-2 focus:outline-none">
                    <i class="fa fa-language"></i>
                </button>
                <transition
                            enter-active-class="animate__animated animate__zoomIn"
                            leave-active-class="animate__animated animate__zoomOut"
                >
                    <div v-if="showDropdown" class="absolute right-0 mt-2 bg-white shadow-lg rounded z-10">
                        <ul>
                            <li class="py-1">
                                <button @click="changeLanguage('en')" class="block px-4 py-2 hover:bg-gray-200">
                                    <i class="fi fi-us"></i>
                                </button>
                            </li>
                            <li class="py-1">
                                <button @click="changeLanguage('hu')" class="block px-4 py-2 hover:bg-gray-200">
                                    <i class="fi fi-hu"></i>
                                </button>
                            </li>
                            <li class="py-1">
                                <button @click="changeLanguage('ro')" class="block px-4 py-2 hover:bg-gray-200">
                                    <i class="fi fi-ro"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </transition>
            </div>
        </div>
        <div id="logincontainer" class="relative flex flex-col justify-between h-[350px] w-[275px] md:w-[400px] border-2 border-black rounded-lg"> 
            <div class="flex justify-normal">
                <label for="username" class="mt-6 mx-4" >{{ localeStore.translate("username") }}</label>
            </div>
            <input type="text" 
                   :placeholder="placeholderUsern" 
                   class="w-11/12 h-12 mx-3 md:mx-4 ps-2 text-left md:pe-0 md:ps-4 border border-black focus:text-center focus:ps-0"
                   v-model="username"
                   id="username"
                   @keydown.enter="loginAction"
            > 
            <div class="flex justify-normal">
                <label for="password" class="mx-4 mt-4">{{localeStore.translate("password")}}</label>
            </div>
            <input :type="passwordInputType"
                   :placeholder="placeholderPass"
                   class="w-11/12 h-12 mt-px mx-3 md:mx-4 ps-2 text-left md:ps-4 border border-black focus:text-center focus:ps-0"
                   v-model="password"
                   id="password"
                   @keydown.enter="loginAction"
            >
            <span
                class="absolute right-6 top-[176px] transform -translate-y-1/2 cursor-pointer fa fa-eye"
                @click="togglePasswordVisibility"
            >
            </span>
            <router-link to="/createAccount" 
                         class="px-2 md:px-5 text-blue-400 text-sm text-center mt-2 mb-4"
            >
               {{ localeStore.translate("noacctext") }}
            </router-link>

            <button class="loginbutton w-11/12 mx-3 md:mx-4 p-4 mb-8 tracking-widest bg-blue-500 border-2 border-blue-500 hover:bg-white hover:text-blue-900"
                    @click="loginAction"
            >
                    {{ localeStore.translate("login") }}
            </button> 
        </div> 
  </div> 
  <loginFallback v-if="isLoading" />
</template>

<script setup>
    //imports
    import { ref, computed, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@/store/index';
    import  loginFallback  from './loginFallback.vue';
    import { useLocaleStore } from './Locales/locales';


    //create ref instances of username and password
    const username=ref('');
    const password=ref('');

    //get accounts from localstorage
    const savedAccounts=JSON.parse(localStorage.getItem('accounts'))||[];

    const router=useRouter();
    const authStore = useAuthStore();
    const localeStore = useLocaleStore();
    const isLoading = ref(false);
    const showPassword = ref(false);
    const showDropdown=ref(false);

    const login=ref({
        loginSuccess:false,
        loginTextShowed:false,
    });

    //login function that checks if there is the given account
    const loginAction=()=>{
        const foundAccount=savedAccounts.find(account=>account.username === username.value && account.password === password.value);
        
        if(foundAccount){
            isLoading.value = true;
            login.value.loginSuccess=true;
            authStore.setUser({ username: username.value });
            setTimeout(()=>{
            router.push('/quizContent/tasks');
        },3000) 
        setTimeout(() => {
                isLoading.value = false;
                setTimeout(() => {
                    login.value.loginTextShowed=true;
                }, 0);
        }, 2000);
        
        }else{
            login.value.loginTextShowed=true;
            login.value.loginSuccess=false;
            setTimeout(() => {
                login.value.loginTextShowed=false;
            }, 3000);
        }
    }

    const passwordInputType = computed(() => {
        return showPassword.value ? 'text' : 'password';
    });
    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
    };

    const changeLanguage = (newLocale) => {
        localeStore.setLocale(newLocale);
        showDropdown.value = false; 
    };

    const placeholderUsern=computed(()=>{
        return localeStore.translate("enterUsername");
    })
    const placeholderPass=computed(()=>{
        return localeStore.translate("enterPassword");
    })

    onMounted(()=>{
        localeStore.loadLocale();
    })
    //correct animation so the Hinge animation does not induce Y scrollbar
    const onBeforeEnter = () => {
    document.body.style.overflow = 'hidden';
    }

    const onAfterLeave = () => {
    document.body.style.overflow = 'auto';
    }
</script>


