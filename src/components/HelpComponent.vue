<template>
  <v-dialog transition="dialog-top-transition">
    <template v-slot:activator="{ props }">
      <v-btn
        size="small"
        v-bind="props"
        class="ma-1"
        color="cyan"
        icon="mdi-help"
      >
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title text="Web - Bombika description"></v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="text-h1 pa-12">Placeholder</div>
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
      opacity: 0.5,
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
