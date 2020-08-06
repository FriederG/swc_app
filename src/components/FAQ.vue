<template>
  <div>
    <h1>FAQ</h1>

    <h3 class="green--text">{{ $t("General Questions") }}</h3>
    <br />
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Wann geht es los?</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header
          >Was kostet die Anmeldung?</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header
          >Was ist der Sinn des Lebens?</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <br />
    <h3 class="green--text">{{ $t("Camping and Parking") }}</h3>
    <br />
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Wo kann man campen?</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header
          >Was sollte ich einpacken?</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header
          >Was ist der Sinn des Lebens?</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <br />
    <h3 class="green--text">{{ $t("Verpflegung") }}</h3>
    <br />
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header
          >Wann gibt es Frühstück?</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header
          >Wo kann ich mich zum Frühstück anmelden?</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header
          >Ist das Buffet wirklich so gut, wie alle
          behaupten?</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!--
    <v-container>
      <v-row>

        <v-card class="mx-auto mt-3S" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://kielrugby.com/wp-content/uploads/2019/10/IMG_2117-1024x683.jpg"
          >
            <v-card-title>Turnier</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            Alle Informationen zum Turnier...
          </v-card-text>

          <v-card-actions>
            <v-btn color="green" text>
              Info
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="mx-auto mt-3" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://www.telegraph.co.uk/content/dam/Travel/2018/July/Scotland-campingGettyImages-526564828-xlarge.jpg"
          >
            <v-card-title>Camping</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            Alle Informationen zum Camping...
          </v-card-text>

          <v-card-actions>
            <v-btn color="green" text>
              Info
            </v-btn>
          </v-card-actions>
        </v-card>


        <v-card class="mx-auto mt-3" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://www.vebwk.com/wp-content/uploads/2018/12/Fotografieren-von-Essen-im-Restaurant.jpg"
          >
            <v-card-title>Essen</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            Alle Informationen zum Essen...
          </v-card-text>

          <v-card-actions>
            <v-btn color="green" text>
              Info
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
      -->
  </div>
</template>
