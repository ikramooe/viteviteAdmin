<template>
  <CChartBar
    :datasets="defaultDatasets"
    :labels="wilayas"
  />
</template>

<script>
import { CChartBar } from '@coreui/vue-chartjs'

export default {
  name: 'CChartBarExample',
  components: { CChartBar },
  props:['codes'],
  created(){
    
  },
  data(){
   return{
    values:[],
    wilayas:[
              'Adrar',
              'Chlef',
              'Laghouat',
              'Oum El Bouaghi',
              'Batna',
              'Béjaïa	',
              'Biskra',
              'Béchar',
              'Blida',
              'Bouira',
              'Tamanrasset',
              'Tébessa',
              'Tlemcen',
              'Tiaret',
              'Tizi Ouzou',
              'Alger',
              'Djelfa',
              'Jijel',
              'Sétif',
              'Saïda',
              'Skikda',
              'Sidi Bel Abbès',
              'Annaba',
              'Guelma',
              'Constantine',
              'Médéa',
              'Mostaganem',
              'Msila',
              'Mascara',
              'Ouargla',
              'Oran',
              'El Bayadh',
              'Illizi',
              'Bordj Bou Arreridj',
              'Boumerdès',
              'El Tarf',
              'Tindouf',
              'Tissemsilt',
              'El Oued',
              'Khenchela',
              'Souk Ahras',
              'Tipaza',
              'Mila',
              'Aïn Defla',
              'Naâma',
              'Aïn Témouchent',
              'Ghardaia',
              'Relizane',
              
            ], 
   }
  },
  computed: {
    defaultDatasets () {
      return [
        {
          label: 'nombre de chauffeurs par wilaya',
          backgroundColor: '#f87979',
          data: this.codes,
        }
      ]
    }
  }
}
</script>
