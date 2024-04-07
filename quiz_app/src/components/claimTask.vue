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
            <p>100</p>
        </div>
        <div class="flex justify-center pt-2 hover:cursor-pointer"
             @click="selectComponent"
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
             @click="selectComponent"
        >
                <p class="hover:text-slate-600" >Claim quiz</p>
        </div>
   </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router=useRouter();

    const selectComponent=()=>{
        router.push({ name: 'tasks' });
    }
</script>