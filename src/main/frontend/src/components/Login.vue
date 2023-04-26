<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')

// const login = async (username, password) => {
//   const response = await authStore.login(username, password);

//   if (response === 'auth') {
//     router.push({ name: 'LayoutSession' });
//   } else {
//     if (response === 'user-not-found') {
//       error.value = 'Usuario no encontrado';
//     } else if (response === 'password-not-found') {
//       error.value = 'Contraseña incorrecta';
//     } else {
//       error.value = 'Ha ocurrido un error';
//     }
//   }
// }
const login = async (username, password) => {

  const response = await authStore.login(username, password); 
  
  if (response === 'auth') router.push({ name: 'LayoutSession' })
  if ( response != 'auth') router.push({ name: 'LayoutSession' })
    else if (response == 'user-not-found') {
      error.value = 'Usuario no encontrado';
    }
    else if (response == 'password-not-found') {
      error.value = 'Contraseña incorrecta';
    }
    
  }


</script>

<template>
  <v-sheet width="37%" class="form mx-auto">
    <v-img :width="'50%'" aspect-ratio="16/9" cover src="../../src/assets/img/logo-login.jpg" class="img"></v-img>
    <v-form ref="form" @keyup.enter="login(username, password)">
      <v-text-field color="#FF4700" v-model="username" :counter="10" :rules="nameRules" label="Usuario" required
        class="form__name"></v-text-field>

      <v-text-field v-model="password" color="#FF4700" :counter="20" :rules="passwordRules" label="Contraseña" required
        class="form__pass" type="password"></v-text-field>

      <div class="btn">
        <v-btn color="#FF4700" rounded="xs" :width="'50%'" @click="login(username, password)">
          Iniciar sesión
        </v-btn>
      </div>
       <div v-if = "error"> {{ error }} </div>

    </v-form>
  </v-sheet>
</template>

<style lang="scss" scoped>
.form {
  box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.48);
  border-radius: 12px;

  .img {
    display: flex;
    max-width: 100%;
    position: relative;
    margin: auto;

  }

  .form__name {
    margin: 7%;
    border-radius: 12px;
  }

  .form__pass {
    margin: 7%;
  }

  .btn {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .error{
    color: red;
    text-align: center;
    margin-top: 1vh;
    margin-bottom: 9%;
  }
}

</style>
