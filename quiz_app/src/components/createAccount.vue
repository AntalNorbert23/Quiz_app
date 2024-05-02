
<template>
    <div class="w-full">
        <transition name="fade"
                    enter-active-class="animate__animated animate__fadeIn"
                    leave-active-class="animate__animated animate__fadeOut"
        >
            <p :class="{'bg-green-400':createdAccount.userCreated, 'bg-red-400':!createdAccount.userCreated}"
                class="absolute top-0 left-1/2 translate-x-[-50%] px-6 py-6 select-none rounded-b-lg text-center"
                v-if="createdAccount.userCreatedTextShowed"
            >
                {{ createdAccount.userCreated ? "Account successfully created" : createdAccount.errorMessage }}
            </p>
        </transition>
    </div>
<div id="outerlogincontainer" class="absolute top-2/4 left-2/4 translate-y-[-50%] translate-x-[-50%] m-0 select-none"> 
    <div id="logincontainer" class="flex flex-col justify-between h-[400px] w-[275px] md:w-[400px] border-2 border-black rounded-lg"> 
        <div class="flex justify-normal">
            <label for="username" class="mt-6 mx-4" >Username</label>
        </div>
        <input type="text" 
               placeholder="Enter your username" 
               class="w-11/12 h-12 mx-3 md:mx-4 text-left ps-2 md:ps-4 border border-black focus:text-center focus:ps-0"
               v-model="username"
               id="username"
               @keydown.enter="createAccount"
        > 
        <div class="flex justify-normal">
            <label for="password" class="mx-4 mt-2">Password</label>
        </div>
        <input type="password"
               placeholder="Enter your password" 
               class="w-11/12 h-12 mt-px mx-3 md:mx-4 text-left ps-2 md:ps-4 border border-black focus:text-center focus:ps-0"
               v-model="password"
               id="password"
               @keydown.enter="createAccount"
        >
        <div class="flex justify-normal">
            <label for="verifyPassword" class="mx-4 mt-2">Confirm Password</label>
        </div>
        <input type="password"
               placeholder="Confirm your password" 
               class="w-11/12 h-12 mt-px mx-3 md:mx-4 text-left ps-2 md:ps-4 border border-black focus:text-center focus:ps-0"
               v-model="verifyPassword"
               id="verifyPassword"
               @keydown.enter="createAccount"
        >

        <button class="loginbutton w-11/12 mx-3 md:mx-4 p-4 mb-6 mt-4 tracking-widest bg-blue-500 border-2 border-blue-500 hover:bg-white hover:text-blue-900"
                @click="createAccount"
        >
                CREATE ACCOUNT
        </button> 
    </div> 
</div> 
<accountFallback v-if="isLoading" />
</template>


<script setup>
    //imports
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import  accountFallback from './accountFallback.vue';

    //create ref instances of username and password
    const username=ref('');
    const password=ref('');
    const verifyPassword=ref("");
    const isLoading = ref(false);

    //get accounts from localstorage
    const existingAccounts=JSON.parse(localStorage.getItem('accounts'))||[];

    const router=useRouter();

    const createdAccount=ref({
        userCreated:false,
        userCreatedTextShowed:false,
        errorMessage:"",
    });

    //create  account function
    const createAccount=()=>{
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        createdAccount.value.userCreated=false;
        setTimeout(() => {
            createdAccount.value.userCreatedTextShowed=false;
        }, 6000);

        //account validation logic
        if(username.value !=="" && password.value !== "" && verifyPassword.value!==""){
        
            const alreadyExists=existingAccounts.some(account=>account.username===username.value);
            if(password.value!==verifyPassword.value){
                createdAccount.value.userCreatedTextShowed=true;
                    createdAccount.value.errorMessage="Passwords don't match!";
            }else if(/\s/.test(username.value)){
                    createdAccount.value.userCreatedTextShowed=true;
                    createdAccount.value.errorMessage="Username cannot contain whitespace!";
            }else if(!passwordRegex.test(password.value)){
                    createdAccount.value.userCreatedTextShowed=true;
                    createdAccount.value.errorMessage = "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.";
            }else if(alreadyExists){
                    createdAccount.value.userCreatedTextShowed=true;
                    createdAccount.value.errorMessage="The username already exists!";
            }else{
                isLoading.value = true;
                createdAccount.value.userCreated=true;
                const newAccount={
                                username:username.value,
                                password:password.value,
                            };
                    existingAccounts.push(newAccount);
                    localStorage.setItem('accounts',JSON.stringify(existingAccounts));
        
                    username.value='';
                    password.value='';
                    verifyPassword.value='';
                setTimeout(() => {
                    isLoading.value = false;
                    setTimeout(() => {
                        createdAccount.value.userCreatedTextShowed=true;
                    },0);
                }, 4000);
            //redirect to login page after a bit of time
                setTimeout(()=>{
                
                router.push('/');
                },5000)
            } 
        }else{
            createdAccount.value.userCreatedTextShowed=true;
            createdAccount.value.errorMessage="The fields can't be empty!" ;
        }     
    }

</script>

   