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
            <p>General Culture</p>
        </div>
        <div class="flex justify-center pt-2">
            <p>50</p>
        </div>
        <div class="flex justify-center pt-2 hover:cursor-pointer"
             @click="selectComponent('General Culture')"
        >
                <p class="hover:text-slate-600" >Claim quiz</p>
        </div>
        <div class="flex justify-center pt-2">
            <p>2</p>
        </div>
        <div class="flex justify-center pt-2">
            <p>Hungarian culture</p>
        </div>
        <div class="flex justify-center pt-2">
            <p>50</p>
        </div>
        <div class="flex justify-center pt-2 hover:cursor-pointer"
             @click="selectComponent('Hungarian Culture')"
        >
                <p class="hover:text-slate-600" >Claim quiz</p>
        </div>
   </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@/store/index';

    const authStore = useAuthStore();

    const router=useRouter();

    const selectComponent=(name)=>{
        
        const newId = authStore.rows.length + 1;
        const newRow = { id: newId, name: name};
        authStore.addRow(newRow);
        router.push({ name: 'tasks' });
        authStore.selectedTaskComponent='tasks';
    }
</script>