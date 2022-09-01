<template>
  <v-dialog transition="dialog-top-transition">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="ma-1" color="pink" icon="mdi-help"> </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar color="primary">Opening from the top</v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">Hello world!</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="isActive.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import help from "@/assets/help.png";
export default {
  data() {
    return {
      help,
    };
  },
};
</script>

<style>
.imageStyle {
  display: flex;
}
</style>

<!-- <div class="flex">
    <button>
      
    </button>
  </div> -->
