<template
  ><div>
    <h1>Spielplan</h1>
    <br />
    <v-row>
      <v-col>
        <v-sheet height="400">
          <v-calendar color="green" type="day">
            <template v-slot:day-header="{ present }">
              <template v-if="present" class="text-center">
                Today
              </template>
            </template>

            <template v-slot:interval="{ hour }">
              <div class="text-center">{{ hour }} o'clock</div>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </div></template
>
