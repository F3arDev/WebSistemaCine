<script setup>
import { RouterView } from 'vue-router'

import alertify from 'alertifyjs';


alertify.defaults.transition = "fade";
alertify.defaults.theme.ok = "btn btn-primary";
alertify.defaults.theme.cancel = "btn btn-default btn-outline-dark";
alertify.defaults.theme.input = "form-control";
</script>

<template>
  <RouterView />
</template>