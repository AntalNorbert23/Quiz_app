<template>
    <div class="w-full text-lg pb-10">
        <h1 class=" ps-3 md:p-3 md:ms-8 mb-6 mt-3 text-base md:text-2xl">{{ localeStore.translate("completedtasks") }}</h1>
        <div class="flex mb-10">
            <div
                class="flex justify-center ms-10 md:ms-16 me-5 p-3 w-20 md:w-32 border border-slate-600 hover:cursor-pointer bg-slate-200 hover:bg-slate-400 hover:border-white"
                @click="navigateToTasks"
            >
                <p class="text-sm md:text-base">{{localeStore.translate("processing")}}</p>
            </div>
            <div
                class="flex justify-center p-3 w-20 md:w-32 border border-slate-600 hover:cursor-pointer bg-slate-200 hover:bg-slate-400 hover:border-white"
                @click="navigateToTasksDone"
                :class="{ 'bg-slate-600': processingOrDone }"
            >
                <p class="text-sm md:text-base">{{localeStore.translate("done")}}</p>
            </div>
        </div>
        <div v-for="(row, index) in authStore.quizzesDone" :key="index"
            class="grid grid-cols-4 grid-rows-2 mx-auto w-[90%] mt-6 py-2 border border-black"
        >
            <div class="flex justify-center items-center">
                <p class="text-sm md:text-base">ID</p>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-sm md:text-base">{{localeStore.translate("name")}}</p>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-sm md:text-base">{{ localeStore.translate("tasknr") }}</p>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-sm md:text-base">{{localeStore.translate("correct")}}</p>
            </div>
            <div class="flex justify-center">
                <p class="text-sm md:text-base">{{ row.id }}</p>
            </div>
            <div class="flex justify-center pt-2">
                <p class="text-sm md:text-base text-center">{{ row.name === 'General knowledge' ? localeStore.translate('generalknowledge') : localeStore.translate('hungarianknowledge') }}</p>
            </div>
            <div class="flex justify-center pt-2">
                <p class="text-sm md:text-base">50</p>
            </div>
            <div class="flex justify-center pt-2 hover:cursor-pointer text-sm md:text-base">
                <p class="hover:text-slate-600" >{{ row.correctAnswersCount }}/50</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    //imports
    import { useAuthStore } from '@/store/index';
    import { useRouter,useRoute } from 'vue-router';
    import { onMounted, computed } from 'vue';
    import { useLocaleStore } from './Locales/locales';

    //stores and router
    const authStore = useAuthStore();
    const router = useRouter();
    const route=useRoute();
    const localeStore=useLocaleStore();

    //function to go to tasks component
    function navigateToTasks() {
    router.push({ name: 'tasks' });
    }

    //function to go to tasksDone component
    function navigateToTasksDone() {
    router.push({ name: 'tasksDone' });
    }

     //function for handling UI design 
    const processingOrDone = computed(() => {
        return route.name === 'tasksDone';
    });

    onMounted(() => {
        authStore.loadQuizzesDone();
        localeStore.loadLocale();
    });
</script>
