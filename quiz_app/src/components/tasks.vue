<template>
    <div class="w-full text-lg">
        <h1 class=" ps-3 md:p-3 md:ms-8 mb-6 mt-3 text-base md:text-2xl">{{ localeStore.translate("taskstobedone") }}</h1>
        <div class="flex mb-10">
            <div class="flex justify-center ms-10 md:ms-16 me-5 p-3 w-20 md:w-32 border border-slate-600 hover:cursor-pointer bg-slate-200 hover:bg-slate-400 hover:border-white"
                 @click="goToTasks"
                 :class="{ 'bg-slate-600': processingOrDone }"
            >
                <p class="text-sm md:text-base">{{ localeStore.translate("processing") }}</p>
            </div>
            <div class="flex justify-center p-3 w-20 md:w-32 border border-slate-600 hover:cursor-pointer bg-slate-200 hover:bg-slate-400 hover:border-white"
                 @click="goToTasksDone"
            >
                <p class="text-sm md:text-base">{{ localeStore.translate("done") }}</p>
            </div>
        </div>
     
        <div v-for="(row, index) in rows" :key="index"
            class="grid grid-cols-4 grid-rows-2 mx-auto  w-[95%] md:w-[90%] mt-6 py-2 border border-black"
        >
            <div class="flex justify-center items-center">
                <p class="text-sm md:text-base">ID</p>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-sm md:text-base">{{localeStore.translate("name")}}</p>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-sm md:text-base">{{localeStore.translate("tasknr")}}</p>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-sm md:text-base">{{localeStore.translate("claim")}}</p>
            </div>
            <div class="flex justify-center pt-2">
                <p class="text-sm md:text-base">{{ row.id }}</p>
            </div>
            <div class="flex justify-center pt-2">
                <p class="text-sm md:text-base text-center"> {{ row.name === 'General knowledge' ? localeStore.translate('generalknowledge') : localeStore.translate('hungarianknowledge') }} </p>
            </div>
            <div class="flex justify-center pt-2">
                <p class="text-sm md:text-base">50</p>
            </div>
            <div class="flex justify-center pt-2 hover:cursor-pointer text-sm md:text-base"
                @click="markQuiz(row.id,row.name)"
            >
                    <p class="hover:text-slate-600 pe-1" >{{ localeStore.translate("markquiz") }}</p>
            </div>
        </div>
    </div>
  </template>

<script setup>
    //imports
    import { useAuthStore } from '@/store/index';
    import { useRouter,useRoute } from 'vue-router';
    import { onMounted,computed } from 'vue';
    import { useLocaleStore } from './Locales/locales';
    
    //stores and routes
    const authStore = useAuthStore();
    const router=useRouter();
    const route=useRoute();
    const localeStore=useLocaleStore();

    //variables
    const rows = authStore.rows;
    const quizSetNames = ['quiz-set-1', 'quiz-set-2', 'quiz-set-3'];
    const quizSetNamesHu=['quiz-set-4', 'quiz-set-5', 'quiz-set-6'];

    //function of markQuiz where is passed the rowsID and name as argument
    const markQuiz = (rowId,name) => {

        //get the quizsetname from localstorage
        let randomQuizSetName = localStorage.getItem(`${authStore.getUsername}-randomQuizSetName_${rowId}`); 

        //logic for hungarian/general knowledge selection
        const chosenQuizSetNames = name == "Hungarian knowledge" ? quizSetNamesHu : quizSetNames;
        
        //if there isn't any quizsetname for that specific ID then generate one so when clicked markQuiz it imports on the quizQuestions
        //component generated  quizset and then pushes to that quizQuestion with the given params
        if (!randomQuizSetName) {
        
        randomQuizSetName = chosenQuizSetNames[Math.floor(Math.random() * chosenQuizSetNames.length)];
        
        localStorage.setItem(`${authStore.getUsername}-randomQuizSetName_${rowId}`, randomQuizSetName);
        }
        router.push({ name: 'quizQuestions', params: { quizSetName: randomQuizSetName, rowId:rowId } });
    }

    //function to go to tasks component
    const goToTasks = () => {
        router.push({ name: 'tasks' });
    };

    //function to go to tasksDone component
    const goToTasksDone = () => {
        router.push({ name: 'tasksDone' });
    };

    //function for handling UI design 
    const processingOrDone = computed(() => {
        return route.name === 'tasks';
    });

    onMounted(() => {
    authStore.loadRows();
    localeStore.loadLocale();
    });
</script>