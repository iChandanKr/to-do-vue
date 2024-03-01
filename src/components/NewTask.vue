<template>
<form @submit="handleSubmit">
    <input type="text" placeholder="I need to ..." v-model="newTask" />
    <button type="submit">Add</button>
</form>
</template>

<script>
import {
    ref
} from 'vue';
import {
    useTaskStore
} from '../../store/taskStore';

export default {
    name: 'NewTask',
    setup() {

        const taskstore = useTaskStore();
        const newTask = ref('');
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(newTask.value);
            if (newTask.value.length > 0) {
                taskstore.addTask({
                    title: newTask.value,
                    isFav: false,
                    id: JSON.stringify(Math.floor(Math.random() * 1000000)),
                })
                newTask.value = '';
            }
        }

        return {
            newTask,
            handleSubmit
        }
    }
}
</script>
