<template>
        <div class="w-full">
            <transition name="fade"
                        enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__hinge"
                        @before-enter="onBeforeEnter"
                        @after-leave="onAfterLeave"
            >
                <p :class="{'bg-green-400':login.loginSuccess, 'bg-red-400':!login.loginSuccess}"
                    class="absolute top-0 left-1/2 translate-x-[-50%] px-6 py-6 w-52 select-none rounded-b-lg text-center"
                    v-if="login.loginTextShowed"
                >
                    {{ login.loginSuccess ? "Successfully logged in" : "Failed login. Try again" }}
                </p>
            </transition>
        </div>
    <div id="outerlogincontainer" class="m-0 absolute top-2/4 left-2/4 translate-y-[-50%] translate-x-[-50%] select-none"> 
        <div id="logincontainer" class="flex flex-col justify-between border-2 border-black h-[350px] w-[400px] rounded-lg"> 
            <div class="flex justify-normal">
                <label for="username" class="mt-6 mx-4" >Username</label>
            </div>
            <input type="text" 
                   placeholder="Enter your username" 
                   class="w-11/12 h-12 mx-4 text-left ps-4 border border-black focus:text-center focus:ps-0"
                   v-model="username"
                   id="username"
                   @keydown.enter="loginAction"
            > 
            <div class="flex justify-normal">
                <label for="password" class="mx-4 mt-4">Password</label>
            </div>
            <input type="password"
                   placeholder="Enter your password" 
                   class="w-11/12 h-12 mt-px mx-4 text-left ps-4 border border-black focus:text-center focus:ps-0"
                   v-model="password"
                   id="password"
                   @keydown.enter="loginAction"
            >
            <router-link to="/createAccount" 
                         class="px-5 text-blue-400 text-sm text-center mt-2 mb-4"
            >
                Don't have an account? Create one here!
            </router-link>

            <button class="loginbutton w-11/12 mx-4 p-4 mb-8 bg-blue-500 border-2 border-blue-500 tracking-widest hover:bg-white hover:text-blue-900"
                    @click="loginAction"
            >
                    LOGIN
            </button> 
        </div> 
  </div> 
  <loginFallback v-if="isLoading" />
</template>

<script setup>
//imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/index';
import  loginFallback  from './loginFallback.vue';


//create ref instances of username and password
const username=ref('');
const password=ref('');

//get accounts from localstorage
const savedAccounts=JSON.parse(localStorage.getItem('accounts'))||[];

const router=useRouter();
const authStore = useAuthStore();
const isLoading = ref(false);

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
        router.push('/quizContent/tasks'); ///should take to quiz site
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

//correct animation so the Hinge animation does not induce Y scrollbar
const onBeforeEnter = () => {
  document.body.style.overflow = 'hidden';
}

const onAfterLeave = () => {
  document.body.style.overflow = 'auto';
}
</script>


