<template>
   <div class="grid grid-cols-4 grid-rows-3 border border-black mx-auto w-[90%] mt-6 py-2">
        <div class="flex justify-center items-center">
            <p>ID</p>
        </div>
        <div class="flex justify-center">
            <p>NAME</p>
        </div>
        <div class="flex justify-center">
            <p>Task Nr</p>
        </div>
        <div class="flex justify-center">
            <p>Claim</p>
        </div>
        <div class="flex justify-center pt-2">
            <p>1</p>
        </div>
        <div class="flex justify-center pt-2">
            <p>General knowledge</p>
        </div>
        <div class="flex justify-center pt-2">
            <p>50</p>
        </div>
        <div class="flex justify-center pt-2 hover:cursor-pointer"
             @click="selectComponent('General knowledge')"
        >
                <p class="hover:text-slate-600" >Claim quiz</p>
        </div>
        <div class="flex justify-center pt-2">
            <p>2</p>
        </div>
        <div class="flex justify-center pt-2">
            <p>Hungarian knowledge</p>
        </div>
        <div class="flex justify-center pt-2">
            <p>50</p>
        </div>
        <div class="flex justify-center pt-2 hover:cursor-pointer"
             @click="selectComponent('Hungarian knowledge')"
        >
                <p class="hover:text-slate-600" >Claim quiz</p>
        </div>
   </div>
   <div v-if="errorMsg" class="text-red-500 mt-4 flex justify-center">
      {{ errorMsg }}
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@/store/index';
    import { onMounted,ref } from 'vue';

    const authStore = useAuthStore();

    const router=useRouter();
    const errorMsg = ref(null);

    const generateUniqueRandomID = () => {
        let uniqueID;
        const claimedIDs = JSON.parse(localStorage.getItem('claimedIDs')) || [];
        
        // Generate random ID and check if it is already in the claimed IDs list
        do {
            uniqueID = Math.floor(Math.random() * 1000000); // Generate a random ID
        } while (claimedIDs.includes(uniqueID));
        
        // Add the new unique ID to the claimed IDs list and save to local storage
        claimedIDs.push(uniqueID);
        localStorage.setItem('claimedIDs', JSON.stringify(claimedIDs));
        
        return uniqueID;
    };

    const selectComponent=(name,quizSetName)=>{
        const maxClaimedQuizzes = 3;

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
        router.push({ name: 'tasks' });
        authStore.selectedTaskComponent='tasks';
        authStore.incrementClaimedQuizzes();
    }

    //temporary refresh bug fixer 
    const saveRoute = () => {
        localStorage.setItem('lastVisitedRoute', 'tasks');
    };

    onMounted(() => {
        saveRoute();
    });
</script>