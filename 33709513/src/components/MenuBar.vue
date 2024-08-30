<script setup>
import { ref } from 'vue';
import Menubar from 'primevue/menubar';
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: () => router.push('/')
    }
]);

const signIn = () => {
    router.push('/Login');
};
</script>

<template>
        <Menubar :model="items">
          <template #end>
            <a class="p-menuitem-link sign-in-item" @click="signIn">
                        <span class="p-menuitem-icon pi pi-fw pi-user"></span>
                        <span class="p-menuitem-text">Sign In</span>
                    </a>
            </template>
        </Menubar>
</template>

<style scoped>
.sign-in-item {
    margin-right: auto;
}
</style>