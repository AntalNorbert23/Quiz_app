<template>
   <div class="grid grid-cols-4 grid-rows-3 mx-auto w-[95%] md:w-[90%] mt-6 py-2 border border-black">
        <div class="flex justify-center">
            <p class="text-sm md:text-base">ID</p>
        </div>
        <div class="flex justify-center">
            <p class="text-sm md:text-base">NAME</p>
        </div>
        <div class="flex justify-center">
            <p class="text-sm md:text-base">Task Nr</p>
        </div>
        <div class="flex justify-center">
            <p class="text-sm md:text-base">Claim</p>
        </div>
        <div class="flex justify-center pt-2">
            <p class="text-sm md:text-base">1</p>
        </div>
        <div class="flex justify-center pt-2">
            <p class="text-center text-sm md:text-base">General knowledge</p>
        </div>
        <div class="flex justify-center pt-2">
            <p class="text-sm md:text-base">50</p>
        </div>
        <div class="flex justify-center pt-2 hover:cursor-pointer"
             @click="selectComponent('General knowledge')"
        >
                <p class="hover:text-slate-600 text-center text-sm md:text-base pe-1" >Claim quiz</p>
        </div>
        <div class="flex justify-center pt-2">
            <p class="text-sm md:text-base">2</p>
        </div>
        <div class="flex justify-center pt-2">
            <p class="text-center text-sm md:text-base">Hungarian knowledge</p>
        </div>
        <div class="flex justify-center pt-2">
            <p class="text-sm md:text-base">50</p>
        </div>
        <div class="flex justify-center pt-2 hover:cursor-pointer"
             @click="selectComponent('Hungarian knowledge')"
        >
                <p class="hover:text-slate-600 text-center text-sm md:text-base pe-1" >Claim quiz</p>
        </div>
   </div>
   <transition
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut"
   >
       <div v-if="errorMsg" class="flex justify-center mt-4 text-red-500">
          {{ errorMsg }}
        </div>
   </transition>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@/store/index';
    import { onMounted,ref } from 'vue';

    const authStore = useAuthStore();

    const router=useRouter();
    const errorMsg = ref(null);

    //generate random ID and save to localstorage
    const generateUniqueRandomID = () => {
        let uniqueID;
        const claimedIDs = JSON.parse(localStorage.getItem(`${authStore.getUsername}-claimedIDs`)) || [];
        
        // generate random ID and check if it is already in the claimed IDs list
        do {
            uniqueID = Math.floor(Math.random() * 1000000);
        } while (claimedIDs.includes(uniqueID));
        
        claimedIDs.push(uniqueID);
        localStorage.setItem(`${authStore.getUsername}-claimedIDs`, JSON.stringify(claimedIDs));
        
        return uniqueID;
    };

    //generating row for the tasks component managing with the store
    const selectComponent=(name,quizSetName)=>{
        const maxClaimedQuizzes = 3;

        //check if there are already 3 quizzes claimed
        if (authStore.claimedQuizzesCount >= maxClaimedQuizzes) {
            errorMsg.value = 'Please complete the claimed quizzes first.';
            setTimeout(() => {
                errorMsg.value=null
            }, 3000);
            return;
        }

        const newId = generateUniqueRandomID();
        const newRow = { id: newId, name: name, quizSetName: quizSetName};
        authStore.addRow(newRow);

        //push the user to the tasks component and increment the claimed quizes nr
        router.push({ name: 'tasks' });
        authStore.selectedTaskComponent='tasks';
        authStore.incrementClaimedQuizzes();
    }

    //refresh bug fixer 
    const saveRoute = () => {
        localStorage.setItem('lastVisitedRoute', 'tasks');
    };

    onMounted(() => {
        saveRoute();
    });
</script>